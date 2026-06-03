import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentServicesSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
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

export function parseServicesComponentSettings(type: string, settings: any) {
    return settings;
}
