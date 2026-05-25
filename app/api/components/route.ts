import { NextResponse } from "next/server";
import { ComponentAllSchemaSettingsMap } from "@/application/runtime/dynamic-components/main";

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            components: ComponentAllSchemaSettingsMap
        });
    } catch (err: any) {
        console.error("GET /api/components error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
