import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Footer Layout Schema
 * Premium, clean 4-column footer for e-commerce fashion stores.
 */
export const defaultFooterSchema: ComponentSchema[] = [
    {
        id: "main-footer-root",
        type: "box",
        settings: {
            "box-display": "flex",
            "box-direction": "col",
            "w": "100%",
            style: {
                backgroundColor: "var(--bg-navigation)",
                color: "var(--text-inverted)",
                padding: "64px 40px 32px 40px",
                borderTop: "1px solid var(--border-primary)"
            }
        },
        children: [
            /* Main columns grid */
            {
                id: "footer-columns-grid",
                type: "grid_box",
                settings: {
                    "box-display": "grid",
                    "w": "100%",
                    style: {
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "40px",
                        marginBottom: "48px"
                    }
                },
                children: [
                    /* Column 1: Brand Info */
                    {
                        id: "footer-col-brand",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-gap": "1rem"
                        },
                        children: [
                            {
                                id: "footer-brand-title",
                                type: "text_block",
                                settings: {
                                    "content": "AURA APPAREL",
                                    "text-element": "h4",
                                    "text-size": "18px",
                                    "text-weight": "800",
                                    "text-color": "var(--text-inverted)",
                                    style: { letterSpacing: "3px" }
                                }
                            },
                            {
                                id: "footer-brand-description",
                                type: "text_block",
                                settings: {
                                    "content": "Sustainably crafted clothing for modern lifestyles. Minimalist silhouettes designed to endure seasons.",
                                    "text-element": "p",
                                    "text-size": "13px",
                                    "text-color": "var(--text-muted)",
                                    style: { lineHeight: "1.6" }
                                }
                            }
                        ]
                    },

                    /* Column 2: Shop Links */
                    {
                        id: "footer-col-shop",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-gap": "0.75rem"
                        },
                        children: [
                            {
                                id: "footer-col-shop-title",
                                type: "text_block",
                                settings: { "content": "COLLECTIONS", "text-element": "h5", "text-size": "12px", "text-weight": "600", "text-color": "var(--secondary)", style: { letterSpacing: "1px" } }
                            },
                            {
                                id: "footer-shop-l1",
                                type: "link_block",
                                settings: { "link-url": "/collection/new-arrivals", style: { textDecoration: "none", color: "var(--text-muted)", fontSize: "13px" } },
                                children: [{ id: "f-shop-t1", type: "text_block", settings: { "content": "New Arrivals" } }]
                            },
                            {
                                id: "footer-shop-l2",
                                type: "link_block",
                                settings: { "link-url": "/category/women", style: { textDecoration: "none", color: "var(--text-muted)", fontSize: "13px" } },
                                children: [{ id: "f-shop-t2", type: "text_block", settings: { "content": "Women's Wear" } }]
                            },
                            {
                                id: "footer-shop-l3",
                                type: "link_block",
                                settings: { "link-url": "/category/men", style: { textDecoration: "none", color: "var(--text-muted)", fontSize: "13px" } },
                                children: [{ id: "f-shop-t3", type: "text_block", settings: { "content": "Men's Wear" } }]
                            },
                            {
                                id: "footer-shop-l4",
                                type: "link_block",
                                settings: { "link-url": "/category/accessories", style: { textDecoration: "none", color: "var(--text-muted)", fontSize: "13px" } },
                                children: [{ id: "f-shop-t4", type: "text_block", settings: { "content": "Accessories" } }]
                            }
                        ]
                    },

                    /* Column 3: Customer Care */
                    {
                        id: "footer-col-support",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-gap": "0.75rem"
                        },
                        children: [
                            {
                                id: "footer-col-support-title",
                                type: "text_block",
                                settings: { "content": "CUSTOMER CARE", "text-element": "h5", "text-size": "12px", "text-weight": "600", "text-color": "var(--secondary)", style: { letterSpacing: "1px" } }
                            },
                            {
                                id: "footer-support-l1",
                                type: "link_block",
                                settings: { "link-url": "/faq", style: { textDecoration: "none", color: "var(--text-muted)", fontSize: "13px" } },
                                children: [{ id: "f-supp-t1", type: "text_block", settings: { "content": "FAQ & Shipping" } }]
                            },
                            {
                                id: "footer-support-l2",
                                type: "link_block",
                                settings: { "link-url": "/returns", style: { textDecoration: "none", color: "var(--text-muted)", fontSize: "13px" } },
                                children: [{ id: "f-supp-t2", type: "text_block", settings: { "content": "Returns & Exchanges" } }]
                            },
                            {
                                id: "footer-support-l3",
                                type: "link_block",
                                settings: { "link-url": "/size-guide", style: { textDecoration: "none", color: "var(--text-muted)", fontSize: "13px" } },
                                children: [{ id: "f-supp-t3", type: "text_block", settings: { "content": "Sizing Directory" } }]
                            },
                            {
                                id: "footer-support-l4",
                                type: "link_block",
                                settings: { "link-url": "/contact", style: { textDecoration: "none", color: "var(--text-muted)", fontSize: "13px" } },
                                children: [{ id: "f-supp-t4", type: "text_block", settings: { "content": "Get In Touch" } }]
                            }
                        ]
                    },

                    /* Column 4: Newsletter */
                    {
                        id: "footer-col-newsletter",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-gap": "0.75rem"
                        },
                        children: [
                            {
                                id: "footer-col-news-title",
                                type: "text_block",
                                settings: { "content": "STAY CONNECTED", "text-element": "h5", "text-size": "12px", "text-weight": "600", "text-color": "var(--secondary)", style: { letterSpacing: "1px" } }
                            },
                            {
                                id: "footer-news-desc",
                                type: "text_block",
                                settings: {
                                    "content": "Sign up to receive announcements, product drops, and exclusive lookbook previews.",
                                    "text-element": "p",
                                    "text-size": "12px",
                                    "text-color": "var(--text-muted)"
                                }
                            },
                            {
                                id: "footer-news-input-box",
                                type: "input_block",
                                settings: {
                                    "input-type": "email",
                                    "input-placeholder": "Enter your email...",
                                    style: {
                                        width: "100%",
                                        padding: "10px",
                                        backgroundColor: "var(--bg-app)",
                                        border: "1px solid var(--border-primary)",
                                        borderRadius: "4px",
                                        color: "var(--text-inverted)",
                                        fontSize: "13px"
                                    }
                                }
                            }
                        ]
                    }
                ]
            },

            /* Bottom Strip: copyright and payment badges */
            {
                id: "footer-bottom-strip",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-direction": "row",
                    "box-align": "center",
                    "box-justify": "space-between",
                    style: {
                        borderTop: "1px solid var(--border-primary)",
                        paddingTop: "24px",
                        fontSize: "12px",
                        color: "var(--text-muted)"
                    }
                },
                children: [
                    {
                        id: "footer-copyright-msg",
                        type: "text_block",
                        settings: {
                            "content": "© 2026 Aura Apparel. Powered by Dhimora Multi-Tenant Storefront System."
                        }
                    },
                    {
                        id: "footer-payment-methods",
                        type: "text_block",
                        settings: {
                            "content": "Visa • Mastercard • Amex • Apple Pay"
                        }
                    }
                ]
            }
        ]
    }
];
