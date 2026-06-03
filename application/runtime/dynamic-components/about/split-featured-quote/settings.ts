import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentAboutSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
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

export function parseAboutComponentSettings(type: string, settings: any) {
    return settings;
}
