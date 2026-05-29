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
    "box-border-top": {
        as: "borderTop",
        tp: "style",
        rgx: "^\\d+px\\s+(solid|dashed|dotted)\\s+.+$"
    },
    "box-border-bottom": {
        as: "borderBottom",
        tp: "style",
        rgx: "^\\d+px\\s+(solid|dashed|dotted)\\s+.+$"
    },
    "box-visibility": {
        as: "visibility",
        tp: "prop",
        opt: ["all", "desktop-only", "mobile-only"]
    },
    "box-position": {
        as: "position",
        tp: "style",
        opt: ["relative", "absolute", "fixed", "sticky"]
    },
    "box-top": {
        as: "top",
        tp: "style",
        rgx: "^-?\\d*\\.?\\d+(px|rem|%)?$"
    },
    "box-bottom": {
        as: "bottom",
        tp: "style",
        rgx: "^-?\\d*\\.?\\d+(px|rem|%)?$"
    },
    "box-left": {
        as: "left",
        tp: "style",
        rgx: "^-?\\d*\\.?\\d+(px|rem|%)?$"
    },
    "box-right": {
        as: "right",
        tp: "style",
        rgx: "^-?\\d*\\.?\\d+(px|rem|%)?$"
    },
    "box-transform": {
        as: "transform",
        tp: "style",
        rgx: ".+"
    },
    "box-overflow-x": {
        as: "overflowX",
        tp: "style",
        opt: ["hidden", "visible", "auto", "scroll"]
    },
    "box-overflow-y": {
        as: "overflowY",
        tp: "style",
        opt: ["hidden", "visible", "auto", "scroll"]
    },
    "box-scroll-behavior": {
        as: "scrollBehavior",
        tp: "style",
        opt: ["smooth", "auto"]
    },
    "box-flex-wrap": {
        as: "flexWrap",
        tp: "style",
        opt: ["wrap", "nowrap", "wrap-reverse"]
    },
    "box-grid-cols": {
        as: "gridTemplateColumns",
        tp: "style",
        rgx: ".+"
    },
    "box-col-span": {
        as: "gridColumn",
        tp: "style",
        rgx: "^(span\\s+\\d+|\\d+\\s*/\\s*\\d+|\\d+\\s*/\\s*span\\s+\\d+|auto)$"
    },
    "box-row-span": {
        as: "gridRow",
        tp: "style",
        rgx: "^(span\\s+\\d+|\\d+\\s*/\\s*\\d+|\\d+\\s*/\\s*span\\s+\\d+|auto)$"
    },
    "box-col-start": {
        as: "gridColumnStart",
        tp: "style",
        rgx: "^(\\d+|auto)$"
    },
    "box-row-start": {
        as: "gridRowStart",
        tp: "style",
        rgx: "^(\\d+|auto)$"
    },
    "box-shadow": {
        as: "boxShadow",
        tp: "style",
        rgx: ".+"
    },
    "box-z-index": {
        as: "zIndex",
        tp: "style",
        rgx: "^-?\\d+$"
    },
    "box-cursor": {
        as: "cursor",
        tp: "style",
        opt: ["pointer", "default", "not-allowed", "grab", "grabbing"]
    },
    "box-flex": {
        as: "flex",
        tp: "style",
        rgx: ".+"
    },
    "box-bg-image": {
        as: "backgroundImage",
        tp: "style",
        rgx: ".+"
    },
    "box-bg-size": {
        as: "backgroundSize",
        tp: "style",
        opt: ["cover", "contain", "auto"]
    },
    "box-bg-position": {
        as: "backgroundPosition",
        tp: "style",
        opt: ["center", "top", "bottom", "left", "right", "top left", "top right", "bottom left", "bottom right"]
    },
    "box-min-height": {
        as: "minHeight",
        tp: "style",
        rgx: "^\\d*\\.?\\d+(px|rem|%)?$"
    }
};
