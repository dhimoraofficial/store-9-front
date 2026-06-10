import { ComponentGlobalSchemaSettingsMap, ComponentGlobalSchemaSettingsMapType, LUCIDE_ICON_NAMES } from "./core";
import { ComponentRegistryEntry } from "./type";

// Content Blocks
import { ABoxBlockComponent } from "./content/box-block";
import { AContainerBlockComponent } from "./content/container-block";
import { AImageBlockComponent } from "./content/image-block";
import { ALinkBlockComponent } from "./content/link";
import { ALinkGroupBlockComponent } from "./content/link-group";
import { ALinkIconBlockComponent } from "./content/link-icon";
import { ALogoBlockComponent } from "./content/logo-block";
import { ANavUtilitiesBlockComponent } from "./content/nav-utilities-block";
import { ARichTextBlockComponent } from "./content/rich-text-block";
import { ASearchBarBlockComponent } from "./content/search-bar-block";
import { ASocialLinksBlockComponent } from "./content/social-links";
import { ATextBlockComponent } from "./content/text-block";
import { ATextCarouselComponent } from "./content/text-carousel";
import { AFAQBlockComponent } from "./content/faq-block";
import { ATrustSignalsBlockComponent } from "./content/trust-signals";
import { ABrandMarqueeComponent } from "./content/brand-marquee";
import { ACategoryShowcaseComponent } from "./content/category-showcase";
import { ANavbarEcommerceComponent } from "./navbar/ecommerce";

// Hero Blocks
import { AHeroBannerBlockComponent } from "./hero/banner-block";
import { AHeroCarouselBlockComponent } from "./hero/carousel-block";
import { ASearchBlockComponent } from "./hero/search-block";
import { ASpecsBlockComponent } from "./hero/specs-block";

// Layout Primitives from blocks.tsx
import {
    LayoutBoxComponent,
    StackBoxComponent,
    CarouselBoxComponent,
    SvgIconComponent,
    SpacerBlockComponent,
    BadgeBlockComponent,
    ButtonBlockComponent,
    ProductLoopContextComponent
} from "./blocks";

const ACardBoxComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Card Box",
    icon: "Square",
    category: "layout",
    desc: "Card container block.",
    settings: {},
    component: LayoutBoxComponent
};

const AFlexBoxComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Flex Box",
    icon: "Layout",
    category: "layout",
    desc: "Flex container block.",
    settings: {},
    component: LayoutBoxComponent
};

const AGridBoxComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Grid Box",
    icon: "Grid",
    category: "layout",
    desc: "Grid container block.",
    settings: {},
    component: LayoutBoxComponent
};

const ASplitHeroBoxComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Split Hero Box",
    icon: "Columns",
    category: "layout",
    desc: "Split hero layout block.",
    settings: {},
    component: LayoutBoxComponent
};

const AStackBoxComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Stack Box",
    icon: "Layers",
    category: "layout",
    desc: "Stacked layer container block.",
    settings: {},
    component: StackBoxComponent
};

const ACarouselBoxComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Carousel Box",
    icon: "Images",
    category: "layout",
    desc: "Carousel slideshow container.",
    settings: {},
    component: CarouselBoxComponent
};

const ASvgIconComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "SVG Icon",
    icon: "Layers",
    category: "content",
    desc: "Dynamic Lucide icon element.",
    settings: {
        "icon-name": {
            as: "icon-name",
            tp: "prop",
            name: "Icon Name",
            description: "Lucide icon name (e.g. Phone, MapPin, Menu)",
            opt: LUCIDE_ICON_NAMES,
            rgx: "^[a-zA-Z0-9-]*$"
        },
        "icon-color": {
            as: "icon-color",
            tp: "prop",
            name: "Icon Color",
            description: "Hex or CSS variable color code.",
            rgx: ".*"
        },
        "icon-size": {
            as: "icon-size",
            tp: "prop",
            name: "Icon Size",
            description: "Size of the icon (e.g. 22px, 1.5rem).",
            rgx: ".*"
        }
    },
    component: SvgIconComponent
};

const ASpacerBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Spacer Block",
    icon: "Minus",
    category: "layout",
    desc: "Height spacing block.",
    settings: {},
    component: SpacerBlockComponent
};

const ABadgeBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Badge Block",
    icon: "Tag",
    category: "content",
    desc: "Text label badge.",
    settings: {},
    component: BadgeBlockComponent
};

const AButtonBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Button Block",
    icon: "Square",
    category: "content",
    desc: "Clickable action button.",
    settings: {},
    component: ButtonBlockComponent
};

const AProductLoopContextComponent: ComponentRegistryEntry = {
    acceptsChildren: false,
    name: "Product Loop Context",
    icon: "ShoppingBag",
    category: "ecommerce",
    desc: "E-Commerce loop renderer.",
    settings: {},
    component: ProductLoopContextComponent
};

export const ComponentAllSchemaSettingsMap: Record<string, (ComponentRegistryEntry | ComponentGlobalSchemaSettingsMapType)> = {
    common: ComponentGlobalSchemaSettingsMap,

    "text_block": ATextBlockComponent,
    "rich_text_block": ARichTextBlockComponent,
    "social_links_block": ASocialLinksBlockComponent,
    "link_icon_block": ALinkIconBlockComponent,
    "text_carousel": ATextCarouselComponent,

    "hero_carousel_block": AHeroCarouselBlockComponent,
    "hero_banner_block": AHeroBannerBlockComponent,
    "search_block": ASearchBlockComponent,
    "specs_block": ASpecsBlockComponent,

    "link_group_block": ALinkGroupBlockComponent,
    "link_block": ALinkBlockComponent,
    "box_block": ABoxBlockComponent,
    "container_block": AContainerBlockComponent,
    "image_block": AImageBlockComponent,
    "logo_block": ALogoBlockComponent,
    "search_bar_block": ASearchBarBlockComponent,
    "nav_utilities_block": ANavUtilitiesBlockComponent,
    "faq_block": AFAQBlockComponent,
    "trust_signals_block": ATrustSignalsBlockComponent,
    "brand_marquee_block": ABrandMarqueeComponent,
    "category_showcase_block": ACategoryShowcaseComponent,
    "navbar_ecommerce": ANavbarEcommerceComponent,

    "card_box": ACardBoxComponent,
    "flex_box": AFlexBoxComponent,
    "grid_box": AGridBoxComponent,
    "split_hero_box": ASplitHeroBoxComponent,
    "stack_box": AStackBoxComponent,
    "carousel_box": ACarouselBoxComponent,
    "svg_icon": ASvgIconComponent,
    "spacer_block": ASpacerBlockComponent,
    "badge_block": ABadgeBlockComponent,
    "button_block": AButtonBlockComponent,
    "product_loop_context": AProductLoopContextComponent,
};

export type { BaseTypes } from "./type";
