export { default } from './ClientComponent';

export const ComponentImageSchemaSettingsMap = {
    "img-src": {
        as: "src",
        tp: "prop",
        rgx: "^(\\/|https?:\\/\\/).+$"
    },
    "img-alt": {
        as: "alt",
        tp: "prop",
        rgx: "^.+$"
    },
    "img-loading": {
        as: "loading",
        tp: "prop",
        opt: ["lazy", "eager"]
    },
    "img-object-fit": {
        as: "objectFit",
        tp: "style",
        opt: ["cover", "contain", "fill", "none"]
    },
    "img-aspect-ratio": {
        as: "aspectRatio",
        tp: "style",
        rgx: "^(\\d+\\/\\d+|auto)$"
    },
    "img-width": {
        as: "width",
        tp: "style",
        rgx: "^(\\d*\\.?\\d+(px|%|rem)|auto)$"
    },
    "img-height": {
        as: "height",
        tp: "style",
        rgx: "^(\\d*\\.?\\d+(px|%|rem)|auto)$"
    },
    "img-radius": {
        as: "borderRadius",
        tp: "style",
        rgx: "^\\d*\\.?\\d+(px|rem|%)?$"
    },
    "img-fallback": {
        as: "fallbackSrc",
        tp: "prop",
        rgx: "^\\/.+$"
    },
    "img-priority": {
        as: "priority",
        tp: "prop",
        opt: ["true", "false"]
    }
};
