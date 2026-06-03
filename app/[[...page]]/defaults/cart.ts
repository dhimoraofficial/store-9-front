import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Shopping Cart Page [SP] Layout Schema
 */
export const defaultCartSchema: ComponentSchema[] = [
    {
        id: "cart-top-spacer",
        type: "spacer_block",
        settings: { "spacer-height-desktop": "48px", "spacer-height-mobile": "24px" }
    },
    {
        id: "cart-title-container",
        type: "flex_box",
        settings: {
            "box-display": "flex",
            "box-direction": "col",
            style: { padding: "0 40px", marginBottom: "32px" }
        },
        children: [
            {
                id: "cart-title-heading",
                type: "text_block",
                settings: {
                    "content": "YOUR SHOPPING BAG",
                    "text-element": "h1",
                    "text-size": "28px",
                    "text-weight": "bold",
                    "text-color": "var(--text-main)",
                    style: { fontFamily: "Playfair Display, Georgia, serif", letterSpacing: "2px" }
                }
            }
        ]
    },
    {
        id: "cart-main-layout-container",
        type: "split_hero_box",
        settings: {
            "splitRatio": "65-35",
            style: {
                alignItems: "stretch",
                gap: "40px",
                padding: "0 40px",
                marginBottom: "64px"
            }
        },
        children: [
            /* Left side: Cart Items Stack Console */
            {
                id: "cart-items-console-column",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-direction": "col",
                    "box-gap": "1.5rem"
                },
                children: [
                    /* Mock Cart Item 1 */
                    {
                        id: "cart-item-row-1",
                        type: "card_box",
                        settings: {
                            "box-padding": "16px",
                            "box-radius": "4px",
                            "box-bg": "var(--bg-surface)",
                            "box-border": "1px solid var(--border-primary)"
                        },
                        children: [
                            {
                                id: "cart-item-flex-1",
                                type: "flex_box",
                                settings: { "box-display": "flex", "box-direction": "row", "box-align": "center", "box-justify": "space-between" },
                                children: [
                                    {
                                        id: "cart-item-info-stack-1",
                                        type: "flex_box",
                                        settings: { "box-display": "flex", "box-direction": "row", "box-align": "center", "box-gap": "1rem" },
                                        children: [
                                            {
                                                id: "cart-item-img-1",
                                                type: "image_block",
                                                settings: { "img-src": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=150", "img-alt": "Trenchcoat thumbnail", "img-object-fit": "cover", style: { width: "80px", height: "100px", borderRadius: "2px" } }
                                            },
                                            {
                                                id: "cart-item-text-1",
                                                type: "flex_box",
                                                settings: { "box-display": "flex", "box-direction": "col", "box-gap": "4px" },
                                                children: [
                                                    { id: "cart-item-name-1", type: "text_block", settings: { "content": "Classic Double-Breasted Trenchcoat", "text-size": "14px", "text-weight": "bold", "text-color": "var(--text-main)" } },
                                                    { id: "cart-item-meta-1", type: "text_block", settings: { "content": "Size: S • Color: Oatmeal Beige", "text-size": "12px", "text-color": "var(--text-muted)" } },
                                                    { id: "cart-item-qty-lbl-1", type: "text_block", settings: { "content": "Qty: 1", "text-size": "12px", "text-color": "var(--text-muted)" } }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: "cart-item-price-col-1",
                                        type: "flex_box",
                                        settings: { "box-display": "flex", "box-direction": "col", "box-align": "end", "box-gap": "8px" },
                                        children: [
                                            { id: "cart-item-prc-1", type: "text_block", settings: { "content": "$249.00", "text-size": "15px", "text-weight": "bold", "text-color": "var(--text-main)" } },
                                            { id: "cart-item-rem-1", type: "text_block", settings: { "content": "Remove", "text-size": "12px", "text-color": "var(--color-error)", style: { cursor: "pointer", textDecoration: "underline" } } }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            /* Right side: Summary box & actions */
            {
                id: "cart-summary-column",
                type: "box",
                settings: {
                    style: {
                        width: "100%"
                    }
                },
                children: [
                    {
                        id: "cart-summary-card",
                        type: "card_box",
                        settings: {
                            "box-padding": "24px",
                            "box-radius": "4px",
                            "box-bg": "var(--bg-app)",
                            "box-border": "1px solid var(--border-primary)"
                        },
                        children: [
                            {
                                id: "cart-summary-stack",
                                type: "flex_box",
                                settings: { "box-display": "flex", "box-direction": "col", "box-gap": "1.25rem" },
                                children: [
                                    { id: "sum-title", type: "text_block", settings: { "content": "ORDER SUMMARY", "text-size": "12px", "text-weight": "700", "text-color": "var(--text-main)", style: { letterSpacing: "1px" } } },
                                    {
                                        id: "sum-subtotal-row",
                                        type: "flex_box",
                                        settings: { "box-display": "flex", "box-direction": "row", "box-justify": "space-between" },
                                        children: [
                                            { id: "sub-lbl", type: "text_block", settings: { "content": "Subtotal", "text-size": "13px", "text-color": "var(--text-main)" } },
                                            { id: "sub-val", type: "text_block", settings: { "content": "$249.00", "text-size": "14px", "text-weight": "600" } }
                                        ]
                                    },
                                    {
                                        id: "sum-shipping-row",
                                        type: "flex_box",
                                        settings: { "box-display": "flex", "box-direction": "row", "box-justify": "space-between" },
                                        children: [
                                            { id: "ship-lbl", type: "text_block", settings: { "content": "Shipping", "text-size": "13px", "text-color": "var(--text-main)" } },
                                            { id: "ship-val", type: "text_block", settings: { "content": "Complimentary", "text-size": "13px", "text-color": "var(--color-success)", style: { fontWeight: "600" } } }
                                        ]
                                    },
                                    {
                                        id: "sum-total-row",
                                        type: "flex_box",
                                        settings: { "box-display": "flex", "box-direction": "row", "box-justify": "space-between", style: { borderTop: "1px solid var(--border-primary)", paddingTop: "16px" } },
                                        children: [
                                            { id: "tot-lbl", type: "text_block", settings: { "content": "Total", "text-size": "15px", "text-weight": "bold", "text-color": "var(--text-main)" } },
                                            { id: "tot-val", type: "text_block", settings: { "content": "$249.00", "text-size": "18px", "text-weight": "bold", "text-color": "var(--text-main)" } }
                                        ]
                                    },
                                    {
                                        id: "checkout-redirect-link",
                                        type: "link_block",
                                        settings: {
                                            "link-url": "/checkout",
                                            style: { textDecoration: "none" }
                                        },
                                        children: [
                                            {
                                                id: "checkout-trigger-btn",
                                                type: "button_block",
                                                settings: {
                                                    "btn-label": "PROCEED TO SECURE CHECKOUT",
                                                    style: {
                                                        backgroundColor: "var(--primary)",
                                                        color: "var(--text-inverted)",
                                                        width: "100%",
                                                        border: "none",
                                                        padding: "16px",
                                                        fontWeight: "600",
                                                        fontSize: "12px",
                                                        letterSpacing: "1.5px",
                                                        textAlign: "center",
                                                        cursor: "pointer",
                                                        display: "block"
                                                    }
                                                }
                                             }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
