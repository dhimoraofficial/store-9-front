import { NextRequest, NextResponse } from "next/server";
import { getLayoutCollection, connectToDatabase } from "@/application/runtime/db/mongo";
import { APP } from "@/app";
import { ApplicationLayoutFor, ApplicationLayoutType } from "@/application/runtime/pages/type";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const keyParam = searchParams.get("key");
        const routeParam = searchParams.get("route");

        const layoutsCollection = await getLayoutCollection();
        const { db } = await connectToDatabase();
        const routesCollection = db.collection("routes");
        const configsCollection = db.collection("configs");

        const tenantId = req.headers.get("x-tenant-id") || APP.tenant;
        const storeId = req.headers.get("x-store-id") || APP.store;

        // Scenario 1: Compatibility key parameter lookup
        if (keyParam) {
            if (keyParam === "theme") {
                const themeDoc = await configsCollection.findOne({ tenantId, storeId });
                return NextResponse.json({
                    success: true,
                    schema: themeDoc?.config
                });
            }

            const doc = await layoutsCollection.findOne({
                tenantId,
                storeId,
                _id: keyParam as any
            });

            if (!doc) {
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

            // Retrieve globals strictly from MongoDB matching tenantId and storeId
            const dbGlobals = await layoutsCollection.find({
                tenantId,
                storeId,
                $or: [
                    { type: "global" },
                    { for: { $in: ["navbar", "footer", "announcement"] } }
                ]
            }).toArray();

            const cleanGlobals = dbGlobals.map(dg => ({
                _id: dg._id,
                for: dg.for,
                type: dg.type,
                _c: dg._c || []
            }));

            // Fetch theme without seeding from configs collection
            const themeDoc = await configsCollection.findOne({ tenantId, storeId });
            const themeConfig = themeDoc?.config

            // Find route mapping
            let routeDoc: any = await routesCollection.findOne({ tenantId, storeId, route: editorRoute });
            if (!routeDoc) {
                routeDoc = await routesCollection.findOne({
                    tenantId,
                    storeId,
                    route: { $regex: new RegExp("^" + editorRoute + "(?:/|$)") }
                });
            }
            if (!routeDoc) {
                const cleanType = editorRoute.substring(1);
                routeDoc = await routesCollection.findOne({ tenantId, storeId, type: cleanType });
            }
            const exists = !!routeDoc;

            if (!routeDoc) {
                // Mock in-memory route layout representation instead of seeding in DB
                const defaultLayoutId = editorRoute === "/" ? "homepage" : editorRoute.substring(1).replace(/[^a-zA-Z0-9_-]/g, "-");
                routeDoc = {
                    tenantId,
                    storeId,
                    route: editorRoute,
                    type: "SP",
                    layout: defaultLayoutId
                };
            }

            // Retrieve or mock page layout without seeding in layoutsCollection
            let pageLayoutDoc: any = null;
            if (typeof routeDoc.layout === "string") {
                pageLayoutDoc = await layoutsCollection.findOne({
                    tenantId,
                    storeId,
                    _id: routeDoc.layout,
                    for: "main"
                });

                if (!pageLayoutDoc) {
                    pageLayoutDoc = {
                        _id: routeDoc.layout,
                        for: "main" as const,
                        type: "custom" as const,
                        _c: []
                    };
                }
            }

            const allRoutes = await routesCollection.find({ tenantId, storeId }).toArray();

            const cleanPageLayout = pageLayoutDoc ? {
                _id: pageLayoutDoc._id,
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
                    layout: typeof routeDoc.layout === "string" ? routeDoc.layout : undefined,
                    exists: exists
                },
                allRoutes: allRoutes.map(r => ({
                    route: r.route,
                    type: r.type,
                    layout: typeof r.layout === "string" ? r.layout : undefined
                })),
                theme: {
                    config: themeConfig
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

        if (!key) {
            return NextResponse.json({ error: "Missing key in payload" }, { status: 400 });
        }

        const tenantId = req.headers.get("x-tenant-id") || APP.tenant;
        const storeId = req.headers.get("x-store-id") || APP.store;

        const { db } = await connectToDatabase();

        // 1. Create a page/route
        if (key === "route") {
            const { route, type, layout } = body;
            if (!route || !type) {
                return NextResponse.json({ error: "Missing route or type in payload" }, { status: 400 });
            }
            const routesCollection = db.collection("routes");
            const existing = await routesCollection.findOne({ tenantId, storeId, route });
            if (existing) {
                return NextResponse.json({ error: "Route already exists" }, { status: 400 });
            }

            const slugId = route === "/" ? "homepage" : route.substring(1).replace(/[^a-zA-Z0-9_-]/g, "-");

            const newRouteDoc = {
                tenantId,
                storeId,
                route,
                type,
                layout: slugId
            };
            await routesCollection.insertOne(newRouteDoc);

            // Automatically create corresponding layout document in layouts collection
            const layoutsCollection = db.collection("layouts");
            await layoutsCollection.updateOne(
                { tenantId, storeId, _id: slugId },
                {
                    $setOnInsert: {
                        _id: slugId,
                        for: "main",
                        type: "custom",
                        _c: Array.isArray(layout) ? layout : [],
                        tenantId,
                        storeId
                    }
                },
                { upsert: true }
            );

            return NextResponse.json({ success: true, route: newRouteDoc });
        }

        // 2. Theme saves to configs collection
        if (key === "theme") {
            if (schema === undefined) {
                return NextResponse.json({ error: "Missing schema for theme" }, { status: 400 });
            }
            const configsCollection = db.collection("configs");
            await configsCollection.updateOne(
                { tenantId, storeId },
                { $set: { tenantId, storeId, config: schema } },
                { upsert: true }
            );
            return NextResponse.json({ success: true });
        }

        if (schema === undefined) {
            return NextResponse.json({ error: "Missing schema in payload" }, { status: 400 });
        }

        // 3. Layouts save to layouts collection with strict fields matching ApplicationLayout + tenant/store IDs
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
            _id: key,
            for: forVal,
            type: typeVal,
            _c: Array.isArray(schema) ? schema : [schema],
            tenantId,
            storeId
        };

        await layoutsCollection.updateOne(
            { tenantId, storeId, _id: key },
            { $set: cleanLayoutDoc },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("POST /api/schema error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
