import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentTextCarouselBlockSchemaSettingsMap,
    parseTextCarouselComponentSettings
} from "./settings";

export const ATextCarouselComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Text Carousel",
    icon: "Play",
    category: "content",
    desc: "An auto-sliding text announcement banner carousel.",
    settings: ComponentTextCarouselBlockSchemaSettingsMap,
    parse: parseTextCarouselComponentSettings,
    component: Component
};
