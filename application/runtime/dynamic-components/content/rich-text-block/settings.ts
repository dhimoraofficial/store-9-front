import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentRichTextBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
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
    },
    variant: {
        as: "variant",
        tp: "prop",
        name: "Text Variant / Element type",
        opt: ["body", "caption", "overline", "h6"]
    },
    color: {
        as: "color",
        tp: "style",
        name: "Text Color Theme",
        opt: ["primary", "secondary", "muted", "accent"]
    },
    transform: {
        as: "textTransform",
        tp: "style",
        name: "Text Transformation",
        opt: ["none", "uppercase", "capitalize"]
    },
    weight: {
        as: "fontWeight",
        tp: "style",
        name: "Text Font Weight",
        opt: ["400", "500", "600", "700"]
    }
};

export function parseRichTextBlockComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.content = settings?.content ?? "";
    parsed.href = settings?.href ?? "";
    parsed.variant = settings?.variant ?? "body";
    return parsed;
}
