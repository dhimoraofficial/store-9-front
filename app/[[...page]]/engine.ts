import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder"
import { ComponentSchema } from "@/application/runtime/builder/type"
import { ApplicationLayout, ApplicationRoutes, ApplicationLayoutType } from "@/application/runtime/pages/type"
import { getLayoutCollection, connectToDatabase } from "@/application/runtime/db/mongo"
import { APP } from "@/app"

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
        if (isEditor) {
            // If route does not exist in DB, defaultly mock/generate representation for view (do not seed yet)
            const defaultLayoutId = route === "/" ? "homepage" : route.substring(1).replace(/[^a-zA-Z0-9_-]/g, "-");
            routeDoc = {
                tenantId: tenant,
                storeId: store,
                route: route,
                type: "SP",
                layout: defaultLayoutId
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
            _id: layoutKey as any,
        });
    }

    if (!layoutDoc) {
        // Mock an empty custom layout if not found in DB
        layoutDoc = {
            _id: typeof layoutKey === "string" ? layoutKey : (route === "/" ? "homepage" : route.substring(1).replace(/[^a-zA-Z0-9_-]/g, "-")),
            for: "main",
            type: "custom",
            _c: []
        };
    }

    const { layout: _unused, ...routeWithoutLayout } = routeDoc;

    return {
        pageLayout: {
            _id: String(layoutDoc._id),
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
        const doc = await collection.findOne({
            tenantId: tenant,
            storeId: store,
            _id: componentID as any
        });

        if (doc) {
            return (doc._c || []) as ComponentSchema[];
        }

        return []
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

    return DEFAULT_THEME;
}