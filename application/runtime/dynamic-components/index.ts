import { ComponentGlobalSchemaSettingsMap, ComponentGlobalSchemaSettingsMapType } from "./core";

// Import Template Components & Settings
import {
    ComponentAboutSchemaSettingsMap as Component_about_split_right_image_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_split_right_image_ComponentSettings,
    default as About_SplitRightImage_Component
} from "./about/split-right-image";
import {
    ComponentAboutSchemaSettingsMap as Component_about_split_left_image_stats_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_split_left_image_stats_ComponentSettings,
    default as About_SplitLeftImageStats_Component
} from "./about/split-left-image-stats";
import {
    ComponentAboutSchemaSettingsMap as Component_about_centered_image_below_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_centered_image_below_ComponentSettings,
    default as About_CenteredImageBelow_Component
} from "./about/centered-image-below";
import {
    ComponentAboutSchemaSettingsMap as Component_about_zigzag_features_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_zigzag_features_ComponentSettings,
    default as About_ZigzagFeatures_Component
} from "./about/zigzag-features";
import {
    ComponentAboutSchemaSettingsMap as Component_about_team_card_grid_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_team_card_grid_ComponentSettings,
    default as About_TeamCardGrid_Component
} from "./about/team-card-grid";
import {
    ComponentAboutSchemaSettingsMap as Component_about_timeline_history_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_timeline_history_ComponentSettings,
    default as About_TimelineHistory_Component
} from "./about/timeline-history";
import {
    ComponentAboutSchemaSettingsMap as Component_about_fullwidth_image_overlay_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_fullwidth_image_overlay_ComponentSettings,
    default as About_FullwidthImageOverlay_Component
} from "./about/fullwidth-image-overlay";
import {
    ComponentAboutSchemaSettingsMap as Component_about_two_column_text_image_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_two_column_text_image_ComponentSettings,
    default as About_TwoColumnTextImage_Component
} from "./about/two-column-text-image";
import {
    ComponentAboutSchemaSettingsMap as Component_about_minimal_centered_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_minimal_centered_ComponentSettings,
    default as About_MinimalCentered_Component
} from "./about/minimal-centered";
import {
    ComponentAboutSchemaSettingsMap as Component_about_split_featured_quote_SchemaSettingsMap,
    parseAboutComponentSettings as parse_about_split_featured_quote_ComponentSettings,
    default as About_SplitFeaturedQuote_Component
} from "./about/split-featured-quote";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_three_column_grid_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_three_column_grid_ComponentSettings,
    default as Blog_ThreeColumnGrid_Component
} from "./blog/three-column-grid";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_list_side_images_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_list_side_images_ComponentSettings,
    default as Blog_ListSideImages_Component
} from "./blog/list-side-images";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_featured_and_grid_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_featured_and_grid_ComponentSettings,
    default as Blog_FeaturedAndGrid_Component
} from "./blog/featured-and-grid";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_minimal_centered_list_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_minimal_centered_list_ComponentSettings,
    default as Blog_MinimalCenteredList_Component
} from "./blog/minimal-centered-list";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_two_column_masonry_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_two_column_masonry_ComponentSettings,
    default as Blog_TwoColumnMasonry_Component
} from "./blog/two-column-masonry";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_card_grid_tags_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_card_grid_tags_ComponentSettings,
    default as Blog_CardGridTags_Component
} from "./blog/card-grid-tags";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_horizontal_scroll_cards_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_horizontal_scroll_cards_ComponentSettings,
    default as Blog_HorizontalScrollCards_Component
} from "./blog/horizontal-scroll-cards";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_large_images_overlay_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_large_images_overlay_ComponentSettings,
    default as Blog_LargeImagesOverlay_Component
} from "./blog/large-images-overlay";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_compact_list_dates_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_compact_list_dates_ComponentSettings,
    default as Blog_CompactListDates_Component
} from "./blog/compact-list-dates";
import {
    ComponentBlogSchemaSettingsMap as Component_blog_zigzag_alternating_SchemaSettingsMap,
    parseBlogComponentSettings as parse_blog_zigzag_alternating_ComponentSettings,
    default as Blog_ZigzagAlternating_Component
} from "./blog/zigzag-alternating";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_centered_large_button_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_centered_large_button_ComponentSettings,
    default as Cta_CenteredLargeButton_Component
} from "./cta/centered-large-button";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_split_text_left_button_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_split_text_left_button_ComponentSettings,
    default as Cta_SplitTextLeftButton_Component
} from "./cta/split-text-left-button";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_bg_image_overlay_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_bg_image_overlay_ComponentSettings,
    default as Cta_BgImageOverlay_Component
} from "./cta/bg-image-overlay";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_card_shadow_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_card_shadow_ComponentSettings,
    default as Cta_CardShadow_Component
} from "./cta/card-shadow";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_minimal_border_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_minimal_border_ComponentSettings,
    default as Cta_MinimalBorder_Component
} from "./cta/minimal-border";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_fullwidth_banner_form_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_fullwidth_banner_form_ComponentSettings,
    default as Cta_FullwidthBannerForm_Component
} from "./cta/fullwidth-banner-form";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_side_by_side_icon_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_side_by_side_icon_ComponentSettings,
    default as Cta_SideBySideIcon_Component
} from "./cta/side-by-side-icon";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_compact_inline_banner_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_compact_inline_banner_ComponentSettings,
    default as Cta_CompactInlineBanner_Component
} from "./cta/compact-inline-banner";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_two_button_choice_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_two_button_choice_ComponentSettings,
    default as Cta_TwoButtonChoice_Component
} from "./cta/two-button-choice";
import {
    ComponentCtaSchemaSettingsMap as Component_cta_urgency_countdown_SchemaSettingsMap,
    parseCtaComponentSettings as parse_cta_urgency_countdown_ComponentSettings,
    default as Cta_UrgencyCountdown_Component
} from "./cta/urgency-countdown";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_simple_centered_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_simple_centered_ComponentSettings,
    default as Footer_SimpleCentered_Component
} from "./footer/simple-centered";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_four_column_links_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_four_column_links_ComponentSettings,
    default as Footer_FourColumnLinks_Component
} from "./footer/four-column-links";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_large_newsletter_signup_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_large_newsletter_signup_ComponentSettings,
    default as Footer_LargeNewsletterSignup_Component
} from "./footer/large-newsletter-signup";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_minimal_single_row_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_minimal_single_row_ComponentSettings,
    default as Footer_MinimalSingleRow_Component
} from "./footer/minimal-single-row";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_dark_logo_socials_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_dark_logo_socials_ComponentSettings,
    default as Footer_DarkLogoSocials_Component
} from "./footer/dark-logo-socials";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_grid_contact_info_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_grid_contact_info_ComponentSettings,
    default as Footer_GridContactInfo_Component
} from "./footer/grid-contact-info";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_split_large_branding_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_split_large_branding_ComponentSettings,
    default as Footer_SplitLargeBranding_Component
} from "./footer/split-large-branding";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_stacked_badge_logo_grid_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_stacked_badge_logo_grid_ComponentSettings,
    default as Footer_StackedBadgeLogoGrid_Component
} from "./footer/stacked-badge-logo-grid";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_simple_text_links_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_simple_text_links_ComponentSettings,
    default as Footer_SimpleTextLinks_Component
} from "./footer/simple-text-links";
import {
    ComponentFooterSchemaSettingsMap as Component_footer_fullwidth_app_downloads_SchemaSettingsMap,
    parseFooterComponentSettings as parse_footer_fullwidth_app_downloads_ComponentSettings,
    default as Footer_FullwidthAppDownloads_Component
} from "./footer/fullwidth-app-downloads";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_centered_text_ctas_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_centered_text_ctas_ComponentSettings,
    default as Hero_CenteredTextCtas_Component
} from "./hero/centered-text-ctas";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_split_text_left_image_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_split_text_left_image_ComponentSettings,
    default as Hero_SplitTextLeftImage_Component
} from "./hero/split-text-left-image";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_bg_image_overlay_text_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_bg_image_overlay_text_ComponentSettings,
    default as Hero_BgImageOverlayText_Component
} from "./hero/bg-image-overlay-text";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_minimal_centered_badges_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_minimal_centered_badges_ComponentSettings,
    default as Hero_MinimalCenteredBadges_Component
} from "./hero/minimal-centered-badges";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_asymmetric_image_left_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_asymmetric_image_left_ComponentSettings,
    default as Hero_AsymmetricImageLeft_Component
} from "./hero/asymmetric-image-left";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_stacked_video_placeholder_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_stacked_video_placeholder_ComponentSettings,
    default as Hero_StackedVideoPlaceholder_Component
} from "./hero/stacked-video-placeholder";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_card_centered_shadow_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_card_centered_shadow_ComponentSettings,
    default as Hero_CardCenteredShadow_Component
} from "./hero/card-centered-shadow";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_dual_cta_feature_list_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_dual_cta_feature_list_ComponentSettings,
    default as Hero_DualCtaFeatureList_Component
} from "./hero/dual-cta-feature-list";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_fullheight_gradient_bg_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_fullheight_gradient_bg_ComponentSettings,
    default as Hero_FullheightGradientBg_Component
} from "./hero/fullheight-gradient-bg";
import {
    ComponentHeroSchemaSettingsMap as Component_hero_zigzag_multiple_ctas_SchemaSettingsMap,
    parseHeroComponentSettings as parse_hero_zigzag_multiple_ctas_ComponentSettings,
    default as Hero_ZigzagMultipleCtas_Component
} from "./hero/zigzag-multiple-ctas";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_services_header_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_services_header_ComponentSettings,
    default as Navbar_ServicesHeader_Component
} from "./navbar/services-header";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_centered_logo_gradient_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_centered_logo_gradient_ComponentSettings,
    default as Navbar_CenteredLogoGradient_Component
} from "./navbar/centered-logo-gradient";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_corporate_search_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_corporate_search_ComponentSettings,
    default as Navbar_CorporateSearch_Component
} from "./navbar/corporate-search";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_sidebar_gradient_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_sidebar_gradient_ComponentSettings,
    default as Navbar_SidebarGradient_Component
} from "./navbar/sidebar-gradient";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_transparent_overlay_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_transparent_overlay_ComponentSettings,
    default as Navbar_TransparentOverlay_Component
} from "./navbar/transparent-overlay";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_megamenu_dropdowns_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_megamenu_dropdowns_ComponentSettings,
    default as Navbar_MegamenuDropdowns_Component
} from "./navbar/megamenu-dropdowns";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_centered_stacked_animated_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_centered_stacked_animated_ComponentSettings,
    default as Navbar_CenteredStackedAnimated_Component
} from "./navbar/centered-stacked-animated";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_doublerow_gradient_top_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_doublerow_gradient_top_ComponentSettings,
    default as Navbar_DoublerowGradientTop_Component
} from "./navbar/doublerow-gradient-top";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_minimal_dark_neon_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_minimal_dark_neon_ComponentSettings,
    default as Navbar_MinimalDarkNeon_Component
} from "./navbar/minimal-dark-neon";
import {
    ComponentNavbarSchemaSettingsMap as Component_navbar_animated_gradient_particles_SchemaSettingsMap,
    parseNavbarComponentSettings as parse_navbar_animated_gradient_particles_ComponentSettings,
    default as Navbar_AnimatedGradientParticles_Component
} from "./navbar/animated-gradient-particles";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_three_column_grid_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_three_column_grid_ComponentSettings,
    default as Portfolio_ThreeColumnGrid_Component
} from "./portfolio/three-column-grid";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_masonry_layout_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_masonry_layout_ComponentSettings,
    default as Portfolio_MasonryLayout_Component
} from "./portfolio/masonry-layout";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_horizontal_scroll_cards_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_horizontal_scroll_cards_ComponentSettings,
    default as Portfolio_HorizontalScrollCards_Component
} from "./portfolio/horizontal-scroll-cards";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_two_column_details_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_two_column_details_ComponentSettings,
    default as Portfolio_TwoColumnDetails_Component
} from "./portfolio/two-column-details";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_fullwidth_alternating_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_fullwidth_alternating_ComponentSettings,
    default as Portfolio_FullwidthAlternating_Component
} from "./portfolio/fullwidth-alternating";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_filterable_grid_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_filterable_grid_ComponentSettings,
    default as Portfolio_FilterableGrid_Component
} from "./portfolio/filterable-grid";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_minimal_list_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_minimal_list_ComponentSettings,
    default as Portfolio_MinimalList_Component
} from "./portfolio/minimal-list";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_featured_and_grid_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_featured_and_grid_ComponentSettings,
    default as Portfolio_FeaturedAndGrid_Component
} from "./portfolio/featured-and-grid";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_compact_five_column_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_compact_five_column_ComponentSettings,
    default as Portfolio_CompactFiveColumn_Component
} from "./portfolio/compact-five-column";
import {
    ComponentPortfolioSchemaSettingsMap as Component_portfolio_split_screen_SchemaSettingsMap,
    parsePortfolioComponentSettings as parse_portfolio_split_screen_ComponentSettings,
    default as Portfolio_SplitScreen_Component
} from "./portfolio/split-screen";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_three_column_simple_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_three_column_simple_ComponentSettings,
    default as Pricing_ThreeColumnSimple_Component
} from "./pricing/three-column-simple";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_highlighted_center_plan_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_highlighted_center_plan_ComponentSettings,
    default as Pricing_HighlightedCenterPlan_Component
} from "./pricing/highlighted-center-plan";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_toggle_monthly_yearly_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_toggle_monthly_yearly_ComponentSettings,
    default as Pricing_ToggleMonthlyYearly_Component
} from "./pricing/toggle-monthly-yearly";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_comparison_table_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_comparison_table_ComponentSettings,
    default as Pricing_ComparisonTable_Component
} from "./pricing/comparison-table";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_minimalist_single_column_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_minimalist_single_column_ComponentSettings,
    default as Pricing_MinimalistSingleColumn_Component
} from "./pricing/minimalist-single-column";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_bordered_check_cards_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_bordered_check_cards_ComponentSettings,
    default as Pricing_BorderedCheckCards_Component
} from "./pricing/bordered-check-cards";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_horizontal_card_layout_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_horizontal_card_layout_ComponentSettings,
    default as Pricing_HorizontalCardLayout_Component
} from "./pricing/horizontal-card-layout";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_four_column_compact_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_four_column_compact_ComponentSettings,
    default as Pricing_FourColumnCompact_Component
} from "./pricing/four-column-compact";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_stacked_vertical_dividers_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_stacked_vertical_dividers_ComponentSettings,
    default as Pricing_StackedVerticalDividers_Component
} from "./pricing/stacked-vertical-dividers";
import {
    ComponentPricingSchemaSettingsMap as Component_pricing_side_by_side_comparison_SchemaSettingsMap,
    parsePricingComponentSettings as parse_pricing_side_by_side_comparison_ComponentSettings,
    default as Pricing_SideBySideComparison_Component
} from "./pricing/side-by-side-comparison";
import {
    ComponentServicesSchemaSettingsMap as Component_services_three_column_icon_grid_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_three_column_icon_grid_ComponentSettings,
    default as Services_ThreeColumnIconGrid_Component
} from "./services/three-column-icon-grid";
import {
    ComponentServicesSchemaSettingsMap as Component_services_card_images_hover_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_card_images_hover_ComponentSettings,
    default as Services_CardImagesHover_Component
} from "./services/card-images-hover";
import {
    ComponentServicesSchemaSettingsMap as Component_services_horizontal_alternating_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_horizontal_alternating_ComponentSettings,
    default as Services_HorizontalAlternating_Component
} from "./services/horizontal-alternating";
import {
    ComponentServicesSchemaSettingsMap as Component_services_colored_bg_two_column_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_colored_bg_two_column_ComponentSettings,
    default as Services_ColoredBgTwoColumn_Component
} from "./services/colored-bg-two-column";
import {
    ComponentServicesSchemaSettingsMap as Component_services_list_numbered_items_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_list_numbered_items_ComponentSettings,
    default as Services_ListNumberedItems_Component
} from "./services/list-numbered-items";
import {
    ComponentServicesSchemaSettingsMap as Component_services_minimal_large_icons_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_minimal_large_icons_ComponentSettings,
    default as Services_MinimalLargeIcons_Component
} from "./services/minimal-large-icons";
import {
    ComponentServicesSchemaSettingsMap as Component_services_bordered_hover_scale_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_bordered_hover_scale_ComponentSettings,
    default as Services_BorderedHoverScale_Component
} from "./services/bordered-hover-scale";
import {
    ComponentServicesSchemaSettingsMap as Component_services_stacked_left_aligned_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_stacked_left_aligned_ComponentSettings,
    default as Services_StackedLeftAligned_Component
} from "./services/stacked-left-aligned";
import {
    ComponentServicesSchemaSettingsMap as Component_services_four_column_compact_grid_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_four_column_compact_grid_ComponentSettings,
    default as Services_FourColumnCompactGrid_Component
} from "./services/four-column-compact-grid";
import {
    ComponentServicesSchemaSettingsMap as Component_services_masonry_varying_heights_SchemaSettingsMap,
    parseServicesComponentSettings as parse_services_masonry_varying_heights_ComponentSettings,
    default as Services_MasonryVaryingHeights_Component
} from "./services/masonry-varying-heights";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_two_column_grid_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_two_column_grid_ComponentSettings,
    default as Testimonials_TwoColumnGrid_Component
} from "./testimonials/two-column-grid";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_centered_single_card_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_centered_single_card_ComponentSettings,
    default as Testimonials_CenteredSingleCard_Component
} from "./testimonials/centered-single-card";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_three_column_stars_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_three_column_stars_ComponentSettings,
    default as Testimonials_ThreeColumnStars_Component
} from "./testimonials/three-column-stars";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_horizontal_scroll_cards_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_horizontal_scroll_cards_ComponentSettings,
    default as Testimonials_HorizontalScrollCards_Component
} from "./testimonials/horizontal-scroll-cards";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_stacked_large_quotes_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_stacked_large_quotes_ComponentSettings,
    default as Testimonials_StackedLargeQuotes_Component
} from "./testimonials/stacked-large-quotes";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_masonry_varying_sizes_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_masonry_varying_sizes_ComponentSettings,
    default as Testimonials_MasonryVaryingSizes_Component
} from "./testimonials/masonry-varying-sizes";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_video_play_cards_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_video_play_cards_ComponentSettings,
    default as Testimonials_VideoPlayCards_Component
} from "./testimonials/video-play-cards";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_alternating_side_by_side_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_alternating_side_by_side_ComponentSettings,
    default as Testimonials_AlternatingSideBySide_Component
} from "./testimonials/alternating-side-by-side";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_minimal_quote_centered_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_minimal_quote_centered_ComponentSettings,
    default as Testimonials_MinimalQuoteCentered_Component
} from "./testimonials/minimal-quote-centered";
import {
    ComponentTestimonialsSchemaSettingsMap as Component_testimonials_compact_inline_badges_SchemaSettingsMap,
    parseTestimonialsComponentSettings as parse_testimonials_compact_inline_badges_ComponentSettings,
    default as Testimonials_CompactInlineBadges_Component
} from "./testimonials/compact-inline-badges";

export interface ComponentRegistryEntry {
    name: string;
    icon: string;
    category: "layout" | "content" | "forms" | "ecommerce" | "legacy" | "navbar" | "hero" | "services" | "testimonials" | "cta" | "about" | "portfolio" | "pricing" | "blog" | "footer";
    desc?: string;
    acceptsChildren?: boolean;
    settings: ComponentGlobalSchemaSettingsMapType;
    parse?: (type: string, settings: any) => any;
    component?: any;
}

export const ComponentAllSchemaSettingsMap: Record<string, (ComponentRegistryEntry | ComponentGlobalSchemaSettingsMapType)> = {
    common: ComponentGlobalSchemaSettingsMap,

    "about_split-right-image": {
        acceptsChildren: false,
        name: "About - Split Right Image",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Split Right Image. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_split_right_image_SchemaSettingsMap as any,
        parse: parse_about_split_right_image_ComponentSettings,
        component: About_SplitRightImage_Component
    },
    "about_split-left-image-stats": {
        acceptsChildren: false,
        name: "About - Split Left Image Stats",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Split Left Image Stats. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_split_left_image_stats_SchemaSettingsMap as any,
        parse: parse_about_split_left_image_stats_ComponentSettings,
        component: About_SplitLeftImageStats_Component
    },
    "about_centered-image-below": {
        acceptsChildren: false,
        name: "About - Centered Image Below",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Centered Image Below. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_centered_image_below_SchemaSettingsMap as any,
        parse: parse_about_centered_image_below_ComponentSettings,
        component: About_CenteredImageBelow_Component
    },
    "about_zigzag-features": {
        acceptsChildren: false,
        name: "About - Zigzag Features",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Zigzag Features. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_zigzag_features_SchemaSettingsMap as any,
        parse: parse_about_zigzag_features_ComponentSettings,
        component: About_ZigzagFeatures_Component
    },
    "about_team-card-grid": {
        acceptsChildren: false,
        name: "About - Team Card Grid",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Team Card Grid. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_team_card_grid_SchemaSettingsMap as any,
        parse: parse_about_team_card_grid_ComponentSettings,
        component: About_TeamCardGrid_Component
    },
    "about_timeline-history": {
        acceptsChildren: false,
        name: "About - Timeline History",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Timeline History. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_timeline_history_SchemaSettingsMap as any,
        parse: parse_about_timeline_history_ComponentSettings,
        component: About_TimelineHistory_Component
    },
    "about_fullwidth-image-overlay": {
        acceptsChildren: false,
        name: "About - Fullwidth Image Overlay",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Fullwidth Image Overlay. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_fullwidth_image_overlay_SchemaSettingsMap as any,
        parse: parse_about_fullwidth_image_overlay_ComponentSettings,
        component: About_FullwidthImageOverlay_Component
    },
    "about_two-column-text-image": {
        acceptsChildren: false,
        name: "About - Two Column Text Image",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Two Column Text Image. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_two_column_text_image_SchemaSettingsMap as any,
        parse: parse_about_two_column_text_image_ComponentSettings,
        component: About_TwoColumnTextImage_Component
    },
    "about_minimal-centered": {
        acceptsChildren: false,
        name: "About - Minimal Centered",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Minimal Centered. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_minimal_centered_SchemaSettingsMap as any,
        parse: parse_about_minimal_centered_ComponentSettings,
        component: About_MinimalCentered_Component
    },
    "about_split-featured-quote": {
        acceptsChildren: false,
        name: "About - Split Featured Quote",
        icon: "Type",
        category: "about",
        desc: "About section variant showing Split Featured Quote. Designed for professional brand presentation, supporting stats, team lists, history timelines, or values showcases in a responsive layout.",
        settings: Component_about_split_featured_quote_SchemaSettingsMap as any,
        parse: parse_about_split_featured_quote_ComponentSettings,
        component: About_SplitFeaturedQuote_Component
    },
    "blog_three-column-grid": {
        acceptsChildren: false,
        name: "Blog - Three Column Grid",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Three Column Grid. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_three_column_grid_SchemaSettingsMap as any,
        parse: parse_blog_three_column_grid_ComponentSettings,
        component: Blog_ThreeColumnGrid_Component
    },
    "blog_list-side-images": {
        acceptsChildren: false,
        name: "Blog - List Side Images",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as List Side Images. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_list_side_images_SchemaSettingsMap as any,
        parse: parse_blog_list_side_images_ComponentSettings,
        component: Blog_ListSideImages_Component
    },
    "blog_featured-and-grid": {
        acceptsChildren: false,
        name: "Blog - Featured And Grid",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Featured And Grid. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_featured_and_grid_SchemaSettingsMap as any,
        parse: parse_blog_featured_and_grid_ComponentSettings,
        component: Blog_FeaturedAndGrid_Component
    },
    "blog_minimal-centered-list": {
        acceptsChildren: false,
        name: "Blog - Minimal Centered List",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Minimal Centered List. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_minimal_centered_list_SchemaSettingsMap as any,
        parse: parse_blog_minimal_centered_list_ComponentSettings,
        component: Blog_MinimalCenteredList_Component
    },
    "blog_two-column-masonry": {
        acceptsChildren: false,
        name: "Blog - Two Column Masonry",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Two Column Masonry. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_two_column_masonry_SchemaSettingsMap as any,
        parse: parse_blog_two_column_masonry_ComponentSettings,
        component: Blog_TwoColumnMasonry_Component
    },
    "blog_card-grid-tags": {
        acceptsChildren: false,
        name: "Blog - Card Grid Tags",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Card Grid Tags. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_card_grid_tags_SchemaSettingsMap as any,
        parse: parse_blog_card_grid_tags_ComponentSettings,
        component: Blog_CardGridTags_Component
    },
    "blog_horizontal-scroll-cards": {
        acceptsChildren: false,
        name: "Blog - Horizontal Scroll Cards",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Horizontal Scroll Cards. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_horizontal_scroll_cards_SchemaSettingsMap as any,
        parse: parse_blog_horizontal_scroll_cards_ComponentSettings,
        component: Blog_HorizontalScrollCards_Component
    },
    "blog_large-images-overlay": {
        acceptsChildren: false,
        name: "Blog - Large Images Overlay",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Large Images Overlay. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_large_images_overlay_SchemaSettingsMap as any,
        parse: parse_blog_large_images_overlay_ComponentSettings,
        component: Blog_LargeImagesOverlay_Component
    },
    "blog_compact-list-dates": {
        acceptsChildren: false,
        name: "Blog - Compact List Dates",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Compact List Dates. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_compact_list_dates_SchemaSettingsMap as any,
        parse: parse_blog_compact_list_dates_ComponentSettings,
        component: Blog_CompactListDates_Component
    },
    "blog_zigzag-alternating": {
        acceptsChildren: false,
        name: "Blog - Zigzag Alternating",
        icon: "FileText",
        category: "blog",
        desc: "Blog and article feed variant styled as Zigzag Alternating. Optimized for readability, featuring author info, tag chips, dates, and clean responsive grids/lists.",
        settings: Component_blog_zigzag_alternating_SchemaSettingsMap as any,
        parse: parse_blog_zigzag_alternating_ComponentSettings,
        component: Blog_ZigzagAlternating_Component
    },
    "cta_centered-large-button": {
        acceptsChildren: false,
        name: "Cta - Centered Large Button",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Centered Large Button. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_centered_large_button_SchemaSettingsMap as any,
        parse: parse_cta_centered_large_button_ComponentSettings,
        component: Cta_CenteredLargeButton_Component
    },
    "cta_split-text-left-button": {
        acceptsChildren: false,
        name: "Cta - Split Text Left Button",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Split Text Left Button. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_split_text_left_button_SchemaSettingsMap as any,
        parse: parse_cta_split_text_left_button_ComponentSettings,
        component: Cta_SplitTextLeftButton_Component
    },
    "cta_bg-image-overlay": {
        acceptsChildren: false,
        name: "Cta - Bg Image Overlay",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Bg Image Overlay. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_bg_image_overlay_SchemaSettingsMap as any,
        parse: parse_cta_bg_image_overlay_ComponentSettings,
        component: Cta_BgImageOverlay_Component
    },
    "cta_card-shadow": {
        acceptsChildren: false,
        name: "Cta - Card Shadow",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Card Shadow. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_card_shadow_SchemaSettingsMap as any,
        parse: parse_cta_card_shadow_ComponentSettings,
        component: Cta_CardShadow_Component
    },
    "cta_minimal-border": {
        acceptsChildren: false,
        name: "Cta - Minimal Border",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Minimal Border. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_minimal_border_SchemaSettingsMap as any,
        parse: parse_cta_minimal_border_ComponentSettings,
        component: Cta_MinimalBorder_Component
    },
    "cta_fullwidth-banner-form": {
        acceptsChildren: false,
        name: "Cta - Fullwidth Banner Form",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Fullwidth Banner Form. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_fullwidth_banner_form_SchemaSettingsMap as any,
        parse: parse_cta_fullwidth_banner_form_ComponentSettings,
        component: Cta_FullwidthBannerForm_Component
    },
    "cta_side-by-side-icon": {
        acceptsChildren: false,
        name: "Cta - Side By Side Icon",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Side By Side Icon. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_side_by_side_icon_SchemaSettingsMap as any,
        parse: parse_cta_side_by_side_icon_ComponentSettings,
        component: Cta_SideBySideIcon_Component
    },
    "cta_compact-inline-banner": {
        acceptsChildren: false,
        name: "Cta - Compact Inline Banner",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Compact Inline Banner. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_compact_inline_banner_SchemaSettingsMap as any,
        parse: parse_cta_compact_inline_banner_ComponentSettings,
        component: Cta_CompactInlineBanner_Component
    },
    "cta_two-button-choice": {
        acceptsChildren: false,
        name: "Cta - Two Button Choice",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Two Button Choice. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_two_button_choice_SchemaSettingsMap as any,
        parse: parse_cta_two_button_choice_ComponentSettings,
        component: Cta_TwoButtonChoice_Component
    },
    "cta_urgency-countdown": {
        acceptsChildren: false,
        name: "Cta - Urgency Countdown",
        icon: "Sparkles",
        category: "cta",
        desc: "Call-to-action (CTA) section variant using Urgency Countdown. High-impact section crafted to drive user engagement, conversions, newsletter signups, or download buttons.",
        settings: Component_cta_urgency_countdown_SchemaSettingsMap as any,
        parse: parse_cta_urgency_countdown_ComponentSettings,
        component: Cta_UrgencyCountdown_Component
    },
    "footer_simple-centered": {
        acceptsChildren: false,
        name: "Footer - Simple Centered",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Simple Centered. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_simple_centered_SchemaSettingsMap as any,
        parse: parse_footer_simple_centered_ComponentSettings,
        component: Footer_SimpleCentered_Component
    },
    "footer_four-column-links": {
        acceptsChildren: false,
        name: "Footer - Four Column Links",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Four Column Links. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_four_column_links_SchemaSettingsMap as any,
        parse: parse_footer_four_column_links_ComponentSettings,
        component: Footer_FourColumnLinks_Component
    },
    "footer_large-newsletter-signup": {
        acceptsChildren: false,
        name: "Footer - Large Newsletter Signup",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Large Newsletter Signup. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_large_newsletter_signup_SchemaSettingsMap as any,
        parse: parse_footer_large_newsletter_signup_ComponentSettings,
        component: Footer_LargeNewsletterSignup_Component
    },
    "footer_minimal-single-row": {
        acceptsChildren: false,
        name: "Footer - Minimal Single Row",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Minimal Single Row. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_minimal_single_row_SchemaSettingsMap as any,
        parse: parse_footer_minimal_single_row_ComponentSettings,
        component: Footer_MinimalSingleRow_Component
    },
    "footer_dark-logo-socials": {
        acceptsChildren: false,
        name: "Footer - Dark Logo Socials",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Dark Logo Socials. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_dark_logo_socials_SchemaSettingsMap as any,
        parse: parse_footer_dark_logo_socials_ComponentSettings,
        component: Footer_DarkLogoSocials_Component
    },
    "footer_grid-contact-info": {
        acceptsChildren: false,
        name: "Footer - Grid Contact Info",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Grid Contact Info. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_grid_contact_info_SchemaSettingsMap as any,
        parse: parse_footer_grid_contact_info_ComponentSettings,
        component: Footer_GridContactInfo_Component
    },
    "footer_split-large-branding": {
        acceptsChildren: false,
        name: "Footer - Split Large Branding",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Split Large Branding. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_split_large_branding_SchemaSettingsMap as any,
        parse: parse_footer_split_large_branding_ComponentSettings,
        component: Footer_SplitLargeBranding_Component
    },
    "footer_stacked-badge-logo-grid": {
        acceptsChildren: false,
        name: "Footer - Stacked Badge Logo Grid",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Stacked Badge Logo Grid. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_stacked_badge_logo_grid_SchemaSettingsMap as any,
        parse: parse_footer_stacked_badge_logo_grid_ComponentSettings,
        component: Footer_StackedBadgeLogoGrid_Component
    },
    "footer_simple-text-links": {
        acceptsChildren: false,
        name: "Footer - Simple Text Links",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Simple Text Links. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_simple_text_links_SchemaSettingsMap as any,
        parse: parse_footer_simple_text_links_ComponentSettings,
        component: Footer_SimpleTextLinks_Component
    },
    "footer_fullwidth-app-downloads": {
        acceptsChildren: false,
        name: "Footer - Fullwidth App Downloads",
        icon: "Layers",
        category: "footer",
        desc: "Footer section layout configured with Fullwidth App Downloads. Features structured site links, social media links, newsletter forms, copyright text, and app badges.",
        settings: Component_footer_fullwidth_app_downloads_SchemaSettingsMap as any,
        parse: parse_footer_fullwidth_app_downloads_ComponentSettings,
        component: Footer_FullwidthAppDownloads_Component
    },
    "hero_centered-text-ctas": {
        acceptsChildren: false,
        name: "Hero - Centered Text Ctas",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Centered Text Ctas. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_centered_text_ctas_SchemaSettingsMap as any,
        parse: parse_hero_centered_text_ctas_ComponentSettings,
        component: Hero_CenteredTextCtas_Component
    },
    "hero_split-text-left-image": {
        acceptsChildren: false,
        name: "Hero - Split Text Left Image",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Split Text Left Image. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_split_text_left_image_SchemaSettingsMap as any,
        parse: parse_hero_split_text_left_image_ComponentSettings,
        component: Hero_SplitTextLeftImage_Component
    },
    "hero_bg-image-overlay-text": {
        acceptsChildren: false,
        name: "Hero - Bg Image Overlay Text",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Bg Image Overlay Text. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_bg_image_overlay_text_SchemaSettingsMap as any,
        parse: parse_hero_bg_image_overlay_text_ComponentSettings,
        component: Hero_BgImageOverlayText_Component
    },
    "hero_minimal-centered-badges": {
        acceptsChildren: false,
        name: "Hero - Minimal Centered Badges",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Minimal Centered Badges. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_minimal_centered_badges_SchemaSettingsMap as any,
        parse: parse_hero_minimal_centered_badges_ComponentSettings,
        component: Hero_MinimalCenteredBadges_Component
    },
    "hero_asymmetric-image-left": {
        acceptsChildren: false,
        name: "Hero - Asymmetric Image Left",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Asymmetric Image Left. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_asymmetric_image_left_SchemaSettingsMap as any,
        parse: parse_hero_asymmetric_image_left_ComponentSettings,
        component: Hero_AsymmetricImageLeft_Component
    },
    "hero_stacked-video-placeholder": {
        acceptsChildren: false,
        name: "Hero - Stacked Video Placeholder",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Stacked Video Placeholder. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_stacked_video_placeholder_SchemaSettingsMap as any,
        parse: parse_hero_stacked_video_placeholder_ComponentSettings,
        component: Hero_StackedVideoPlaceholder_Component
    },
    "hero_card-centered-shadow": {
        acceptsChildren: false,
        name: "Hero - Card Centered Shadow",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Card Centered Shadow. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_card_centered_shadow_SchemaSettingsMap as any,
        parse: parse_hero_card_centered_shadow_ComponentSettings,
        component: Hero_CardCenteredShadow_Component
    },
    "hero_dual-cta-feature-list": {
        acceptsChildren: false,
        name: "Hero - Dual Cta Feature List",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Dual Cta Feature List. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_dual_cta_feature_list_SchemaSettingsMap as any,
        parse: parse_hero_dual_cta_feature_list_ComponentSettings,
        component: Hero_DualCtaFeatureList_Component
    },
    "hero_fullheight-gradient-bg": {
        acceptsChildren: false,
        name: "Hero - Fullheight Gradient Bg",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Fullheight Gradient Bg. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_fullheight_gradient_bg_SchemaSettingsMap as any,
        parse: parse_hero_fullheight_gradient_bg_ComponentSettings,
        component: Hero_FullheightGradientBg_Component
    },
    "hero_zigzag-multiple-ctas": {
        acceptsChildren: false,
        name: "Hero - Zigzag Multiple Ctas",
        icon: "Layout",
        category: "hero",
        desc: "Hero section header layout designed as Zigzag Multiple Ctas. A high-conversion focal point featuring bold typography, clean buttons, gradient backgrounds, and call-to-actions.",
        settings: Component_hero_zigzag_multiple_ctas_SchemaSettingsMap as any,
        parse: parse_hero_zigzag_multiple_ctas_ComponentSettings,
        component: Hero_ZigzagMultipleCtas_Component
    },
    "navbar_services-header": {
        acceptsChildren: false,
        name: "Navbar - Services Header",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Services Header. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_services_header_SchemaSettingsMap as any,
        parse: parse_navbar_services_header_ComponentSettings,
        component: Navbar_ServicesHeader_Component
    },
    "navbar_centered-logo-gradient": {
        acceptsChildren: false,
        name: "Navbar - Centered Logo Gradient",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Centered Logo Gradient. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_centered_logo_gradient_SchemaSettingsMap as any,
        parse: parse_navbar_centered_logo_gradient_ComponentSettings,
        component: Navbar_CenteredLogoGradient_Component
    },
    "navbar_corporate-search": {
        acceptsChildren: false,
        name: "Navbar - Corporate Search",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Corporate Search. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_corporate_search_SchemaSettingsMap as any,
        parse: parse_navbar_corporate_search_ComponentSettings,
        component: Navbar_CorporateSearch_Component
    },
    "navbar_sidebar-gradient": {
        acceptsChildren: false,
        name: "Navbar - Sidebar Gradient",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Sidebar Gradient. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_sidebar_gradient_SchemaSettingsMap as any,
        parse: parse_navbar_sidebar_gradient_ComponentSettings,
        component: Navbar_SidebarGradient_Component
    },
    "navbar_transparent-overlay": {
        acceptsChildren: false,
        name: "Navbar - Transparent Overlay",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Transparent Overlay. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_transparent_overlay_SchemaSettingsMap as any,
        parse: parse_navbar_transparent_overlay_ComponentSettings,
        component: Navbar_TransparentOverlay_Component
    },
    "navbar_megamenu-dropdowns": {
        acceptsChildren: false,
        name: "Navbar - Megamenu Dropdowns",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Megamenu Dropdowns. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_megamenu_dropdowns_SchemaSettingsMap as any,
        parse: parse_navbar_megamenu_dropdowns_ComponentSettings,
        component: Navbar_MegamenuDropdowns_Component
    },
    "navbar_centered-stacked-animated": {
        acceptsChildren: false,
        name: "Navbar - Centered Stacked Animated",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Centered Stacked Animated. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_centered_stacked_animated_SchemaSettingsMap as any,
        parse: parse_navbar_centered_stacked_animated_ComponentSettings,
        component: Navbar_CenteredStackedAnimated_Component
    },
    "navbar_doublerow-gradient-top": {
        acceptsChildren: false,
        name: "Navbar - Doublerow Gradient Top",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Doublerow Gradient Top. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_doublerow_gradient_top_SchemaSettingsMap as any,
        parse: parse_navbar_doublerow_gradient_top_ComponentSettings,
        component: Navbar_DoublerowGradientTop_Component
    },
    "navbar_minimal-dark-neon": {
        acceptsChildren: false,
        name: "Navbar - Minimal Dark Neon",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Minimal Dark Neon. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_minimal_dark_neon_SchemaSettingsMap as any,
        parse: parse_navbar_minimal_dark_neon_ComponentSettings,
        component: Navbar_MinimalDarkNeon_Component
    },
    "navbar_animated-gradient-particles": {
        acceptsChildren: false,
        name: "Navbar - Animated Gradient Particles",
        icon: "Compass",
        category: "navbar",
        desc: "Navbar header menu styled as Animated Gradient Particles. Responsive top navigation menu with multi-menu support, brand logos, CTA buttons, search, and animations.",
        settings: Component_navbar_animated_gradient_particles_SchemaSettingsMap as any,
        parse: parse_navbar_animated_gradient_particles_ComponentSettings,
        component: Navbar_AnimatedGradientParticles_Component
    },
    "portfolio_three-column-grid": {
        acceptsChildren: false,
        name: "Portfolio - Three Column Grid",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Three Column Grid. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_three_column_grid_SchemaSettingsMap as any,
        parse: parse_portfolio_three_column_grid_ComponentSettings,
        component: Portfolio_ThreeColumnGrid_Component
    },
    "portfolio_masonry-layout": {
        acceptsChildren: false,
        name: "Portfolio - Masonry Layout",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Masonry Layout. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_masonry_layout_SchemaSettingsMap as any,
        parse: parse_portfolio_masonry_layout_ComponentSettings,
        component: Portfolio_MasonryLayout_Component
    },
    "portfolio_horizontal-scroll-cards": {
        acceptsChildren: false,
        name: "Portfolio - Horizontal Scroll Cards",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Horizontal Scroll Cards. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_horizontal_scroll_cards_SchemaSettingsMap as any,
        parse: parse_portfolio_horizontal_scroll_cards_ComponentSettings,
        component: Portfolio_HorizontalScrollCards_Component
    },
    "portfolio_two-column-details": {
        acceptsChildren: false,
        name: "Portfolio - Two Column Details",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Two Column Details. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_two_column_details_SchemaSettingsMap as any,
        parse: parse_portfolio_two_column_details_ComponentSettings,
        component: Portfolio_TwoColumnDetails_Component
    },
    "portfolio_fullwidth-alternating": {
        acceptsChildren: false,
        name: "Portfolio - Fullwidth Alternating",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Fullwidth Alternating. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_fullwidth_alternating_SchemaSettingsMap as any,
        parse: parse_portfolio_fullwidth_alternating_ComponentSettings,
        component: Portfolio_FullwidthAlternating_Component
    },
    "portfolio_filterable-grid": {
        acceptsChildren: false,
        name: "Portfolio - Filterable Grid",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Filterable Grid. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_filterable_grid_SchemaSettingsMap as any,
        parse: parse_portfolio_filterable_grid_ComponentSettings,
        component: Portfolio_FilterableGrid_Component
    },
    "portfolio_minimal-list": {
        acceptsChildren: false,
        name: "Portfolio - Minimal List",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Minimal List. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_minimal_list_SchemaSettingsMap as any,
        parse: parse_portfolio_minimal_list_ComponentSettings,
        component: Portfolio_MinimalList_Component
    },
    "portfolio_featured-and-grid": {
        acceptsChildren: false,
        name: "Portfolio - Featured And Grid",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Featured And Grid. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_featured_and_grid_SchemaSettingsMap as any,
        parse: parse_portfolio_featured_and_grid_ComponentSettings,
        component: Portfolio_FeaturedAndGrid_Component
    },
    "portfolio_compact-five-column": {
        acceptsChildren: false,
        name: "Portfolio - Compact Five Column",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Compact Five Column. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_compact_five_column_SchemaSettingsMap as any,
        parse: parse_portfolio_compact_five_column_ComponentSettings,
        component: Portfolio_CompactFiveColumn_Component
    },
    "portfolio_split-screen": {
        acceptsChildren: false,
        name: "Portfolio - Split Screen",
        icon: "Images",
        category: "portfolio",
        desc: "Portfolio showcase variant rendered as Split Screen. Beautiful project gallery, responsive grid layout, masonry, filterable categories, or scrollable card items.",
        settings: Component_portfolio_split_screen_SchemaSettingsMap as any,
        parse: parse_portfolio_split_screen_ComponentSettings,
        component: Portfolio_SplitScreen_Component
    },
    "pricing_three-column-simple": {
        acceptsChildren: false,
        name: "Pricing - Three Column Simple",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Three Column Simple. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_three_column_simple_SchemaSettingsMap as any,
        parse: parse_pricing_three_column_simple_ComponentSettings,
        component: Pricing_ThreeColumnSimple_Component
    },
    "pricing_highlighted-center-plan": {
        acceptsChildren: false,
        name: "Pricing - Highlighted Center Plan",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Highlighted Center Plan. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_highlighted_center_plan_SchemaSettingsMap as any,
        parse: parse_pricing_highlighted_center_plan_ComponentSettings,
        component: Pricing_HighlightedCenterPlan_Component
    },
    "pricing_toggle-monthly-yearly": {
        acceptsChildren: false,
        name: "Pricing - Toggle Monthly Yearly",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Toggle Monthly Yearly. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_toggle_monthly_yearly_SchemaSettingsMap as any,
        parse: parse_pricing_toggle_monthly_yearly_ComponentSettings,
        component: Pricing_ToggleMonthlyYearly_Component
    },
    "pricing_comparison-table": {
        acceptsChildren: false,
        name: "Pricing - Comparison Table",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Comparison Table. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_comparison_table_SchemaSettingsMap as any,
        parse: parse_pricing_comparison_table_ComponentSettings,
        component: Pricing_ComparisonTable_Component
    },
    "pricing_minimalist-single-column": {
        acceptsChildren: false,
        name: "Pricing - Minimalist Single Column",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Minimalist Single Column. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_minimalist_single_column_SchemaSettingsMap as any,
        parse: parse_pricing_minimalist_single_column_ComponentSettings,
        component: Pricing_MinimalistSingleColumn_Component
    },
    "pricing_bordered-check-cards": {
        acceptsChildren: false,
        name: "Pricing - Bordered Check Cards",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Bordered Check Cards. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_bordered_check_cards_SchemaSettingsMap as any,
        parse: parse_pricing_bordered_check_cards_ComponentSettings,
        component: Pricing_BorderedCheckCards_Component
    },
    "pricing_horizontal-card-layout": {
        acceptsChildren: false,
        name: "Pricing - Horizontal Card Layout",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Horizontal Card Layout. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_horizontal_card_layout_SchemaSettingsMap as any,
        parse: parse_pricing_horizontal_card_layout_ComponentSettings,
        component: Pricing_HorizontalCardLayout_Component
    },
    "pricing_four-column-compact": {
        acceptsChildren: false,
        name: "Pricing - Four Column Compact",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Four Column Compact. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_four_column_compact_SchemaSettingsMap as any,
        parse: parse_pricing_four_column_compact_ComponentSettings,
        component: Pricing_FourColumnCompact_Component
    },
    "pricing_stacked-vertical-dividers": {
        acceptsChildren: false,
        name: "Pricing - Stacked Vertical Dividers",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Stacked Vertical Dividers. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_stacked_vertical_dividers_SchemaSettingsMap as any,
        parse: parse_pricing_stacked_vertical_dividers_ComponentSettings,
        component: Pricing_StackedVerticalDividers_Component
    },
    "pricing_side-by-side-comparison": {
        acceptsChildren: false,
        name: "Pricing - Side By Side Comparison",
        icon: "DollarSign",
        category: "pricing",
        desc: "Pricing table block variant configured as Side By Side Comparison. High-contrast layout for comparison tables, highlighted plans, toggle billing periods, and feature lists.",
        settings: Component_pricing_side_by_side_comparison_SchemaSettingsMap as any,
        parse: parse_pricing_side_by_side_comparison_ComponentSettings,
        component: Pricing_SideBySideComparison_Component
    },
    "services_three-column-icon-grid": {
        acceptsChildren: false,
        name: "Services - Three Column Icon Grid",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Three Column Icon Grid. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_three_column_icon_grid_SchemaSettingsMap as any,
        parse: parse_services_three_column_icon_grid_ComponentSettings,
        component: Services_ThreeColumnIconGrid_Component
    },
    "services_card-images-hover": {
        acceptsChildren: false,
        name: "Services - Card Images Hover",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Card Images Hover. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_card_images_hover_SchemaSettingsMap as any,
        parse: parse_services_card_images_hover_ComponentSettings,
        component: Services_CardImagesHover_Component
    },
    "services_horizontal-alternating": {
        acceptsChildren: false,
        name: "Services - Horizontal Alternating",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Horizontal Alternating. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_horizontal_alternating_SchemaSettingsMap as any,
        parse: parse_services_horizontal_alternating_ComponentSettings,
        component: Services_HorizontalAlternating_Component
    },
    "services_colored-bg-two-column": {
        acceptsChildren: false,
        name: "Services - Colored Bg Two Column",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Colored Bg Two Column. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_colored_bg_two_column_SchemaSettingsMap as any,
        parse: parse_services_colored_bg_two_column_ComponentSettings,
        component: Services_ColoredBgTwoColumn_Component
    },
    "services_list-numbered-items": {
        acceptsChildren: false,
        name: "Services - List Numbered Items",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying List Numbered Items. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_list_numbered_items_SchemaSettingsMap as any,
        parse: parse_services_list_numbered_items_ComponentSettings,
        component: Services_ListNumberedItems_Component
    },
    "services_minimal-large-icons": {
        acceptsChildren: false,
        name: "Services - Minimal Large Icons",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Minimal Large Icons. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_minimal_large_icons_SchemaSettingsMap as any,
        parse: parse_services_minimal_large_icons_ComponentSettings,
        component: Services_MinimalLargeIcons_Component
    },
    "services_bordered-hover-scale": {
        acceptsChildren: false,
        name: "Services - Bordered Hover Scale",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Bordered Hover Scale. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_bordered_hover_scale_SchemaSettingsMap as any,
        parse: parse_services_bordered_hover_scale_ComponentSettings,
        component: Services_BorderedHoverScale_Component
    },
    "services_stacked-left-aligned": {
        acceptsChildren: false,
        name: "Services - Stacked Left Aligned",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Stacked Left Aligned. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_stacked_left_aligned_SchemaSettingsMap as any,
        parse: parse_services_stacked_left_aligned_ComponentSettings,
        component: Services_StackedLeftAligned_Component
    },
    "services_four-column-compact-grid": {
        acceptsChildren: false,
        name: "Services - Four Column Compact Grid",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Four Column Compact Grid. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_four_column_compact_grid_SchemaSettingsMap as any,
        parse: parse_services_four_column_compact_grid_ComponentSettings,
        component: Services_FourColumnCompactGrid_Component
    },
    "services_masonry-varying-heights": {
        acceptsChildren: false,
        name: "Services - Masonry Varying Heights",
        icon: "Grid",
        category: "services",
        desc: "Services section block variant displaying Masonry Varying Heights. Tailored to outline core capabilities, business features, numbered grids, or hover scale cards.",
        settings: Component_services_masonry_varying_heights_SchemaSettingsMap as any,
        parse: parse_services_masonry_varying_heights_ComponentSettings,
        component: Services_MasonryVaryingHeights_Component
    },
    "testimonials_two-column-grid": {
        acceptsChildren: false,
        name: "Testimonials - Two Column Grid",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Two Column Grid. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_two_column_grid_SchemaSettingsMap as any,
        parse: parse_testimonials_two_column_grid_ComponentSettings,
        component: Testimonials_TwoColumnGrid_Component
    },
    "testimonials_centered-single-card": {
        acceptsChildren: false,
        name: "Testimonials - Centered Single Card",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Centered Single Card. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_centered_single_card_SchemaSettingsMap as any,
        parse: parse_testimonials_centered_single_card_ComponentSettings,
        component: Testimonials_CenteredSingleCard_Component
    },
    "testimonials_three-column-stars": {
        acceptsChildren: false,
        name: "Testimonials - Three Column Stars",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Three Column Stars. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_three_column_stars_SchemaSettingsMap as any,
        parse: parse_testimonials_three_column_stars_ComponentSettings,
        component: Testimonials_ThreeColumnStars_Component
    },
    "testimonials_horizontal-scroll-cards": {
        acceptsChildren: false,
        name: "Testimonials - Horizontal Scroll Cards",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Horizontal Scroll Cards. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_horizontal_scroll_cards_SchemaSettingsMap as any,
        parse: parse_testimonials_horizontal_scroll_cards_ComponentSettings,
        component: Testimonials_HorizontalScrollCards_Component
    },
    "testimonials_stacked-large-quotes": {
        acceptsChildren: false,
        name: "Testimonials - Stacked Large Quotes",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Stacked Large Quotes. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_stacked_large_quotes_SchemaSettingsMap as any,
        parse: parse_testimonials_stacked_large_quotes_ComponentSettings,
        component: Testimonials_StackedLargeQuotes_Component
    },
    "testimonials_masonry-varying-sizes": {
        acceptsChildren: false,
        name: "Testimonials - Masonry Varying Sizes",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Masonry Varying Sizes. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_masonry_varying_sizes_SchemaSettingsMap as any,
        parse: parse_testimonials_masonry_varying_sizes_ComponentSettings,
        component: Testimonials_MasonryVaryingSizes_Component
    },
    "testimonials_video-play-cards": {
        acceptsChildren: false,
        name: "Testimonials - Video Play Cards",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Video Play Cards. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_video_play_cards_SchemaSettingsMap as any,
        parse: parse_testimonials_video_play_cards_ComponentSettings,
        component: Testimonials_VideoPlayCards_Component
    },
    "testimonials_alternating-side-by-side": {
        acceptsChildren: false,
        name: "Testimonials - Alternating Side By Side",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Alternating Side By Side. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_alternating_side_by_side_SchemaSettingsMap as any,
        parse: parse_testimonials_alternating_side_by_side_ComponentSettings,
        component: Testimonials_AlternatingSideBySide_Component
    },
    "testimonials_minimal-quote-centered": {
        acceptsChildren: false,
        name: "Testimonials - Minimal Quote Centered",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Minimal Quote Centered. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_minimal_quote_centered_SchemaSettingsMap as any,
        parse: parse_testimonials_minimal_quote_centered_ComponentSettings,
        component: Testimonials_MinimalQuoteCentered_Component
    },
    "testimonials_compact-inline-badges": {
        acceptsChildren: false,
        name: "Testimonials - Compact Inline Badges",
        icon: "MessageCircle",
        category: "testimonials",
        desc: "Testimonial social proof block layout displaying Compact Inline Badges. Showcases client reviews, quotes, ratings, stars, avatar images, and carousel/grid elements.",
        settings: Component_testimonials_compact_inline_badges_SchemaSettingsMap as any,
        parse: parse_testimonials_compact_inline_badges_ComponentSettings,
    },
};

export type { BaseTypes } from "./type";
