export * from './type';

import AButton from './Button';
import ABox from './Box';
import AText from './Text';
import AImage from './Image';
import AIcon from './Icon';
import AInput from './Input';
import ALink from './Link';
import ASearchQuery from './search/SearchQuery';
import AForm from './Form';
import { BaseTypes } from './type';

import {
    AModalBox,
    ADrawerBox,
    AAccordionBox,
    ATabsBox,
    AStickyBox,
    ASplitHeroBox,
    AStackBox,
    AMasonryBox,
    ASpacerBlock,
    ADividerBlock,
    AVideoBlock,
    ARatingBlock,
    ABadgeBlock,
    AHtmlBlock,
    AProgressBarBlock,
    AMapBlock,
    APriceBlock,
    ACountdownBlock,
    ATextareaField,
    ACheckboxField,
    ARadioField,
    ASelectField,
    AQuantitySelector,
    AProductLoopContext,
    ACategoryLoopContext,
    ACartItemsContext,
    AProductVariantSelector,
    AProductImageGallery
} from './ExtendedComponents';
import ACarouselBox from './CarouselBox/ClientComponent';

export const AppComponents: Record<BaseTypes, any> = {
    // Original mappings (backward compatibility)
    button: AButton,
    box: ABox,
    text: AText,
    image: AImage,
    icon: AIcon,
    input: AInput,
    link: ALink,
    search_query: ASearchQuery,
    form: AForm,

    // 40 E-Commerce Master Elements (Containers & Blocks & Stateful Elements & Context Loops)
    // 1. Structural Layout Containers
    flex_box: ABox,
    grid_box: ABox,
    card_box: ABox,
    carousel_box: ACarouselBox,
    modal_box: AModalBox,
    drawer_box: ADrawerBox,
    accordion_box: AAccordionBox,
    tabs_box: ATabsBox,
    sticky_box: AStickyBox,
    split_hero_box: ASplitHeroBox,
    stack_box: AStackBox,
    masonry_box: AMasonryBox,

    // 2. Content Elements & Atoms
    text_block: AText,
    link_block: ALink,
    image_block: AImage,
    button_block: AButton,
    svg_icon: AIcon,
    spacer_block: ASpacerBlock,
    divider_block: ADividerBlock,
    video_block: AVideoBlock,
    rating_block: ARatingBlock,
    badge_block: ABadgeBlock,
    html_block: AHtmlBlock,
    progress_bar_block: AProgressBarBlock,
    map_block: AMapBlock,
    price_block: APriceBlock,
    countdown_block: ACountdownBlock,

    // 3. Stateful Form Elements & Intake
    form_wrapper: AForm,
    input_block: AInput,
    input_field: AInput,
    textarea_field: ATextareaField,
    checkbox_field: ACheckboxField,
    radio_field: ARadioField,
    select_field: ASelectField,
    quantity_selector: AQuantitySelector,

    // 4. E-Commerce Content Loops & Context Proxies
    product_loop_context: AProductLoopContext,
    category_loop_context: ACategoryLoopContext,
    cart_items_context: ACartItemsContext,
    product_variant_selector: AProductVariantSelector,
    product_image_gallery: AProductImageGallery
};
