import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentSearchBarBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    placeholder: {
        as: "placeholder",
        tp: "prop",
        name: "Search Input Hint Text",
        description: "Specify the placeholder hint text in the search input field.",
        rgx: ".*"
    },
    maxWidth: {
        as: "maxWidth",
        tp: "prop",
        name: "Search Bar Max Width",
        description: "Limits the maximum width of the search input field on desktop layouts.",
        opt: ["small", "medium", "large", "full"]
    }
};

export function parseSearchBarBlockComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };
    if (!parsed.placeholder) parsed.placeholder = "Search products...";
    if (!parsed.maxWidth) parsed.maxWidth = "medium";
    return parsed;
}
