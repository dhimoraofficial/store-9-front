import { ComponentGlobalSchemaSettingsMapType, ComponentSettingsSchema } from "../../core";

const widgetFields: ComponentSettingsSchema[] = [
    {
        as: "widgetType",
        name: "Widget Type",
        tp: "prop",
        opt: ["logo", "contact_info", "nav_menu", "newsletter", "social_links", "app_downloads", "secure_badge"]
    },
    // logo fields
    {
        as: "logoSrc",
        name: "Logo Image URL",
        tp: "prop",
        condition: [{ for: "widgetType", val: "logo" }],
        rgx: ".*"
    },
    {
        as: "logoHeight",
        name: "Logo Height",
        tp: "prop",
        condition: [{ for: "widgetType", val: "logo" }],
        rgx: "^\\d*(px|rem|%)?$"
    },
    {
        as: "brandName",
        name: "Brand Name",
        tp: "prop",
        condition: [{ for: "widgetType", val: "logo" }],
        rgx: ".*"
    },
    {
        as: "description",
        name: "Brand Description",
        tp: "prop",
        condition: [{ for: "widgetType", val: "logo" }],
        rgx: ".*"
    },
    // contact_info fields
    {
        as: "address",
        name: "Physical Office Address",
        tp: "prop",
        condition: [{ for: "widgetType", val: "contact_info" }],
        rgx: ".*"
    },
    {
        as: "phone",
        name: "Support Hotline Telephone",
        tp: "prop",
        condition: [{ for: "widgetType", val: "contact_info" }],
        rgx: ".*"
    },
    {
        as: "email",
        name: "Support Desk Email",
        tp: "prop",
        condition: [{ for: "widgetType", val: "contact_info" }],
        rgx: ".*"
    },
    // nav_menu fields
    {
        as: "menuTitle",
        name: "Menu Title Header",
        tp: "prop",
        condition: [{ for: "widgetType", val: "nav_menu" }],
        rgx: ".*"
    },
    {
        as: "links",
        name: "Navigation links list",
        tp: "map",
        condition: [{ for: "widgetType", val: "nav_menu" }],
        fields: [
            {
                as: "link",
                name: "Destination Link URL",
                tp: "prop",
                rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*"
            },
            {
                as: "text",
                name: "Display Label Text",
                tp: "prop",
                rgx: ".*"
            }
        ]
    },
    // newsletter fields
    {
        as: "newsletterTitle",
        name: "Newsletter Header Title",
        tp: "prop",
        condition: [{ for: "widgetType", val: "newsletter" }],
        rgx: ".*"
    },
    {
        as: "newsletterDesc",
        name: "Newsletter Promo Subtitle",
        tp: "prop",
        condition: [{ for: "widgetType", val: "newsletter" }],
        rgx: ".*"
    },
    {
        as: "buttonText",
        name: "Submit Button Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "newsletter" }],
        rgx: ".*"
    },
    // social_links fields
    {
        as: "socials",
        name: "Social Media network links list",
        tp: "map",
        condition: [{ for: "widgetType", val: "social_links" }],
        fields: [
            {
                as: "platform",
                name: "Social Platform Name (e.g. facebook, instagram)",
                tp: "prop",
                rgx: ".*"
            },
            {
                as: "url",
                name: "Account Profile URL",
                tp: "prop",
                rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*"
            }
        ]
    },
    // app_downloads fields
    {
        as: "playStoreUrl",
        name: "Google Play Store Download URL",
        tp: "prop",
        condition: [{ for: "widgetType", val: "app_downloads" }],
        rgx: ".*"
    },
    {
        as: "appStoreUrl",
        name: "Apple App Store Download URL",
        tp: "prop",
        condition: [{ for: "widgetType", val: "app_downloads" }],
        rgx: ".*"
    },
    // secure_badge fields
    {
        as: "badgeText",
        name: "Secure SSL Badge Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "secure_badge" }],
        rgx: ".*"
    }
];

export const ComponentFooterSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    theme: {
        as: "theme",
        tp: "prop",
        group: "layout",
        name: "Footer Theme Mode",
        description: "Pick the background color theme (light, dark, or slate) for the footer.",
        opt: ["light", "dark", "slate"]
    },
    copyright: {
        as: "copyright",
        tp: "prop",
        group: "layout",
        name: "Copyright Notice Text",
        description: "The copyright notice text displayed at the bottom of the footer.",
        rgx: ".*"
    },
    // Column 1
    col1Width: {
        as: "col1Width",
        tp: "prop",
        group: "column_1",
        name: "Column 1 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col1Align: {
        as: "col1Align",
        tp: "prop",
        group: "column_1",
        name: "Column 1 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    col1Widgets: {
        as: "col1Widgets",
        tp: "map",
        group: "column_1",
        name: "Column 1 Widgets",
        fields: widgetFields
    },
    // Column 2
    col2Width: {
        as: "col2Width",
        tp: "prop",
        group: "column_2",
        name: "Column 2 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col2Align: {
        as: "col2Align",
        tp: "prop",
        group: "column_2",
        name: "Column 2 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    col2Widgets: {
        as: "col2Widgets",
        tp: "map",
        group: "column_2",
        name: "Column 2 Widgets",
        fields: widgetFields
    },
    // Column 3
    col3Width: {
        as: "col3Width",
        tp: "prop",
        group: "column_3",
        name: "Column 3 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col3Align: {
        as: "col3Align",
        tp: "prop",
        group: "column_3",
        name: "Column 3 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    col3Widgets: {
        as: "col3Widgets",
        tp: "map",
        group: "column_3",
        name: "Column 3 Widgets",
        fields: widgetFields
    },
    // Column 4
    col4Width: {
        as: "col4Width",
        tp: "prop",
        group: "column_4",
        name: "Column 4 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col4Align: {
        as: "col4Align",
        tp: "prop",
        group: "column_4",
        name: "Column 4 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    col4Widgets: {
        as: "col4Widgets",
        tp: "map",
        group: "column_4",
        name: "Column 4 Widgets",
        fields: widgetFields
    },
    // Column 5
    col5Width: {
        as: "col5Width",
        tp: "prop",
        group: "column_5",
        name: "Column 5 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col5Align: {
        as: "col5Align",
        tp: "prop",
        group: "column_5",
        name: "Column 5 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    col5Widgets: {
        as: "col5Widgets",
        tp: "map",
        group: "column_5",
        name: "Column 5 Widgets",
        fields: widgetFields
    },
    // Bottom Left
    bottomLeftWidth: {
        as: "bottomLeftWidth",
        tp: "prop",
        group: "bottom_bar",
        name: "Bottom Left Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    bottomLeftAlign: {
        as: "bottomLeftAlign",
        tp: "prop",
        group: "bottom_bar",
        name: "Bottom Left Alignment",
        opt: ["start", "center", "end", "between"]
    },
    bottomLeftWidgets: {
        as: "bottomLeftWidgets",
        tp: "map",
        group: "bottom_bar",
        name: "Bottom Left Widgets",
        fields: widgetFields
    },
    // Bottom Right
    bottomRightWidth: {
        as: "bottomRightWidth",
        tp: "prop",
        group: "bottom_bar",
        name: "Bottom Right Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    bottomRightAlign: {
        as: "bottomRightAlign",
        tp: "prop",
        group: "bottom_bar",
        name: "Bottom Right Alignment",
        opt: ["start", "center", "end", "between"]
    },
    bottomRightWidgets: {
        as: "bottomRightWidgets",
        tp: "map",
        group: "bottom_bar",
        name: "Bottom Right Widgets",
        fields: widgetFields
    },
    mobileGridColumns: {
        as: "mobileGridColumns",
        tp: "prop",
        group: "responsive",
        name: "Mobile Grid Columns",
        description: "Specify if footer columns lay out in a single-column list or a 2-column grid on mobile viewports.",
        opt: ["1", "2"]
    },
    mobileAlignment: {
        as: "mobileAlignment",
        tp: "prop",
        group: "responsive",
        name: "Mobile Content Alignment",
        description: "Align footer contents on mobile viewports (inherit desktop alignment or force center/left).",
        opt: ["inherit", "center", "left"]
    }
};

export function parseFooterComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };

    const parseSlot = (slot: any) => {
        if (!slot) return [];
        if (typeof slot === "string") {
            try {
                return JSON.parse(slot);
            } catch (e) {
                return [];
            }
        }
        return Array.isArray(slot) ? slot : [];
    };

    parsed.col1Widgets = parseSlot(parsed.col1Widgets);
    parsed.col2Widgets = parseSlot(parsed.col2Widgets);
    parsed.col3Widgets = parseSlot(parsed.col3Widgets);
    parsed.col4Widgets = parseSlot(parsed.col4Widgets);
    parsed.col5Widgets = parseSlot(parsed.col5Widgets);
    parsed.bottomLeftWidgets = parseSlot(parsed.bottomLeftWidgets);
    parsed.bottomRightWidgets = parseSlot(parsed.bottomRightWidgets);

    // Fallbacks
    if (!parsed.theme) parsed.theme = "light";
    if (!parsed.copyright) parsed.copyright = `© ${new Date().getFullYear()} Generation Nepal. All rights reserved.`;

    if (!parsed.col1Width) parsed.col1Width = "flex-grow";
    if (!parsed.col1Align) parsed.col1Align = "start";
    if (!parsed.col2Width) parsed.col2Width = "auto";
    if (!parsed.col2Align) parsed.col2Align = "start";
    if (!parsed.col3Width) parsed.col3Width = "auto";
    if (!parsed.col3Align) parsed.col3Align = "start";
    if (!parsed.col4Width) parsed.col4Width = "flex-grow";
    if (!parsed.col4Align) parsed.col4Align = "start";
    if (!parsed.col5Width) parsed.col5Width = "auto";
    if (!parsed.col5Align) parsed.col5Align = "start";

    if (!parsed.bottomLeftWidth) parsed.bottomLeftWidth = "auto";
    if (!parsed.bottomLeftAlign) parsed.bottomLeftAlign = "start";
    if (!parsed.bottomRightWidth) parsed.bottomRightWidth = "auto";
    if (!parsed.bottomRightAlign) parsed.bottomRightAlign = "end";

    if (!parsed.mobileGridColumns) parsed.mobileGridColumns = "1";
    if (!parsed.mobileAlignment) parsed.mobileAlignment = "inherit";

    // Build defaults if all columns are empty
    if (parsed.col1Widgets.length === 0 &&
        parsed.col2Widgets.length === 0 &&
        parsed.col3Widgets.length === 0 &&
        parsed.col4Widgets.length === 0 &&
        parsed.col5Widgets.length === 0) {
        
        parsed.col1Widgets = [
            {
                widgetType: "logo",
                logoSrc: "",
                logoHeight: "32px",
                brandName: "",
                description: "Empowering commerce across Nepal with high-quality tech gear and seamless storefront configurations."
            },
            {
                widgetType: "contact_info",
                address: "Putalisadak, Kathmandu, Nepal",
                phone: "+977 1-4433221",
                email: "support@generationnepal.com"
            }
        ];

        parsed.col2Widgets = [
            {
                widgetType: "nav_menu",
                menuTitle: "Quick Links",
                links: [
                    { link: "/shop", text: "Shop All" },
                    { link: "/shop/new", text: "New Arrivals" },
                    { link: "/shop/popular", text: "Best Sellers" }
                ]
            }
        ];

        parsed.col3Widgets = [
            {
                widgetType: "nav_menu",
                menuTitle: "Support Links",
                links: [
                    { link: "/contact", text: "Contact Us" },
                    { link: "/faqs", text: "FAQs" },
                    { link: "/returns", text: "Returns & Exchanges" }
                ]
            }
        ];

        parsed.col4Widgets = [
            {
                widgetType: "newsletter",
                newsletterTitle: "Subscribe to our Newsletter",
                newsletterDesc: "Stay updated on flash sales, new products, and local store releases."
            },
            {
                widgetType: "social_links",
                socials: [
                    { platform: "facebook", url: "https://facebook.com" },
                    { platform: "instagram", url: "https://instagram.com" },
                    { platform: "twitter", url: "https://twitter.com" },
                    { platform: "youtube", url: "https://youtube.com" }
                ]
            }
        ];
    }

    return parsed;
}
