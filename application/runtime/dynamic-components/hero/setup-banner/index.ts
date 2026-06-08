import { BaseTypes, ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentHeroSchemaSettingsMap,
    parseHeroComponentSettings
} from "./settings";

export const AHeroSetupBannerComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Hero - Setup Banner",
    icon: "Sparkles",
    category: "hero",
    desc: "A full-width ambient ambient promotional banner with customizable image background, subtitle, main title, and call to action button.",
    settings: ComponentHeroSchemaSettingsMap,
    parse: parseHeroComponentSettings,
    component: Component,
    allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "rich_text_block", "social_links_block"] as BaseTypes[],
    slotsConfig: {
        split: [
            { id: "left", label: "Left Column", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "rich_text_block", "social_links_block"] },
            { id: "right", label: "Right Column", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "rich_text_block", "social_links_block"] }
        ],
        stack: [
            { id: "left", label: "Top Row", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "rich_text_block", "social_links_block"] },
            { id: "right", label: "Bottom Row", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "rich_text_block", "social_links_block"] }
        ],
        "full-bleed": [
            { id: "left", label: "Center Content", allowedChildren: ["hero_carousel_block", "hero_banner_block", "search_block", "specs_block", "text_block", "rich_text_block", "social_links_block"] }
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
};
