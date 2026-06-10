import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentLogoBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    logoSrc: {
        as: "logoSrc",
        tp: "prop",
        name: "Store Logo Image URL",
        description: "Specify an image URL for the branding logo.",
        rgx: ".*"
    },
    logoHeight: {
        as: "logoHeight",
        tp: "prop",
        name: "Logo Render Height Limit",
        description: "Set the height of the logo image (e.g. 40px, 50px).",
        rgx: "^\\d*(px|rem|%)?$"
    },
    brandName: {
        as: "brandName",
        tp: "prop",
        name: "Brand Name",
        description: "The main text name displayed next to the logo.",
        rgx: ".*"
    },
    brandSlogan: {
        as: "brandSlogan",
        tp: "prop",
        name: "Brand Slogan Tagline",
        description: "A small uppercase tagline rendered below the brand name.",
        rgx: ".*"
    }
};

export function parseLogoBlockComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };
    if (!parsed.logoSrc) parsed.logoSrc = "";
    if (!parsed.logoHeight) parsed.logoHeight = "40px";
    if (!parsed.brandName) parsed.brandName = "";
    if (!parsed.brandSlogan) parsed.brandSlogan = "";
    return parsed;
}
