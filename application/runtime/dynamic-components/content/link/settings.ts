import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentLinkBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    text: {
        as: "text",
        tp: "prop",
        name: "Link Display Text",
        rgx: ".*"
    },
    href: {
        as: "href",
        tp: "prop",
        name: "Link URL Target",
        rgx: ".*"
    }
};

export function parseLinkComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.text = settings?.text ?? "";
    parsed.href = settings?.href ?? "";
    return parsed;
}
