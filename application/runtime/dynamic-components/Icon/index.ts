export { default } from './Component';

export const ComponentIconSchemaSettingsMap = {
    "icon-name": {
        as: "iconName",
        tp: "prop",
        opt: ["map-pin", "phone", "search", "shopping-cart", "user", "menu", "chevron-down", "heart"]
    },
    "icon-size": {
        as: "width",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "icon-color": {
        as: "stroke",
        tp: "style",
        rgx: "^(#[0-9a-fA-F]{3,8}|var\\(--.*\\))$"
    },
    "icon-stroke-width": {
        as: "strokeWidth",
        tp: "style",
        opt: ["1", "1.5", "2", "2.5", "3"]
    },
    "icon-fill": {
        as: "fill",
        tp: "style",
        opt: ["none", "currentColor", "theme-accent"]
    },
    "icon-animation": {
        as: "animation",
        tp: "prop",
        opt: ["none", "spin", "pulse", "bounce"]
    },
    "icon-transition-speed": {
        as: "transitionDuration",
        tp: "style",
        rgx: "^\\d+ms$"
    },
    "icon-viewbox": {
        as: "viewBox",
        tp: "prop",
        rgx: "^0\\s+0\\s+\\d+\\s+\\d+$"
    },
    "icon-hover-color": {
        as: "hoverColor",
        tp: "prop",
        opt: ["none", "turn-primary", "turn-white"]
    },
    "icon-aria-hidden": {
        as: "ariaHidden",
        tp: "prop",
        opt: ["true", "false"]
    }
};
