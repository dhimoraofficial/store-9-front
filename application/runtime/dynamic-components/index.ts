import { ComponentGlobalSchemaSettingsMap, ComponentGlobalSchemaSettingsMapType } from "./core";

import {
    ComponentFooterSchemaSettingsMap as Component_footer_ecommerce_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_ecommerce_ComponentSettings,
    default as Footer_Ecommerce_Component
} from "./footer/ecommerce";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_ecommerce_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_ecommerce_ComponentSettings,
    default as Navbar_Ecommerce_Component
} from "./navbar/ecommerce";
import {
    ComponentAnnouncementBarSchemaSettingsMap as Component_announcement_bar_ecommerce_SchemaSettingsMap,
    parseAnnouncementBarComponentSettings as parse_announcement_bar_ecommerce_ComponentSettings,
    default as AnnouncementBar_Ecommerce_Component
} from "./announcement-bar/ecommerce";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_three_column_grid_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_three_column_grid_ComponentSettings,
    default as Blog_ThreeColumnGrid_Component
} from "./blog/three-column-grid";
import {
    ComponentContainerSchemaSettingsMap as Component_ecommerce_product_grid_SchemaSettingsMap,
    parseContainerComponentSettings as parse_ecommerce_product_grid_ComponentSettings,
    default as Ecommerce_ProductGrid_Component
} from "./ecommerce/product-container";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_setup_banner_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_setup_banner_ComponentSettings,
    default as Hero_SetupBanner_Component
} from "./hero/setup-banner";

export interface ComponentRegistryEntry {
    name: string;
    icon: string;
    category: "layout" | "content" | "forms" | "ecommerce" | "legacy" | "navbar" | "hero" | "services" | "testimonials" | "cta" | "about" | "portfolio" | "pricing" | "blog" | "footer";
    desc?: string;
    acceptsChildren?: boolean;
    settings: ComponentGlobalSchemaSettingsMapType;
    parse?: (type: string, settings: any) => any;
    component?: any;
}

export const ComponentAllSchemaSettingsMap: Record<string, (ComponentRegistryEntry | ComponentGlobalSchemaSettingsMapType)> = {
    common: ComponentGlobalSchemaSettingsMap,

    "announcement_bar_ecommerce": {
        acceptsChildren: false,
        name: "Announcement Bar - eCommerce Premium",
        icon: "Megaphone",
        category: "layout",
        desc: "A highly customizable premium announcement bar featuring sliding/fading text carousels, nested contact information link structures, and custom color themes.",
        settings: Component_announcement_bar_ecommerce_SchemaSettingsMap as any,
        parse: parse_announcement_bar_ecommerce_ComponentSettings,
        component: AnnouncementBar_Ecommerce_Component
    },
    "footer_ecommerce": {
        acceptsChildren: false,
        name: "Footer - eCommerce Premium",
        icon: "Layers",
        category: "footer",
        desc: "A highly customizable premium eCommerce footer featuring flexible navigation link grids, integrated social icons, newsletter signups, app store badges, and multi-layout variants.",
        settings: Component_footer_ecommerce_SchemaSettingsMap as any,
        parse: parse_footer_ecommerce_ComponentSettings,
        component: Footer_Ecommerce_Component
    },
    "navbar_ecommerce": {
        acceptsChildren: false,
        name: "Navbar - eCommerce Premium",
        icon: "Compass",
        category: "navbar",
        desc: "A highly customizable premium eCommerce navigation header featuring brand megamenus, responsive mobile accordions, flexible alignment, top information banner, and layout variant switches.",
        settings: Component_navbar_ecommerce_SchemaSettingsMap as any,
        parse: parse_navbar_ecommerce_ComponentSettings,
        component: Navbar_Ecommerce_Component
    },
    "blog_three-column-grid": {
        acceptsChildren: false,
        name: "Blog - Three Column Grid",
        icon: "FileText",
        category: "blog",
        desc: "A premium three-column grid layout for blog posts, reviews, and buying guides with dynamic custom settings.",
        settings: Component_blog_three_column_grid_SchemaSettingsMap as any,
        parse: parse_blog_three_column_grid_ComponentSettings,
        component: Blog_ThreeColumnGrid_Component
    },
    "ecommerce_product-grid": {
        acceptsChildren: false,
        name: "Ecommerce - Product Grid",
        icon: "ShoppingBag",
        category: "ecommerce",
        desc: "A premium product showcase grid with tags, specifications, pricing, and add-to-cart layout controls.",
        settings: Component_ecommerce_product_grid_SchemaSettingsMap as any,
        parse: parse_ecommerce_product_grid_ComponentSettings,
        component: Ecommerce_ProductGrid_Component
    },
    "hero_setup-banner": {
        acceptsChildren: false,
        name: "Hero - Setup Banner",
        icon: "Sparkles",
        category: "hero",
        desc: "A full-width ambient ambient promotional banner with customizable image background, subtitle, main title, and call to action button.",
        settings: Component_hero_setup_banner_SchemaSettingsMap as any,
        parse: parse_hero_setup_banner_ComponentSettings,
        component: Hero_SetupBanner_Component
    }
};

export type { BaseTypes } from "./type";
