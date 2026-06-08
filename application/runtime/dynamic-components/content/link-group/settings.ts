import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentLinkGroupBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    title: {
        as: "title",
        tp: "prop",
        name: "Group Title (e.g. Navigation Links)",
        rgx: ".*"
    },
    direction: {
        as: "direction",
        tp: "prop",
        name: "Layout Direction",
        description: "Choose if links are arranged vertically (column) or horizontally (row).",
        opt: ["column", "row"]
    }
};

export function parseLinkGroupComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.title = settings?.title ?? "";
    parsed.direction = settings?.direction ?? "column";
    return parsed;
}
