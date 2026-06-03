import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentTestimonialsSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    title: {
        as: "title",
        tp: "prop",
        rgx: ".*"
    },
    desc: {
        as: "desc",
        tp: "prop",
        rgx: ".*"
    }
};

export function parseTestimonialsComponentSettings(type: string, settings: any) {
    return settings;
}
