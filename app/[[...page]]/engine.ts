import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder"
import { ComponentSchema } from "@/application/runtime/builder/type"
import { AppGlobalsComponents } from "@/application/runtime/globals"
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

function matchRoutePattern(pattern: string, path: string): boolean {
    if (!pattern || !path) return false;
    // Escape regex characters except <...> wildcards
    const escaped = pattern.replace(/[.+*?^${}()|[\]\\]/g, "\\$&");
    const regexStr = "^" + escaped.replace(/<[^>]+>/g, "[^/]+") + "$";
    return new RegExp(regexStr).test(path);
}

export async function getApplicationPageRender({ route }: {
    route: string
}): Promise<{
    pageLayout: ApplicationLayout | null,
    pageRoute: ApplicationRoutes | null
}> {
    const collection = await getLayoutCollection();
    const { db } = await connectToDatabase();
    const routesCollection = db.collection("routes");

    // Retrieve all routes for this tenant/store to do pattern matching
    const allRoutes = await routesCollection.find({ tenantId: APP.tenant, storeId: APP.store }).toArray();
    let routeDoc = allRoutes.find(r => r.route === route || (r.route && matchRoutePattern(r.route, route)));

    // 2. Handle not_found type
    if (!routeDoc || routeDoc.type === "not_found") {
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
        // Query the layouts collection using the layout ID
        layoutDoc = await collection.findOne({
            tenantId: APP.tenant,
            storeId: APP.store,
            id: layoutKey,
            for: "main"
        });
    }

    if (!layoutDoc && typeof layoutKey === "string") {
        return {
            pageLayout: null,
            pageRoute: {
                type: "not_found"
            } as ApplicationRoutes
        };
    }

    const { layout: _unused, ...routeWithoutLayout } = routeDoc;

    return {
        pageLayout: {
            id: typeof layoutKey === "string" ? layoutKey : routeDoc.route,
            for: "main",
            type: (layoutDoc?.type || "custom") as ApplicationLayoutType,
            _c: (layoutDoc ? layoutDoc._c : (Array.isArray(layoutKey) ? layoutKey : [])) as ComponentSchema[]
        },
        pageRoute: routeWithoutLayout as any as ApplicationRoutes
    };
}

export async function getAppGlobalComponent(componentID: string): Promise<ComponentSchema | ComponentSchema[]> {
    const collection = await getLayoutCollection();

    if (componentID !== "ALL_OTHERS") {
        const doc = await collection.findOne({
            tenantId: APP.tenant,
            storeId: APP.store,
            id: componentID
        });
        if (doc) {
            const schemaObj = Array.isArray(doc._c) ? doc._c[0] : doc._c;
            return schemaObj as ComponentSchema;
        }
        // Fallback to static defaults
        return AppGlobalsComponents[componentID] as any;
    }

    // Load all other global widgets (type: "global", for: "main")
    const docs = await collection.find({
        tenantId: APP.tenant,
        storeId: APP.store,
        type: "global",
        for: "main"
    }).toArray();

    if (docs && docs.length > 0) {
        return docs.flatMap(d => d._c || []) as ComponentSchema[];
    }

    // Default fallback
    return [AppGlobalsComponents.whatsAppButton] as ComponentSchema[];
}

export async function getTenantThemeConfig({ tenantID, storeID }: { tenantID?: string, storeID?: string } = {}): Promise<ThemeConfigs> {
    const { db } = await connectToDatabase();
    const collection = db.collection("themes");
    const doc = await collection.findOne({
        tenantId: tenantID || APP.tenant,
        storeId: storeID || APP.store
    });

    if (doc) {
        return doc.config as ThemeConfigs;
    }

    return DEFAULT_THEME;
}