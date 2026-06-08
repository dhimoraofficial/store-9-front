import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentSearchBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    placeholder: { as: "placeholder", name: "Search Input Placeholder Text", tp: "prop", rgx: ".*" },
    buttonText: { as: "buttonText", name: "Search Action Button Text", tp: "prop", rgx: ".*" }
};

export function parseSearchComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.placeholder = settings?.placeholder ?? "Search products...";
    parsed.buttonText = settings?.buttonText ?? "Find";
    return parsed;
}
