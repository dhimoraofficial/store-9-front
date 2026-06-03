import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentPricingSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
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

export function parsePricingComponentSettings(type: string, settings: any) {
    return settings;
}
