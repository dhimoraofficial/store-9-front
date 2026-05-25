import { ComponentSchema } from "../builder/type";

export const Navbar: ComponentSchema = {
    id: "gn-navbar",
    type: "box",
    settings: {
        w: "",
        pB: "",
        "box-tp": "container"
    },
    children: [
        // ── TOP BAR ─────────────────────────────────────────────
        {
            id: "gn-navbar-top",
            type: "box",
            settings: {
            },
            children: [
                // BRAND
                {
                    id: "gn-navbar-brand",
                    type: "text",
                    settings: {
                    },
                    children: [
                        {
                            id: "gn-navbar-brand-mark",
                            type: "box",
                            settings: {
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
                        }
                    ]
                },

                // SEARCH BAR
                {
                    id: "gn-navbar-search",
                    type: "box",
                    settings: {
                    },
                    children: [
                        {
                            id: "gn-navbar-search-category",
                            type: "input",
                            settings: {
                            },
                        },
                        {
                            id: "gn-navbar-search-icon",
                            type: "icon",
                            label: "Search",
                            settings: {
                            },
                        },
                        {
                            id: "gn-navbar-search-input",
                            type: "input",
                            settings: {
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
                                    settings: {

                                    },
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
                            type: "text",
                            label: "Contact",
                            settings: {
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
            },
            children: [
                {
                    id: "gn-navbar-nav",
                    type: "box",
                    settings: {
                    },
                    children: [
                        {
                            id: "gn-nav-laptops",
                            type: "text",
                            label: "Laptops & Desktops",
                            settings: {
                            },
                        },
                        {
                            id: "gn-nav-apple",
                            type: "text",
                            label: "Apple",
                            settings: {
                            },
                        },
                        {
                            id: "gn-nav-pc",
                            type: "text",
                            label: "PC Components",
                            settings: {
                            },
                        },
                        {
                            id: "gn-nav-accessories",
                            type: "text",
                            label: "Accessories",
                            settings: {
                            },
                        },
                        {
                            id: "gn-nav-gaming",
                            type: "text",
                            label: "Gaming",
                            settings: {
                            },
                        },
                        // Spacer
                        {
                            id: "gn-nav-spacer",
                            type: "box",
                            settings: {
                            },
                        },
                        // Right utility links
                        {
                            id: "gn-nav-home",
                            type: "text",
                            label: "Home",
                            settings: {
                            },
                        },
                        {
                            id: "gn-nav-products",
                            type: "text",
                            label: "Products",
                            settings: {
                            },
                        },
                        {
                            id: "gn-nav-warranty",
                            type: "text",
                            label: "Warranty Policy",
                            settings: {
                            },
                        },
                    ],
                },
            ],
        },
    ],
};