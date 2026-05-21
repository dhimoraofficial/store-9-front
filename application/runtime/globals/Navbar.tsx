import { ComponentSchema } from "../dynamics/builder/type";

export const Navbar: ComponentSchema = {
    id: "storefront-navbar",
    type: "box",
    settings: {
        padding: "0",
        background: "transparent",
        border: "none",
        className: "sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl",
    },
    children: [
        {
            id: "storefront-navbar-shell",
            type: "box",
            settings: {
                padding: "0",
                className: "mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8",
            },
            children: [
                {
                    id: "storefront-navbar-brand",
                    type: "link",
                    settings: {
                        href: "/",
                        className: "flex items-center gap-3 shrink-0",
                    },
                    children: [
                        {
                            id: "storefront-navbar-brand-mark",
                            type: "box",
                            settings: {
                                padding: "0",
                                className: "flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/15 text-blue-300",
                            },
                            children: [
                                {
                                    id: "storefront-navbar-brand-mark-icon",
                                    type: "icon",
                                    label: "ShoppingBag",
                                    settings: {
                                        size: 18,
                                    },
                                },
                            ],
                        },
                        {
                            id: "storefront-navbar-brand-copy",
                            type: "box",
                            settings: {
                                padding: "0",
                                className: "flex flex-col leading-tight",
                            },
                            children: [
                                {
                                    id: "storefront-navbar-brand-name",
                                    type: "text",
                                    label: "Banatechi",
                                    settings: {
                                        as: "span",
                                        size: "lg",
                                        weight: "bold",
                                        className: "text-slate-50",
                                    },
                                },
                                {
                                    id: "storefront-navbar-brand-subtitle",
                                    type: "text",
                                    label: "Premium hardware storefront",
                                    settings: {
                                        as: "span",
                                        size: "xs",
                                        className: "text-slate-400",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "storefront-navbar-search",
                    type: "box",
                    settings: {
                        padding: "0",
                        className: "hidden flex-1 items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2 lg:flex",
                    },
                    children: [
                        {
                            id: "storefront-navbar-search-icon",
                            type: "icon",
                            label: "Search",
                            settings: {
                                size: 16,
                            },
                        },
                        {
                            id: "storefront-navbar-search-input",
                            type: "input",
                            settings: {
                                id: "storefront-search",
                                placeholder: "Search laptops, GPUs, monitors, and accessories",
                                inputSize: "sm",
                                className: "!w-full !border-0 !bg-transparent !px-0 !py-0 !text-slate-100 !shadow-none !ring-0 placeholder:text-slate-500",
                            },
                        },
                    ],
                },
                {
                    id: "storefront-navbar-links",
                    type: "box",
                    settings: {
                        padding: "0",
                        className: "hidden items-center gap-6 text-sm text-slate-300 xl:flex",
                    },
                    children: [
                        {
                            id: "storefront-navbar-link-home",
                            type: "link",
                            label: "Home",
                            settings: {
                                href: "/",
                                className: "transition-colors hover:text-slate-50",
                            },
                        },
                        {
                            id: "storefront-navbar-link-laptops",
                            type: "link",
                            label: "Laptops",
                            settings: {
                                href: "/category/laptops",
                                className: "transition-colors hover:text-slate-50",
                            },
                        },
                        {
                            id: "storefront-navbar-link-gaming",
                            type: "link",
                            label: "Gaming",
                            settings: {
                                href: "/category/gaming",
                                className: "transition-colors hover:text-slate-50",
                            },
                        },
                        {
                            id: "storefront-navbar-link-support",
                            type: "link",
                            label: "Support",
                            settings: {
                                href: "/about",
                                className: "transition-colors hover:text-slate-50",
                            },
                        },
                    ],
                },
                {
                    id: "storefront-navbar-actions",
                    type: "box",
                    settings: {
                        padding: "0",
                        className: "ml-auto flex items-center gap-3",
                    },
                    children: [
                        {
                            id: "storefront-navbar-action-deals",
                            type: "link",
                            label: "Deals",
                            settings: {
                                href: "/category/laptops",
                                className: "inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:border-slate-600 hover:bg-slate-800",
                            },
                        },
                        {
                            id: "storefront-navbar-action-support",
                            type: "link",
                            label: "Help",
                            settings: {
                                href: "/about",
                                className: "hidden items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-500/20 sm:inline-flex",
                            },
                        },
                    ],
                },
            ],
        },
    ],
}