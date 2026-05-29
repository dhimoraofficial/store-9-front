export { default } from './Component';

export const ComponentTextSchemaSettingsMap = {
    "content": {
        as: "content",
        tp: "prop",   
    },
    "text-element": {
        as: "element",
        tp: "prop",
        opt: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong"]
    },
    "text-size": {
        as: "fontSize",
        tp: "style",
        rgx: "^(\\d*\\.?\\d+(px|rem|em)|var\\(--.*\\))$"
    },
    "text-weight": {
        as: "fontWeight",
        tp: "style",
        opt: ["300", "400", "500", "600", "700", "800", "900", "bold", "normal"]
    },
    "text-color": {
        as: "color",
        tp: "style",
        rgx: "^(#[0-9a-fA-F]{3,8}|var\\(--.*\\))$"
    },
    "text-align": {
        as: "textAlign",
        tp: "style",
        opt: ["left", "center", "right", "justify"]
    },
    "text-transform": {
        as: "textTransform",
        tp: "style",
        opt: ["none", "capitalize", "uppercase", "lowercase"]
    },
    "text-line-height": {
        as: "lineHeight",
        tp: "style",
        rgx: "^[0-9.]+(px|em|rem)?$"
    },
    "text-spacing": {
        as: "letterSpacing",
        tp: "style",
        rgx: "^-?[0-9.]+(px|em|rem)$"
    },
    "text-overflow": {
        as: "overflow",
        tp: "prop",
        opt: ["clip", "ellipsis", "truncate-2-lines"]
    },
    "text-line-clamp": {
        as: "lineClamp",
        tp: "style",
        rgx: "^\\d+$"
    },
    "text-font-style": {
        as: "fontStyle",
        tp: "style",
        opt: ["normal", "italic", "oblique"]
    },
    "text-hover": {
        as: "hoverEffect",
        tp: "prop",
        opt: ["none", "underline", "color-change"]
    },
    "text-font-family": {
        as: "fontFamily",
        tp: "style",
        rgx: ".+"
    },
    "text-transform-custom": {
        as: "transform",
        tp: "style",
        rgx: ".+"
    },
    "text-display": {
        as: "display",
        tp: "style",
        opt: ["block", "inline", "inline-block", "flex", "none"]
    }
};
