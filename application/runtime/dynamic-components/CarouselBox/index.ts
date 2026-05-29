export * from './ClientComponent';

export const ComponentCarouselBoxSchemaSettingsMap = {
    // Carousel specific settings
    "auto-play": {
        as: "autoPlay",
        tp: "prop",
        opt: ["true", "false"]
    },
    "interval-speed": {
        as: "intervalSpeed",
        tp: "prop",
        rgx: "^\\d+$"
    },
    "show-arrows": {
        as: "showArrows",
        tp: "prop",
        opt: ["true", "false"]
    },
    "show-dots": {
        as: "showDots",
        tp: "prop",
        opt: ["true", "false"]
    },
    "overflow-behavior": {
        as: "overflowBehavior",
        tp: "prop",
        opt: ["free-scroll", "snap-to-slide"]
    },

    // Box container settings for styling the wrapper
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
        rgx: "^\\d+(px|rem|%)?$"
    },
    "box-border": {
        as: "border",
        tp: "style",
        rgx: "^\\d+px\\s+(solid|dashed|dotted)\\s+.+$"
    }
};
