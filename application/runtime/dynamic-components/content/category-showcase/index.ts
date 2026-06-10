import { ComponentRegistryEntry } from "../../type";
import Component from "./ClientComponent";
import {
    ComponentCategoryShowcaseSchemaSettingsMap,
    parseCategoryShowcaseComponentSettings
} from "./settings";

export const ACategoryShowcaseComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Category Showcase",
    icon: "LayoutGrid",
    category: "content",
    desc: "A section displaying clickable category circles with image and label, ideal for ecommerce shop-by-category sections.",
    settings: ComponentCategoryShowcaseSchemaSettingsMap,
    parse: parseCategoryShowcaseComponentSettings,
    component: Component
};
