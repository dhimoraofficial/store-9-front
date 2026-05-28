import "@/app/globals.css";
import Application from '@/application/providers/wrappers/Application';
import ComponentBuilder from "@/application/runtime/builder/ComponentBuilder";
import ThemeBuilder from "@/application/runtime/builder/ThemeBuilder";
import { ApplicationLayout, ApplicationRoutes } from "@/application/runtime/pages/type";
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { getApplicationPageRender } from './engine';
import { announcementBar, footerSchema, globalsComponents, mainPageSchema, navbarSchema, tenantThemeConfig } from "./temp-data";
import { ApplicationIndexParams } from './types';

async function ApplicationBuildPage({ layout, route }: {
    layout: ApplicationLayout
    route: ApplicationRoutes
}) {
    // load all the globals metadata for rendering the pages
    // const [announcementBar, navbarSchema, footerSchema, globalsComponents, tenantThemeConfig] = await Promise.all([
    //     getAppGlobalComponent("announcement"),
    //     getAppGlobalComponent("navbar"),
    //     getAppGlobalComponent("footer"),
    //     getAppGlobalComponent("ALL_OTHERS"),
    //     getTenantThemeConfig()
    // ]);


    return <>
        <Application>
            <ThemeBuilder themeConfigs={tenantThemeConfig}>
                {/* display announcement bar */}
                <ComponentBuilder schema={announcementBar} />

                {/* Application Navbar Here */}
                <ComponentBuilder schema={navbarSchema} />

                {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
                {/* Main application page render here */}
                {/* Main application page render here */}
                <ComponentBuilder schema={mainPageSchema} />
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

    // extract the current page via above params, as this page is complete dynamic,
    // the pages are not hard coded, they ren|| pageLayout?.id === "not_found"der based on schemas
    // eg:- /about-us, /contact, /product/x
    const APPLICATION_CURRENT_PAGE: string = `/${(APPLICATION_PARAMS?.page || [])?.join("/")}`

    const { pageLayout, pageRoute } = await getApplicationPageRender({ route: APPLICATION_CURRENT_PAGE })

    if (pageRoute?.type === "not_found" || pageLayout?._id === "not_found") {
        return notFound()
    }

    if (pageRoute?.type === "redirect") {
        return pageRoute?.code === 301 ? permanentRedirect(pageRoute?.to!) : redirect(pageRoute?.to!)
    }

    // return the main content, break downed all the pages into x
    return <html lang='en'>
        <head>
            <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        </head>
        <body>
            <ApplicationBuildPage layout={pageLayout as ApplicationLayout} route={pageRoute as ApplicationRoutes} />
        </body>
    </html>
}
