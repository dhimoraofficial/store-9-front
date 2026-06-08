import { ComponentRegistryEntry } from "../../type";
import Component from "./ClientComponent";
import {
    ComponentSearchBarBlockSchemaSettingsMap,
    parseSearchBarBlockComponentSettings
} from "./settings";

export const ASearchBarBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Compact Search Bar",
    icon: "Search",
    category: "content",
    desc: "A sleek, compact search input field for headers and navigation rows.",
    settings: ComponentSearchBarBlockSchemaSettingsMap,
    parse: parseSearchBarBlockComponentSettings,
    component: Component
};
