export type BaseTypes =
    | "button"
    | "box"
    | "icon"
    | "text"
    | "image"
    | "input"
    | "link"
    | "search_query"
    | "form"
    // 40 E-Commerce Master Elements (Containers & Blocks & Stateful Elements & Context Loops)
    // 1. Structural Layout Containers
    | "flex_box"
    | "grid_box"
    | "card_box"
    | "carousel_box"
    | "modal_box"
    | "drawer_box"
    | "accordion_box"
    | "tabs_box"
    | "sticky_box"
    | "split_hero_box"
    | "stack_box"
    | "masonry_box"
    // 2. Content Elements & Atoms
    | "text_block"
    | "link_block"
    | "image_block"
    | "button_block"
    | "svg_icon"
    | "spacer_block"
    | "divider_block"
    | "video_block"
    | "rating_block"
    | "badge_block"
    | "html_block"
    | "progress_bar_block"
    | "map_block"
    | "price_block"
    | "countdown_block"
    // 3. Stateful Form Elements & Intake
    | "form_wrapper"
    | "input_block"
    | "input_field"
    | "textarea_field"
    | "checkbox_field"
    | "radio_field"
    | "select_field"
    | "quantity_selector"
    // 4. E-Commerce Content Loops & Context Proxies
    | "product_loop_context"
    | "category_loop_context"
    | "cart_items_context"
    | "product_variant_selector"
    | "product_image_gallery"
    | (string & {});

export interface BaseProps {
    id?: string;
    style?: React.CSSProperties;
    className?: string;
}

export type ActionObject = {
    label: string;
    action: string;
};
