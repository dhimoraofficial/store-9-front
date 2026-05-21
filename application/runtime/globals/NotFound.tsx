import { ComponentSchema } from "../dynamics/builder/type";

export const NotFound: ComponentSchema = {
    id: "storefront-not-found",
    type: "box",
    settings: {
        padding: "0",
        background: "transparent",
        border: "none",
        className: "flex w-full items-center justify-center px-4 py-20",
    },
    children: [
        {
            id: "storefront-not-found-card",
            type: "box",
            settings: {
                padding: "0",
                className: "w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-950/85 p-8 text-center shadow-2xl shadow-slate-950/40",
            },
            children: [
                {
                    id: "storefront-not-found-badge",
                    type: "box",
                    settings: {
                        padding: "0",
                        className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-300",
                    },
                    children: [
                        {
                            id: "storefront-not-found-badge-icon",
                            type: "icon",
                            label: "PackageX",
                            settings: {
                                size: 26,
                            },
                        },
                    ],
                },
                {
                    id: "storefront-not-found-code",
                    type: "text",
                    label: "404",
                    settings: {
                        as: "h1",
                        size: "2xl",
                        weight: "bold",
                        className: "mt-6 text-slate-50",
                    },
                },
                {
                    id: "storefront-not-found-title",
                    type: "text",
                    label: "This page is no longer on the shelf.",
                    settings: {
                        as: "h2",
                        size: "xl",
                        weight: "semibold",
                        className: "mt-2 text-slate-100",
                    },
                },
                {
                    id: "storefront-not-found-copy",
                    type: "text",
                    label: "The route may have moved, or the product collection has not been registered yet.",
                    settings: {
                        as: "p",
                        size: "sm",
                        className: "mt-3 text-slate-400",
                    },
                },
                {
                    id: "storefront-not-found-actions",
                    type: "box",
                    settings: {
                        padding: "0",
                        className: "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center",
                    },
                    children: [
                        {
                            id: "storefront-not-found-home-link",
                            type: "link",
                            label: "Back to home",
                            settings: {
                                href: "/",
                                className: "inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400",
                            },
                        },
                        {
                            id: "storefront-not-found-category-link",
                            type: "link",
                            label: "Browse laptops",
                            settings: {
                                href: "/category/laptops",
                                className: "inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-slate-600 hover:bg-slate-800",
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
