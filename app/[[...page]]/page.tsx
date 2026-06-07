import "@/app/globals.css";
import { APP_API } from "@/application/providers/api";
import Application from '@/application/providers/wrappers/Application';
import ComponentBuilder from "@/application/runtime/builder/ComponentBuilder";
import ThemeBuilder from "@/application/runtime/builder/ThemeBuilder";
import { ApplicationLayout, ApplicationRoutes } from "@/application/runtime/pages/type";
import { headers } from "next/headers";
import { permanentRedirect, redirect } from 'next/navigation';
import { servingProduction } from "..";
import { NoSuchStore, ServiceUnavailable } from "../Errors";
import { DEFAULT_THEME, getAppGlobalComponent, getApplicationPageRender, getTenantThemeConfig } from './engine';
import { ApplicationIndexParams } from './types';
import CategoryPageController from "@/application/runtime/run-category/controller";
import ProductPageController from "@/application/runtime/run-product/controller";
import { EditorStoreProvider } from "@/bundles/store/Provider";

const testHere = 'store9nepal.dhimora.com';

export async function getTenantMetaData() {
    if (!servingProduction) {
        return {
            type: "",
            error: "",
            host: "",
            store: '06a192fd-02b9-7204-9679-63a7404e2e22',
            tenant: '06a192f0-3743-7aff-9094-dd9e55f17b58',
            slug: "store9nepal",
            domain: "store9nepal.dhimora.com",
        }
    }


    // no need of headache if the env is developemnt!!!!!!!
    const headerMeta = await headers()
    const host = ((((!servingProduction && testHere) || (headerMeta?.get("x-forwarded-host") || headerMeta.get("host")))?.replace(/^www\./, "")) || "").toLowerCase()

    const isFromAppDashboard = host.match(new RegExp(`^([a-z0-9-_]+)\.admin\.dhimora\.com$`))?.[1] || false
    const isForDashboard = !isFromAppDashboard && host.includes(".admin.")
    const isFromApp = !isForDashboard && !isFromAppDashboard && host.match(new RegExp(`^([a-z0-9-_]+)\.dhimora\.com$`))?.[1] || false


    let tenant;
    let lookup_type = "store_domain";

    if (isFromAppDashboard) {
        tenant = isFromAppDashboard
        lookup_type = "store_slug"
    }

    else if (isForDashboard) {
        tenant = host.replaceAll("admin.", "")
        lookup_type = "store_domain"
    }

    else if (isFromApp) {
        tenant = isFromApp
        lookup_type = "store_slug"
    }

    else if (host.includes("railway.app")) {
        tenant = "store9nepal"
        lookup_type = "store_slug"
    }

    else {
        tenant = host
    }

    let response = await APP_API.POST(`/v1/store/lookup`, {
        "lookup": lookup_type,
        "tenant": tenant
    }) as {
        host: string,
        type: string,
        error: string,
        domain: string,
        tenant: string,
        store: string
        slug: string
    }

    response["host"] = host

    if (response?.type === "FETCH_ERROR") {
        response["error"] = "FETCH_ERROR"
    }

    else if (response?.type === "NOT_FOUND" || response?.error) {
        response["error"] = "NOT_FOUND"
    }

    else if (isFromApp && !response?.domain) {
        response["error"] = "DOMAIN_NOT_REGISTERED"
    }

    return response
}


function MainPageRouter({
    layout,
    route,
    tenant,
    store
}: {
    layout: ApplicationLayout;
    route: ApplicationRoutes;
    tenant: string;
    store: string;
}) {
    const path = route.route || "";
    if (route.type === "product" || path.startsWith("/product/") || path.startsWith("/products/")) {
        return <ProductPageController layout={layout} route={route} tenant={tenant} store={store} />;
    }

    if (
        route.type === "category" ||
        route.type === "collection" ||
        path.startsWith("/category/") ||
        path.startsWith("/categories/") ||
        path.startsWith("/collection/") ||
        path.startsWith("/collections/")
    ) {
        return <CategoryPageController layout={layout} route={route} tenant={tenant} store={store} />;
    }

    return <ComponentBuilder schema={layout?._c} />;
}

async function ApplicationBuildPage({ layout, route, tenant, store }: {
    layout: ApplicationLayout
    route: ApplicationRoutes
    tenant: string
    store: string
}) {
    // load all the globals metadata for rendering the pages
    const [announcementBar, navbarSchema, footerSchema, globalsComponents, tenantThemeConfig] = await Promise.all([
        getAppGlobalComponent("announcement", tenant, store),
        getAppGlobalComponent("navbar", tenant, store),
        getAppGlobalComponent("footer", tenant, store),
        getAppGlobalComponent("ALL_OTHERS", tenant, store),
        getTenantThemeConfig({
            storeID: store,
            tenantID: tenant
        })
    ]);

    return <>
        <Application>
            <ThemeBuilder themeConfigs={tenantThemeConfig || DEFAULT_THEME}>
                {/* display announcement bar */}
                <ComponentBuilder schema={announcementBar} />

                {/* Application Navbar Here */}
                <ComponentBuilder schema={navbarSchema} />

                {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
                {/* Main application page render here */}
                {/* Main application page render here */}
                <MainPageRouter
                    ////////////////////////
                    layout={layout}
                    ////////////////////////
                    route={route}
                    ////////////////////////
                    tenant={tenant}
                    ////////////////////////
                    store={store}
                />
                {/* Main application page render here */}
                {/* Main application page render here */}
                {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}

                {/* Application Footer Here */}
                <ComponentBuilder schema={footerSchema} />

                {/* All global renders happens here */}
                <ComponentBuilder schema={globalsComponents} />
            </ThemeBuilder>
        </Application>
    </>
}


export default async function ApplicationIndexPage({ params, searchParams }: ApplicationIndexParams) {
    // as the next uses await to get whats inside the params
    // waiting for all the params
    const APPLICATION_PARAMS = await params
    const APPLICATION_CURRENT_SEARCH_PARAMS = await searchParams

    let response = await getTenantMetaData()

    if (response?.type === "FETCH_ERROR") {
        return <ServiceUnavailable />
    }

    if (response?.error) {
        return <NoSuchStore host={response?.host} type={response?.type} />
    }

    // extract the current page via above params, as this page is complete dynamic,
    // the pages are not hard coded, they ren|| pageLayout?.id === "not_found"der based on schemas
    // eg:- /about-us, /contact, /product/x
    const APPLICATION_CURRENT_PAGE: string = `/${(APPLICATION_PARAMS?.page || [])?.join("/")}`

    const { pageLayout, pageRoute } = await getApplicationPageRender({
        route: APPLICATION_CURRENT_PAGE,
        store: response.store,
        tenant: response.tenant,
    })

    if (pageRoute?.type === "not_found" || pageLayout?._id === "not_found") {
        return <NoSuchStore host={response.host} type="PAGE_NOT_SETUP" />
    }

    if (pageRoute?.type === "redirect") {
        return pageRoute?.code === 301 ? permanentRedirect(pageRoute?.to!) : redirect(pageRoute?.to!)
    }

    const tenantInfo = response ? {
        domain: response.domain,
        slug: response.slug,
        store: response.store,
        tenant: response.tenant
    } : null;

    // return the main content, break downed all the pages into x
    return <html lang='en'>
        <head>
            {/* <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" /> */}
        </head>
        <body className="bg">
            <EditorStoreProvider tenantInfo={tenantInfo}>
                <ApplicationBuildPage
                    tenant={response.tenant}
                    store={response.store}
                    layout={pageLayout as ApplicationLayout}
                    route={pageRoute as ApplicationRoutes}
                />
            </EditorStoreProvider>
        </body>
    </html>
}
