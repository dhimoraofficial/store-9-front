import { ComponentSchema } from "../builder/type";

export const NotFound: ComponentSchema = {
    id: "storefront-not-found",
    type: "box",
    settings: {
        padding: "0",
        background: "transparent",
        border: "none",
    },
    children: [
        {
            id: "storefront-not-found-card",
            type: "box",
            settings: {
                padding: "0",
            },
            children: [
                {
                    id: "storefront-not-found-badge",
                    type: "box",
                    settings: {
                        padding: "0",
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
                    },
                },
                {
                    id: "storefront-not-found-copy",
                    type: "text",
                    label: "The route may have moved, or the product collection has not been registered yet.",
                    settings: {
                        as: "p",
                        size: "sm",
                    },
                },
                {
                    id: "storefront-not-found-actions",
                    type: "box",
                    settings: {
                        padding: "0",
                    },
                    children: [
                        {
                            id: "storefront-not-found-home-link",
                            type: "link",
                            label: "Back to home",
                            settings: {
                                href: "/",
                            },
                        },
                        {
                            id: "storefront-not-found-category-link",
                            type: "link",
                            label: "Browse laptops",
                            settings: {
                                href: "/category/laptops",
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
