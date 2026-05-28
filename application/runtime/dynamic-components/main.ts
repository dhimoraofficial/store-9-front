import { ComponentBoxSchemaSettingsMap } from "./Box";
import { ComponentTextSchemaSettingsMap } from "./Text";
import { ComponentLinkSchemaSettingsMap } from "./Link";
import { ComponentButtonSchemaSettingsMap } from "./Button";
import { ComponentImageSchemaSettingsMap } from "./Image";
import { ComponentInputSchemaSettingsMap } from "./Input";
import { ComponentFormSchemaSettingsMap } from "./Form";
import { ComponentIconSchemaSettingsMap } from "./Icon";
import { ComponentCarouselBoxSchemaSettingsMap } from "./CarouselBox";
import { ComponentGlobalSchemaSettingsMap, ComponentGlobalSchemaSettingsMapType } from "./core";

// 1. Structural Layout Containers
export const ComponentModalBoxSchemaSettingsMap = {
    "time-delay": { as: "timeDelay", tp: "prop", rgx: "^\\d+$" },
    "exit-intent": { as: "exitIntent", tp: "prop", opt: ["true", "false"] },
    "scroll-depth": { as: "scrollDepth", tp: "prop", rgx: "^\\d+$" },
    "modal-bg": { as: "modalBg", tp: "style", rgx: "^(#[0-9a-fA-F]{3,8}|rgba?\\(.*\\))$" }
};

export const ComponentDrawerBoxSchemaSettingsMap = {
    "drawer-position": { as: "drawerPosition", tp: "prop", opt: ["left", "right"] },
    "drawer-width": { as: "drawerWidth", tp: "style", rgx: "^(\\d+(px|rem|%)|auto)$" }
};

export const ComponentAccordionBoxSchemaSettingsMap = {
    "accordion-allow-multiple": { as: "allowMultiple", tp: "prop", opt: ["true", "false"] }
};

export const ComponentTabsBoxSchemaSettingsMap = {
    "tabs-layout": { as: "tabsLayout", tp: "prop", opt: ["horizontal", "vertical"] }
};

export const ComponentStickyBoxSchemaSettingsMap = {
    "sticky-position": { as: "stickyPosition", tp: "prop", opt: ["top", "bottom"] }
};

export const ComponentSplitHeroBoxSchemaSettingsMap = {
    "split-ratio": { as: "splitRatio", tp: "prop", opt: ["50-50", "60-40", "40-60"] },
    "split-flip-on-mobile": { as: "flipOnMobile", tp: "prop", opt: ["true", "false"] }
};

export const ComponentStackBoxSchemaSettingsMap = {
    "stack-overlay-color": { as: "overlayColor", tp: "style", rgx: "^(#[0-9a-fA-F]{3,8}|rgba?\\(.*\\))$" }
};

export const ComponentMasonryBoxSchemaSettingsMap = {
    "masonry-columns": { as: "masonryColumns", tp: "prop", rgx: "^\\d+$" }
};

// 2. Content Elements & Atoms
export const ComponentSpacerBlockSchemaSettingsMap = {
    "spacer-height-desktop": { as: "heightDesktop", tp: "prop", rgx: "^\\d+px$" },
    "spacer-height-mobile": { as: "heightMobile", tp: "prop", rgx: "^\\d+px$" }
};

export const ComponentDividerBlockSchemaSettingsMap = {
    "divider-thickness": { as: "thickness", tp: "style", rgx: "^\\d+px$" },
    "divider-color": { as: "color", tp: "style", rgx: "^#[0-9a-fA-F]{3,8}$" },
    "divider-style": { as: "dividerStyle", tp: "prop", opt: ["solid", "dashed", "dotted"] }
};

export const ComponentVideoBlockSchemaSettingsMap = {
    "video-url": { as: "src", tp: "prop", rgx: "^(\\/|https?:\\/\\/).+$" },
    "video-autoplay": { as: "autoPlay", tp: "prop", opt: ["true", "false"] },
    "video-loop": { as: "loop", tp: "prop", opt: ["true", "false"] },
    "video-muted": { as: "muted", tp: "prop", opt: ["true", "false"] }
};

export const ComponentRatingBlockSchemaSettingsMap = {
    "rating-value": { as: "ratingValue", tp: "prop", rgx: "^[0-5](\\.[0-9])?$" },
    "rating-color": { as: "ratingColor", tp: "style", rgx: "^#[0-9a-fA-F]{3,8}$" },
    "rating-size": { as: "ratingSize", tp: "style", rgx: "^\\d+px$" }
};

export const ComponentBadgeBlockSchemaSettingsMap = {
    "badge-text": { as: "badgeText", tp: "prop", rgx: "^.+$" },
    "badge-bg": { as: "backgroundColor", tp: "style", rgx: "^#[0-9a-fA-F]{3,8}$" },
    "badge-color": { as: "color", tp: "style", rgx: "^#[0-9a-fA-F]{3,8}$" }
};

export const ComponentHtmlBlockSchemaSettingsMap = {
    "html-content": { as: "htmlContent", tp: "prop", rgx: "^[\\s\\S]*$" },
    "html-sanitize": { as: "sanitize", tp: "prop", opt: ["true", "false"] }
};

export const ComponentProgressBarBlockSchemaSettingsMap = {
    "progress-value": { as: "progressValue", tp: "prop", rgx: "^\\d+$" },
    "progress-max": { as: "progressMax", tp: "prop", rgx: "^\\d+$" },
    "progress-color": { as: "progressColor", tp: "style", rgx: "^#[0-9a-fA-F]{3,8}$" }
};

export const ComponentMapBlockSchemaSettingsMap = {
    "map-latitude": { as: "latitude", tp: "prop", rgx: "^-?\\d+(\\.\\d+)?$" },
    "map-longitude": { as: "longitude", tp: "prop", rgx: "^-?\\d+(\\.\\d+)?$" },
    "map-zoom": { as: "zoom", tp: "prop", rgx: "^\\d+$" }
};

export const ComponentPriceBlockSchemaSettingsMap = {
    "price-amount": { as: "amount", tp: "prop", rgx: "^\\d+(\\.\\d+)?$" },
    "price-compare-at": { as: "compareAt", tp: "prop", rgx: "^\\d+(\\.\\d+)?$" },
    "price-currency": { as: "currency", tp: "prop", opt: ["USD", "NPR", "INR", "EUR"] }
};

export const ComponentCountdownBlockSchemaSettingsMap = {
    "countdown-target": { as: "target", tp: "prop", rgx: "^.+$" },
    "countdown-on-expiry": { as: "onExpiry", tp: "prop", opt: ["hide", "show-message"] }
};

// 3. Stateful Form Elements & Intake
export const ComponentTextareaFieldSchemaSettingsMap = {
    "textarea-rows": { as: "rows", tp: "prop", rgx: "^\\d+$" },
    "textarea-placeholder": { as: "placeholder", tp: "prop", rgx: "^.+$" }
};

export const ComponentCheckboxFieldSchemaSettingsMap = {
    "checkbox-checked": { as: "checked", tp: "prop", opt: ["true", "false"] },
    "checkbox-label": { as: "label", tp: "prop", rgx: "^.+$" }
};

export const ComponentRadioFieldSchemaSettingsMap = {
    "radio-options": { as: "options", tp: "prop", rgx: "^.+$" }
};

export const ComponentSelectFieldSchemaSettingsMap = {
    "select-options": { as: "options", tp: "prop", rgx: "^.+$" }
};

export const ComponentQuantitySelectorSchemaSettingsMap = {
    "qty-min": { as: "min", tp: "prop", rgx: "^\\d+$" },
    "qty-max": { as: "max", tp: "prop", rgx: "^\\d+$" },
    "qty-step": { as: "step", tp: "prop", rgx: "^\\d+$" }
};

// 4. E-Commerce Content Loops & Context Proxies
export const ComponentProductLoopContextSchemaSettingsMap = {
    "collection-context": { as: "collectionContext", tp: "prop", rgx: "^.+$" },
    "product-limit": { as: "limit", tp: "prop", rgx: "^\\d+$" },
    "product-sort": { as: "sort", tp: "prop", opt: ["best-selling", "price-asc", "price-desc", "created-desc"] }
};

export const ComponentCategoryLoopContextSchemaSettingsMap = {
    "category-limit": { as: "limit", tp: "prop", rgx: "^\\d+$" }
};

export const ComponentCartItemsContextSchemaSettingsMap = {
    "cart-empty-message": { as: "emptyMessage", tp: "prop", rgx: "^.+$" }
};

export const ComponentProductVariantSelectorSchemaSettingsMap = {
    "selector-style": { as: "selectorStyle", tp: "prop", opt: ["dropdown", "pills", "swatches"] }
};

export const ComponentProductImageGallerySchemaSettingsMap = {
    "gallery-thumbnails": { as: "thumbnails", tp: "prop", opt: ["left", "right", "bottom"] },
    "gallery-zoom": { as: "zoom", tp: "prop", opt: ["true", "false"] }
};

// common and box value, and admin will edit that options and save that into schema for rendering
export interface ComponentRegistryEntry {
    name: string;
    icon: string;
    category: "layout" | "content" | "forms" | "ecommerce" | "legacy";
    settings: ComponentGlobalSchemaSettingsMapType;
}

// common and box value, and admin will edit that options and save that into schema for rendering
export const ComponentAllSchemaSettingsMap: Record<string, ComponentRegistryEntry | ComponentGlobalSchemaSettingsMapType> = {
    common: ComponentGlobalSchemaSettingsMap,
    box: {
        name: "Box Container (Legacy)",
        icon: "Code2",
        category: "legacy",
        settings: ComponentBoxSchemaSettingsMap as any
    },
    text: {
        name: "Rich Text block (Legacy)",
        icon: "Type",
        category: "legacy",
        settings: ComponentTextSchemaSettingsMap as any
    },
    link: {
        name: "Hyperlink tag (Legacy)",
        icon: "Link",
        category: "legacy",
        settings: ComponentLinkSchemaSettingsMap as any
    },
    button: {
        name: "Button Component (Legacy)",
        icon: "Square",
        category: "legacy",
        settings: ComponentButtonSchemaSettingsMap as any
    },
    image: {
        name: "Image element (Legacy)",
        icon: "Image",
        category: "legacy",
        settings: ComponentImageSchemaSettingsMap as any
    },
    input: {
        name: "Input Form field (Legacy)",
        icon: "Type",
        category: "legacy",
        settings: ComponentInputSchemaSettingsMap as any
    },
    search_query: {
        name: "Search Redirect bar",
        icon: "Search",
        category: "legacy",
        settings: ComponentInputSchemaSettingsMap as any
    },
    form: {
        name: "Form (Legacy)",
        icon: "Layers",
        category: "legacy",
        settings: ComponentFormSchemaSettingsMap as any
    },
    icon: {
        name: "Icon Wrapper (Legacy)",
        icon: "Layers",
        category: "legacy",
        settings: ComponentIconSchemaSettingsMap as any
    },

    // 40 E-Commerce Master Elements
    flex_box: {
        name: "Flex Container",
        icon: "Layout",
        category: "layout",
        settings: ComponentBoxSchemaSettingsMap as any
    },
    grid_box: {
        name: "Grid Container",
        icon: "Grid",
        category: "layout",
        settings: ComponentBoxSchemaSettingsMap as any
    },
    card_box: {
        name: "Card/Surface Container",
        icon: "CreditCard",
        category: "layout",
        settings: ComponentBoxSchemaSettingsMap as any
    },
    carousel_box: {
        name: "Carousel/Scroll Window",
        icon: "Sliders",
        category: "layout",
        settings: ComponentCarouselBoxSchemaSettingsMap as any
    },
    modal_box: {
        name: "Popup Modal Overlay",
        icon: "Maximize2",
        category: "layout",
        settings: ComponentModalBoxSchemaSettingsMap as any
    },
    drawer_box: {
        name: "Interactive Slide Drawer",
        icon: "Sidebar",
        category: "layout",
        settings: ComponentDrawerBoxSchemaSettingsMap as any
    },
    accordion_box: {
        name: "Collapsible Accordion",
        icon: "ListCollapse",
        category: "layout",
        settings: ComponentAccordionBoxSchemaSettingsMap as any
    },
    tabs_box: {
        name: "Tabbed Switcher Shell",
        icon: "Folder",
        category: "layout",
        settings: ComponentTabsBoxSchemaSettingsMap as any
    },
    sticky_box: {
        name: "Sticky Container",
        icon: "Pin",
        category: "layout",
        settings: ComponentStickyBoxSchemaSettingsMap as any
    },
    split_hero_box: {
        name: "Split Aspect Hero Box",
        icon: "Columns",
        category: "layout",
        settings: ComponentSplitHeroBoxSchemaSettingsMap as any
    },
    stack_box: {
        name: "Overlapping Stack",
        icon: "Layers",
        category: "layout",
        settings: ComponentStackBoxSchemaSettingsMap as any
    },
    masonry_box: {
        name: "Masonry Matrix",
        icon: "Grid",
        category: "layout",
        settings: ComponentMasonryBoxSchemaSettingsMap as any
    },

    text_block: {
        name: "Typography Engine",
        icon: "Type",
        category: "content",
        settings: ComponentTextSchemaSettingsMap as any
    },
    link_block: {
        name: "Hyperlink tag",
        icon: "Link",
        category: "content",
        settings: ComponentLinkSchemaSettingsMap as any
    },
    image_block: {
        name: "Graphic Frame",
        icon: "Image",
        category: "content",
        settings: ComponentImageSchemaSettingsMap as any
    },
    button_block: {
        name: "Action Trigger Button",
        icon: "Square",
        category: "content",
        settings: ComponentButtonSchemaSettingsMap as any
    },
    svg_icon: {
        name: "Vector Icon",
        icon: "Sparkles",
        category: "content",
        settings: ComponentIconSchemaSettingsMap as any
    },
    spacer_block: {
        name: "Decorative Spacer",
        icon: "ArrowUpDown",
        category: "content",
        settings: ComponentSpacerBlockSchemaSettingsMap as any
    },
    divider_block: {
        name: "Content Rule Divider",
        icon: "Minus",
        category: "content",
        settings: ComponentDividerBlockSchemaSettingsMap as any
    },
    video_block: {
        name: "Video Media Player",
        icon: "Video",
        category: "content",
        settings: ComponentVideoBlockSchemaSettingsMap as any
    },
    rating_block: {
        name: "Rating Stars Matrix",
        icon: "Star",
        category: "content",
        settings: ComponentRatingBlockSchemaSettingsMap as any
    },
    badge_block: {
        name: "Metadata Status Badge",
        icon: "Tag",
        category: "content",
        settings: ComponentBadgeBlockSchemaSettingsMap as any
    },
    html_block: {
        name: "HTML Fragment Sandbox",
        icon: "Code",
        category: "content",
        settings: ComponentHtmlBlockSchemaSettingsMap as any
    },
    progress_bar_block: {
        name: "Animated Progress Bar",
        icon: "Percent",
        category: "content",
        settings: ComponentProgressBarBlockSchemaSettingsMap as any
    },
    map_block: {
        name: "Static Map Frame",
        icon: "MapPin",
        category: "content",
        settings: ComponentMapBlockSchemaSettingsMap as any
    },
    price_block: {
        name: "Price Display Engine",
        icon: "DollarSign",
        category: "content",
        settings: ComponentPriceBlockSchemaSettingsMap as any
    },
    countdown_block: {
        name: "Countdown Timer",
        icon: "Clock",
        category: "content",
        settings: ComponentCountdownBlockSchemaSettingsMap as any
    },

    form_wrapper: {
        name: "Functional Form Wrapper",
        icon: "FileText",
        category: "forms",
        settings: ComponentFormSchemaSettingsMap as any
    },
    input_field: {
        name: "Text Input Field",
        icon: "Type",
        category: "forms",
        settings: ComponentInputSchemaSettingsMap as any
    },
    textarea_field: {
        name: "Long Text Area",
        icon: "FileText",
        category: "forms",
        settings: ComponentTextareaFieldSchemaSettingsMap as any
    },
    checkbox_field: {
        name: "Boolean Checkbox",
        icon: "CheckSquare",
        category: "forms",
        settings: ComponentCheckboxFieldSchemaSettingsMap as any
    },
    radio_field: {
        name: "Radio Option Group",
        icon: "Radio",
        category: "forms",
        settings: ComponentRadioFieldSchemaSettingsMap as any
    },
    select_field: {
        name: "Select Option Dropdown",
        icon: "ChevronDown",
        category: "forms",
        settings: ComponentSelectFieldSchemaSettingsMap as any
    },
    quantity_selector: {
        name: "Quantity Selector",
        icon: "Hash",
        category: "forms",
        settings: ComponentQuantitySelectorSchemaSettingsMap as any
    },

    product_loop_context: {
        name: "Product Grid Iterator",
        icon: "ShoppingBag",
        category: "ecommerce",
        settings: ComponentProductLoopContextSchemaSettingsMap as any
    },
    category_loop_context: {
        name: "Category Loop Iterator",
        icon: "FolderOpen",
        category: "ecommerce",
        settings: ComponentCategoryLoopContextSchemaSettingsMap as any
    },
    cart_items_context: {
        name: "Cart Items Context Loop",
        icon: "ShoppingCart",
        category: "ecommerce",
        settings: ComponentCartItemsContextSchemaSettingsMap as any
    },
    product_variant_selector: {
        name: "Variant Option Selector",
        icon: "Sliders",
        category: "ecommerce",
        settings: ComponentProductVariantSelectorSchemaSettingsMap as any
    },
    product_image_gallery: {
        name: "Product Image Gallery",
        icon: "Images",
        category: "ecommerce",
        settings: ComponentProductImageGallerySchemaSettingsMap as any
    }
};
