import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentContainerSchemaSettingsMap,
    parseContainerComponentSettings
} from "./settings";

export const AEcommerceProductGridComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Ecommerce - Product Grid",
    icon: "ShoppingBag",
    category: "ecommerce",
    desc: "A premium product showcase grid with tags, specifications, pricing, and add-to-cart layout controls.",
    settings: ComponentContainerSchemaSettingsMap,
    parse: parseContainerComponentSettings,
    component: Component
};
