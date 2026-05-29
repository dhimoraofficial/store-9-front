import "@/app/globals.css";
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { NoSuchStore, ServiceUnavailable } from "../Errors";
import { getApplicationPageRender } from "../[[...page]]/engine";
import { ApplicationIndexParams } from "../[[...page]]/types";
import { getTenantMetaData } from "../[[...page]]/page";
import { EditorStoreProvider } from "@/application/runtime/store/Provider";
import Script from "next/script";

export default async function ApplicationIndexPage({ params, searchParams, children }: ApplicationIndexParams) {
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
        isEditor: true,
    })

    if (pageRoute?.type === "not_found" || pageLayout?._id === "not_found") {
        return notFound()
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
            <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
        </head>
        <body>
            <EditorStoreProvider tenantInfo={tenantInfo}>
                {children}
            </EditorStoreProvider>
        </body>
    </html>
}
