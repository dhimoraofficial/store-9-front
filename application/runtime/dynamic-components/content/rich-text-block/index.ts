import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentRichTextBlockSchemaSettingsMap,
    parseRichTextBlockComponentSettings
} from "./settings";

export const ARichTextBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Rich Text Block",
    icon: "Type",
    category: "content",
    desc: "A rich inline text element with customizable variant, color, transformation, and font weight.",
    settings: ComponentRichTextBlockSchemaSettingsMap,
    parse: parseRichTextBlockComponentSettings,
    component: Component
};
