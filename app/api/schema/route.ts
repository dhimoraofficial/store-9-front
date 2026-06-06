import { connectToDatabase, getLayoutCollection } from "@/application/runtime/db/mongo";
import { ApplicationLayoutFor, ApplicationLayoutType } from "@/application/runtime/pages/type";
import { NextRequest, NextResponse } from "next/server";
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
    defaultThemeConfig
} from "../../[[...page]]/defaults";

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

function getDefaultLayoutSchema(layoutKey: string, route: string): any[] {
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

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const keyParam = searchParams.get("key");
        const routeParam = searchParams.get("route");

        const layoutsCollection = await getLayoutCollection();
        const { db } = await connectToDatabase();
        const routesCollection = db.collection("routes");
        const configsCollection = db.collection("configs");

        const tenantId = req.headers.get("x-tenant-id");
        const storeId = req.headers.get("x-store-id");

        // Scenario 1: Compatibility key parameter lookup
        if (keyParam) {
            if (keyParam === "theme") {
                const themeDoc = await configsCollection.findOne({ tenantId, storeId });
                return NextResponse.json({
                    success: true,
                    schema: themeDoc?.config || defaultThemeConfig
                });
            }

            let doc = await layoutsCollection.findOne({
                tenantId,
                storeId,
                _id: `${storeId}_${keyParam}`
            } as any);

            if (!doc) {
                doc = await layoutsCollection.findOne({
                    tenantId,
                    storeId,
                    _id: keyParam as any
                });
            }

            if (!doc) {
                // If it is a global element and does not exist in DB yet, return the default template
                if (keyParam === "navbar") {
                    return NextResponse.json({
                        success: true,
                        schema: defaultNavbarSchema,
                        type: "global"
                    });
                }
                if (keyParam === "footer") {
                    return NextResponse.json({
                        success: true,
                        schema: defaultFooterSchema,
                        type: "global"
                    });
                }
                if (keyParam === "announcement") {
                    return NextResponse.json({
                        success: true,
                        schema: defaultAnnouncementBar,
                        type: "global"
                    });
                }
                if (keyParam === "homepage") {
                    return NextResponse.json({
                        success: true,
                        schema: defaultHomepageSchema,
                        type: "custom"
                    });
                }
                return NextResponse.json({ error: `Layout not found: ${keyParam}` }, { status: 404 });
            }

            const schema = doc._c || [];
            if (keyParam === "footer" && schema.length === 1 && schema[0].type === "footer_ecommerce" && (!schema[0].children || schema[0].children.length === 0)) {
                schema[0].children = JSON.parse(JSON.stringify(defaultFooterSchema[0].children));
            }

            return NextResponse.json({
                success: true,
                schema: schema,
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

            const cleanGlobals: any[] = dbGlobals.map(dg => {
                let cleanId: string = dg._id as unknown as string;
                const prefix = `${storeId}_`;
                if (typeof cleanId === "string" && (cleanId as string).startsWith(prefix)) {
                    cleanId = (cleanId as string)?.substring(prefix.length);
                }
                const schema = dg._c || [];
                if (cleanId === "footer" && schema.length === 1 && schema[0].type === "footer_ecommerce" && (!schema[0].children || schema[0].children.length === 0)) {
                    schema[0].children = JSON.parse(JSON.stringify(defaultFooterSchema[0].children));
                }
                return {
                    _id: cleanId,
                    for: dg.for,
                    type: dg.type,
                    _c: schema
                };
            });

            // Check which global components were found in DB and insert defaults for missing ones
            const foundFors = new Set(cleanGlobals.map(g => g.for));
            if (!foundFors.has("announcement")) {
                cleanGlobals.push({
                    _id: "announcement",
                    for: "announcement",
                    type: "global",
                    _c: defaultAnnouncementBar
                });
            }
            if (!foundFors.has("navbar")) {
                cleanGlobals.push({
                    _id: "navbar",
                    for: "navbar",
                    type: "global",
                    _c: defaultNavbarSchema
                });
            }
            if (!foundFors.has("footer")) {
                cleanGlobals.push({
                    _id: "footer",
                    for: "footer",
                    type: "global",
                    _c: defaultFooterSchema
                });
            }

            // Ensure whatsAppButton has a dummy document in workspace if missing
            const foundIds = new Set(cleanGlobals.map(g => g._id));
            if (!foundIds.has("whatsAppButton")) {
                cleanGlobals.push({
                    _id: "whatsAppButton",
                    for: "main",
                    type: "global",
                    _c: []
                });
            }

            // Fetch theme without seeding from configs collection
            const themeDoc = await configsCollection.findOne({ tenantId, storeId });
            const themeConfig = themeDoc?.config || defaultThemeConfig;

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
                // Mock in-memory route layout representation matching path template
                const defaultRouteInfo = getDefaultRouteInfo(editorRoute);
                routeDoc = {
                    tenantId,
                    storeId,
                    route: editorRoute,
                    type: defaultRouteInfo.type,
                    layout: defaultRouteInfo.layout
                };
            }

            // Retrieve or mock page layout without seeding in layoutsCollection
            let pageLayoutDoc: any = null;
            if (typeof routeDoc.layout === "string") {
                pageLayoutDoc = await layoutsCollection.findOne({
                    tenantId,
                    storeId,
                    _id: `${storeId}_${routeDoc.layout}`,
                    for: "main"
                } as any);

                if (!pageLayoutDoc) {
                    pageLayoutDoc = await layoutsCollection.findOne({
                        tenantId,
                        storeId,
                        _id: routeDoc.layout,
                        for: "main"
                    });
                }

                if (!pageLayoutDoc) {
                    pageLayoutDoc = {
                        _id: routeDoc.layout,
                        for: "main" as const,
                        type: "custom" as const,
                        _c: getDefaultLayoutSchema(routeDoc.layout, editorRoute)
                    };
                }
            }

            const allRoutes = await routesCollection.find({ tenantId, storeId }).toArray();

            let cleanPageLayoutId = pageLayoutDoc?._id;
            if (cleanPageLayoutId) {
                const prefix = `${storeId}_`;
                if (typeof cleanPageLayoutId === "string" && cleanPageLayoutId.startsWith(prefix)) {
                    cleanPageLayoutId = cleanPageLayoutId.substring(prefix.length);
                }
            }
            const cleanPageLayout = pageLayoutDoc ? {
                _id: cleanPageLayoutId,
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

        const tenantId = req.headers.get("x-tenant-id");
        const storeId = req.headers.get("x-store-id");

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
            const compositeLayoutId = `${storeId}_${slugId}`;
            await layoutsCollection.updateOne(
                { tenantId, storeId, _id: compositeLayoutId } as any,
                {
                    $setOnInsert: {
                        _id: compositeLayoutId,
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

        const compositeKey = `${storeId}_${key}`;
        const cleanLayoutDoc = {
            _id: compositeKey,
            for: forVal,
            type: typeVal,
            _c: Array.isArray(schema) ? schema : [schema],
            tenantId,
            storeId
        };

        await layoutsCollection.updateOne(
            { tenantId, storeId, _id: compositeKey } as any,
            { $set: cleanLayoutDoc },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("POST /api/schema error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
