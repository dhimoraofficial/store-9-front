import "@/app/globals.css";
import Application from '@/application/providers/wrappers/Application';
import ComponentBuilder from "@/application/runtime/builder/ComponentBuilder";
import ThemeBuilder from "@/application/runtime/builder/ThemeBuilder";
import { ApplicationLayout, ApplicationRoutes } from "@/application/runtime/pages/type";
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { DEFAULT_THEME, getAppGlobalComponent, getApplicationPageRender, getTenantThemeConfig } from './engine';
import { ApplicationIndexParams } from './types';
import { headers } from "next/headers";
import { servingProduction } from "..";
import { APP_API } from "@/application/providers/api";
import { NoSuchStore, ServiceUnavailable } from "../Errors";
import Script from "next/script";

const testHere = 'store9nepal.dhimora.com';

export async function getTenantMetaData() {
    const headerMeta = await headers()
    const host = ((((!servingProduction && testHere) || (headerMeta?.get("host") || headerMeta.get("x-forwarded-host")))?.replace(/^www\./, "")) || "").toLowerCase()

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
                <ComponentBuilder schema={layout?._c} />
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

    // return the main content, break downed all the pages into x
    return <html lang='en'>
        <head>
            <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
        </head>
        <body className="bg">
            <ApplicationBuildPage
                tenant={response.tenant}
                store={response.store}
                layout={pageLayout as ApplicationLayout}
                route={pageRoute as ApplicationRoutes}
            />
        </body>
    </html>
}
