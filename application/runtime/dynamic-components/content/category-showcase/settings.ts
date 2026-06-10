import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentCategoryShowcaseSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    eyebrow: {
        as: "eyebrow",
        tp: "prop",
        group: "content",
        name: "Eyebrow Label",
        description: "Small uppercase label above the heading.",
        rgx: ".*"
    },
    heading: {
        as: "heading",
        tp: "prop",
        group: "content",
        name: "Section Heading",
        rgx: ".*"
    },
    categories: {
        as: "categories",
        name: "Categories",
        tp: "map",
        fields: [
            {
                as: "name",
                name: "Category Name",
                rgx: ".*"
            },
            {
                as: "image",
                name: "Image URL",
                rgx: ".*"
            },
            {
                as: "href",
                name: "Link URL",
                rgx: ".*"
            }
        ]
    },
    circleSize: {
        as: "circleSize",
        tp: "prop",
        group: "style",
        name: "Circle Size (px)",
        description: "Diameter of each category circle in pixels.",
        rgx: "^\\d+$"
    },
    circleBg: {
        as: "circleBg",
        tp: "prop",
        group: "style",
        name: "Circle Background",
        description: "Background color of the circle.",
        rgx: ".*"
    },
    circleBorder: {
        as: "circleBorder",
        tp: "prop",
        group: "style",
        name: "Circle Border",
        description: "CSS outline value (e.g. '1px solid #E5E7EB').",
        rgx: ".*"
    },
    labelColor: {
        as: "labelColor",
        tp: "prop",
        group: "style",
        name: "Label Color",
        description: "Text color of the category label.",
        rgx: ".*"
    }
};

export function parseCategoryShowcaseComponentSettings(_type: string, settings: any) {
    const parsed = { ...settings };

    if (!parsed.eyebrow) parsed.eyebrow = "EXPLORE COLLECTIONS";
    if (!parsed.heading) parsed.heading = "Shop by Category";
    if (!Array.isArray(parsed.categories) || parsed.categories.length === 0) {
        parsed.categories = [
            { name: "Laptops",     href: "/category/laptops" },
            { name: "Gaming PCs",  href: "/category/gaming-pcs" },
            { name: "Wearables",   href: "/category/wearables" },
            { name: "Accessories", href: "/category/accessories" }
        ];
    }
    if (!parsed.circleSize) parsed.circleSize = 144;
    else parsed.circleSize = parseInt(parsed.circleSize, 10);
    if (!parsed.circleBg) parsed.circleBg = "#F3F4F6";
    if (!parsed.circleBorder) parsed.circleBorder = "1px solid #E5E7EB";
    if (!parsed.labelColor) parsed.labelColor = "#10112F";

    return parsed;
}
