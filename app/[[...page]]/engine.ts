import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder"
import { ComponentSchema } from "@/application/runtime/builder/type"
import { ApplicationLayout, ApplicationRoutes, ApplicationLayoutType } from "@/application/runtime/pages/type"
import { getLayoutCollection, connectToDatabase } from "@/application/runtime/db/mongo"
import { APP } from "@/app"

const DEFAULT_THEME: ThemeConfigs = {
    // 1. Core Brand Identity
    primary: '#0F172A',      // Deep Navy
    secondary: '#3B82F6',    // Bright Blue
    accent: '#8B5CF6',       // Violet

    // 2. Semantic Colors
    colorSuccess: '#10B981',      // Emerald Green
    colorError: '#EF4444',        // High-Visibility Red
    colorWarning: '#F59E0B',      // Amber
    colorInfo: '#3B82F6',         // Information Blue

    // 3. Neutral Palette & Surfaces
    bgApp: '#F8FAFC',             // Light Grey/Blue
    bgSurface: '#FFFFFF',         // Pure White
    bgNavigation: '#0F172A',      // Dark Nav
    textMain: '#1E293B',          // Slate 800
    textMuted: '#64748B',         // Slate 500
    textInverted: '#FFFFFF',      // White text

    // 4. Buttons & Interactive Elements
    btnRadius: '6px',             // Rounded
    btnPaddingBase: '10px 20px',
    btnHoverOpacity: '0.9',

    // 5. Layout & Spatial Scale
    spacingUnit: '4px',           // 4px base
    containerMaxWidth: '1280px',
    gridGutter: '24px',

    // 6. Borders & Elevation
    borderPrimary: '#E2E8F0',     // Slate border
    borderRadiusBase: '8px',
    borderRadiusLarge: '12px',
    shadowSoft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    shadowHard: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

    // 7. Typography
    fontFamilySans: 'Roboto',
    fontFamilyMono: 'Roboto',
    fontSizeRoot: '16px',
    lineHeightBase: '1.5',
};

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
    let routeDoc = await routesCollection.findOne({ tenantId: tenant, storeId: store, route: route })

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