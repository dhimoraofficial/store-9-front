import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Navbar Layout Schema
 * Premium, responsive three-tier fashion navigation header.
 */
export const defaultNavbarSchema: ComponentSchema[] = [
    {
        id: "main-header-root",
        type: "sticky_box",
        settings: {
            "sticky-position": "top",
            "w": "100%",
            style: {
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }
        },
        children: [
            /* Tier 1: Utility Announcement Bar */
            {
                id: "utility-announcement-strip",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-bg": "var(--bg-navigation)",
                    "box-justify": "center",
                    "box-align": "center",
                    "w": "100%",
                    "pT": "8px",
                    "pB": "8px",
                    style: {
                        color: "var(--text-inverted)",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: "500",
                        textTransform: "uppercase"
                    }
                },
                children: [
                    {
                        id: "announcement-msg",
                        type: "text_block",
                        settings: {
                            "content": "Complimentary Worldwide Shipping on Orders Over $150 • Shop New Arrivals",
                            "text-color": "var(--text-inverted)",
                            "text-size": "11px",
                            "text-align": "center"
                        }
                    }
                ]
            },

            /* Tier 2: Main Branding and Action Console */
            {
                id: "main-brand-action-strip",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-bg": "var(--bg-surface)",
                    "box-direction": "row",
                    "box-align": "center",
                    "box-justify": "space-between",
                    "w": "100%",
                    "pL": "40px",
                    "pR": "40px",
                    "pT": "16px",
                    "pB": "16px",
                    style: {
                        borderBottom: "1px solid var(--border-primary)"
                    }
                },
                children: [
                    /* Left Search Console */
                    {
                        id: "header-search-console",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "row",
                            "box-align": "center",
                            style: {
                                flex: "1",
                                maxWidth: "260px"
                            }
                        },
                        children: [
                            {
                                id: "search-input-mock",
                                type: "input_block",
                                settings: {
                                    "input-type": "text",
                                    "input-placeholder": "Search collections...",
                                    style: {
                                        width: "100%",
                                        padding: "8px 12px",
                                        border: "1px solid var(--border-primary)",
                                        borderRadius: "4px",
                                        fontSize: "13px",
                                        color: "var(--text-main)"
                                    }
                                }
                            }
                        ]
                    },

                    /* Center Brand Identity */
                    {
                        id: "header-brand-identity",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-align": "center",
                            style: {
                                cursor: "pointer"
                            }
                        },
                        children: [
                            {
                                id: "brand-wordmark",
                                type: "text_block",
                                settings: {
                                    "content": "AURA APPAREL",
                                    "text-element": "h1",
                                    "text-size": "24px",
                                    "text-weight": "800",
                                    "text-color": "var(--text-main)",
                                    style: {
                                        letterSpacing: "4px",
                                        lineHeight: "1"
                                    }
                                }
                            },
                            {
                                id: "brand-tagline",
                                type: "text_block",
                                settings: {
                                    "content": "ESSENTIALS FOR MODERN LIVING",
                                    "text-element": "span",
                                    "text-size": "8px",
                                    "text-color": "var(--text-muted)",
                                    style: {
                                        letterSpacing: "2.5px",
                                        marginTop: "4px"
                                    }
                                }
                            }
                        ]
                    },

                    /* Right Account and Shopping Console */
                    {
                        id: "header-actions-console",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "row",
                            "box-align": "center",
                            "box-gap": "1.5rem",
                            style: {
                                flex: "1",
                                justifyContent: "flex-end"
                            }
                        },
                        children: [
                            {
                                id: "nav-action-search",
                                type: "link_block",
                                settings: {
                                    "link-url": "/search",
                                    style: { textDecoration: "none", color: "var(--text-main)", display: "flex", alignItems: "center" }
                                },
                                children: [
                                    { id: "search-text", type: "text_block", settings: { "content": "Search", "text-size": "13px", "text-weight": "500" } }
                                ]
                            },
                            {
                                id: "nav-action-account",
                                type: "link_block",
                                settings: {
                                    "link-url": "/account",
                                    style: { textDecoration: "none", color: "var(--text-main)", display: "flex", alignItems: "center" }
                                },
                                children: [
                                    { id: "account-text", type: "text_block", settings: { "content": "Account", "text-size": "13px", "text-weight": "500" } }
                                ]
                            },
                            {
                                id: "nav-action-cart",
                                type: "link_block",
                                settings: {
                                    "link-url": "/cart",
                                    style: { textDecoration: "none", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "6px" }
                                },
                                children: [
                                    { id: "cart-label", type: "text_block", settings: { "content": "Bag", "text-size": "13px", "text-weight": "600" } },
                                    { id: "cart-count-badge", type: "badge_block", settings: { "badge-text": "0", style: { backgroundColor: "var(--primary)", color: "var(--text-inverted)", fontSize: "10px", padding: "2px 6px" } } }
                                ]
                            }
                        ]
                    }
                ]
            },

            /* Tier 3: Category and Lookbook Links Row */
            {
                id: "category-navigation-row",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-bg": "var(--bg-surface)",
                    "box-direction": "row",
                    "box-align": "center",
                    "box-justify": "center",
                    "box-gap": "2.5rem",
                    "w": "100%",
                    "pT": "12px",
                    "pB": "12px",
                    style: {
                        borderBottom: "1px solid var(--border-primary)"
                    }
                },
                children: [
                    {
                        id: "cat-link-new",
                        type: "link_block",
                        settings: {
                            "link-url": "/collection/new-arrivals",
                            style: { textDecoration: "none", color: "var(--text-main)" }
                        },
                        children: [{ id: "cat-text-new", type: "text_block", settings: { "content": "NEW ARRIVALS", "text-size": "12px", "text-weight": "600", style: { letterSpacing: "1.5px" } } }]
                    },
                    {
                        id: "cat-link-women",
                        type: "link_block",
                        settings: {
                            "link-url": "/category/women",
                            style: { textDecoration: "none", color: "var(--text-main)" }
                        },
                        children: [{ id: "cat-text-women", type: "text_block", settings: { "content": "WOMEN", "text-size": "12px", "text-weight": "500", style: { letterSpacing: "1.5px" } } }]
                    },
                    {
                        id: "cat-link-men",
                        type: "link_block",
                        settings: {
                            "link-url": "/category/men",
                            style: { textDecoration: "none", color: "var(--text-main)" }
                        },
                        children: [{ id: "cat-text-men", type: "text_block", settings: { "content": "MEN", "text-size": "12px", "text-weight": "500", style: { letterSpacing: "1.5px" } } }]
                    },
                    {
                        id: "cat-link-accessories",
                        type: "link_block",
                        settings: {
                            "link-url": "/category/accessories",
                            style: { textDecoration: "none", color: "var(--text-main)" }
                        },
                        children: [{ id: "cat-text-accessories", type: "text_block", settings: { "content": "ACCESSORIES", "text-size": "12px", "text-weight": "500", style: { letterSpacing: "1.5px" } } }]
                    },
                    {
                        id: "cat-link-sale",
                        type: "link_block",
                        settings: {
                            "link-url": "/collection/sale",
                            style: { textDecoration: "none", color: "var(--color-error)" }
                        },
                        children: [{ id: "cat-text-sale", type: "text_block", settings: { "content": "SALE", "text-size": "12px", "text-weight": "600", style: { letterSpacing: "1.5px" } } }]
                    }
                ]
            }
        ]
    }
];
