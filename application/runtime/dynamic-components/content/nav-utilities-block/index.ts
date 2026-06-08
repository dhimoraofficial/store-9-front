import { ComponentRegistryEntry } from "../../type";
import Component from "./ClientComponent";
import {
    ComponentNavUtilitiesBlockSchemaSettingsMap,
    parseNavUtilitiesBlockComponentSettings
} from "./settings";

export const ANavUtilitiesBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Navbar Utility Icons",
    icon: "User",
    category: "content",
    desc: "Interactive cart, wishlist, and user account navigation links.",
    settings: ComponentNavUtilitiesBlockSchemaSettingsMap,
    parse: parseNavUtilitiesBlockComponentSettings,
    component: Component
};
