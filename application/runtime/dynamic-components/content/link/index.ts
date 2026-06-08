import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentLinkBlockSchemaSettingsMap,
    parseLinkComponentSettings
} from "./settings";

export const ALinkBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Link Item",
    icon: "Link",
    category: "content",
    desc: "A single navigation link item.",
    settings: ComponentLinkBlockSchemaSettingsMap,
    parse: parseLinkComponentSettings,
    component: Component
};
