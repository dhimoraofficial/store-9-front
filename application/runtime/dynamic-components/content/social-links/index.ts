import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentSocialLinksBlockSchemaSettingsMap,
    parseSocialLinksComponentSettings
} from "./settings";

export const ASocialLinksBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Social Links",
    icon: "Share2",
    category: "content",
    desc: "A horizontal row of circular social media icon badges.",
    settings: ComponentSocialLinksBlockSchemaSettingsMap,
    parse: parseSocialLinksComponentSettings,
    component: Component
};
