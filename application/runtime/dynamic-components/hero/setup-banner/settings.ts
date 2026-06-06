import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentHeroSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    theme: {
        as: "theme",
        tp: "prop",
        group: "theme",
        name: "Theme Color Mode",
        opt: ["pri", "sec", "bg"]
    },
    height: {
        as: "height",
        tp: "prop",
        group: "layout",
        name: "Hero Section Height",
        rgx: "^\\d*(px|rem|%)?$"
    },
    layoutStructure: {
        as: "layoutStructure",
        tp: "prop",
        group: "layout",
        name: "Layout Geometry Model",
        opt: ["split", "stack", "full-bleed"]
    },
    mobileShow: {
        as: "mobileShow",
        tp: "prop",
        group: "layout",
        name: "Show on Mobile Screens",
        opt: ["true", "false"]
    },
    // Left Grid Slot
    leftWidth: {
        as: "leftWidth",
        tp: "prop",
        group: "left_slot",
        name: "Left Column Span Share (0-12)",
        opt: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    },
    leftAlign: {
        as: "leftAlign",
        tp: "prop",
        group: "left_slot",
        name: "Left Slot Content Alignment",
        opt: ["start", "center", "end", "between"]
    },
    // Right Grid Slot
    rightWidth: {
        as: "rightWidth",
        tp: "prop",
        group: "right_slot",
        name: "Right Column Span Share (0-12)",
        opt: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    },
    rightAlign: {
        as: "rightAlign",
        tp: "prop",
        group: "right_slot",
        name: "Right Slot Content Alignment",
        opt: ["start", "center", "end", "between"]
    }
};

export function parseHeroComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    const schemaKeys = Object.keys(ComponentHeroSchemaSettingsMap);

    schemaKeys.forEach((key) => {
        parsed[key] = settings?.[key] ?? undefined;
    });

    // Default configuration parsing
    parsed.theme = parsed.theme || "pri";
    parsed.height = parsed.height || "auto";
    parsed.layoutStructure = parsed.layoutStructure || "split";
    parsed.mobileShow = parsed.mobileShow ?? "true";

    parsed.leftWidth = parsed.leftWidth || "6";
    parsed.leftAlign = parsed.leftAlign || "start";
    parsed.rightWidth = parsed.rightWidth || "6";
    parsed.rightAlign = parsed.rightAlign || "start";

    return parsed;
}
