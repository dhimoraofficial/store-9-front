import { ComponentGlobalSchemaSettingsMapType, ComponentSettingsSchema } from "../../core";

const widgetFields: ComponentSettingsSchema[] = [
    {
        as: "widgetType",
        name: "Widget Type",
        tp: "prop",
        opt: ["logo", "search", "nav_menu", "cart", "account", "wishlist", "contact_cta"]
    },
    // Branding logo configuration
    {
        as: "logoSrc",
        name: "Store Logo Image URL",
        tp: "prop",
        condition: [{ for: "widgetType", val: "logo" }],
        rgx: ".*"
    },
    {
        as: "logoHeight",
        name: "Logo Render Height Limit",
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
        as: "brandSlogan",
        name: "Brand Slogan Tagline",
        tp: "prop",
        condition: [{ for: "widgetType", val: "logo" }],
        rgx: ".*"
    },
    // Search configuration
    {
        as: "searchPlaceholder",
        name: "Search Input Hint Text",
        tp: "prop",
        condition: [{ for: "widgetType", val: "search" }],
        rgx: ".*"
    },
    {
        as: "searchBarWidth",
        name: "Search Bar Width Constraint",
        tp: "prop",
        condition: [{ for: "widgetType", val: "search" }],
        opt: ["small", "medium", "large", "full"]
    },
    // Contact CTA configuration
    {
        as: "contactText",
        name: "Support Button Text Label",
        tp: "prop",
        condition: [{ for: "widgetType", val: "contact_cta" }],
        rgx: ".*"
    },
    {
        as: "contactHref",
        name: "Support Button Link Path",
        tp: "prop",
        condition: [{ for: "widgetType", val: "contact_cta" }],
        rgx: ".*"
    }
];

export const ComponentNavbarSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    layoutVariant: {
        as: "layoutVariant",
        tp: "prop",
        group: "layout",
        name: "Navbar Layout Style",
        description: "Controls the position and arrangement of the logo, search bar, links, and utility icons in the header. Choose 'single-row' for a simple line, 'double-row' to put links on their own line, or 'saas-dashboard' for a left admin panel sidebar layout.",
        opt: [
            "single-row",
            "double-row",
            "split-row",
            "minimalist-center",
            "saas-dashboard",
            "glassmorphic-sticky",
            "boxed-centered",
            "brand-heavy",
            "compact-utility",
            "sidebar-drawer"
        ]
    },
    activeIndicator: {
        as: "activeIndicator",
        tp: "prop",
        group: "layout",
        name: "Active Page Highlight Effect",
        description: "Choose how the link for the currently open page is highlighted to guide visitors. Select 'underline' to show a line below the active link, 'pill' for a rounded background bubble, or 'none' for plain text.",
        opt: ["none", "underline", "pill"]
    },
    categoriesShow: {
        as: "categoriesShow",
        tp: "prop",
        group: "categories",
        name: "Show Categories Dropdown Trigger",
        description: "Displays a dropdown trigger button that lets users see all product categories inside a dropdown menu folder structure.",
        opt: ["true", "false"],
        condition: [{
            for: "layoutVariant",
            val: "double-row"
        }]
    },
    categoriesText: {
        as: "categoriesText",
        tp: "prop",
        group: "categories",
        name: "Categories Trigger Text Label",
        description: "The text title shown on the category dropdown trigger button. For example, 'Shop By Category' or 'All Categories'.",
        rgx: ".*",
        condition: [{
            for: "categoriesShow",
            val: "true"
        }]
    },
    navLinks: {
        as: "navLinks",
        tp: "prop",
        group: "navigation",
        name: "Navigation Menu Items (Flat)",
        description: "A flat fallback link configuration path used when the main links list below is empty.",
        rgx: ".*"
    },
    navLinksV2: {
        as: "navLinks",
        name: "Main Menu Navigation Links",
        description: "Build a structured list of main links printed in the navbar. Click 'Add Item' to create a link with a label and a target path.",
        tp: "map",
        group: "navigation",
        fields: [
            {
                as: "link",
                name: "Destination Link URL",
                description: "The target page path or web URL for this link item (e.g., '/shop' or '/about-us').",
                rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*"
            },
            {
                as: "text",
                name: "Link Display Label Text",
                description: "The human-readable label text displayed to visitors in the menu row (e.g., 'New Arrivals').",
                rgx: ".*"
            }
        ]
    },
    megamenuData: {
        as: "megamenuData",
        tp: "prop",
        group: "megamenu",
        name: "Mega Menu Layout List (Legacy)",
        description: "A backup settings storage map for flat megamenu lists.",
        rgx: ".*",
        condition: [{
            for: "categoriesShow",
            val: "true"
        }]
    },
    megamenuDataV2: {
        name: "Mega Menu Columns Content",
        description: "Construct a multi-column mega menu dropdown panel. When visitors hover over a category link, this displays detailed column headings containing lists of sub-category links.",
        as: "megamenuDatav2",
        tp: "map",
        group: "megamenu",
        condition: [{
            for: "categoriesShow",
            val: "true"
        }],
        fields: [
            {
                as: "category_name",
                name: "Column Heading Title",
                description: "The bold category title displayed at the top of this mega-menu column (e.g., 'Asus Laptops' or 'Footwear').",
                tp: "prop"
            },
            {
                tp: "map",
                as: "sub-cats",
                name: "Sub-Categories List",
                description: "A repeating collection of nested links displayed below the column heading title.",
                fields: [
                    {
                        as: "href",
                        name: "Destination Link URL",
                        description: "The target destination URL where visitors go when they click this sub-category link (e.g. '/category/zenbook').",
                        tp: "prop",
                        rgx: "^(https?://|/|#|[a-zA-Z0-9_]).*"
                    },
                    {
                        as: "text",
                        name: "Link Display Label Text",
                        description: "The friendly sub-category link name displayed to users in this column list (e.g. 'ASUS Zenbook').",
                        tp: "prop",
                        rgx: ".*"
                    }
                ]
            }
        ]
    },

    backgroundColor: {
        as: "backgroundColor",
        tp: "prop",
        group: "branding",
        name: "Navbar Background Color",
        description: "Custom CSS background color code (e.g. #ffffff, rgba(0,0,0,0.8)).",
        rgx: ".*"
    },
    hoverStyle: {
        as: "hoverStyle",
        tp: "prop",
        group: "branding",
        name: "Menu Item Hover Transition Effect",
        description: "Select the micro-animation style to trigger on hover of navigation links.",
        opt: ["text-primary", "glow-bg", "scale-up", "slide-underline"]
    },
    enableGlassmorphism: {
        as: "enableGlassmorphism",
        tp: "prop",
        group: "branding",
        name: "Enable Sticky Glassmorphism Blur",
        description: "Toggle translucent backdrop blur styling for the sticky header container.",
        opt: ["true", "false"]
    },
    topLeftWidth: {
        as: "topLeftWidth",
        tp: "prop",
        group: "layout_slots",
        name: "Top Left Slot Sizing",
        description: "Specify the flex column width/growth behavior of the top-left slot.",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    topLeftAlign: {
        as: "topLeftAlign",
        tp: "prop",
        group: "layout_slots",
        name: "Top Left Slot Alignment",
        description: "Define content layout alignment inside the top-left slot container.",
        opt: ["start", "center", "end", "between"]
    },
    topLeftWidgets: {
        as: "topLeftWidgets",
        tp: "map",
        group: "layout_slots",
        name: "Top Left Slot Widgets",
        description: "Arrange widgets displayed on the left side of the top row.",
        fields: widgetFields
    },
    topMiddleWidth: {
        as: "topMiddleWidth",
        tp: "prop",
        group: "layout_slots",
        name: "Top Middle Slot Sizing",
        description: "Specify the flex column width/growth behavior of the top-middle slot.",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    topMiddleAlign: {
        as: "topMiddleAlign",
        tp: "prop",
        group: "layout_slots",
        name: "Top Middle Slot Alignment",
        description: "Define content layout alignment inside the top-middle slot container.",
        opt: ["start", "center", "end", "between"]
    },
    topMiddleWidgets: {
        as: "topMiddleWidgets",
        tp: "map",
        group: "layout_slots",
        name: "Top Middle Slot Widgets",
        description: "Arrange widgets displayed in the center of the top row.",
        fields: widgetFields
    },
    topRightWidth: {
        as: "topRightWidth",
        tp: "prop",
        group: "layout_slots",
        name: "Top Right Slot Sizing",
        description: "Specify the flex column width/growth behavior of the top-right slot.",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    topRightAlign: {
        as: "topRightAlign",
        tp: "prop",
        group: "layout_slots",
        name: "Top Right Slot Alignment",
        description: "Define content layout alignment inside the top-right slot container.",
        opt: ["start", "center", "end", "between"]
    },
    topRightWidgets: {
        as: "topRightWidgets",
        tp: "map",
        group: "layout_slots",
        name: "Top Right Slot Widgets",
        description: "Arrange widgets displayed on the right side of the top row.",
        fields: widgetFields
    },
    bottomLeftWidth: {
        as: "bottomLeftWidth",
        tp: "prop",
        group: "layout_slots",
        name: "Bottom Left Slot Sizing",
        description: "Specify the flex column width/growth behavior of the bottom-left slot.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    bottomLeftAlign: {
        as: "bottomLeftAlign",
        tp: "prop",
        group: "layout_slots",
        name: "Bottom Left Slot Alignment",
        description: "Define content layout alignment inside the bottom-left slot container.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        opt: ["start", "center", "end", "between"]
    },
    bottomLeftWidgets: {
        as: "bottomLeftWidgets",
        tp: "map",
        group: "layout_slots",
        name: "Bottom Left Slot Widgets",
        description: "Arrange widgets displayed on the left side of the bottom row.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        fields: widgetFields
    },
    bottomMiddleWidth: {
        as: "bottomMiddleWidth",
        tp: "prop",
        group: "layout_slots",
        name: "Bottom Middle Slot Sizing",
        description: "Specify the flex column width/growth behavior of the bottom-middle slot.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    bottomMiddleAlign: {
        as: "bottomMiddleAlign",
        tp: "prop",
        group: "layout_slots",
        name: "Bottom Middle Slot Alignment",
        description: "Define content layout alignment inside the bottom-middle slot container.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        opt: ["start", "center", "end", "between"]
    },
    bottomMiddleWidgets: {
        as: "bottomMiddleWidgets",
        tp: "map",
        group: "layout_slots",
        name: "Bottom Middle Slot Widgets",
        description: "Arrange widgets displayed in the center of the bottom row.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        fields: widgetFields
    },
    bottomRightWidth: {
        as: "bottomRightWidth",
        tp: "prop",
        group: "layout_slots",
        name: "Bottom Right Slot Sizing",
        description: "Specify the flex column width/growth behavior of the bottom-right slot.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    bottomRightAlign: {
        as: "bottomRightAlign",
        tp: "prop",
        group: "layout_slots",
        name: "Bottom Right Slot Alignment",
        description: "Define content layout alignment inside the bottom-right slot container.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        opt: ["start", "center", "end", "between"]
    },
    bottomRightWidgets: {
        as: "bottomRightWidgets",
        tp: "map",
        group: "layout_slots",
        name: "Bottom Right Slot Widgets",
        description: "Arrange widgets displayed on the right side of the bottom row.",
        condition: [{ for: "layoutVariant", val: "double-row" }],
        fields: widgetFields
    },
    mobileTriggerAlign: {
        as: "mobileTriggerAlign",
        tp: "prop",
        group: "responsive",
        name: "Mobile Trigger Alignment",
        description: "Align the hamburger menu trigger on left or right in mobile viewport.",
        opt: ["left", "right"]
    },
    mobileLogoAlign: {
        as: "mobileLogoAlign",
        tp: "prop",
        group: "responsive",
        name: "Mobile Logo Alignment",
        description: "Position the logo brand on left or center in mobile viewport.",
        opt: ["left", "center"]
    },
    mobileSearchPosition: {
        as: "mobileSearchPosition",
        tp: "prop",
        group: "responsive",
        name: "Mobile Search Position",
        description: "Choose where the search input is placed on mobile viewports.",
        opt: ["header", "drawer", "hidden"]
    },
    mobileUtilitiesPosition: {
        as: "mobileUtilitiesPosition",
        tp: "prop",
        group: "responsive",
        name: "Mobile Utilities Position",
        description: "Choose where the utility icons (cart, account, wishlist) are placed on mobile.",
        opt: ["header", "drawer", "hidden"]
    }
};

export function parseNavbarComponentSettings(type: string, settings: any) {
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

    parsed.topLeftWidgets = parseSlot(parsed.topLeftWidgets);
    parsed.topMiddleWidgets = parseSlot(parsed.topMiddleWidgets);
    parsed.topRightWidgets = parseSlot(parsed.topRightWidgets);
    parsed.bottomLeftWidgets = parseSlot(parsed.bottomLeftWidgets);
    parsed.bottomMiddleWidgets = parseSlot(parsed.bottomMiddleWidgets);
    parsed.bottomRightWidgets = parseSlot(parsed.bottomRightWidgets);

    // Boolean configurations
    parsed.wishlistShow = parsed.wishlistShow === "true" || parsed.wishlistShow === true;
    parsed.cartShow = parsed.cartShow === "true" || parsed.cartShow === true;
    parsed.accountShow = parsed.accountShow === "true" || parsed.accountShow === true;
    parsed.contactShow = parsed.contactShow === "true" || parsed.contactShow === true;
    parsed.categoriesShow = parsed.categoriesShow === "true" || parsed.categoriesShow === true;
    parsed.enableGlassmorphism = parsed.enableGlassmorphism === "true" || parsed.enableGlassmorphism === true;

    // Fallback options
    if (!parsed.topLeftWidth) parsed.topLeftWidth = "auto";
    if (!parsed.topLeftAlign) parsed.topLeftAlign = "start";
    if (!parsed.topMiddleWidth) parsed.topMiddleWidth = "flex-grow";
    if (!parsed.topMiddleAlign) parsed.topMiddleAlign = "center";
    if (!parsed.topRightWidth) parsed.topRightWidth = "auto";
    if (!parsed.topRightAlign) parsed.topRightAlign = "end";
    
    if (!parsed.bottomLeftWidth) parsed.bottomLeftWidth = "auto";
    if (!parsed.bottomLeftAlign) parsed.bottomLeftAlign = "start";
    if (!parsed.bottomMiddleWidth) parsed.bottomMiddleWidth = "flex-grow";
    if (!parsed.bottomMiddleAlign) parsed.bottomMiddleAlign = "center";
    if (!parsed.bottomRightWidth) parsed.bottomRightWidth = "auto";
    if (!parsed.bottomRightAlign) parsed.bottomRightAlign = "end";

    // Setup fallback widgets when all slots are empty
    if (parsed.topLeftWidgets.length === 0 &&
        parsed.topMiddleWidgets.length === 0 &&
        parsed.topRightWidgets.length === 0 &&
        parsed.bottomLeftWidgets.length === 0 &&
        parsed.bottomMiddleWidgets.length === 0 &&
        parsed.bottomRightWidgets.length === 0) {
        
        parsed.topLeftWidgets = [
            {
                widgetType: "logo",
                logoSrc: "",
                logoHeight: "40px",
                brandName: "",
                brandSlogan: ""
            }
        ];

        parsed.topMiddleWidgets = [
            {
                widgetType: "search",
                searchPlaceholder: "Search products...",
                searchBarWidth: "medium"
            }
        ];

        parsed.topRightWidgets = [
            {
                widgetType: "nav_menu"
            },
            {
                widgetType: "utilities"
            }
        ];
    }

    if (!parsed.mobileTriggerAlign) parsed.mobileTriggerAlign = "right";
    if (!parsed.mobileLogoAlign) parsed.mobileLogoAlign = "left";
    if (!parsed.mobileSearchPosition) parsed.mobileSearchPosition = "drawer";
    if (!parsed.mobileUtilitiesPosition) parsed.mobileUtilitiesPosition = "header";

    if (!parsed.brandName) parsed.brandName = "";
    if (!parsed.brandSlogan) parsed.brandSlogan = "";
    if (!parsed.layoutVariant) parsed.layoutVariant = "single-row";
    if (!parsed.activeIndicator) parsed.activeIndicator = "none";
    if (!parsed.searchBarWidth) parsed.searchBarWidth = "medium";
    if (!parsed.logoHeight) parsed.logoHeight = "40px";
    if (!parsed.searchPlaceholder) parsed.searchPlaceholder = "Search products...";
    if (!parsed.hoverStyle) parsed.hoverStyle = "text-primary";
    if (!parsed.backgroundColor) parsed.backgroundColor = "";

    // Parse navLinks JSON or fallback defaults
    if (typeof parsed.navLinks === "string") {
        try {
            parsed.navLinks = JSON.parse(parsed.navLinks);
        } catch (e) {
            parsed.navLinks = parsed.navLinks.split(",").map((s: string) => {
                const label = s.trim();
                return { label, href: `/category/${label.toLowerCase().replace(/\s+/g, "-")}` };
            }).filter((item: any) => item.label.length > 0);
        }
    }

    if (!Array.isArray(parsed.navLinks) || parsed.navLinks.length === 0) {
        parsed.navLinks = [
            { label: "Laptops", href: "/category/laptops", hasMegamenu: true },
            { label: "Mobile Phones", href: "/category/mobiles" },
            { label: "Smartwatches", href: "/category/smartwatches" },
            { label: "PC Build", href: "/pc-build" },
            { label: "Flash Sales", href: "/flash-sales", badge: "fire" }
        ];
    }

    // Parse megamenuData JSON or fallback defaults
    if (typeof parsed.megamenuData === "string") {
        try {
            parsed.megamenuData = JSON.parse(parsed.megamenuData);
        } catch (e) {
            parsed.megamenuData = null;
        }
    }

    if (!Array.isArray(parsed.megamenuData) || parsed.megamenuData.length === 0) {
        parsed.megamenuData = [
            {
                columnTitle: "Asus",
                items: [
                    { label: "ASUS Zenbook", href: "/category/asus-zenbook" },
                    { label: "ASUS Vivobook", href: "/category/asus-vivobook" },
                    { label: "ASUS ROG", href: "/category/asus-rog" }
                ]
            },
            {
                columnTitle: "Acer",
                items: [
                    { label: "Acer Swift", href: "/category/acer-swift" },
                    { label: "Acer Aspire", href: "/category/acer-aspire" }
                ]
            },
            {
                columnTitle: "Lenovo",
                items: [
                    { label: "Lenovo ThinkPad", href: "/category/lenovo-thinkpad" },
                    { label: "Lenovo Yoga", href: "/category/lenovo-yoga" }
                ]
            }
        ];
    }

    // Translate V2 nav links (text/link) to V1 format (label/href)
    if (Array.isArray(parsed.navLinks)) {
        parsed.navLinks = parsed.navLinks.map((item: any) => {
            if (item && typeof item === "object") {
                return {
                    label: item.text || item.label || "",
                    href: item.link || item.href || "#",
                    hasMegamenu: item.hasMegamenu,
                    badge: item.badge
                };
            }
            return item;
        });
    }

    // Translate V2 megamenu columns content (category_name/sub-cats/href/text) to V1 (columnTitle/items/label/href)
    if (parsed.megamenuDatav2 && Array.isArray(parsed.megamenuDatav2)) {
        parsed.megamenuData = parsed.megamenuDatav2.map((col: any) => {
            const subCats = col["sub-cats"] || col.items || [];
            return {
                columnTitle: col.category_name || "",
                items: Array.isArray(subCats)
                    ? subCats.map((sub: any) => ({
                        label: sub.text || sub.label || "",
                        href: sub.href || "#"
                    }))
                    : []
            };
        });
    }

    return parsed;
}

