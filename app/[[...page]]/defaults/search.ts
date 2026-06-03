import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Search Results Page [DB] Layout Schema
 */
export const defaultSearchSchema: ComponentSchema[] = [
    {
        id: "search-top-spacer",
        type: "spacer_block",
        settings: { "spacer-height-desktop": "48px", "spacer-height-mobile": "24px" }
    },
    {
        id: "search-header-container",
        type: "flex_box",
        settings: {
            "box-display": "flex",
            "box-direction": "col",
            "box-align": "center",
            "box-gap": "1rem",
            style: { padding: "0 40px", marginBottom: "40px" }
        },
        children: [
            {
                id: "search-title-heading",
                type: "text_block",
                settings: {
                    "content": "SEARCH RESULTS",
                    "text-element": "h1",
                    "text-size": "28px",
                    "text-weight": "bold",
                    "text-color": "var(--text-main)",
                    style: { fontFamily: "Playfair Display, Georgia, serif", letterSpacing: "2.5px" }
                }
            },
            {
                id: "search-subheading-msg",
                type: "text_block",
                settings: {
                    "content": "Explore apparel matches and curated collections matching your query.",
                    "text-element": "p",
                    "text-size": "13px",
                    "text-color": "var(--text-muted)"
                }
            },
            /* Search input console box */
            {
                id: "search-page-console-box",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-direction": "row",
                    "box-align": "center",
                    style: {
                        width: "100%",
                        maxWidth: "480px",
                        marginTop: "12px"
                    }
                },
                children: [
                    {
                        id: "search-page-input-field",
                        type: "input_block",
                        settings: {
                            "input-type": "text",
                            "input-placeholder": "Type size, color, or style category...",
                            style: {
                                flex: "1",
                                padding: "14px 18px",
                                border: "1px solid var(--border-primary)",
                                borderRight: "none",
                                borderRadius: "4px 0 0 4px",
                                fontSize: "14px",
                                color: "var(--text-main)"
                            }
                        }
                    },
                    {
                        id: "search-page-submit-button",
                        type: "button_block",
                        settings: {
                            "btn-label": "SEARCH",
                            style: {
                                backgroundColor: "var(--primary)",
                                color: "var(--text-inverted)",
                                border: "none",
                                padding: "15px 24px",
                                fontSize: "12px",
                                fontWeight: "600",
                                letterSpacing: "1px",
                                borderRadius: "0 4px 4px 0",
                                cursor: "pointer"
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        id: "search-results-grid-container",
        type: "box",
        settings: {
            style: {
                padding: "0 40px",
                marginBottom: "64px"
            }
        },
        children: [
            {
                id: "search-results-loop",
                type: "product_loop_context",
                settings: {
                    "limit": 12,
                    "productSort": "relevance"
                }
            }
        ]
    }
];
