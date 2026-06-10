import { ComponentRegistryEntry } from "../../type";
import Component from "./ClientComponent";
import {
    ComponentBrandMarqueeSchemaSettingsMap,
    parseBrandMarqueeComponentSettings
} from "./settings";

export const ABrandMarqueeComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Brand Marquee",
    icon: "Marquee",
    category: "content",
    desc: "An infinite auto-scrolling marquee strip displaying brand logos or name text.",
    settings: ComponentBrandMarqueeSchemaSettingsMap,
    parse: parseBrandMarqueeComponentSettings,
    component: Component
};
