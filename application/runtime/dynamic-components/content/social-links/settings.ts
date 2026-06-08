import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentSocialLinksBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    platforms: {
        as: "platforms",
        name: "Social Profiles List",
        tp: "map",
        fields: [
            {
                as: "platform",
                name: "Platform Name",
                opt: ["facebook", "instagram", "twitter", "youtube", "linkedin"]
            },
            {
                as: "url",
                name: "Profile URL",
                rgx: ".*"
            }
        ]
    },
    iconSize: {
        as: "iconSize",
        tp: "prop",
        group: "layout",
        name: "Icon Size",
        description: "Choose the size of the social icons.",
        opt: ["small", "medium", "large"]
    },
    gap: {
        as: "gap",
        tp: "prop",
        group: "layout",
        name: "Icon Spacing Gap",
        description: "Horizontal spacing between the social icons.",
        opt: ["none", "small", "medium", "large"]
    }
};

export function parseSocialLinksComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.platforms = Array.isArray(settings?.platforms) ? settings.platforms : [];
    parsed.iconSize = settings?.iconSize || "medium";
    parsed.gap = settings?.gap || "small";
    return parsed;
}
