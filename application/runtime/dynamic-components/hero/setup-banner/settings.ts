import { ComponentGlobalSchemaSettingsMapType, ComponentSettingsSchema } from "../../core";

const widgetFields: ComponentSettingsSchema[] = [
    {
        as: "widgetType",
        name: "Widget Type",
        tp: "prop",
        opt: ["carousel", "banner", "search", "specs", "text", "icons"]
    },
    // Carousel Widget fields
    {
        as: "autoplaySpeed",
        name: "Carousel Speed (milliseconds)",
        tp: "prop",
        condition: [{ for: "widgetType", val: "carousel" }],
        rgx: "^\\d+$"
    },
    {
        as: "slides",
        name: "Carousel Slides",
        tp: "map",
        condition: [{ for: "widgetType", val: "carousel" }],
        fields: [
            { as: "title", name: "Slide Title", rgx: ".*" },
            { as: "subtitle", name: "Slide Subtitle", rgx: ".*" },
            { as: "badgeText", name: "Slide Badge Text", rgx: ".*" },
            { as: "primaryCtaText", name: "Primary CTA Button Text", rgx: ".*" },
            { as: "primaryCtaUrl", name: "Primary CTA Destination URL", rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*" },
            { as: "secondaryCtaText", name: "Secondary CTA Button Text", rgx: ".*" },
            { as: "secondaryCtaUrl", name: "Secondary CTA Destination URL", rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*" },
            { as: "bgImage", name: "Background/Slide Image URL", rgx: ".*" }
        ]
    },
    // Banner Widget fields
    {
        as: "title",
        name: "Banner Title Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: ".*"
    },
    {
        as: "subtitle",
        name: "Banner Subtitle Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: ".*"
    },
    {
        as: "badgeText",
        name: "Banner Badge Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: ".*"
    },
    {
        as: "primaryCtaText",
        name: "Primary CTA Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: ".*"
    },
    {
        as: "primaryCtaUrl",
        name: "Primary CTA Link URL",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*"
    },
    {
        as: "secondaryCtaText",
        name: "Secondary CTA Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: ".*"
    },
    {
        as: "secondaryCtaUrl",
        name: "Secondary CTA Link URL",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*"
    },
    {
        as: "bgImage",
        name: "Banner Background Image URL",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: ".*"
    },
    {
        as: "height",
        name: "Banner Box Height (e.g. 350px)",
        tp: "prop",
        condition: [{ for: "widgetType", val: "banner" }],
        rgx: "^\\d*(px|rem|%)?$"
    },
    // Search Widget fields
    {
        as: "placeholder",
        name: "Search Input Placeholder Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "search" }],
        rgx: ".*"
    },
    {
        as: "buttonText",
        name: "Search Action Button Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "search" }],
        rgx: ".*"
    },
    // Tech Specifications Widget fields
    {
        as: "specList",
        name: "Technical Specification Key-Value Pairs",
        tp: "map",
        condition: [{ for: "widgetType", val: "specs" }],
        fields: [
            { as: "label", name: "Specification Label (e.g., CPU, RAM)", rgx: ".*" },
            { as: "value", name: "Specification Value (e.g., Core i7, 16GB)", rgx: ".*" }
        ]
    },
    // Simple Text block fields
    {
        as: "content",
        name: "Text Content",
        tp: "prop",
        condition: [{ for: "widgetType", val: "text" }],
        rgx: ".*"
    },
    {
        as: "size",
        name: "Text Font Size",
        tp: "prop",
        condition: [{ for: "widgetType", val: "text" }],
        opt: ["sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"]
    },
    {
        as: "weight",
        name: "Text Font Weight",
        tp: "prop",
        condition: [{ for: "widgetType", val: "text" }],
        opt: ["normal", "medium", "semibold", "bold", "black"]
    },
    // Icons (Socials/Trust Badges) widget fields
    {
        as: "socials",
        name: "Social or Brand Links List",
        tp: "map",
        condition: [{ for: "widgetType", val: "icons" }],
        fields: [
            { as: "platform", name: "Platform Name (e.g. facebook, instagram, warranty, shipping)", rgx: ".*" },
            { as: "url", name: "Destination Link URL", rgx: ".*" }
        ]
    }
];

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
    leftWidgets: {
        as: "leftWidgets",
        name: "Left Column Widgets List",
        tp: "map",
        group: "left_slot",
        fields: widgetFields
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
    },
    rightWidgets: {
        as: "rightWidgets",
        name: "Right Column Widgets List",
        tp: "map",
        group: "right_slot",
        fields: widgetFields
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

    // Strictly enforce empty arrays for widgets (no fallback mock seeding on empty)
    parsed.leftWidgets = Array.isArray(parsed.leftWidgets) ? parsed.leftWidgets : [];
    parsed.rightWidgets = Array.isArray(parsed.rightWidgets) ? parsed.rightWidgets : [];

    return parsed;
}
