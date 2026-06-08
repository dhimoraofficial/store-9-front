import { ComponentRegistryEntry } from "../../type";
import Component from "./ClientComponent";
import {
    ComponentLogoBlockSchemaSettingsMap,
    parseLogoBlockComponentSettings
} from "./settings";

export const ALogoBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Brand Logo Block",
    icon: "Hexagon",
    category: "content",
    desc: "A customizable store branding logo and title.",
    settings: ComponentLogoBlockSchemaSettingsMap,
    parse: parseLogoBlockComponentSettings,
    component: Component
};
