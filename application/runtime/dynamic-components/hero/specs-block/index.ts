import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentSpecsBlockSchemaSettingsMap,
    parseSpecsComponentSettings
} from "./settings";

export const ASpecsBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Specifications Board",
    icon: "List",
    category: "hero",
    desc: "A tabular specifications display container board.",
    settings: ComponentSpecsBlockSchemaSettingsMap,
    parse: parseSpecsComponentSettings,
    component: Component
};
