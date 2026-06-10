import { ComponentGlobalSchemaSettingsMapType, LUCIDE_ICON_NAMES } from "../../core";

export const ComponentLinkIconBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    icon: {
        as: "icon",
        tp: "prop",
        name: "Lucide Icon Name (e.g. Phone, HelpCircle)",
        opt: LUCIDE_ICON_NAMES,
        rgx: "^[a-zA-Z0-9-]*$"
    },
    text: {
        as: "text",
        tp: "prop",
        name: "Label Text",
        rgx: ".*"
    },
    href: {
        as: "href",
        tp: "prop",
        name: "Link URL (Optional)",
        rgx: ".*"
    }
};

export function parseLinkIconComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.icon = settings?.icon ?? "HelpCircle";
    parsed.text = settings?.text ?? "";
    parsed.href = settings?.href ?? "";
    return parsed;
}
