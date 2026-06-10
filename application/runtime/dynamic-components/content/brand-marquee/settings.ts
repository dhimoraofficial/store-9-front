import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentBrandMarqueeSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    brands: {
        as: "brands",
        name: "Brands List",
        tp: "map",
        fields: [
            {
                as: "name",
                name: "Brand Name",
                rgx: ".*"
            },
            {
                as: "logoUrl",
                name: "Logo Image URL (optional)",
                rgx: ".*"
            }
        ]
    },
    scrollSpeed: {
        as: "scrollSpeed",
        tp: "prop",
        name: "Scroll Speed",
        description: "How fast the marquee scrolls.",
        opt: ["slow", "medium", "fast"]
    },
    opacity: {
        as: "opacity",
        tp: "prop",
        name: "Brand Opacity",
        description: "Opacity of each brand item (0–1).",
        rgx: "^(0(\\.\\d+)?|1(\\.0+)?)$"
    },
    fontFamily: {
        as: "fontFamily",
        tp: "prop",
        name: "Font Style",
        description: "Font style for text-based brand names.",
        opt: ["monospace", "sans-serif", "serif"]
    },
    backgroundColor: {
        as: "backgroundColor",
        tp: "prop",
        name: "Background Color",
        description: "Background color of the marquee strip.",
        rgx: ".*"
    },
    textColor: {
        as: "textColor",
        tp: "prop",
        name: "Text Color",
        description: "Color of the brand name text.",
        rgx: ".*"
    }
};

export function parseBrandMarqueeComponentSettings(_type: string, settings: any) {
    const parsed = { ...settings };

    if (!Array.isArray(parsed.brands) || parsed.brands.length === 0) {
        parsed.brands = [
            { name: "ASUS" }, { name: "HP" }, { name: "LENOVO" }, { name: "ACER" },
            { name: "DELL" }, { name: "MSI" }, { name: "APPLE" }, { name: "RAZER" }
        ];
    }

    if (!parsed.scrollSpeed) parsed.scrollSpeed = "medium";
    if (parsed.opacity === undefined || parsed.opacity === null) parsed.opacity = 0.3;
    else parsed.opacity = parseFloat(parsed.opacity);
    if (!parsed.fontFamily) parsed.fontFamily = "monospace";
    if (!parsed.backgroundColor) parsed.backgroundColor = "#F3F4F6";
    if (!parsed.textColor) parsed.textColor = "#6B7280";

    return parsed;
}
