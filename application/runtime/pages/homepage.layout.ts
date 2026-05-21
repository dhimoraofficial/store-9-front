import { ComponentSchema } from "../builder/type";

const APP_HOME_PAGE_SCHEMA: ComponentSchema[] = [

    // ── Hero Section ─────────────────────────────
    {
        id: "hero-section",
        type: "box",
        settings: {
            padding: "0",
            className: "mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8",
        },
        children: [
            {
                id: "hero-title",
                type: "text",
                label: "The New Standard in Laptops",
                settings: {
                    as: "h1",
                    size: "2xl",
                    weight: "bold",
                    className: "text-slate-50",
                },
            },
            {
                id: "hero-subtitle",
                type: "text",
                label: "Handpicked machines for creators, gamers, and professionals.",
                settings: {
                    as: "p",
                    size: "md",
                    className: "max-w-lg text-slate-400",
                },
            },
            {
                id: "hero-cta",
                type: "box",
                settings: {
                    padding: "0",
                    className: "flex items-center gap-3",
                },
                children: [
                    {
                        id: "hero-browse-btn",
                        type: "link",
                        label: "Browse Laptops",
                        settings: {
                            href: "/category/laptops",
                            className: "inline-flex items-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400",
                        },
                    },
                    {
                        id: "hero-search-btn",
                        type: "button",
                        label: "Search Products",
                        settings: {
                            variant: "secondary",
                            buttonSize: "lg",
                            className: "!rounded-full !border-slate-700 !bg-slate-900 !text-slate-100 hover:!bg-slate-800",
                        },
                        action: {
                            type: "openSearch",
                            prop: {},
                        },
                    },
                ],
            },
        ],
    },

    // ── Featured Product Card ────────────────────
    {
        id: "featured-section",
        type: "box",
        settings: {
            padding: "0",
            className: "mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8",
        },
        children: [
            {
                id: "featured-card",
                type: "box",
                settings: {
                    padding: "0",
                    className: "rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8",
                },
                children: [
                    {
                        id: "featured-label",
                        type: "text",
                        label: "⚡ Featured",
                        settings: {
                            as: "span",
                            size: "xs",
                            weight: "semibold",
                            className: "inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-300",
                        },
                    },
                    {
                        id: "featured-name",
                        type: "text",
                        label: "MacBook Pro 16\" M4 Max",
                        settings: {
                            as: "h2",
                            size: "xl",
                            weight: "bold",
                            className: "mt-4 text-slate-50",
                        },
                    },
                    {
                        id: "featured-price",
                        type: "text",
                        label: "Rs. 4,25,000",
                        settings: {
                            as: "p",
                            size: "lg",
                            weight: "semibold",
                            className: "mt-1 text-blue-400",
                        },
                    },
                    {
                        id: "featured-desc",
                        type: "text",
                        label: "48GB Unified Memory · 1TB SSD · 40-core GPU · Space Black",
                        settings: {
                            as: "p",
                            size: "sm",
                            className: "mt-2 text-slate-400",
                        },
                    },

                    // Action buttons row
                    {
                        id: "featured-actions",
                        type: "box",
                        settings: {
                            padding: "0",
                            className: "mt-6 flex flex-wrap items-center gap-3",
                        },
                        children: [
                            // Add to Cart
                            {
                                id: "featured-add-cart",
                                type: "button",
                                label: "Add to Cart",
                                settings: {
                                    variant: "primary",
                                    buttonSize: "md",
                                    className: "!rounded-full",
                                },
                                action: {
                                    type: "addToCart",
                                    prop: {
                                        pid: "$context.product_id",
                                        qty: "1",
                                    },
                                },
                            },

                            // Add to Wishlist
                            {
                                id: "featured-wishlist",
                                type: "button",
                                label: "♡ Wishlist",
                                settings: {
                                    variant: "secondary",
                                    buttonSize: "md",
                                    className: "!rounded-full !border-slate-700 !bg-slate-900 !text-slate-100",
                                },
                                action: {
                                    type: "addToWishlist",
                                    prop: {
                                        pid: "$context.product_id",
                                    },
                                },
                            },

                            // Quick View
                            {
                                id: "featured-quick-view",
                                type: "button",
                                label: "Quick View",
                                settings: {
                                    variant: "plain",
                                    className: "!text-slate-400 hover:!text-slate-100",
                                },
                                action: {
                                    type: "quickView",
                                    prop: {
                                        pid: "$context.product_id",
                                    },
                                },
                            },

                            // Share
                            {
                                id: "featured-share",
                                type: "button",
                                label: "Share",
                                settings: {
                                    variant: "plain",
                                    className: "!text-slate-400 hover:!text-slate-100",
                                },
                                action: {
                                    type: "shareProduct",
                                    prop: {
                                        pid: "$context.product_id",
                                        name: "MacBook Pro 16\" M4 Max",
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export { APP_HOME_PAGE_SCHEMA };