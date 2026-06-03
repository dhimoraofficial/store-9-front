import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentPortfolioSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
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

export function parsePortfolioComponentSettings(type: string, settings: any) {
    return settings;
}
