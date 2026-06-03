import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentNavbarSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    logo: {
        as: "logo",
        tp: "prop",
        rgx: ".*"
    },
    links: {
        as: "links",
        tp: "prop",
        rgx: ".*"
    }
};

export function parseNavbarComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };
    if (typeof parsed.links === "string") {
        parsed.links = parsed.links.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    return parsed;
}
