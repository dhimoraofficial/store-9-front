import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Secure Checkout Page [SP] Layout Schema
 */
export const defaultCheckoutSchema: ComponentSchema[] = [
    {
        id: "checkout-top-spacer",
        type: "spacer_block",
        settings: { "spacer-height-desktop": "48px", "spacer-height-mobile": "24px" }
    },
    {
        id: "checkout-title-container",
        type: "flex_box",
        settings: {
            "box-display": "flex",
            "box-direction": "col",
            style: { padding: "0 40px", marginBottom: "32px" }
        },
        children: [
            {
                id: "checkout-title-heading",
                type: "text_block",
                settings: {
                    "content": "SECURE CHECKOUT",
                    "text-element": "h1",
                    "text-size": "26px",
                    "text-weight": "bold",
                    "text-color": "#1A1A1A",
                    style: { fontFamily: "Playfair Display, Georgia, serif", letterSpacing: "2px" }
                }
            }
        ]
    },
    {
        id: "checkout-main-layout-container",
        type: "split_hero_box",
        settings: {
            "splitRatio": "60-40",
            style: {
                alignItems: "stretch",
                gap: "48px",
                padding: "0 40px",
                marginBottom: "64px"
            }
        },
        children: [
            /* Left Side: Shipping Address & Payment Forms */
            {
                id: "checkout-forms-column",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-direction": "col",
                    "box-gap": "2rem"
                },
                children: [
                    /* 1. Contact Information */
                    {
                        id: "form-contact-card",
                        type: "flex_box",
                        settings: { "box-display": "flex", "box-direction": "col", "box-gap": "1rem" },
                        children: [
                            { id: "form-contact-title", type: "text_block", settings: { "content": "1. CONTACT INFORMATION", "text-size": "12px", "text-weight": "700", "text-color": "#1A1A1A", style: { letterSpacing: "1px" } } },
                            {
                                id: "form-contact-email-input",
                                type: "input_block",
                                settings: {
                                    "input-type": "email",
                                    "input-placeholder": "Email address (for shipping confirmations)",
                                    style: { width: "100%", padding: "12px", border: "1px solid #EBEBEB", borderRadius: "4px", fontSize: "13px" }
                                }
                            }
                        ]
                    },

                    /* 2. Delivery Address */
                    {
                        id: "form-delivery-card",
                        type: "flex_box",
                        settings: { "box-display": "flex", "box-direction": "col", "box-gap": "1rem" },
                        children: [
                            { id: "form-delivery-title", type: "text_block", settings: { "content": "2. DELIVERY ADDRESS", "text-size": "12px", "text-weight": "700", "text-color": "#1A1A1A", style: { letterSpacing: "1px" } } },
                            {
                                id: "form-delivery-name-input",
                                type: "input_block",
                                settings: {
                                    "input-type": "text",
                                    "input-placeholder": "Full name",
                                    style: { width: "100%", padding: "12px", border: "1px solid #EBEBEB", borderRadius: "4px", fontSize: "13px" }
                                }
                            },
                            {
                                id: "form-delivery-address-input",
                                type: "input_block",
                                settings: {
                                    "input-type": "text",
                                    "input-placeholder": "Street address, apartment, suite",
                                    style: { width: "100%", padding: "12px", border: "1px solid #EBEBEB", borderRadius: "4px", fontSize: "13px" }
                                }
                            },
                            {
                                id: "form-delivery-city-phone-row",
                                type: "flex_box",
                                settings: { "box-display": "flex", "box-direction": "row", "box-gap": "1rem" },
                                children: [
                                    {
                                        id: "form-delivery-city-input",
                                        type: "input_block",
                                        settings: { "input-type": "text", "input-placeholder": "City / Region", style: { flex: "1", padding: "12px", border: "1px solid #EBEBEB", borderRadius: "4px", fontSize: "13px" } }
                                    },
                                    {
                                        id: "form-delivery-phone-input",
                                        type: "input_block",
                                        settings: { "input-type": "tel", "input-placeholder": "Phone number", style: { flex: "1", padding: "12px", border: "1px solid #EBEBEB", borderRadius: "4px", fontSize: "13px" } }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            /* Right Side: Order Summary items list & Place Order action button */
            {
                id: "checkout-order-summary-column",
                type: "box",
                settings: {
                    style: {
                        width: "100%"
                    }
                },
                children: [
                    {
                        id: "checkout-summary-card",
                        type: "card_box",
                        settings: {
                            "box-padding": "24px",
                            "box-radius": "4px",
                            "box-bg": "#FAFAFA",
                            "box-border": "1px solid #EBEBEB"
                        },
                        children: [
                            {
                                id: "checkout-summary-stack",
                                type: "flex_box",
                                settings: { "box-display": "flex", "box-direction": "col", "box-gap": "1.25rem" },
                                children: [
                                    { id: "chk-sum-title", type: "text_block", settings: { "content": "YOUR ORDER", "text-size": "12px", "text-weight": "700", "text-color": "#1A1A1A", style: { letterSpacing: "1px" } } },
                                    /* Summary Item 1 */
                                    {
                                        id: "chk-sum-item-1",
                                        type: "flex_box",
                                        settings: { "box-display": "flex", "box-direction": "row", "box-justify": "space-between", "box-align": "center" },
                                        children: [
                                            { id: "chk-item-name-1", type: "text_block", settings: { "content": "Classic Trenchcoat x 1", "text-size": "13px", "text-color": "#4A4A4A" } },
                                            { id: "chk-item-price-1", type: "text_block", settings: { "content": "$249.00", "text-size": "13px", "text-weight": "600", "text-color": "#1A1A1A" } }
                                        ]
                                    },
                                    {
                                        id: "chk-sum-subtotal",
                                        type: "flex_box",
                                        settings: { "box-display": "flex", "box-direction": "row", "box-justify": "space-between", style: { borderTop: "1px solid #EBEBEB", paddingTop: "12px" } },
                                        children: [
                                            { id: "chk-sub-lbl", type: "text_block", settings: { "content": "Subtotal", "text-size": "13px", "text-color": "#4A4A4A" } },
                                            { id: "chk-sub-val", type: "text_block", settings: { "content": "$249.00", "text-size": "13px", "text-weight": "600" } }
                                        ]
                                    },
                                    {
                                        id: "chk-sum-total",
                                        type: "flex_box",
                                        settings: { "box-display": "flex", "box-direction": "row", "box-justify": "space-between", style: { borderTop: "1px solid #EBEBEB", paddingTop: "12px" } },
                                        children: [
                                            { id: "chk-tot-lbl", type: "text_block", settings: { "content": "Total Amount", "text-size": "15px", "text-weight": "bold", "text-color": "#1A1A1A" } },
                                            { id: "chk-tot-val", type: "text_block", settings: { "content": "$249.00", "text-size": "18px", "text-weight": "bold", "text-color": "#1A1A1A" } }
                                        ]
                                    },
                                    {
                                        id: "place-order-trigger-btn",
                                        type: "button_block",
                                        settings: {
                                            "btn-label": "PLACE ORDER & PAY",
                                            style: {
                                                backgroundColor: "#1D4ED8", // Royal/Secure Blue
                                                color: "#FFFFFF",
                                                width: "100%",
                                                border: "none",
                                                padding: "16px",
                                                fontWeight: "700",
                                                fontSize: "12px",
                                                letterSpacing: "1.5px",
                                                textAlign: "center",
                                                cursor: "pointer",
                                                marginTop: "12px"
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
];
