import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentNavbarSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    layoutVariant: {
        as: "layoutVariant",
        tp: "prop",
        group: "layout",
        name: "Navbar Layout Style",
        description: "Controls the position and arrangement of the logo, search bar, links, and utility icons in the header.",
        opt: [
            "single-row",
            "double-row",
            "glassmorphic-sticky"
        ]
    },
    activeIndicator: {
        as: "activeIndicator",
        tp: "prop",
        group: "layout",
        name: "Active Page Highlight Effect",
        description: "Choose how the active page navigation link is highlighted.",
        opt: ["none", "underline", "pill"]
    },
    backgroundColor: {
        as: "backgroundColor",
        tp: "prop",
        group: "branding",
        name: "Navbar Background Color",
        description: "Custom CSS background color code (e.g. #ffffff, rgba(0,0,0,0.8)).",
        rgx: ".*"
    },
    hoverStyle: {
        as: "hoverStyle",
        tp: "prop",
        group: "branding",
        name: "Menu Item Hover Transition Effect",
        description: "Select the micro-animation style to trigger on hover of navigation links.",
        opt: ["text-primary", "glow-bg", "scale-up", "slide-underline"]
    },
    enableGlassmorphism: {
        as: "enableGlassmorphism",
        tp: "prop",
        group: "branding",
        name: "Enable Sticky Glassmorphism Blur",
        description: "Toggle translucent backdrop blur styling for the sticky header container.",
        opt: ["true", "false"]
    },
    mobileTriggerAlign: {
        as: "mobileTriggerAlign",
        tp: "prop",
        group: "responsive",
        name: "Mobile Trigger Alignment",
        description: "Align the hamburger menu trigger on left or right in mobile viewport.",
        opt: ["left", "right"]
    },
    mobileLogoAlign: {
        as: "mobileLogoAlign",
        tp: "prop",
        group: "responsive",
        name: "Mobile Logo Alignment",
        description: "Position the logo brand on left or center in mobile viewport.",
        opt: ["left", "center"]
    },
    mobileSearchPosition: {
        as: "mobileSearchPosition",
        tp: "prop",
        group: "responsive",
        name: "Mobile Search Position",
        description: "Choose where the search input is placed on mobile viewports.",
        opt: ["header", "drawer", "hidden"]
    },
    mobileUtilitiesPosition: {
        as: "mobileUtilitiesPosition",
        tp: "prop",
        group: "responsive",
        name: "Mobile Utilities Position",
        description: "Choose where the utility icons (cart, account, wishlist) are placed on mobile.",
        opt: ["header", "drawer", "hidden"]
    }
};

export function parseNavbarComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };

    // Boolean configurations
    parsed.enableGlassmorphism = parsed.enableGlassmorphism === "true" || parsed.enableGlassmorphism === true;

    // Fallback options
    if (!parsed.layoutVariant) parsed.layoutVariant = "single-row";
    if (!parsed.activeIndicator) parsed.activeIndicator = "none";
    if (!parsed.hoverStyle) parsed.hoverStyle = "text-primary";
    if (!parsed.backgroundColor) parsed.backgroundColor = "";

    if (!parsed.mobileTriggerAlign) parsed.mobileTriggerAlign = "right";
    if (!parsed.mobileLogoAlign) parsed.mobileLogoAlign = "left";
    if (!parsed.mobileSearchPosition) parsed.mobileSearchPosition = "drawer";
    if (!parsed.mobileUtilitiesPosition) parsed.mobileUtilitiesPosition = "header";

    return parsed;
}
