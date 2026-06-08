import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentTextCarouselBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    autoplaySpeed: {
        as: "autoplaySpeed",
        tp: "prop",
        name: "Auto Slide Speed (ms, e.g. 3000)",
        rgx: "^[0-9]+$"
    },
    slides: {
        as: "slides",
        name: "Carousel Text Slides",
        tp: "map",
        fields: [
            {
                as: "text",
                name: "Slide Text Content",
                rgx: ".*"
            },
            {
                as: "href",
                name: "Slide Click URL (Optional)",
                rgx: ".*"
            }
        ]
    }
};

export function parseTextCarouselComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.autoplaySpeed = settings?.autoplaySpeed ? parseInt(settings.autoplaySpeed, 10) : 3000;
    parsed.slides = Array.isArray(settings?.slides) ? settings.slides : [];
    return parsed;
}
