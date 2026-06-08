import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentLinkIconBlockSchemaSettingsMap,
    parseLinkIconComponentSettings
} from "./settings";

export const ALinkIconBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Icon with Text",
    icon: "HelpCircle",
    category: "content",
    desc: "An icon with a text label and an optional click/link action.",
    settings: ComponentLinkIconBlockSchemaSettingsMap,
    parse: parseLinkIconComponentSettings,
    component: Component
};
