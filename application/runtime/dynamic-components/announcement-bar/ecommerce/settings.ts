import { ComponentGlobalSchemaSettingsMapType, ComponentSettingsSchema } from "../../core";

const widgetFields: ComponentSettingsSchema[] = [
    {
        as: "widgetType",
        name: "Widget Type",
        tp: "prop",
        opt: ["text", "link_icon", "carousel", "icons"]
    },
    // Text and Link-Icon text fields
    {
        as: "text",
        name: "Text Content",
        tp: "prop",
        condition: [
            { for: "widgetType", val: "text" },
            { for: "widgetType", val: "link_icon" }
        ],
        rgx: ".*"
    },
    {
        as: "link",
        name: "Link URL Path",
        tp: "prop",
        condition: [{ for: "widgetType", val: "link_icon" }],
        rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*"
    },
    {
        as: "icon",
        name: "Icon Type",
        tp: "prop",
        condition: [{ for: "widgetType", val: "link_icon" }],
        opt: ["phone", "email", "address", "clock", "info"]
    },
    // Carousel Speed on Carousel Settings directly
    {
        as: "autoplaySpeed",
        name: "Carousel Speed (milliseconds)",
        tp: "prop",
        condition: [{ for: "widgetType", val: "carousel" }],
        rgx: "^\\d+$"
    },
    // Carousel Widget
    {
        as: "slides",
        name: "Announcement Carousel Slides",
        tp: "map",
        condition: [{ for: "widgetType", val: "carousel" }],
        fields: [
            {
                as: "text",
                name: "Slide Text",
                rgx: ".*"
            },
            {
                as: "link",
                name: "Slide Link URL (Optional)",
                rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*"
            }
        ]
    },
    // Icons (Socials) Widget
    {
        as: "socials",
        name: "Social Profiles List",
        tp: "map",
        condition: [{ for: "widgetType", val: "icons" }],
        fields: [
            {
                as: "platform",
                name: "Social Platform Name (e.g. facebook, instagram, twitter, youtube, linkedin, tiktok)",
                rgx: ".*"
            },
            {
                as: "url",
                name: "Profile URL",
                rgx: ".*"
            }
        ]
    }
];

export const ComponentAnnouncementBarSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    theme: {
        as: "theme",
        tp: "prop",
        group: "theme",
        name: "Theme Color Mode",
        opt: ["pri", "sec", "bg"]
    },
    fontSize: {
        as: "fontSize",
        tp: "prop",
        group: "typography",
        name: "Text Font Size",
        opt: ["xs", "sm", "base"]
    },
    fontWeight: {
        as: "fontWeight",
        tp: "prop",
        group: "typography",
        name: "Text Font Weight",
        opt: ["normal", "medium", "semibold", "bold"]
    },
    height: {
        as: "height",
        tp: "prop",
        group: "layout",
        name: "Bar Height",
        rgx: "^\\d*(px|rem|%)?$"
    },
    mobileShow: {
        as: "mobileShow",
        tp: "prop",
        group: "layout",
        name: "Show on Mobile Screens",
        opt: ["true", "false"]
    },
    // Left Grid Slot
    leftWidth: {
        as: "leftWidth",
        tp: "prop",
        group: "left_slot",
        name: "Left Slot Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    leftAlign: {
        as: "leftAlign",
        tp: "prop",
        group: "left_slot",
        name: "Left Slot Alignment",
        opt: ["start", "center", "end", "between"]
    },
    leftWidgets: {
        as: "leftWidgets",
        name: "Left Slot Widgets List",
        tp: "map",
        group: "left_slot",
        fields: widgetFields
    },
    // Middle Grid Slot
    middleWidth: {
        as: "middleWidth",
        tp: "prop",
        group: "middle_slot",
        name: "Middle Slot Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    middleAlign: {
        as: "middleAlign",
        tp: "prop",
        group: "middle_slot",
        name: "Middle Slot Alignment",
        opt: ["start", "center", "end", "between"]
    },
    middleWidgets: {
        as: "middleWidgets",
        name: "Middle Slot Widgets List",
        tp: "map",
        group: "middle_slot",
        fields: widgetFields
    },
    // Right Grid Slot
    rightWidth: {
        as: "rightWidth",
        tp: "prop",
        group: "right_slot",
        name: "Right Slot Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    rightAlign: {
        as: "rightAlign",
        tp: "prop",
        group: "right_slot",
        name: "Right Slot Alignment",
        opt: ["start", "center", "end", "between"]
    },
    rightWidgets: {
        as: "rightWidgets",
        name: "Right Slot Widgets List",
        tp: "map",
        group: "right_slot",
        fields: widgetFields
    }
};

export function parseAnnouncementBarComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    const schemaKeys = Object.keys(ComponentAnnouncementBarSchemaSettingsMap);

    schemaKeys.forEach((key) => {
        parsed[key] = settings?.[key] ?? undefined;
    });

    // Handle defaults
    parsed.theme = parsed.theme || "pri";
    parsed.fontSize = parsed.fontSize || "xs";
    parsed.fontWeight = parsed.fontWeight || "normal";
    parsed.height = parsed.height || "36px";
    parsed.mobileShow = parsed.mobileShow ?? "true";

    parsed.leftWidth = parsed.leftWidth || "auto";
    parsed.leftAlign = parsed.leftAlign || "start";
    parsed.middleWidth = parsed.middleWidth || "flex-grow";
    parsed.middleAlign = parsed.middleAlign || "center";
    parsed.rightWidth = parsed.rightWidth || "auto";
    parsed.rightAlign = parsed.rightAlign || "end";

    // DO NOT seed defaults if null or empty - keep them completely empty
    parsed.leftWidgets = Array.isArray(parsed.leftWidgets) ? parsed.leftWidgets : [];
    parsed.middleWidgets = Array.isArray(parsed.middleWidgets) ? parsed.middleWidgets : [];
    parsed.rightWidgets = Array.isArray(parsed.rightWidgets) ? parsed.rightWidgets : [];

    return parsed;
}
