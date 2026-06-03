import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Product Detail Page [DP] Layout Schema
 * Premium, split layout detailing fashion attributes.
 */
export const defaultProductSchema: ComponentSchema[] = [
    {
        id: "product-page-top-spacer",
        type: "spacer_block",
        settings: { "spacer-height-desktop": "36px", "spacer-height-mobile": "20px" }
    },
    {
        id: "product-detail-split-container",
        type: "split_hero_box",
        settings: {
            "splitRatio": "50-50",
            style: {
                alignItems: "stretch",
                gap: "48px",
                marginBottom: "48px"
            }
        },
        children: [
            /* Left Side: Product Image Display */
            {
                id: "product-gallery-box",
                type: "box",
                settings: {
                    style: {
                        position: "relative",
                        width: "100%"
                    }
                },
                children: [
                    {
                        id: "product-primary-image",
                        type: "image_block",
                        settings: {
                            "img-src": "${context.product.image}",
                            "img-alt": "${context.product.title}",
                            "img-object-fit": "cover",
                            style: {
                                width: "100%",
                                minHeight: "560px",
                                backgroundColor: "var(--bg-app)",
                                borderRadius: "4px"
                            }
                        }
                    }
                ]
            },

            /* Right Side: Product Details & Buying Actions Console */
            {
                id: "product-details-actions-console",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-direction": "col",
                    "box-gap": "1.5rem",
                    "box-justify": "flex-start"
                },
                children: [
                    /* 1. Badge & Sourcing info */
                    {
                        id: "product-meta-badge",
                        type: "badge_block",
                        settings: {
                            "badge-text": "${context.product.badgeText}",
                            style: { backgroundColor: "var(--accent)", color: "var(--text-inverted)", width: "fit-content" }
                        }
                    },
                    /* 2. Product Name & Pricing */
                    {
                        id: "product-title-price-stack",
                        type: "flex_box",
                        settings: { "box-display": "flex", "box-direction": "col", "box-gap": "0.5rem" },
                        children: [
                            {
                                id: "product-name",
                                type: "text_block",
                                settings: {
                                    "content": "${context.product.title}",
                                    "text-element": "h1",
                                    "text-size": "32px",
                                    "text-weight": "bold",
                                    "text-color": "var(--text-main)",
                                    style: { fontFamily: "Playfair Display, Georgia, serif" }
                                }
                            },
                            {
                                id: "product-price-row",
                                type: "flex_box",
                                settings: { "box-display": "flex", "box-direction": "row", "box-gap": "1rem", "box-align": "center" },
                                children: [
                                    { id: "product-current-price", type: "text_block", settings: { "content": "Rs. ${context.activeVariant.price}", "text-size": "20px", "text-weight": "700", "text-color": "var(--text-main)" } },
                                    { id: "product-compare-price", type: "text_block", settings: { "content": "Rs. ${context.product.compareAtPrice}", "text-size": "16px", "text-color": "var(--text-muted)", style: { textDecoration: "line-through" } } }
                                ]
                            }
                        ]
                    },
                    /* 3. Description Block */
                    {
                        id: "product-description-text",
                        type: "text_block",
                        settings: {
                            "content": "${context.product.description}",
                            "text-element": "p",
                            "text-size": "14px",
                            "text-color": "var(--text-main)",
                            style: { lineHeight: "1.7" }
                        }
                    },
                    /* 4. Selectors Mock (Size, Color) */
                    {
                        id: "product-selectors-container",
                        type: "flex_box",
                        settings: { "box-display": "flex", "box-direction": "col", "box-gap": "1rem" },
                        children: [
                            /* Size label and buttons */
                            { id: "size-label", type: "text_block", settings: { "content": "SELECT SIZE", "text-size": "11px", "text-weight": "700", "text-color": "var(--text-main)", style: { letterSpacing: "1px" } } },
                            {
                                id: "size-buttons-row",
                                type: "flex_box",
                                settings: { "box-display": "flex", "box-direction": "row", "box-gap": "0.5rem" },
                                children: [
                                    { id: "sz-xs", type: "text_block", settings: { "content": "XS", style: { border: "1px solid var(--border-primary)", padding: "8px 16px", fontSize: "12px", cursor: "pointer" } } },
                                    { id: "sz-s", type: "text_block", settings: { "content": "S", style: { border: "1px solid var(--text-main)", padding: "8px 16px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" } } },
                                    { id: "sz-m", type: "text_block", settings: { "content": "M", style: { border: "1px solid var(--border-primary)", padding: "8px 16px", fontSize: "12px", cursor: "pointer" } } },
                                    { id: "sz-l", type: "text_block", settings: { "content": "L", style: { border: "1px solid var(--border-primary)", padding: "8px 16px", fontSize: "12px", cursor: "pointer" } } }
                                ]
                            }
                        ]
                    },
                    /* 5. Add to Bag Trigger Action */
                    {
                        id: "product-buying-action-triggers",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "row",
                            "box-gap": "1rem",
                            style: { marginTop: "1rem" }
                        },
                        children: [
                            {
                                id: "product-add-to-cart-button",
                                type: "button_block",
                                settings: {
                                    "btn-label": "ADD TO SHOPPING BAG",
                                    style: {
                                        backgroundColor: "var(--primary)",
                                        color: "var(--text-inverted)",
                                        flex: "2",
                                        border: "none",
                                        padding: "16px",
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        letterSpacing: "1.5px",
                                        cursor: "pointer",
                                        textAlign: "center"
                                    }
                                }
                            },
                            {
                                id: "product-wishlist-button",
                                type: "button_block",
                                settings: {
                                    "btn-label": "♥",
                                    style: {
                                        backgroundColor: "var(--bg-surface)",
                                        color: "var(--text-main)",
                                        border: "1px solid var(--border-primary)",
                                        flex: "0.5",
                                        padding: "16px",
                                        fontWeight: "600",
                                        textAlign: "center",
                                        cursor: "pointer"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },

    /* 6. Section Title: Recommended products */
    {
        id: "product-recommendations-title-flex",
        type: "flex_box",
        settings: {
            "box-display": "flex",
            "box-direction": "col",
            "box-align": "center",
            "box-gap": "0.5rem",
            style: { marginBottom: "2rem" }
        },
        children: [
            {
                id: "recommendations-title",
                type: "text_block",
                settings: {
                    "content": "YOU MAY ALSO LIKE",
                    "text-element": "h3",
                    "text-size": "18px",
                    "text-weight": "bold",
                    "text-color": "var(--text-main)",
                    style: { letterSpacing: "2px" }
                }
            }
        ]
    },

    /* 7. Product Recommendations List */
    {
        id: "product-recommendations-loop",
        type: "product_loop_context",
        settings: {
            "limit": 4,
            "productSort": "related",
            style: { marginBottom: "4rem" }
        }
    }
];
