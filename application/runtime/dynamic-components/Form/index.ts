export { default } from './ClientComponent';

export const ComponentFormSchemaSettingsMap = {
    "form-action": {
        as: "action",
        tp: "prop",
        rgx: "^\\/.+$"
    },
    "form-method": {
        as: "method",
        tp: "prop",
        opt: ["GET", "POST"]
    },
    "form-layout": {
        as: "layout",
        tp: "prop",
        opt: ["block", "flex-row", "flex-col"]
    },
    "form-gap": {
        as: "gap",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "form-autocomplete": {
        as: "autoComplete",
        tp: "prop",
        opt: ["on", "off"]
    },
    "form-novalidate": {
        as: "noValidate",
        tp: "prop",
        opt: ["true", "false"]
    },
    "form-padding": {
        as: "padding",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "form-bg": {
        as: "background",
        tp: "style",
        rgx: "^#[0-9a-fA-F]{6}$"
    },
    "form-radius": {
        as: "borderRadius",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "form-id-hook": {
        as: "idHook",
        tp: "prop",
        rgx: "^[a-zA-Z0-9_-]+$"
    }
};
