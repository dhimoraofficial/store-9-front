import { ComponentSchema } from "../dynamics/builder/type";

export const Announcement: ComponentSchema = {
    id: "storefront-announcement",
    type: "box",
    settings: {
        padding: "0",
        background: "transparent",
        border: "none",
        className: "w-full border-b border-slate-800/80 bg-slate-950/95",
    },
    children: [
        {
            id: "storefront-announcement-shell",
            type: "box",
            settings: {
                padding: "0",
                className: "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8",
            },
            children: [
                {
                    id: "storefront-announcement-copy",
                    type: "box",
                    settings: {
                        padding: "0",
                        className: "flex items-center gap-2 text-slate-300",
                    },
                    children: [
                        {
                            id: "storefront-announcement-icon",
                            type: "icon",
                            label: "Truck",
                            settings: {
                                size: 14,
                            },
                        },
                        {
                            id: "storefront-announcement-text",
                            type: "text",
                            label: "Free dispatch on ready stock, same-day for selected orders.",
                            settings: {
                                as: "span",
                                size: "sm",
                                className: "text-slate-300",
                            },
                        },
                    ],
                },
                {
                    id: "storefront-announcement-link",
                    type: "link",
                    label: "Check delivery coverage",
                    settings: {
                        href: "/category/laptops",
                        className: "inline-flex items-center gap-1 text-slate-100 transition-colors hover:text-blue-300",
                    },
                },
            ],
        },
    ],
}

