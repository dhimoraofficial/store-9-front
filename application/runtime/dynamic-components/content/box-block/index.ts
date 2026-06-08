import { ComponentRegistryEntry } from "../../type";
import Component from "./ClientComponent";
import {
    ComponentBoxBlockSchemaSettingsMap,
    parseBoxBlockComponentSettings
} from "./settings";

export const ABoxBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Box",
    icon: "Box",
    category: "content",
    desc: "A generic layout block for grouping columns, rows, text blocks, and widgets.",
    settings: ComponentBoxBlockSchemaSettingsMap,
    parse: parseBoxBlockComponentSettings,
    component: Component
};
