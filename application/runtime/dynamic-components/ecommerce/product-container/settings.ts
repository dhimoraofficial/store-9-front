import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export type ApplicationContainerEntityTypes = "category"
export const ApplicationContainerEntity = ""

export const ComponentContainerSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    containerName: {
        as: "containerName",
        tp: "prop",
        rgx: ".*"
    },
    shortSubtitle: {
        as: "shortSubtitle",
        tp: "prop",
        rgx: ".*"
    },
    fetchData: {
        as: "fetchData",
        tp: "prop",
        opt: ["featured"],
        rgx: "^(category:.*)|(featured)$"
    },
    viewAllHref: {
        as: "viewAllHref",
        tp: "prop",
        rgx: ".*"
    },
    autoScroll: {
        as: "autoScroll",
        tp: "prop",
        opt: ["true", "false"]
    },
    layoutType: {
        as: "layoutType",
        tp: "prop",
        opt: ["grid", "horizontal"]
    },
    size: {
        as: "size",
        tp: "prop",
        opt: ["1", "2", "3", "4"]
    },
    headerAlignment: {
        as: "headerAlignment",
        tp: "prop",
        opt: ["start", "center", "between"]
    },
};

export function parseContainerComponentSettings(settings: any) {
    const parsed = { ...settings };

    if (parsed.autoScroll !== undefined) {
        parsed.autoScroll = parsed.autoScroll === "true" || parsed.autoScroll === true;
    } else {
        parsed.autoScroll = false;
    }

    // Explicit Fallbacks matching option sets
    if (parsed.layoutType && !["grid", "horizontal"].includes(parsed.layoutType)) {
        parsed.layoutType = "grid";
    }

    if (parsed.size && !["1", "2", "3", "4"].includes(String(parsed.size))) {
        parsed.size = "4";
    }

    if (parsed.headerAlignment && !["start", "center", "between"].includes(parsed.headerAlignment)) {
        parsed.headerAlignment = "between";
    }

    return parsed;
}