import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Navbar Layout Schema
 * Premium, responsive children-based navigation header.
 */
export const defaultNavbarSchema: ComponentSchema[] = [
    {
        id: "navbar-root",
        type: "navbar_ecommerce",
        settings: {
            layoutVariant: "single-row",
            enableGlassmorphism: "true",
            mobileTriggerAlign: "right",
            mobileLogoAlign: "left",
            mobileSearchPosition: "drawer",
            mobileUtilitiesPosition: "header"
        },
        children: [
            {
                id: "navbar-col-left",
                type: "box_block",
                settings: {
                    direction: "row",
                    width: "auto",
                    align: "start"
                },
                children: [
                    {
                        id: "navbar-logo",
                        type: "logo_block",
                        settings: {
                            brandName: "Generation Nepal",
                            brandSlogan: "CURATED POWER GEAR",
                            logoHeight: "40px"
                        }
                    }
                ]
            },
            {
                id: "navbar-col-center",
                type: "box_block",
                settings: {
                    direction: "row",
                    width: "flex-grow",
                    align: "center"
                },
                children: [
                    {
                        id: "navbar-menu-links",
                        type: "link_group_block",
                        settings: {
                            title: "",
                            direction: "row"
                        },
                        children: [
                            {
                                id: "nav-link-shop",
                                type: "link_block",
                                settings: {
                                    text: "Shop All",
                                    href: "/shop"
                                }
                            },
                            {
                                id: "nav-link-new",
                                type: "link_block",
                                settings: {
                                    text: "New Arrivals",
                                    href: "/shop/new"
                                }
                            },
                            {
                                id: "nav-link-support",
                                type: "link_block",
                                settings: {
                                    text: "Support",
                                    href: "/support"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: "navbar-col-right",
                type: "box_block",
                settings: {
                    direction: "row",
                    width: "auto",
                    align: "end"
                },
                children: [
                    {
                        id: "navbar-search",
                        type: "search_bar_block",
                        settings: {
                            placeholder: "Search products..."
                        }
                    },
                    {
                        id: "navbar-utilities",
                        type: "nav_utilities_block",
                        settings: {
                            wishlistShow: "true",
                            cartShow: "true",
                            accountShow: "true",
                            iconSize: "medium"
                        }
                    }
                ]
            }
        ]
    }
];
