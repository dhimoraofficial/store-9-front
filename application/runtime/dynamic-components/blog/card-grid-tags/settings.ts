import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentBlogSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
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

export function parseBlogComponentSettings(type: string, settings: any) {
    return settings;
}
