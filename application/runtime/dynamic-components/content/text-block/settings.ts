import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentTextBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    content: {
        as: "content",
        tp: "prop",
        name: "Text Content",
        rgx: ".*"
    },
    href: {
        as: "href",
        tp: "prop",
        name: "Link URL (Optional)",
        rgx: ".*"
    }
};

export function parseTextBlockComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.content = settings?.content ?? "";
    parsed.href = settings?.href ?? "";
    return parsed;
}
