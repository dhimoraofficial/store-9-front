export { default } from './Component';

export const ComponentButtonSchemaSettingsMap = {
    "btn-variant": {
        as: "variant",
        tp: "prop",
        opt: ["primary", "secondary", "outline", "ghost", "icon-only"]
    },
    "btn-size": {
        as: "buttonSize",
        tp: "prop",
        opt: ["sm", "md", "lg"]
    },
    "btn-width": {
        as: "width",
        tp: "style",
        opt: ["auto", "100%"]
    },
    "btn-radius": {
        as: "borderRadius",
        tp: "style",
        rgx: "^\\d+(px|rem)?$"
    },
    "btn-loading": {
        as: "loading",
        tp: "prop",
        opt: ["true", "false"]
    },
    "btn-disabled": {
        as: "disabled",
        tp: "prop",
        opt: ["true", "false"]
    },
    "btn-bg-override": {
        as: "backgroundColor",
        tp: "style",
        rgx: "^#[0-9a-fA-F]{6}$"
    },
    "btn-text-color": {
        as: "color",
        tp: "style",
        rgx: "^#[0-9a-fA-F]{6}$"
    },
    "btn-elevation": {
        as: "boxShadow",
        tp: "style",
        opt: ["none", "sm", "md", "lg"]
    },
    "btn-type": {
        as: "type",
        tp: "prop",
        opt: ["button", "submit", "reset"]
    }
};
