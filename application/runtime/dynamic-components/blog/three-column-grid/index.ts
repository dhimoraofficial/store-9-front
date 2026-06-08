import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentBlogSchemaSettingsMap,
    parseBlogComponentSettings
} from "./settings";

export const ABlogThreeColumnGridComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Blog - Three Column Grid",
    icon: "FileText",
    category: "blog",
    desc: "A premium three-column grid layout for blog posts, reviews, and buying guides with dynamic custom settings.",
    settings: ComponentBlogSchemaSettingsMap,
    parse: parseBlogComponentSettings,
    component: Component
};
