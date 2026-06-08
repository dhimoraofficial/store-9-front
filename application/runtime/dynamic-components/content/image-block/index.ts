import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentImageBlockSchemaSettingsMap,
    parseImageBlockComponentSettings
} from "./settings";

export const AImageBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Image Block",
    icon: "Image",
    category: "content",
    desc: "A premium image container with object-fit and aspect-ratio sizing controls.",
    settings: ComponentImageBlockSchemaSettingsMap,
    parse: parseImageBlockComponentSettings,
    component: Component
};
