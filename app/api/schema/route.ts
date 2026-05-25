import { NextRequest, NextResponse } from "next/server";
import { getLayoutCollection, connectToDatabase } from "@/application/runtime/db/mongo";
import { APP } from "@/app";
import { ApplicationLayoutFor, ApplicationLayoutType } from "@/application/runtime/pages/type";
import { AppGlobalsComponents } from "@/application/runtime/globals";

const DEFAULT_THEME = {
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
    fontSizeBase: '14px',
    fontFamilyBase: 'Inter, system-ui, sans-serif',
    lineHeightBase: '1.5',
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const keyParam = searchParams.get("key");
        const routeParam = searchParams.get("route");

        const layoutsCollection = await getLayoutCollection();
        const { db } = await connectToDatabase();
        const routesCollection = db.collection("routes");
        const themesCollection = db.collection("themes");

        const tenantId = APP.tenant;
        const storeId = APP.store;

        // Scenario 1: Compatibility key parameter lookup
        if (keyParam) {
            if (keyParam === "theme") {
                const themeDoc = await themesCollection.findOne({ tenantId, storeId });
                return NextResponse.json({
                    success: true,
                    schema: themeDoc ? themeDoc.config : DEFAULT_THEME
                });
            }

            const doc = await layoutsCollection.findOne({
                tenantId,
                storeId,
                id: keyParam
            });

            if (!doc) {
                // Fallback to global defaults if any
                const defaultSchema = (AppGlobalsComponents as any)[keyParam];
                if (defaultSchema) {
                    return NextResponse.json({
                        success: true,
                        schema: defaultSchema,
                        type: "global"
                    });
                }
                return NextResponse.json({ error: `Layout not found: ${keyParam}` }, { status: 404 });
            }

            return NextResponse.json({
                success: true,
                schema: doc._c,
                type: doc.type
            });
        }

        // Scenario 2: Dynamic catch-all workspace retrieval for a path
        if (routeParam) {
            const editorRoute = routeParam;

            // Seed essential global layouts if not present
            const defaultGlobals = [
                { id: "navbar", for: "navbar" as const, type: "global" as const, defaultSchema: AppGlobalsComponents.navbar },
                { id: "footer", for: "footer" as const, type: "global" as const, defaultSchema: AppGlobalsComponents.footer },
                { id: "announcement", for: "announcement" as const, type: "global" as const, defaultSchema: AppGlobalsComponents.announcement },
                { id: "whatsAppButton", for: "main" as const, type: "global" as const, defaultSchema: AppGlobalsComponents.whatsAppButton }
            ];

            for (const g of defaultGlobals) {
                const doc = await layoutsCollection.findOne({ tenantId, storeId, id: g.id });
                if (!doc) {
                    const schemaArray = Array.isArray(g.defaultSchema) ? g.defaultSchema : [g.defaultSchema];
                    await layoutsCollection.insertOne({
                        tenantId,
                        storeId,
                        id: g.id,
                        for: g.for,
                        type: g.type,
                        _c: schemaArray
                    });
                }
            }

            // Seed theme config if not present
            let themeDoc: any = await themesCollection.findOne({ tenantId, storeId });
            if (!themeDoc) {
                const newTheme = { tenantId, storeId, config: DEFAULT_THEME };
                await themesCollection.insertOne(newTheme);
                themeDoc = newTheme;
            }

            // Find route mapping
            let routeDoc: any = await routesCollection.findOne({ tenantId, storeId, route: editorRoute });
            if (!routeDoc) {
                // Wildcard regex matching pattern search
                routeDoc = await routesCollection.findOne({
                    tenantId,
                    storeId,
                    route: { $regex: new RegExp("^" + editorRoute + "(?:/|$)") }
                });
            }
            if (!routeDoc) {
                // Type name match
                const cleanType = editorRoute.substring(1);
                routeDoc = await routesCollection.findOne({ tenantId, storeId, type: cleanType });
            }
            if (!routeDoc) {
                // Auto-create/seed path configuration
                const defaultLayoutId = editorRoute === "/" ? "homepage" : editorRoute.substring(1).replace(/[^a-zA-Z0-9]/g, "-");
                const newRoute = {
                    tenantId,
                    storeId,
                    route: editorRoute,
                    type: "SP",
                    layout: defaultLayoutId
                };
                await routesCollection.insertOne(newRoute);
                routeDoc = newRoute;
            }

            // Retrieve or seed corresponding page layout
            let pageLayoutDoc: any = null;
            if (typeof routeDoc.layout === "string") {
                pageLayoutDoc = await layoutsCollection.findOne({
                    tenantId,
                    storeId,
                    id: routeDoc.layout,
                    for: "main"
                });

                if (!pageLayoutDoc) {
                    pageLayoutDoc = {
                        tenantId,
                        storeId,
                        id: routeDoc.layout,
                        for: "main" as const,
                        type: "custom" as const,
                        _c: []
                    };
                    await layoutsCollection.insertOne(pageLayoutDoc);
                }
            } else if (Array.isArray(routeDoc.layout)) {
                pageLayoutDoc = {
                    tenantId,
                    storeId,
                    id: routeDoc.route,
                    for: "main" as const,
                    type: "custom" as const,
                    _c: routeDoc.layout
                };
            }

            // Load global layouts
            const globals = await layoutsCollection.find({
                tenantId,
                storeId,
                $or: [
                    { type: "global" },
                    { for: { $in: ["navbar", "footer", "announcement"] } }
                ]
            }).toArray();

            // Strictly filter response schemas to match ApplicationLayout fields + standard IDs
            const cleanGlobals = globals.map(g => ({
                id: g.id,
                for: g.for,
                type: g.type,
                _c: g._c || []
            }));

            const cleanPageLayout = pageLayoutDoc ? {
                id: pageLayoutDoc.id,
                for: pageLayoutDoc.for,
                type: pageLayoutDoc.type,
                _c: pageLayoutDoc._c || []
            } : null;

            return NextResponse.json({
                success: true,
                globals: cleanGlobals,
                pageLayout: cleanPageLayout,
                pageRoute: {
                    route: routeDoc.route,
                    type: routeDoc.type,
                    layout: typeof routeDoc.layout === "string" ? routeDoc.layout : undefined
                },
                theme: {
                    config: themeDoc.config
                }
            });
        }

        return NextResponse.json({ error: "Missing parameter: key or route required" }, { status: 400 });
    } catch (err: any) {
        console.error("GET /api/schema error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { key, schema } = body;

        if (!key || schema === undefined) {
            return NextResponse.json({ error: "Missing key or schema in payload" }, { status: 400 });
        }

        const tenantId = APP.tenant;
        const storeId = APP.store;

        const { db } = await connectToDatabase();

        // Theme saves to themes collection
        if (key === "theme") {
            const themesCollection = db.collection("themes");
            await themesCollection.updateOne(
                { tenantId, storeId },
                { $set: { tenantId, storeId, config: schema } },
                { upsert: true }
            );
            return NextResponse.json({ success: true });
        }

        // Layouts save to layouts collection with strict fields matching ApplicationLayout + tenant/store IDs
        const layoutsCollection = await getLayoutCollection();

        let forVal: ApplicationLayoutFor = "main";
        if (key === "navbar") forVal = "navbar";
        else if (key === "footer") forVal = "footer";
        else if (key === "announcement") forVal = "announcement";

        let typeVal: ApplicationLayoutType = "custom";
        if (["navbar", "footer", "announcement", "whatsAppButton"].includes(key)) {
            typeVal = "global";
        }

        const cleanLayoutDoc = {
            id: key,
            for: forVal,
            type: typeVal,
            _c: Array.isArray(schema) ? schema : [schema],
            tenantId,
            storeId
        };

        await layoutsCollection.updateOne(
            { tenantId, storeId, id: key },
            { $set: cleanLayoutDoc },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("POST /api/schema error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
