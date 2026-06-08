import { BaseTypes, ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentLinkGroupBlockSchemaSettingsMap,
    parseLinkGroupComponentSettings
} from "./settings";

export const ALinkGroupBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    allowedChildren: ["link_block"] as BaseTypes[],
    name: "Link Group",
    icon: "Folder",
    category: "content",
    desc: "A titled collection of navigation links, typically used in footers.",
    settings: ComponentLinkGroupBlockSchemaSettingsMap,
    parse: parseLinkGroupComponentSettings,
    component: Component
};
