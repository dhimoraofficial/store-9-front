import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentHeroSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    title: {
        as: "title",
        tp: "prop",
        rgx: ".*"
    },
    desc: {
        as: "desc",
        tp: "prop",
        rgx: ".*"
    },
    ctaText: {
        as: "ctaText",
        tp: "prop",
        rgx: ".*"
    },
    ctaUrl: {
        as: "ctaUrl",
        tp: "prop",
        rgx: ".*"
    }
};

export function parseHeroComponentSettings(type: string, settings: any) {
    return settings;
}
