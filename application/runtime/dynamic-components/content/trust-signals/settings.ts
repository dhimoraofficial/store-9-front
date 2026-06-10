import { ComponentGlobalSchemaSettingsMapType, LUCIDE_ICON_NAMES } from "../../core";

export const ComponentTrustSignalsSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    layoutVariant: {
        as: "layoutVariant",
        tp: "prop",
        name: "Layout Variant",
        description: "Choose classic (horizontal card icons), minimal (centered text, no card bg), or custom (DB-driven children).",
        opt: ["classic", "minimal", "custom"]
    },
    signals: {
        as: "signals",
        name: "Trust Signals List",
        tp: "map",
        fields: [
            {
                as: "title",
                name: "Signal Title",
                rgx: ".*"
            },
            {
                as: "desc",
                name: "Signal Subtext",
                rgx: ".*"
            },
            {
                as: "icon",
                name: "Lucide Icon Name",
                opt: LUCIDE_ICON_NAMES,
                rgx: "^[a-zA-Z0-9-]*$"
            }
        ]
    },
    iconColor: {
        as: "iconColor",
        tp: "prop",
        name: "Icon Color",
        description: "Hex color code for the icons.",
        rgx: "^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
    },
    iconBgColor: {
        as: "iconBgColor",
        tp: "prop",
        name: "Icon Background Color",
        description: "Hex or color class for the icon rounded bg (classic layout).",
        rgx: ".*"
    }
};

export function parseTrustSignalsComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };
    if (!parsed.layoutVariant) parsed.layoutVariant = "classic";
    parsed.signals = Array.isArray(settings?.signals) ? settings.signals : [
        { title: "Free Shipping", desc: "On all orders over Rs. 50,000", icon: "Truck" },
        { title: "100% Genuine", desc: "Official Manufacturer Warranty", icon: "BadgeCheck" },
        { title: "Secure Payment", desc: "Encrypted Checkout Systems", icon: "Shield" }
    ];
    if (!parsed.iconColor) parsed.iconColor = "#E11D2E";
    if (!parsed.iconBgColor) parsed.iconBgColor = "#F3F4F6";
    return parsed;
}
