import { BaseTypes, ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentFooterDefaultChildrensMap,
    ComponentFooterSchemaChildrensMap,
    ComponentFooterSchemaSettingsMap,
    parseFooterComponentSettings
} from "./settings";


export const AFooterEcommerceComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Footer - eCommerce Premium",
    icon: "Layers",
    category: "footer",
    desc: "A highly customizable premium eCommerce footer featuring flexible navigation link grids, integrated social icons, newsletter signups, app store badges, and multi-layout variants.",
    settings: ComponentFooterSchemaSettingsMap,
    parse: parseFooterComponentSettings,
    component: Component,
    allowedChildren: ComponentFooterSchemaChildrensMap as BaseTypes[],
    defaultChildren: ComponentFooterDefaultChildrensMap,
}