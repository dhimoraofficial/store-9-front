import { ComponentGlobalSchemaSettingsMapType } from "../../core";
import { BaseTypes } from "../../type";

export const ComponentFooterSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    theme: {
        as: "theme",
        tp: "prop",
        group: "layout",
        name: "Footer Theme Mode",
        description: "Pick the background color theme (light, dark, or slate) for the footer.",
        opt: ["light", "dark", "slate"]
    },
    backgroundColor: {
        as: "backgroundColor",
        tp: "prop",
        group: "layout",
        name: "Footer Background Color",
        description: "Custom CSS background color/gradient code for the footer container (e.g. #0f172a, linear-gradient(...)).",
        rgx: ".*"
    },
    copyright: {
        as: "copyright",
        tp: "prop",
        group: "layout",
        name: "Copyright Notice Text",
        description: "The copyright notice text displayed at the bottom of the footer.",
        rgx: ".*"
    },
    mobileGridColumns: {
        as: "mobileGridColumns",
        tp: "prop",
        group: "responsive",
        name: "Mobile Grid Columns",
        description: "Specify if footer columns lay out in a single-column list or a 2-column grid on mobile viewports.",
        opt: ["1", "2"]
    },
    mobileAlignment: {
        as: "mobileAlignment",
        tp: "prop",
        group: "responsive",
        name: "Mobile Content Alignment",
        description: "Align footer contents on mobile viewports (inherit desktop alignment or force center/left).",
        opt: ["inherit", "center", "left"]
    }
};

export function parseFooterComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };

    // Fallbacks
    if (!parsed.theme) parsed.theme = "light";
    if (!parsed.backgroundColor) parsed.backgroundColor = "";
    if (!parsed.copyright) parsed.copyright = `© ${new Date().getFullYear()}`;
    if (!parsed.mobileGridColumns) parsed.mobileGridColumns = "1";
    if (!parsed.mobileAlignment) parsed.mobileAlignment = "inherit";

    return parsed;
}


export const ComponentFooterSchemaChildrensMap: BaseTypes[] = [
    "box_block", "container_block", "link_group_block", "text_block", "rich_text_block", "social_links_block", "link_icon_block"
]

export const ComponentFooterDefaultChildrensMap = [
    {
        type: "box_block",
        label: "Column 1: Info",
        settings: { direction: "column", width: "flex-grow" },
        children: [
            { type: "text_block", label: "Brand Logo", settings: { text: "Company name", asLink: false, fontWeight: "bold" } },
            { type: "text_block", label: "Description", settings: { text: "Company description", asLink: false } }
        ]
    },
    {
        type: "box_block",
        label: "Column 2: Links",
        settings: { direction: "column", width: "auto" },
        children: [
            {
                type: "link_group_block",
                label: "Quick Links",
                settings: { title: "Quick Links" },
                children: [
                    { type: "link_block", label: "Shop All", settings: { text: "Shop All", href: "/shop" } },
                    { type: "link_block", label: "New Arrivals", settings: { text: "New Arrivals", href: "/shop/new" } },
                    { type: "link_block", label: "Best Sellers", settings: { text: "Best Sellers", href: "/shop/popular" } }
                ]
            }
        ]
    },
    {
        type: "box_block",
        label: "Column 3: Support",
        settings: { direction: "column", width: "auto" },
        children: [
            {
                type: "link_group_block",
                label: "Support",
                settings: { title: "Support Links" },
                children: [
                    { type: "link_block", label: "Contact Us", settings: { text: "Contact Us", href: "/contact" } },
                    { type: "link_block", label: "FAQs", settings: { text: "FAQs", href: "/faqs" } },
                    { type: "link_block", label: "Returns", settings: { text: "Returns & Exchanges", href: "/returns" } }
                ]
            }
        ]
    },
    {
        type: "box_block",
        label: "Column 4: Social",
        settings: { direction: "column", width: "flex-grow" },
        children: [
            {
                type: "social_links_block",
                label: "Social Badges",
                settings: {
                    platforms: [
                        { platform: "facebook", url: "https://facebook.com" },
                        { platform: "instagram", url: "https://instagram.com" },
                        { platform: "youtube", url: "https://youtube.com" }
                    ]
                }
            }
        ]
    }
];
