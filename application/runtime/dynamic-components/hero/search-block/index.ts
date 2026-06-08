import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentSearchBlockSchemaSettingsMap,
    parseSearchComponentSettings
} from "./settings";

export const ASearchBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Search Bar Block",
    icon: "Search",
    category: "hero",
    desc: "An integrated product and technical search lookup bar.",
    settings: ComponentSearchBlockSchemaSettingsMap,
    parse: parseSearchComponentSettings,
    component: Component
};
