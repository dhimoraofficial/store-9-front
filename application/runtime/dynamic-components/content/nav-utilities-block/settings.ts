import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentNavUtilitiesBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    wishlistShow: {
        as: "wishlistShow",
        tp: "prop",
        name: "Show Wishlist Icon Button",
        opt: ["true", "false"]
    },
    cartShow: {
        as: "cartShow",
        tp: "prop",
        name: "Show Cart Icon Button",
        opt: ["true", "false"]
    },
    accountShow: {
        as: "accountShow",
        tp: "prop",
        name: "Show Account Icon Button",
        opt: ["true", "false"]
    },
    iconSize: {
        as: "iconSize",
        tp: "prop",
        name: "Icon Sizing Mode",
        opt: ["small", "medium", "large"]
    }
};

export function parseNavUtilitiesBlockComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };
    parsed.wishlistShow = parsed.wishlistShow === "true" || parsed.wishlistShow === true;
    parsed.cartShow = parsed.cartShow === "true" || parsed.cartShow === true;
    parsed.accountShow = parsed.accountShow === "true" || parsed.accountShow === true;
    if (!parsed.iconSize) parsed.iconSize = "medium";
    return parsed;
}
