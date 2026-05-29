export { default } from './ClientComponent';

export const ComponentLinkSchemaSettingsMap = {
    "link-href": {
        as: "href",
        tp: "prop",
        rgx: "^(\\/|https?:\\/\\/).+$"
    },
    "link-target": {
        as: "target",
        tp: "prop",
        opt: ["_self", "_blank"]
    },
    "link-title": {
        as: "title",
        tp: "prop",
        rgx: "^.+$"
    },
    "link-display": {
        as: "display",
        tp: "prop",
        opt: ["inline", "block", "flex-row", "flex-col"]
    },
    "link-padding": {
        as: "padding",
        tp: "style",
        rgx: "^\\d+px(\\s+\\d+px){0,3}$"
    },
    "link-hover-bg": {
        as: "hoverBg",
        tp: "prop",
        opt: ["transparent", "bg-ghost", "bg-accent"]
    },
    "link-hover-color": {
        as: "hoverColor",
        tp: "style",
        rgx: "^#[0-9a-fA-F]{3,8}$"
    },
    "link-decoration": {
        as: "textDecoration",
        tp: "style",
        opt: ["none", "underline"]
    },
    "link-smooth-transition": {
        as: "smoothTransition",
        tp: "prop",
        opt: ["true", "false"]
    },
    "link-analytics-id": {
        as: "analyticsId",
        tp: "prop",
        rgx: "^[a-zA-Z0-9_-]+$"
    },
    "link-flex-shrink": {
        as: "flexShrink",
        tp: "style",
        rgx: "^[01]$"
    }
};
