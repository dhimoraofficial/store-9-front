import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder"
import { ComponentSchema } from "@/application/runtime/builder/type"
import { connectToDatabase, getLayoutCollection } from "@/application/runtime/db/mongo"
import { ApplicationLayout, ApplicationLayoutType, ApplicationRoutes } from "@/application/runtime/pages/type"
import { headers } from "next/headers"
import { APP_API } from "@/application/providers/api"
import { servingProduction } from ".."
import {
    defaultAnnouncementBar,
    defaultCartSchema,
    defaultCategorySchema,
    defaultCheckoutSchema,
    defaultFooterSchema,
    defaultHomepageSchema,
    defaultNavbarSchema,
    defaultProductSchema,
    defaultSearchSchema,
    defaultThemeConfig,
    defaultAboutSchema,
    defaultFaqSchema,
    defaultContactSchema
} from "./defaults"

function getDefaultRouteInfo(route: string): { type: string, layout: string } {
    if (route === "/") {
        return { type: "SP", layout: "homepage" };
    }
    if (route.startsWith("/product/") || route.startsWith("/products/")) {
        return { type: "DP", layout: "product" };
    }
    if (route.startsWith("/category/") || route.startsWith("/categories/")) {
        return { type: "DB", layout: "category" };
    }
    if (route.startsWith("/collection/") || route.startsWith("/collections/")) {
        return { type: "DB", layout: "collection" };
    }
    if (route === "/cart") {
        return { type: "SP", layout: "cart" };
    }
    if (route === "/checkout") {
        return { type: "SP", layout: "checkout" };
    }
    if (route === "/search") {
        return { type: "DB", layout: "search" };
    }
    if (route === "/faq" || route === "/faqs") {
        return { type: "SP", layout: "faq" };
    }
    if (route === "/contact" || route === "/contact-us") {
        return { type: "SP", layout: "contact" };
    }
    
    // Generic fallback for custom pages
    const slug = route.substring(1).replace(/[^a-zA-Z0-9_-]/g, "-");
    return { type: "SP", layout: slug };
}

function getDefaultLayoutSchema(layoutKey: string, route: string): ComponentSchema[] {
    if (layoutKey === "homepage" || route === "/") {
        return defaultHomepageSchema;
    }
    if (layoutKey === "product" || route.startsWith("/product/") || route.startsWith("/products/")) {
        return defaultProductSchema;
    }
    if (layoutKey === "category" || route.startsWith("/category/") || route.startsWith("/categories/")) {
        return defaultCategorySchema;
    }
    if (layoutKey === "collection" || route.startsWith("/collection/") || route.startsWith("/collections/")) {
        return defaultCategorySchema;
    }
    if (layoutKey === "cart" || route === "/cart") {
        return defaultCartSchema;
    }
    if (layoutKey === "checkout" || route === "/checkout") {
        return defaultCheckoutSchema;
    }
    if (layoutKey === "search" || route === "/search") {
        return defaultSearchSchema;
    }
    if (layoutKey === "about" || layoutKey === "about-us" || route === "/about" || route === "/about-us") {
        return defaultAboutSchema;
    }
    if (layoutKey === "faq" || layoutKey === "faqs" || route === "/faq" || route === "/faqs") {
        return defaultFaqSchema;
    }
    if (layoutKey === "contact" || layoutKey === "contact-us" || route === "/contact" || route === "/contact-us") {
        return defaultContactSchema;
    }
    return [];

}


export const DEFAULT_THEME: ThemeConfigs = {
    primary: 'rgb(26, 26, 26)',
    secondary: 'rgb(197, 168, 128)',
    accent: 'rgb(224, 122, 95)',

    colorSuccess: 'rgb(16, 185, 129)',
    colorError: 'rgb(239, 68, 68)',
    colorWarning: 'rgb(245, 158, 11)',
    colorInfo: 'rgb(59, 130, 246)',

    bgApp: 'rgb(250, 250, 250)',
    bgSurface: 'rgb(255, 255, 255)',
    bgNavigation: 'rgb(26, 26, 26)',
    textMain: 'rgb(45, 45, 45)',
    textMuted: 'rgb(122, 122, 122)',
    textInverted: 'rgb(255, 255, 255)',

    btnRadius: '4px',
    btnPaddingBase: '12px 24px',
    btnHoverOpacity: '0.9',

    spacingUnit: '4px',
    containerMaxWidth: '1200px',
    gridGutter: '32px',

    borderPrimary: 'rgb(235, 235, 235)',
    borderRadiusBase: '4px',
    borderRadiusLarge: '8px',
    shadowSoft: '0 2px 8px rgba(0, 0, 0, 0.05)',
    shadowHard: '0 8px 24px rgba(0, 0, 0, 0.08)',

    fontFamilySans: 'Outfit',
    fontFamilyMono: 'Outfit',
    fontSizeRoot: '16px',
    lineHeightBase: '1.6',
};

function matchRoutePattern(pattern: string, path: string): boolean {
    if (!pattern || !path) return false;
    // Escape regex characters except <...> wildcards
    const escaped = pattern.replace(/[.+*?^${}()|[\]\\]/g, "\\$&");
    const regexStr = "^" + escaped.replace(/<[^>]+>/g, "[^/]+") + "$";
    return new RegExp(regexStr).test(path);
}

export async function getApplicationPageRender({ route, tenant, store, isEditor = false }: {
    route: string
    tenant: string,
    store: string,
    isEditor?: boolean
}): Promise<{
    pageLayout: ApplicationLayout | null,
    pageRoute: ApplicationRoutes | null
}> {
    const collection = await getLayoutCollection();
    const { db } = await connectToDatabase();
    const routesCollection = db.collection("routes");

    // Retrieve all routes for this tenant/store to do pattern matching
    let routeDoc: any = await routesCollection.findOne({ tenantId: tenant, storeId: store, route: route })

    if (!routeDoc) {
        // Fetch all routes for this tenant/store and find a matching pattern
        const allRoutes = await routesCollection.find({ tenantId: tenant, storeId: store }).toArray();
        routeDoc = allRoutes.find(r => matchRoutePattern(r.route, route)) || null;
    }

    if (!routeDoc) {
        // Retrieve default route info matching the path template
        const defaultRouteInfo = getDefaultRouteInfo(route);
        
        if (isEditor) {
            // If route does not exist in DB, defaultly mock/generate representation for view (do not seed yet)
            routeDoc = {
                tenantId: tenant,
                storeId: store,
                route: route,
                type: defaultRouteInfo.type,
                layout: defaultRouteInfo.layout
            };
        } else {
            // Storefront fallback: for a brand new tenant, mock layout representations for default e-commerce routes
            const isValidDefaultRoute = 
                route === "/" || 
                route.startsWith("/product/") || 
                route.startsWith("/products/") || 
                route.startsWith("/category/") || 
                route.startsWith("/categories/") || 
                route.startsWith("/collection/") || 
                route.startsWith("/collections/") || 
                route === "/cart" || 
                route === "/checkout" || 
                route === "/search" ||
                route === "/about" ||
                route === "/about-us" ||
                route === "/faq" ||
                route === "/faqs" ||
                route === "/contact" ||
                route === "/contact-us";


            if (isValidDefaultRoute) {
                routeDoc = {
                    tenantId: tenant,
                    storeId: store,
                    route: route,
                    type: defaultRouteInfo.type,
                    layout: defaultRouteInfo.layout
                };
            } else {
                return {
                    pageLayout: null,
                    pageRoute: {
                        type: "not_found"
                    } as ApplicationRoutes
                };
            }
        }
    }

    // 2. Handle not_found type
    if (routeDoc.type === "not_found") {
        return {
            pageLayout: null,
            pageRoute: {
                type: "not_found"
            } as ApplicationRoutes
        };
    }

    // 1. Handle redirect type
    if (routeDoc.type === "redirect") {
        return {
            pageLayout: null,
            pageRoute: {
                type: "redirect",
                code: routeDoc.code,
                to: routeDoc.to,
                from: routeDoc.from
            } as ApplicationRoutes
        };
    }

    // 3. Handle page layout fetching
    const layoutKey = routeDoc.layout;
    let layoutDoc = null;

    if (typeof layoutKey === "string") {
        // Query the layouts collection using the layout ID as _id
        layoutDoc = await collection.findOne({
            tenantId: tenant,
            storeId: store,
            _id: `${store}_${layoutKey}`,
        } as any);

        if (!layoutDoc) {
            layoutDoc = await collection.findOne({
                tenantId: tenant,
                storeId: store,
                _id: layoutKey as any,
            });
        }
    }

    if (!layoutDoc) {
        // Mock default layout components from curated templates if not found in DB
        const targetId = typeof layoutKey === "string" ? layoutKey : getDefaultRouteInfo(route).layout;
        layoutDoc = {
            _id: targetId,
            for: "main",
            type: "custom",
            _c: getDefaultLayoutSchema(targetId, route)
        };
    }

    const { layout: _unused, ...routeWithoutLayout } = routeDoc;

    let cleanLayoutId = layoutDoc?._id ? String(layoutDoc._id) : "";
    const prefix = `${store}_`;
    if (cleanLayoutId.startsWith(prefix)) {
        cleanLayoutId = cleanLayoutId.substring(prefix.length);
    }

    return {
        pageLayout: {
            _id: cleanLayoutId,
            for: "main",
            type: (layoutDoc.type || "custom") as ApplicationLayoutType,
            _c: (layoutDoc._c || []) as ComponentSchema[]
        },
        pageRoute: routeWithoutLayout as any as ApplicationRoutes
    };
}

export async function getAppGlobalComponent(componentID: string, tenant: string, store: string): Promise<ComponentSchema | ComponentSchema[]> {
    const collection = await getLayoutCollection();

    if (componentID !== "ALL_OTHERS") {
        let doc = await collection.findOne({
            tenantId: tenant,
            storeId: store,
            _id: `${store}_${componentID}`
        } as any);

        if (!doc) {
            doc = await collection.findOne({
                tenantId: tenant,
                storeId: store,
                _id: componentID as any
            });
        }

        if (doc) {
            const schema = (doc._c || []) as ComponentSchema[];
            if (componentID === "footer" && schema.length === 1 && schema[0].type === "footer_ecommerce" && (!schema[0].children || schema[0].children.length === 0)) {
                schema[0].children = JSON.parse(JSON.stringify(defaultFooterSchema[0].children));
            }
            return schema;
        }

        // Newly registered tenant fallback: return default schemas if layouts do not exist in DB yet
        if (componentID === "navbar") {
            return defaultNavbarSchema;
        }
        if (componentID === "footer") {
            return defaultFooterSchema;
        }
        if (componentID === "announcement") {
            return defaultAnnouncementBar;
        }

        return [];
    }

    const docs = await collection.find({
        tenantId: tenant,
        storeId: store,
        type: "global",
        for: "main"
    }).toArray();

    if (docs && docs.length > 0) {
        return docs.flatMap(d => d._c || []) as ComponentSchema[];
    }

    return [] as ComponentSchema[];
}

export async function getTenantThemeConfig({ tenantID, storeID }: { tenantID: string, storeID: string }): Promise<ThemeConfigs> {
    const { db } = await connectToDatabase();

    // First try the configs collection (where the editor saves theme changes)
    let doc = await db.collection("configs").findOne({
        tenantId: tenantID,
        storeId: storeID
    });

    // Fall back to themes collection if not found in configs
    if (!doc) {
        doc = await db.collection("themes").findOne({
            tenantId: tenantID,
            storeId: storeID
        });
    }

    if (doc) {
        return doc.config as ThemeConfigs;
    }

    // Newly registered tenant fallback: return the curated default theme
    return defaultThemeConfig;
}

const testHere = process.env.LOCAL_STORE_DOMAIN || 'store9nepal.dhimora.com';

export async function getTenantMetaData() {
    if (!servingProduction) {
        return {
            type: "",
            error: "",
            host: "",
            store: process.env.LOCAL_STORE_ID || '06a192fd-02b9-7204-9679-63a7404e2e22',
            tenant: process.env.LOCAL_TENANT_ID || '06a192f0-3743-7aff-9094-dd9e55f17b58',
            slug: process.env.LOCAL_STORE_SLUG || "store9nepal",
            domain: process.env.LOCAL_STORE_DOMAIN || "store9nepal.dhimora.com",
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
        tenant = process.env.DEFAULT_TENANT_SLUG || "store9nepal"
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