import { ComponentRegistryEntry } from "../../type";
import Component from "./ClientComponent";
import {
    ComponentContainerBlockSchemaSettingsMap,
    parseContainerBlockComponentSettings
} from "./settings";

export const AContainerBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Container",
    icon: "Maximize2", // Using Lucide icon Maximize2
    category: "content",
    desc: "A bounded, customizable, and centerable container block for building nested layouts.",
    settings: ComponentContainerBlockSchemaSettingsMap,
    parse: parseContainerBlockComponentSettings,
    component: Component
};
