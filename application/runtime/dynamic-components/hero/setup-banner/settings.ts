import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentHeroSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    title: {
        as: "title",
        tp: "prop",
        rgx: ".*"
    },
    subtitle: {
        as: "subtitle",
        tp: "prop",
        rgx: ".*"
    },
    buttonText: {
        as: "buttonText",
        tp: "prop",
        rgx: ".*"
    },
    bgImage: {
        as: "bgImage",
        tp: "prop",
        rgx: ".*"
    }
};

export function parseHeroComponentSettings(type: string, settings: any) {
    return { ...settings };
}
