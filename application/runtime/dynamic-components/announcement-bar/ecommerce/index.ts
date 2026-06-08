import { BaseTypes, ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import {
    ComponentAnnouncementBarSchemaSettingsMap,
    parseAnnouncementBarComponentSettings
} from "./settings";

export const AAnnouncementBarEcommerceComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Announcement Bar - eCommerce Premium",
    icon: "Megaphone",
    category: "layout",
    desc: "A highly customizable premium announcement bar with dynamic layout slots for text, links, and socials.",
    settings: ComponentAnnouncementBarSchemaSettingsMap,
    parse: parseAnnouncementBarComponentSettings,
    component: Component,
    allowedChildren: ["text_block", "rich_text_block", "link_icon_block", "social_links_block", "text_carousel"] as BaseTypes[],
    slotsConfig: {
        "1-column": [
            { id: "center", label: "Center Section", allowedChildren: ["text_block", "rich_text_block", "link_icon_block", "text_carousel"] }
        ],
        "3-column": [
            { id: "left", label: "Left Section", allowedChildren: ["text_block", "rich_text_block", "link_icon_block"] },
            { id: "middle", label: "Middle Section", allowedChildren: ["text_block", "rich_text_block", "text_carousel"] },
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
};
