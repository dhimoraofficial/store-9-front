import { ComponentGlobalSchemaSettingsMapType } from "./core";

export type BaseTypes =
    | "text_block"
    | "rich_text_block"
    | "social_links_block"
    | "link_icon_block"
    | "text_carousel"
    | "hero_carousel_block"
    | "hero_banner_block"
    | "search_block"
    | "specs_block"
    | "link_group_block"
    | "link_block"
    | "box_block"
    | "container_block"
    | "logo_block"
    | "search_bar_block"
    | "nav_utilities_block"
    | "announcement_bar_ecommerce"
    | "footer_ecommerce"
    | "navbar_ecommerce"
    | "blog_three-column-grid"
    | "ecommerce_product-grid"
    | "hero_setup-banner"
    | (string & {});

export interface BaseProps {
    id?: string;
    style?: React.CSSProperties;
    className?: string;
}

export type ActionObject = {
    label: string;
    action: string;
};

export interface ComponentRegistryEntry {
    name: string;
    icon: string;
    category: "layout" | "content" | "forms" | "ecommerce" | "legacy" | "navbar" | "hero" | "services" | "testimonials" | "cta" | "about" | "portfolio" | "pricing" | "blog" | "footer";
    desc?: string;
    acceptsChildren?: boolean;
    allowedChildren?: BaseTypes[];
    slotsConfig?: Record<string, { id: string; label: string; allowedChildren: string[] }[]>;
    defaultChildren?: Record<string, any[]>;
    settings: ComponentGlobalSchemaSettingsMapType;
    parse?: (type: string, settings: any) => any;
    component?: any;
}