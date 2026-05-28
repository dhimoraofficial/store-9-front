export { default } from './ClientComponent';

export const ComponentInputSchemaSettingsMap = {
    "input-type": {
        as: "inputType",
        tp: "prop",
        opt: ["text", "search", "email", "tel", "password", "number"]
    },
    "input-placeholder": {
        as: "inputPlaceholder",
        tp: "prop",
        rgx: "^.+$"
    },
    "input-name": {
        as: "inputName",
        tp: "prop",
        rgx: "^[a-zA-Z0-9_-]+$"
    },
    "input-value": {
        as: "inputValue",
        tp: "prop",
        rgx: ".*"
    },
    "input-padding": {
        as: "padding",
        tp: "style",
        rgx: "^\\d+px(\\s+\\d+px){0,3}$"
    },
    "input-border-color": {
        as: "borderColor",
        tp: "style",
        rgx: "^#[0-9a-fA-F]{6}$"
    },
    "input-focus-border": {
        as: "inputFocusBorder",
        tp: "prop",
        opt: ["theme-primary", "black", "none"]
    },
    "input-radius": {
        as: "borderRadius",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "input-font-size": {
        as: "fontSize",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "input-clear-button": {
        as: "inputClearButton",
        tp: "prop",
        opt: ["true", "false"]
    }
};
