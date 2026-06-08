import { ComponentGlobalSchemaSettingsMap, ComponentGlobalSchemaSettingsMapType } from "./core";
import { ComponentRegistryEntry } from "./type";

// Content Blocks
import { ABoxBlockComponent } from "./content/box-block";
import { AContainerBlockComponent } from "./content/container-block";
import { ALinkBlockComponent } from "./content/link";
import { ALinkGroupBlockComponent } from "./content/link-group";
import { ALinkIconBlockComponent } from "./content/link-icon";
import { ALogoBlockComponent } from "./content/logo-block";
import { ANavUtilitiesBlockComponent } from "./content/nav-utilities-block";
import { ASearchBarBlockComponent } from "./content/search-bar-block";
import { ASocialLinksBlockComponent } from "./content/social-links";
import { ATextBlockComponent } from "./content/text-block";
import { ARichTextBlockComponent } from "./content/rich-text-block";
import { ATextCarouselComponent } from "./content/text-carousel";

// Hero Blocks
import { AHeroBannerBlockComponent } from "./hero/banner-block";
import { AHeroCarouselBlockComponent } from "./hero/carousel-block";
import { ASearchBlockComponent } from "./hero/search-block";
import { ASpecsBlockComponent } from "./hero/specs-block";

// Layout & Section Components
import { AAnnouncementBarEcommerceComponent } from "./announcement-bar/ecommerce";
import { AFooterEcommerceComponent } from "./footer/ecommerce";
import { ANavbarEcommerceComponent } from "./navbar/ecommerce";

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
    "logo_block": ALogoBlockComponent,
    "search_bar_block": ASearchBarBlockComponent,
    "nav_utilities_block": ANavUtilitiesBlockComponent,

    "announcement_bar_ecommerce": AAnnouncementBarEcommerceComponent,
    "footer_ecommerce": AFooterEcommerceComponent,
    "navbar_ecommerce": ANavbarEcommerceComponent,
};

export type { BaseTypes } from "./type";
