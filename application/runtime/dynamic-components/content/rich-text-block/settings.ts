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
    },
    lineHeight: {
        as: "lineHeight",
        tp: "style",
        name: "Line Height",
        opt: ["tight", "snug", "normal", "relaxed"]
    },
    letterSpacing: {
        as: "letterSpacing",
        tp: "style",
        name: "Letter Spacing",
        opt: ["tighter", "normal", "wider", "tracking-widest"]
    },
    responsiveSize: {
        as: "responsiveSize",
        tp: "map",
        name: "Responsive Font Sizes",
        description: "Configure responsive font sizes (e.g. 14px, 1.25rem, 4vw).",
        fields: [
            { as: "mobileSize", tp: "prop", name: "Mobile Font Size", rgx: "^\\d+(\\.\\d+)?(px|rem|em|%|vw)$" },
            { as: "tabletSize", tp: "prop", name: "Tablet Font Size", rgx: "^\\d+(\\.\\d+)?(px|rem|em|%|vw)$" },
            { as: "desktopSize", tp: "prop", name: "Desktop Font Size", rgx: "^\\d+(\\.\\d+)?(px|rem|em|%|vw)$" }
        ]
    }
};

export function parseRichTextBlockComponentSettings(type: string, settings: any) {
    const parsed: any = { ...settings };
    parsed.content = settings?.content ?? "";
    parsed.href = settings?.href ?? "";
    parsed.variant = settings?.variant ?? "body";

    const finalStyle = { ...settings?.style };

    if (finalStyle.lineHeight) {
        const heightMapping: Record<string, string> = {
            tight: "1.25",
            snug: "1.375",
            normal: "1.5",
            relaxed: "1.625"
        };
        finalStyle.lineHeight = heightMapping[finalStyle.lineHeight] || finalStyle.lineHeight;
    }

    if (finalStyle.letterSpacing) {
        const spacingMapping: Record<string, string> = {
            tighter: "-0.05em",
            normal: "0em",
            wider: "0.05em",
            "tracking-widest": "0.15em"
        };
        finalStyle.letterSpacing = spacingMapping[finalStyle.letterSpacing] || finalStyle.letterSpacing;
    }

    parsed.style = finalStyle;

    const rawResponsive = settings?.responsiveSize;
    let responsiveVal = null;
    if (Array.isArray(rawResponsive) && rawResponsive.length > 0) {
        responsiveVal = rawResponsive[0];
    } else if (rawResponsive && typeof rawResponsive === "object") {
        responsiveVal = rawResponsive;
    }
    parsed.responsiveSize = responsiveVal;

    return parsed;
}
