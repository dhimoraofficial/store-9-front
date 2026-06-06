import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentAnnouncementBarSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    layout: {
        as: "layout",
        tp: "prop",
        group: "layout",
        name: "Layout Style",
        opt: ["1-column", "3-column"]
    },
    theme: {
        as: "theme",
        tp: "prop",
        group: "theme",
        name: "Theme Color Mode",
        opt: ["pri", "sec", "bg"]
    },
    fontSize: {
        as: "fontSize",
        tp: "prop",
        group: "typography",
        name: "Text Font Size",
        opt: ["xs", "sm", "base"]
    },
    fontWeight: {
        as: "fontWeight",
        tp: "prop",
        group: "typography",
        name: "Text Font Weight",
        opt: ["normal", "medium", "semibold", "bold"]
    },
    height: {
        as: "height",
        tp: "prop",
        group: "layout",
        name: "Bar Height",
        rgx: "^\\d*(px|rem|%)?$"
    },
    mobileShow: {
        as: "mobileShow",
        tp: "prop",
        group: "layout",
        name: "Show on Mobile Screens",
        opt: ["true", "false"]
    }
};

export function parseAnnouncementBarComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    const schemaKeys = Object.keys(ComponentAnnouncementBarSchemaSettingsMap);

    schemaKeys.forEach((key) => {
        parsed[key] = settings?.[key] ?? undefined;
    });

    // Handle defaults
    parsed.layout = parsed.layout || "3-column";
    parsed.theme = parsed.theme || "pri";
    parsed.fontSize = parsed.fontSize || "xs";
    parsed.fontWeight = parsed.fontWeight || "normal";
    parsed.height = parsed.height || "36px";
    parsed.mobileShow = parsed.mobileShow ?? "true";

    return parsed;
}
