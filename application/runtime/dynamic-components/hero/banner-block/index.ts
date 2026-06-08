import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentHeroBannerBlockSchemaSettingsMap,
    parseHeroBannerComponentSettings
} from "./settings";

export const AHeroBannerBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Hero Static Banner",
    icon: "Image",
    category: "hero",
    desc: "A premium static backdrop promotion banner.",
    settings: ComponentHeroBannerBlockSchemaSettingsMap,
    parse: parseHeroBannerComponentSettings,
    component: Component
};
