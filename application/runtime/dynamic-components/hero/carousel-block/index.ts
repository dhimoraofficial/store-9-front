import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentHeroCarouselBlockSchemaSettingsMap,
    parseHeroCarouselComponentSettings
} from "./settings";

export const AHeroCarouselBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Hero Carousel Block",
    icon: "Play",
    category: "hero",
    desc: "An auto-sliding premium hero carousel slide deck.",
    settings: ComponentHeroCarouselBlockSchemaSettingsMap,
    parse: parseHeroCarouselComponentSettings,
    component: Component
};
