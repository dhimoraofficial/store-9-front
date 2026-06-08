import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentHeroBannerBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    title: { as: "title", tp: "prop", name: "Heading / Banner Title", rgx: ".*" },
    subtitle: { as: "subtitle", tp: "prop", name: "Description Text", rgx: ".*" },
    badgeText: { as: "badgeText", tp: "prop", name: "Badge Text", rgx: ".*" },
    bgImage: { as: "bgImage", tp: "prop", name: "Background Image URL (Optional)", rgx: ".*" },
    primaryCtaText: { as: "primaryCtaText", tp: "prop", name: "Primary CTA Button Label", rgx: ".*" },
    primaryCtaUrl: { as: "primaryCtaUrl", tp: "prop", name: "Primary CTA URL Target", rgx: ".*" },
    secondaryCtaText: { as: "secondaryCtaText", tp: "prop", name: "Secondary CTA Button Label", rgx: ".*" },
    secondaryCtaUrl: { as: "secondaryCtaUrl", tp: "prop", name: "Secondary CTA URL Target", rgx: ".*" },
    height: { as: "height", name: "Banner Box Height (e.g. 380px)", tp: "prop", rgx: "^\\d*(px|rem|%)?$" }
};

export function parseHeroBannerComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.title = settings?.title ?? "";
    parsed.subtitle = settings?.subtitle ?? "";
    parsed.badgeText = settings?.badgeText ?? "";
    parsed.bgImage = settings?.bgImage ?? "";
    parsed.primaryCtaText = settings?.primaryCtaText ?? "";
    parsed.primaryCtaUrl = settings?.primaryCtaUrl ?? "";
    parsed.secondaryCtaText = settings?.secondaryCtaText ?? "";
    parsed.secondaryCtaUrl = settings?.secondaryCtaUrl ?? "";
    parsed.height = settings?.height ?? "380px";
    return parsed;
}
