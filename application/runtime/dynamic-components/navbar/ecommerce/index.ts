import { BaseTypes, ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentNavbarSchemaSettingsMap,
    parseNavbarComponentSettings
} from "./settings";

export const ANavbarEcommerceComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Navbar - eCommerce Premium",
    icon: "Compass",
    category: "navbar",
    desc: "A highly customizable premium eCommerce navigation header featuring brand megamenus, responsive mobile accordions, flexible alignment, top information banner, and layout variant switches.",
    settings: ComponentNavbarSchemaSettingsMap,
    parse: parseNavbarComponentSettings,
    component: Component,
    allowedChildren: ["box_block", "container_block", "logo_block", "search_bar_block", "nav_utilities_block", "link_group_block", "link_block", "text_block", "rich_text_block"] as BaseTypes[],
    defaultChildren: [
        {
            type: "box_block",
            label: "Left: Logo Slot",
            settings: { direction: "row", width: "auto", align: "start" },
            children: [
                { type: "logo_block", label: "Store Brand Logo", settings: { brandName: "", brandSlogan: "" } }
            ]
        },
        {
            type: "box_block",
            label: "Center: Menu Slot",
            settings: { direction: "row", width: "flex-grow", align: "center" },
            children: [
                {
                    type: "link_group_block",
                    label: "Navigation Links",
                    settings: { title: "", direction: "row" },
                    children: [
                        { type: "link_block", label: "Shop", settings: { text: "Shop All", href: "/shop" } },
                        { type: "link_block", label: "New Arrivals", settings: { text: "New Arrivals", href: "/shop/new" } },
                        { type: "link_block", label: "Support", settings: { text: "Support", href: "/support" } }
                    ]
                }
            ]
        },
        {
            type: "box_block",
            label: "Right: Utilities Slot",
            settings: { direction: "row", width: "auto", align: "end" },
            children: [
                { type: "search_bar_block", label: "Search Bar", settings: { placeholder: "Search products..." } },
                { type: "nav_utilities_block", label: "Action Icons", settings: { wishlistShow: "true", cartShow: "true", accountShow: "true" } }
            ]
        }
    ]
};
