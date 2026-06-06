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

import {
    TextBlockComponent,
    SocialLinksBlockComponent,
    LinkIconBlockComponent,
    TextCarouselBlockComponent,
    HeroCarouselBlockComponent,
    HeroBannerBlockComponent,
    SearchBlockComponent,
    SpecsBlockComponent,
    LinkGroupBlockComponent,
    LinkBlockComponent
} from "./blocks";

export interface ComponentRegistryEntry {
    name: string;
    icon: string;
    category: "layout" | "content" | "forms" | "ecommerce" | "legacy" | "navbar" | "hero" | "services" | "testimonials" | "cta" | "about" | "portfolio" | "pricing" | "blog" | "footer";
    desc?: string;
    acceptsChildren?: boolean;
    allowedChildren?: string[];
    slotsConfig?: Record<string, { id: string; label: string; allowedChildren: string[] }[]>;
    defaultChildren?: Record<string, any[]>;
    settings: ComponentGlobalSchemaSettingsMapType;
    parse?: (type: string, settings: any) => any;
    component?: any;
}

export const ComponentTextBlockSchemaSettingsMap = {
    content: {
        as: "content",
        tp: "prop",
        name: "Text Content",
        rgx: ".*"
    },
    href: {
        as: "href",
        tp: "prop",
        name: "Link URL (Optional)",
        rgx: ".*"
    }
};

export const ComponentSocialLinksBlockSchemaSettingsMap = {
    platforms: {
        as: "platforms",
        name: "Social Profiles List",
        tp: "map",
        fields: [
            {
                as: "platform",
                name: "Platform Name",
                opt: ["facebook", "instagram", "twitter", "youtube", "linkedin"]
            },
            {
                as: "url",
                name: "Profile URL",
                rgx: ".*"
            }
        ]
    }
};

export const ComponentLinkIconBlockSchemaSettingsMap = {
    icon: {
        as: "icon",
        tp: "prop",
        name: "Icon Type",
        opt: ["Phone", "Mail", "MapPin", "Clock", "Info", "HelpCircle"]
    },
    text: {
        as: "text",
        tp: "prop",
        name: "Text Label",
        rgx: ".*"
    },
    href: {
        as: "href",
        tp: "prop",
        name: "Link URL (Optional)",
        rgx: ".*"
    }
};

export const ComponentTextCarouselSchemaSettingsMap = {
    slides: {
        as: "slides",
        name: "Carousel Slides",
        tp: "map",
        fields: [
            {
                as: "text",
                name: "Slide Text",
                rgx: ".*"
            },
            {
                as: "href",
                name: "Slide Link URL (Optional)",
                rgx: ".*"
            }
        ]
    },
    autoplaySpeed: {
        as: "autoplaySpeed",
        tp: "prop",
        name: "Slide Delay (ms)",
        rgx: "^\\d+$"
    }
};

export const ComponentHeroCarouselBlockSchemaSettingsMap = {
    autoplaySpeed: {
        as: "autoplaySpeed",
        tp: "prop",
        name: "Carousel Speed (ms)",
        rgx: "^\\d+$"
    },
    slides: {
        as: "slides",
        name: "Carousel Slides",
        tp: "map",
        fields: [
            { as: "title", name: "Slide Title", rgx: ".*" },
            { as: "subtitle", name: "Slide Subtitle", rgx: ".*" },
            { as: "badgeText", name: "Slide Badge Text", rgx: ".*" },
            { as: "primaryCtaText", name: "Primary CTA Button Text", rgx: ".*" },
            { as: "primaryCtaUrl", name: "Primary CTA Destination URL", rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*" },
            { as: "secondaryCtaText", name: "Secondary CTA Button Text", rgx: ".*" },
            { as: "secondaryCtaUrl", name: "Secondary CTA Destination URL", rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*" },
            { as: "bgImage", name: "Background/Slide Image URL", rgx: ".*" }
        ]
    }
};

export const ComponentHeroBannerBlockSchemaSettingsMap = {
    title: { as: "title", name: "Banner Title Text", tp: "prop", rgx: ".*" },
    subtitle: { as: "subtitle", name: "Banner Subtitle Text", tp: "prop", rgx: ".*" },
    badgeText: { as: "badgeText", name: "Banner Badge Text", tp: "prop", rgx: ".*" },
    primaryCtaText: { as: "primaryCtaText", name: "Primary CTA Text", tp: "prop", rgx: ".*" },
    primaryCtaUrl: { as: "primaryCtaUrl", name: "Primary CTA Link URL", tp: "prop", rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*" },
    secondaryCtaText: { as: "secondaryCtaText", name: "Secondary CTA Text", tp: "prop", rgx: ".*" },
    secondaryCtaUrl: { as: "secondaryCtaUrl", name: "Secondary CTA Link URL", tp: "prop", rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*" },
    bgImage: { as: "bgImage", name: "Banner Background Image URL", tp: "prop", rgx: ".*" },
    height: { as: "height", name: "Banner Box Height (e.g. 380px)", tp: "prop", rgx: "^\\d*(px|rem|%)?$" }
};

export const ComponentSearchBlockSchemaSettingsMap = {
    placeholder: { as: "placeholder", name: "Search Input Placeholder Text", tp: "prop", rgx: ".*" },
    buttonText: { as: "buttonText", name: "Search Action Button Text", tp: "prop", rgx: ".*" }
};

export const ComponentSpecsBlockSchemaSettingsMap = {
    specList: {
        as: "specList",
        name: "Technical Specification Key-Value Pairs",
        tp: "map",
        fields: [
            { as: "label", name: "Specification Label (e.g., CPU, RAM)", rgx: ".*" },
            { as: "value", name: "Specification Value (e.g., Core i7, 16GB)", rgx: ".*" }
        ]
    }
};

export const ComponentAllSchemaSettingsMap: Record<string, (ComponentRegistryEntry | ComponentGlobalSchemaSettingsMapType)> = {
    common: ComponentGlobalSchemaSettingsMap,

    "text_block": {
        acceptsChildren: false,
        name: "Text Block",
        icon: "Type",
        category: "content",
        desc: "A basic inline text element that can optional render as a link.",
        settings: ComponentTextBlockSchemaSettingsMap as any,
        component: TextBlockComponent
    },

    "social_links_block": {
        acceptsChildren: false,
        name: "Social Links",
        icon: "Share2",
        category: "content",
        desc: "A horizontal row of circular social media icon badges.",
        settings: ComponentSocialLinksBlockSchemaSettingsMap as any,
        component: SocialLinksBlockComponent
    },

    "link_icon_block": {
        acceptsChildren: false,
        name: "Icon with Text",
        icon: "HelpCircle",
        category: "content",
        desc: "An icon with a text label and an optional click/link action.",
        settings: ComponentLinkIconBlockSchemaSettingsMap as any,
        component: LinkIconBlockComponent
    },

    "text_carousel": {
        acceptsChildren: false,
        name: "Text Carousel",
        icon: "Play",
        category: "content",
        desc: "An auto-sliding text announcement banner carousel.",
        settings: ComponentTextCarouselSchemaSettingsMap as any,
        component: TextCarouselBlockComponent
    },

    "hero_carousel_block": {
        acceptsChildren: false,
        name: "Hero Carousel Block",
        icon: "Play",
        category: "hero",
        desc: "An auto-sliding premium hero carousel slide deck.",
        settings: ComponentHeroCarouselBlockSchemaSettingsMap as any,
        component: HeroCarouselBlockComponent
    },

    "hero_banner_block": {
        acceptsChildren: false,
        name: "Hero Static Banner",
        icon: "Image",
        category: "hero",
        desc: "A premium static backdrop promotion banner.",
        settings: ComponentHeroBannerBlockSchemaSettingsMap as any,
        component: HeroBannerBlockComponent
    },

    "search_block": {
        acceptsChildren: false,
        name: "Search Bar Block",
        icon: "Search",
        category: "hero",
        desc: "An integrated product and technical search lookup bar.",
        settings: ComponentSearchBlockSchemaSettingsMap as any,
        component: SearchBlockComponent
    },

    "specs_block": {
        acceptsChildren: false,
        name: "Specifications Board",
        icon: "List",
        category: "hero",
        desc: "A tabular specifications display container board.",
        settings: ComponentSpecsBlockSchemaSettingsMap as any,
        component: SpecsBlockComponent
    },

    "link_group_block": {
        acceptsChildren: true,
        allowedChildren: ["link_block"],
        name: "Link Group",
        icon: "Folder",
        category: "content",
        desc: "A titled collection of navigation links, typically used in footers.",
        settings: {
            title: {
                as: "title",
                tp: "prop",
                name: "Group Title",
                rgx: ".*"
            }
        },
        component: LinkGroupBlockComponent
    },

    "link_block": {
        acceptsChildren: false,
        name: "Link Item",
        icon: "Link",
        category: "content",
        desc: "A single navigation link item.",
        settings: {
            text: {
                as: "text",
                tp: "prop",
                name: "Link Text",
                rgx: ".*"
            },
            href: {
                as: "href",
                tp: "prop",
                name: "Link URL",
                rgx: ".*"
            }
        },
        component: LinkBlockComponent
    },

    "announcement_bar_ecommerce": {
        acceptsChildren: true,
        name: "Announcement Bar - eCommerce Premium",
        icon: "Megaphone",
        category: "layout",
        desc: "A highly customizable premium announcement bar with dynamic layout slots for text, links, and socials.",
        settings: Component_announcement_bar_ecommerce_SchemaSettingsMap as any,
        parse: parse_announcement_bar_ecommerce_ComponentSettings,
        component: AnnouncementBar_Ecommerce_Component,
        allowedChildren: ["text_block", "link_icon_block", "social_links_block", "text_carousel"],
        slotsConfig: {
            "1-column": [
                { id: "center", label: "Center Section", allowedChildren: ["text_block", "link_icon_block", "text_carousel"] }
            ],
            "3-column": [
                { id: "left", label: "Left Section", allowedChildren: ["text_block", "link_icon_block"] },
                { id: "middle", label: "Middle Section", allowedChildren: ["text_block", "text_carousel"] },
                { id: "right", label: "Right Section", allowedChildren: ["social_links_block", "link_icon_block"] }
            ]
        },
        defaultChildren: {
            "3-column": [
                { type: "link_icon_block", label: "Phone Info", settings: { icon: "Phone", text: "+977 981-8085380", href: "tel:+9779818085380", slot: "left" } },
                { type: "link_icon_block", label: "Location Info", settings: { icon: "MapPin", text: "Kathmandu, Nepal", slot: "left" } },
                { type: "text_carousel", label: "Slides", settings: { autoplaySpeed: "4000", slides: [{ text: "✨ Free Shipping across Nepal on orders above NPR 5000!" }, { text: "🔥 Use Coupon CODE: NEPAL10 for 10% instant discount!", href: "/shop" }], slot: "middle" } },
                { type: "social_links_block", label: "Social Badges", settings: { platforms: [{ platform: "facebook", url: "https://facebook.com" }, { platform: "instagram", url: "https://instagram.com" }], slot: "right" } }
            ],
            "1-column": [
                { type: "text_carousel", label: "Slides", settings: { autoplaySpeed: "4000", slides: [{ text: "✨ Free Shipping across Nepal on orders above NPR 5000!" }], slot: "center" } }
            ]
        }
    },
    "footer_ecommerce": {
        acceptsChildren: true,
        name: "Footer - eCommerce Premium",
        icon: "Layers",
        category: "footer",
        desc: "A highly customizable premium eCommerce footer featuring flexible navigation link grids, integrated social icons, newsletter signups, app store badges, and multi-layout variants.",
        settings: Component_footer_ecommerce_SchemaSettingsMap as any,
        parse: parse_footer_ecommerce_ComponentSettings,
        component: Footer_Ecommerce_Component,
        allowedChildren: ["link_group_block", "text_block", "social_links_block", "link_icon_block"],
        slotsConfig: {
            "default": [
                { id: "col1", label: "Column 1", allowedChildren: ["link_group_block", "text_block", "social_links_block", "link_icon_block"] },
                { id: "col2", label: "Column 2", allowedChildren: ["link_group_block", "text_block"] },
                { id: "col3", label: "Column 3", allowedChildren: ["link_group_block", "text_block"] },
                { id: "col4", label: "Column 4", allowedChildren: ["link_group_block", "text_block", "social_links_block"] },
                { id: "col5", label: "Column 5", allowedChildren: ["link_group_block", "text_block"] },
                { id: "bottomLeft", label: "Bottom Left", allowedChildren: ["text_block", "link_icon_block"] },
                { id: "bottomRight", label: "Bottom Right", allowedChildren: ["social_links_block", "link_icon_block"] }
            ]
        },
        defaultChildren: {
            "default": [
                {
                    type: "link_group_block",
                    label: "Quick Links",
                    settings: { title: "Quick Links", slot: "col2" },
                    children: [
                        { type: "link_block", label: "Shop All", settings: { text: "Shop All", href: "/shop" } },
                        { type: "link_block", label: "New Arrivals", settings: { text: "New Arrivals", href: "/shop/new" } },
                        { type: "link_block", label: "Best Sellers", settings: { text: "Best Sellers", href: "/shop/popular" } }
                    ]
                },
                {
                    type: "link_group_block",
                    label: "Support Links",
                    settings: { title: "Support Links", slot: "col3" },
                    children: [
                        { type: "link_block", label: "Contact Us", settings: { text: "Contact Us", href: "/contact" } },
                        { type: "link_block", label: "FAQs", settings: { text: "FAQs", href: "/faqs" } },
                        { type: "link_block", label: "Returns", settings: { text: "Returns & Exchanges", href: "/returns" } }
                    ]
                },
                {
                    type: "social_links_block",
                    label: "Social Badges",
                    settings: {
                        platforms: [
                            { platform: "facebook", url: "https://facebook.com" },
                            { platform: "instagram", url: "https://instagram.com" },
                            { platform: "youtube", url: "https://youtube.com" }
                        ],
                        slot: "col4"
                    }
                }
            ]
        }
    },
    "navbar_ecommerce": {
        acceptsChildren: true,
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
        acceptsChildren: true,
        name: "Hero - Setup Banner",
        icon: "Sparkles",
        category: "hero",
        desc: "A full-width ambient ambient promotional banner with customizable image background, subtitle, main title, and call to action button.",
        settings: Component_hero_setup_banner_SchemaSettingsMap as any,
        parse: parse_hero_setup_banner_ComponentSettings,
        component: Hero_SetupBanner_Component,
        allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "social_links_block"],
        slotsConfig: {
            split: [
                { id: "left", label: "Left Column", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "social_links_block"] },
                { id: "right", label: "Right Column", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "social_links_block"] }
            ],
            stack: [
                { id: "left", label: "Top Row", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "social_links_block"] },
                { id: "right", label: "Bottom Row", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "social_links_block"] }
            ],
            "full-bleed": [
                { id: "left", label: "Center Content", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "social_links_block"] }
            ]
        },
        defaultChildren: {
            split: [
                { type: "hero_carousel_block", label: "Showcase Carousel", settings: { autoplaySpeed: "4000", slides: [{ title: "Next-Gen Gear", subtitle: "Equip your workspace with the ultimate custom setups.", badgeText: "New Arrival", bgImage: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1200", primaryCtaText: "Explore Now", primaryCtaUrl: "/shop" }], slot: "left" } },
                { type: "specs_block", label: "Specs Matrix", settings: { specList: [{ label: "Processor", value: "Intel Core i9" }, { label: "Graphics", value: "RTX 4090" }], slot: "right" } }
            ],
            stack: [
                { type: "hero_carousel_block", label: "Showcase Carousel", settings: { autoplaySpeed: "4000", slides: [{ title: "Next-Gen Gear", subtitle: "Equip your workspace with the ultimate custom setups.", badgeText: "New Arrival", bgImage: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1200", primaryCtaText: "Explore Now", primaryCtaUrl: "/shop" }], slot: "left" } }
            ]
        }
    }
};

export type { BaseTypes } from "./type";
