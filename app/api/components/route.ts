import { NextRequest, NextResponse } from "next/server";
import { ComponentAllSchemaSettingsMap } from "@/application/runtime/dynamic-components";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");

        if (type) {
            const comp = ComponentAllSchemaSettingsMap[type];
            
            if (!comp) {
                return NextResponse.json({ success: false, error: `Component ${type} not found` }, { status: 404 });
            }

            const cleanedComp = { ...comp };
            delete (cleanedComp as any).component;
            delete (cleanedComp as any).parse;

            return NextResponse.json({
                success: true,
                component: {
                    [type]: cleanedComp
                }
            });
        }

        const lightweightComponents: Record<string, any> = {};
        for (const [key, val] of Object.entries(ComponentAllSchemaSettingsMap)) {
            if (key === "common") {
                lightweightComponents[key] = val;
                continue;
            }
            
            const entry = val as any;
            lightweightComponents[key] = {
                name: entry.name,
                icon: entry.icon,
                category: entry.category,
                desc: entry.desc,
                acceptsChildren: entry.acceptsChildren,
                allowedChildren: entry.allowedChildren,
                slotsConfig: entry.slotsConfig,
                defaultChildren: entry.defaultChildren
            };
        }

        return NextResponse.json({
            success: true,
            components: lightweightComponents
        });
    } catch (err: any) {
        console.error("GET /api/components error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
