import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentHeroCarouselBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    autoplaySpeed: {
        as: "autoplaySpeed",
        tp: "prop",
        name: "Auto Slide Speed (ms, e.g. 4000)",
        rgx: "^[0-9]+$"
    },
    showArrows: {
        as: "showArrows",
        tp: "prop",
        name: "Show Navigation Arrows",
        opt: ["true", "false"]
    },
    showDots: {
        as: "showDots",
        tp: "prop",
        name: "Show Pagination Dots",
        opt: ["true", "false"]
    },
    slides: {
        as: "slides",
        name: "Carousel Slides List",
        tp: "map",
        fields: [
            { as: "title", name: "Heading / Title Text", rgx: ".*" },
            { as: "subtitle", name: "Sub-heading / Description", rgx: ".*" },
            { as: "badgeText", name: "Category Badge Text (Optional)", rgx: ".*" },
            { as: "bgImage", name: "Background Image URL (Optional)", rgx: ".*" },
            { as: "primaryCtaText", name: "Primary Button Text", rgx: ".*" },
            { as: "primaryCtaUrl", name: "Primary Button URL", rgx: ".*" },
            { as: "secondaryCtaText", name: "Secondary Button Text", rgx: ".*" },
            { as: "secondaryCtaUrl", name: "Secondary Button URL", rgx: ".*" }
        ]
    }
};

export function parseHeroCarouselComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.autoplaySpeed = settings?.autoplaySpeed ? parseInt(settings.autoplaySpeed, 10) : 4000;
    parsed.showArrows = settings?.showArrows !== undefined ? settings.showArrows : "true";
    parsed.showDots = settings?.showDots !== undefined ? settings.showDots : "true";
    parsed.slides = Array.isArray(settings?.slides) ? settings.slides : [];
    return parsed;
}
