import { ComponentSchema } from "../builder/type";

export const Navbar: ComponentSchema = {
    id: "gn-navbar",
    type: "box",
    settings: {
        p: 0,
        w: "full",
    },
    children: [
        // ── TOP BAR ─────────────────────────────────────────────
        {
            id: "gn-navbar-top",
            type: "box",
            settings: {
                padding: "0",
            },
            children: [
                // BRAND
                {
                    id: "gn-navbar-brand",
                    type: "link",
                    settings: {
                        href: "/",
                    },
                    children: [
                        {
                            id: "gn-navbar-brand-mark",
                            type: "box",
                            settings: {
                                padding: "0",
                            },
                            children: [
                                {
                                    id: "gn-navbar-brand-mark-text",
                                    type: "text",
                                    label: "GN",
                                    settings: { as: "span" },
                                },
                            ],
                        },
                        {
                            id: "gn-navbar-brand-copy",
                            type: "box",
                            settings: {
                                padding: "0",
                            },
                            children: [
                                {
                                    id: "gn-navbar-brand-name",
                                    type: "text",
                                    label: "Generation Nepal",
                                    settings: {
                                        as: "span",
                                    },
                                },
                                {
                                    id: "gn-navbar-brand-subtitle",
                                    type: "text",
                                    label: "Tech & Hardware Store",
                                    settings: {
                                        as: "span",
                                    },
                                },
                            ],
                        },
                    ],
                },

                // SEARCH BAR
                {
                    id: "gn-navbar-search",
                    type: "box",
                    settings: {
                        padding: "0",
                    },
                    children: [
                        {
                            id: "gn-navbar-search-category",
                            type: "input",
                            settings: {
                                id: "gn-search-category",
                                inputType: "select",
                                options: [
                                    "All Categories",
                                    "Laptops & Desktops",
                                    "Apple",
                                    "PC Components",
                                    "Accessories",
                                    "Gaming",
                                ],
                            },
                        },
                        {
                            id: "gn-navbar-search-icon",
                            type: "icon",
                            label: "Search",
                            settings: {
                                size: 15,
                            },
                        },
                        {
                            id: "gn-navbar-search-input",
                            type: "input",
                            settings: {
                                id: "gn-search-input",
                                placeholder: "Search by name, brand, category…",
                                inputSize: "sm",
                            },
                        },
                        {
                            id: "gn-navbar-search-btn",
                            type: "button",
                            label: "",
                            settings: {
                            },
                            children: [
                                {
                                    id: "gn-navbar-search-btn-icon",
                                    type: "icon",
                                    label: "Search",
                                    settings: { size: 16 },
                                },
                            ],
                        },
                    ],
                },

                // RIGHT ACTIONS
                {
                    id: "gn-navbar-actions",
                    type: "box",
                    settings: {
                        padding: "0",
                    },
                    children: [
                        {
                            id: "gn-navbar-action-signin",
                            type: "button",
                            label: "Sign in",
                            settings: {
                            },
                        },
                        {
                            id: "gn-navbar-action-contact",
                            type: "link",
                            label: "Contact",
                            settings: {
                                href: "/contact",
                            },
                        },
                    ],
                },
            ],
        },

        // ── BOTTOM NAV ──────────────────────────────────────────
        {
            id: "gn-navbar-bottom",
            type: "box",
            settings: {
                padding: "0",
            },
            children: [
                {
                    id: "gn-navbar-nav",
                    type: "box",
                    settings: {
                        padding: "0",
                    },
                    children: [
                        {
                            id: "gn-nav-laptops",
                            type: "link",
                            label: "Laptops & Desktops",
                            settings: {
                                href: "/category/laptops",
                            },
                        },
                        {
                            id: "gn-nav-apple",
                            type: "link",
                            label: "Apple",
                            settings: {
                                href: "/category/apple",
                            },
                        },
                        {
                            id: "gn-nav-pc",
                            type: "link",
                            label: "PC Components",
                            settings: {
                                href: "/category/pc-components",
                            },
                        },
                        {
                            id: "gn-nav-accessories",
                            type: "link",
                            label: "Accessories",
                            settings: {
                                href: "/category/accessories",
                            },
                        },
                        {
                            id: "gn-nav-gaming",
                            type: "link",
                            label: "Gaming",
                            settings: {
                                href: "/category/gaming",
                            },
                        },
                        // Spacer
                        {
                            id: "gn-nav-spacer",
                            type: "box",
                            settings: {
                                padding: "0",
                            },
                        },
                        // Right utility links
                        {
                            id: "gn-nav-home",
                            type: "link",
                            label: "Home",
                            settings: {
                                href: "/",
                            },
                        },
                        {
                            id: "gn-nav-products",
                            type: "link",
                            label: "Products",
                            settings: {
                                href: "/products",
                            },
                        },
                        {
                            id: "gn-nav-warranty",
                            type: "link",
                            label: "Warranty Policy",
                            settings: {
                                href: "/warranty",
                            },
                        },
                    ],
                },
            ],
        },
    ],
};