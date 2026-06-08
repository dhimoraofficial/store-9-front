import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentTextBlockSchemaSettingsMap,
    parseTextBlockComponentSettings
} from "./settings";

export const ATextBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Text Block",
    icon: "Type",
    category: "content",
    desc: "A basic inline text element that can optional render as a link.",
    settings: ComponentTextBlockSchemaSettingsMap,
    parse: parseTextBlockComponentSettings,
    component: Component
};
