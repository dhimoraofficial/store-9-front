import { ComponentGlobalSchemaSettingsMap, ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentImageBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    ...ComponentGlobalSchemaSettingsMap,
    src: {
        as: "src",
        tp: "prop",
        group: "media",
        name: "Image Source URL",
        description: "URL or path of the image asset.",
        rgx: ".*"
    },
    alt: {
        as: "alt",
        tp: "prop",
        group: "media",
        name: "Alternative Text",
        description: "Accessibility text describing the image.",
        rgx: ".*"
    },
    objectFit: {
        as: "objectFit",
        tp: "style",
        group: "media",
        name: "Object Fit",
        description: "Define how the image fits inside its container bounds.",
        opt: ["contain", "cover", "fill"]
    },
    aspectRatio: {
        as: "aspectRatio",
        tp: "style",
        group: "media",
        name: "Aspect Ratio",
        description: "Standard aspect ratio for the image container.",
        opt: ["square", "video", "auto", "4/3"]
    }
};

export function parseImageBlockComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };
    
    if (!parsed.src) parsed.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";
    if (!parsed.alt) parsed.alt = "Asset image";

    const finalStyle = { ...settings?.style };

    if (finalStyle.aspectRatio) {
        const ratioMap: Record<string, string> = {
            square: "1 / 1",
            video: "16 / 9",
            auto: "auto",
            "4/3": "4 / 3"
        };
        finalStyle.aspectRatio = ratioMap[finalStyle.aspectRatio] || finalStyle.aspectRatio;
    }

    parsed.style = finalStyle;
    return parsed;
}
