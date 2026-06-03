import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Category & Collection Page [DB] Layout Schema
 * Grid layout featuring sidebar filters and category listing.
 */
export const defaultCategorySchema: ComponentSchema[] = [
    {
        id: "category-header-banner",
        type: "box",
        settings: {
            style: {
                backgroundColor: "var(--bg-app)",
                padding: "64px 40px",
                textAlign: "center",
                marginBottom: "40px",
                borderBottom: "1px solid var(--border-primary)"
            }
        },
        children: [
            {
                id: "category-banner-title",
                type: "text_block",
                settings: {
                    "content": "${context.category.name}",
                    "text-element": "h1",
                    "text-size": "36px",
                    "text-weight": "bold",
                    "text-color": "var(--text-main)",
                    style: {
                        fontFamily: "Playfair Display, Georgia, serif",
                        letterSpacing: "3px"
                    }
                }
            },
            {
                id: "category-banner-description",
                type: "text_block",
                settings: {
                    "content": "${context.category.description}",
                    "text-element": "p",
                    "text-size": "13px",
                    "text-color": "var(--text-muted)",
                    style: {
                        marginTop: "8px",
                        maxWidth: "500px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }
                }
            }
        ]
    },
    {
        id: "category-body-container",
        type: "split_hero_box",
        settings: {
            "splitRatio": "25-75", // Left filter sidebar, Right product grid
            style: {
                alignItems: "stretch",
                gap: "36px",
                padding: "0 40px",
                marginBottom: "64px"
            }
        },
        children: [
            /* Left Sidebar: Filters Mock */
            {
                id: "category-filters-sidebar",
                type: "flex_box",
                settings: {
                    "box-display": "flex",
                    "box-direction": "col",
                    "box-gap": "2rem",
                    style: {
                        borderRight: "1px solid var(--border-primary)",
                        paddingRight: "24px"
                    }
                },
                children: [
                    /* 1. Category Filter */
                    {
                        id: "filter-section-cat",
                        type: "flex_box",
                        settings: { "box-display": "flex", "box-direction": "col", "box-gap": "0.5rem" },
                        children: [
                            { id: "filter-cat-title", type: "text_block", settings: { "content": "COLLECTION CATEGORY", "text-size": "11px", "text-weight": "700", "text-color": "var(--text-main)", style: { letterSpacing: "1px" } } },
                            { id: "f-cat-1", type: "text_block", settings: { "content": "Shirts & Tops (24)", "text-size": "13px", "text-color": "var(--text-main)", style: { cursor: "pointer" } } },
                            { id: "f-cat-2", type: "text_block", settings: { "content": "Knitwear & Sweaters (18)", "text-size": "13px", "text-color": "var(--text-main)", style: { cursor: "pointer", fontWeight: "bold" } } },
                            { id: "f-cat-3", type: "text_block", settings: { "content": "Outerwear & Coats (12)", "text-size": "13px", "text-color": "var(--text-main)", style: { cursor: "pointer" } } },
                            { id: "f-cat-4", type: "text_block", settings: { "content": "Trousers & Denim (15)", "text-size": "13px", "text-color": "var(--text-main)", style: { cursor: "pointer" } } }
                        ]
                    },
                    /* 2. Color Filter */
                    {
                        id: "filter-section-color",
                        type: "flex_box",
                        settings: { "box-display": "flex", "box-direction": "col", "box-gap": "0.5rem" },
                        children: [
                            { id: "filter-color-title", type: "text_block", settings: { "content": "FILTER BY COLOR", "text-size": "11px", "text-weight": "700", "text-color": "var(--text-main)", style: { letterSpacing: "1px" } } },
                            { id: "f-col-1", type: "text_block", settings: { "content": "• Black", "text-size": "13px", "text-color": "var(--text-main)" } },
                            { id: "f-col-2", type: "text_block", settings: { "content": "• Oatmeal Beige", "text-size": "13px", "text-color": "var(--text-main)" } },
                            { id: "f-col-3", type: "text_block", settings: { "content": "• Off-White", "text-size": "13px", "text-color": "var(--text-main)" } },
                            { id: "f-col-4", type: "text_block", settings: { "content": "• Terracotta", "text-size": "13px", "text-color": "var(--text-main)" } }
                        ]
                    }
                ]
            },

            /* Right Sidebar: Products Listing */
            {
                id: "category-products-area",
                type: "box",
                settings: {
                    style: {
                        width: "100%"
                    }
                },
                children: [
                    /* Sort & Total Products Row */
                    {
                        id: "category-products-controls",
                        type: "flex_box",
                        settings: {
                            "box-display": "flex",
                            "box-direction": "row",
                            "box-align": "center",
                            "box-justify": "space-between",
                            style: {
                                marginBottom: "24px",
                                paddingBottom: "12px",
                                borderBottom: "1px solid var(--border-primary)"
                            }
                        },
                        children: [
                            { id: "cat-product-count-label", type: "text_block", settings: { "content": "Showing 18 items", "text-size": "13px", "text-color": "var(--text-muted)" } },
                            { id: "cat-sort-mock-select", type: "text_block", settings: { "content": "Sort By: Featured ▾", "text-size": "13px", "text-color": "var(--text-main)", style: { cursor: "pointer", fontWeight: "600" } } }
                        ]
                    },

                    /* Products Grid */
                    {
                        id: "category-grid-loop",
                        type: "product_loop_context",
                        settings: {
                            "limit": 12,
                            "productSort": "default"
                        }
                    }
                ]
            }
        ]
    }
];
