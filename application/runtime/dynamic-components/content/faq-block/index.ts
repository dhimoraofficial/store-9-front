import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentFAQBlockSchemaSettingsMap,
    parseFAQBlockComponentSettings
} from "./settings";

export const AFAQBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "FAQ Block",
    icon: "HelpCircle",
    category: "content",
    desc: "An interactive FAQ item with a title, a question, and an expandable answer.",
    settings: ComponentFAQBlockSchemaSettingsMap,
    parse: parseFAQBlockComponentSettings,
    component: Component
};
