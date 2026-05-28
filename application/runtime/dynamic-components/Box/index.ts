export { default } from './Component';

// Add this entry to your ComponentGlobalSchemaSettingsMap
export const ComponentBoxSchemaSettingsMap = {
    "box-display": {
        as: "display",
        tp: "prop",
        opt: ["block", "flex", "grid", "inline-flex"]
    },
    "box-direction": {
        as: "direction",
        tp: "prop",
        opt: ["row", "row-reverse", "col", "col-reverse"]
    },
    "box-justify": {
        as: "justifyContent",
        tp: "style"
    },
    "box-align": {
        as: "alignItems",
        tp: "style"
    },
    "box-gap": {
        as: "gap",
        tp: "style",
        rgx: "^\\d*\\.?\\d+(px|rem|em|%)?$"
    },
    "box-padding": {
        as: "padding",
        tp: "style",
        rgx: "^\\d+px(\\s+\\d+px){0,3}$"
    },
    "box-bg": {
        as: "background",
        tp: "style",
        rgx: "^(#[0-9a-fA-F]{3,8}|rgba?\\(.*\\)|linear-gradient\\(.*\\)|var\\(--.*\\))$"
    },
    "box-radius": {
        as: "borderRadius",
        tp: "style",
        rgx: "^\\d*\\.?\\d+(px|rem|%)?$"
    },
    "box-border": {
        as: "border",
        tp: "style",
        rgx: "^\\d+px\\s+(solid|dashed|dotted)\\s+.+$"
    },
    "box-visibility": {
        as: "visibility",
        tp: "prop",
        opt: ["all", "desktop-only", "mobile-only"]
    }
};
