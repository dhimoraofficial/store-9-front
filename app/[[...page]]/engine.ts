import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder"
import { ComponentSchema } from "@/application/runtime/builder/type"
import { ApplicationLayout, ApplicationRoutes, ApplicationLayoutType } from "@/application/runtime/pages/type"
import { getLayoutCollection, connectToDatabase } from "@/application/runtime/db/mongo"
import { APP } from "@/app"
import {
    defaultThemeConfig,
    defaultAnnouncementBar,
    defaultNavbarSchema,
    defaultFooterSchema,
    defaultHomepageSchema,
    defaultProductSchema,
    defaultCategorySchema,
    defaultCartSchema,
    defaultCheckoutSchema,
    defaultSearchSchema
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
    return [];
}


export const DEFAULT_THEME: ThemeConfigs = {
    primary: '#0F172A',
    secondary: '#3B82F6',
    accent: '#8B5CF6',

    colorSuccess: '#10B981',
    colorError: '#EF4444',
    colorWarning: '#F59E0B',
    colorInfo: '#3B82F6',

    bgApp: '#F8FAFC',
    bgSurface: '#FFFFFF',
    bgNavigation: '#0F172A',
    textMain: '#1E293B',
    textMuted: '#64748B',
    textInverted: '#FFFFFF',

    btnRadius: '6px',
    btnPaddingBase: '10px 20px',
    btnHoverOpacity: '0.9',

    spacingUnit: '4px',
    containerMaxWidth: '1280px',
    gridGutter: '24px',

    borderPrimary: '#E2E8F0',
    borderRadiusBase: '8px',
    borderRadiusLarge: '12px',
    shadowSoft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    shadowHard: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

    fontFamilySans: 'Roboto',
    fontFamilyMono: 'Roboto',
    fontSizeRoot: '16px',
    lineHeightBase: '1.5',
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
                route === "/search";

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
            return (doc._c || []) as ComponentSchema[];
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