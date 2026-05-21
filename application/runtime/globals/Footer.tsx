import { ComponentSchema } from "../dynamics/builder/type";

const footerLinkClassName = "text-sm text-slate-400 transition-colors hover:text-slate-100";

export const Footer: ComponentSchema = {
    id: "storefront-footer",
    type: "box",
    settings: {
        padding: "0",
        background: "transparent",
        border: "none",
        className: "w-full border-t border-slate-800/80 bg-slate-950/95",
    },
    children: [
        {
            id: "storefront-footer-shell",
            type: "box",
            settings: {
                padding: "0",
                className: "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
            },
            children: [
                {
                    id: "storefront-footer-grid",
                    type: "box",
                    settings: {
                        padding: "0",
                        className: "grid gap-10 lg:grid-cols-[1.35fr_1fr_1fr_1fr]",
                    },
                    children: [
                        {
                            id: "storefront-footer-brand",
                            type: "box",
                            settings: {
                                padding: "0",
                                className: "flex flex-col gap-4",
                            },
                            children: [
                                {
                                    id: "storefront-footer-brand-name",
                                    type: "text",
                                    label: "Banatechi",
                                    settings: {
                                        as: "h2",
                                        size: "2xl",
                                        weight: "bold",
                                        className: "text-slate-50",
                                    },
                                },
                                {
                                    id: "storefront-footer-brand-copy",
                                    type: "text",
                                    label: "A focused storefront for laptop buyers, creators, gamers, and teams that need the right hardware the first time.",
                                    settings: {
                                        as: "p",
                                        size: "sm",
                                        className: "max-w-md text-slate-400",
                                    },
                                },
                                {
                                    id: "storefront-footer-brand-note",
                                    type: "text",
                                    label: "Built for clarity. Powered by Dhimora.",
                                    settings: {
                                        as: "p",
                                        size: "xs",
                                        className: "text-slate-500",
                                    },
                                },
                                {
                                    id: "storefront-footer-socials",
                                    type: "box",
                                    settings: {
                                        padding: "0",
                                        className: "flex items-center gap-3",
                                    },
                                    children: [
                                        {
                                            id: "storefront-footer-social-instagram",
                                            type: "link",
                                            settings: {
                                                href: "https://instagram.com",
                                                isExternal: true,
                                                className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-blue-500/40 hover:text-blue-300",
                                            },
                                            children: [
                                                {
                                                    id: "storefront-footer-social-instagram-icon",
                                                    type: "icon",
                                                    label: "Instagram",
                                                    settings: {
                                                        size: 18,
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            id: "storefront-footer-social-facebook",
                                            type: "link",
                                            settings: {
                                                href: "https://facebook.com",
                                                isExternal: true,
                                                className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-blue-500/40 hover:text-blue-300",
                                            },
                                            children: [
                                                {
                                                    id: "storefront-footer-social-facebook-icon",
                                                    type: "icon",
                                                    label: "Facebook",
                                                    settings: {
                                                        size: 18,
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            id: "storefront-footer-social-youtube",
                                            type: "link",
                                            settings: {
                                                href: "https://youtube.com",
                                                isExternal: true,
                                                className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-blue-500/40 hover:text-blue-300",
                                            },
                                            children: [
                                                {
                                                    id: "storefront-footer-social-youtube-icon",
                                                    type: "icon",
                                                    label: "Youtube",
                                                    settings: {
                                                        size: 18,
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "storefront-footer-shop",
                            type: "box",
                            settings: {
                                padding: "0",
                                className: "flex flex-col gap-3",
                            },
                            children: [
                                {
                                    id: "storefront-footer-shop-title",
                                    type: "text",
                                    label: "Shop",
                                    settings: {
                                        as: "h3",
                                        size: "sm",
                                        weight: "semibold",
                                        className: "uppercase tracking-widest text-slate-100",
                                    },
                                },
                                {
                                    id: "storefront-footer-shop-laptops",
                                    type: "link",
                                    label: "Laptops",
                                    settings: {
                                        href: "/category/laptops",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-shop-gaming",
                                    type: "link",
                                    label: "Gaming",
                                    settings: {
                                        href: "/category/gaming",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-shop-components",
                                    type: "link",
                                    label: "Components",
                                    settings: {
                                        href: "/category/components",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-shop-monitors",
                                    type: "link",
                                    label: "Monitors",
                                    settings: {
                                        href: "/category/monitors",
                                        className: footerLinkClassName,
                                    },
                                },
                            ],
                        },
                        {
                            id: "storefront-footer-support",
                            type: "box",
                            settings: {
                                padding: "0",
                                className: "flex flex-col gap-3",
                            },
                            children: [
                                {
                                    id: "storefront-footer-support-title",
                                    type: "text",
                                    label: "Support",
                                    settings: {
                                        as: "h3",
                                        size: "sm",
                                        weight: "semibold",
                                        className: "uppercase tracking-widest text-slate-100",
                                    },
                                },
                                {
                                    id: "storefront-footer-support-shipping",
                                    type: "link",
                                    label: "Shipping",
                                    settings: {
                                        href: "/about",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-support-returns",
                                    type: "link",
                                    label: "Returns",
                                    settings: {
                                        href: "/about",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-support-warranty",
                                    type: "link",
                                    label: "Warranty",
                                    settings: {
                                        href: "/about",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-support-contact",
                                    type: "link",
                                    label: "Contact",
                                    settings: {
                                        href: "/about",
                                        className: footerLinkClassName,
                                    },
                                },
                            ],
                        },
                        {
                            id: "storefront-footer-company",
                            type: "box",
                            settings: {
                                padding: "0",
                                className: "flex flex-col gap-3",
                            },
                            children: [
                                {
                                    id: "storefront-footer-company-title",
                                    type: "text",
                                    label: "Company",
                                    settings: {
                                        as: "h3",
                                        size: "sm",
                                        weight: "semibold",
                                        className: "uppercase tracking-widest text-slate-100",
                                    },
                                },
                                {
                                    id: "storefront-footer-company-about",
                                    type: "link",
                                    label: "About us",
                                    settings: {
                                        href: "/about",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-company-account",
                                    type: "link",
                                    label: "Account",
                                    settings: {
                                        href: "/account",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-company-privacy",
                                    type: "link",
                                    label: "Privacy policy",
                                    settings: {
                                        href: "/legal/privacy-policy",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-company-terms",
                                    type: "link",
                                    label: "Terms",
                                    settings: {
                                        href: "/legal/terms-and-condition",
                                        className: footerLinkClassName,
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "storefront-footer-bottom",
                    type: "box",
                    settings: {
                        padding: "0",
                        className: "mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between",
                    },
                    children: [
                        {
                            id: "storefront-footer-bottom-copy",
                            type: "text",
                            label: "© 2026 Banatechi. All rights reserved.",
                            settings: {
                                as: "p",
                                size: "xs",
                                className: "text-slate-500",
                            },
                        },
                        {
                            id: "storefront-footer-bottom-links",
                            type: "box",
                            settings: {
                                padding: "0",
                                className: "flex flex-wrap items-center gap-4",
                            },
                            children: [
                                {
                                    id: "storefront-footer-bottom-link-home",
                                    type: "link",
                                    label: "Home",
                                    settings: {
                                        href: "/",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-bottom-link-deals",
                                    type: "link",
                                    label: "Deals",
                                    settings: {
                                        href: "/category/laptops",
                                        className: footerLinkClassName,
                                    },
                                },
                                {
                                    id: "storefront-footer-bottom-link-help",
                                    type: "link",
                                    label: "Help center",
                                    settings: {
                                        href: "/about",
                                        className: footerLinkClassName,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}