import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Footer Layout Schema
 * Premium, clean columns-based footer using dynamic box_block containers.
 */
export const defaultFooterSchema: ComponentSchema[] = [
    {
        id: "main-footer-root-premium",
        type: "footer_ecommerce",
        settings: {
            theme: "dark",
            copyright: "© 2026 Company Name. Powered by Dhimora Systems."
        },
        children: [
            /* Column 1: Brand Info */
            {
                id: "footer-col-1-container",
                type: "box_block",
                label: "Column 1: Info",
                settings: {
                    direction: "column",
                    width: "flex-grow",
                    align: "start"
                },
                children: [
                    {
                        id: "footer-default-brand-desc",
                        type: "text_block",
                        settings: {
                            content: "",
                            fontWeight: "bold"
                        }
                    },
                    {
                        id: "footer-default-brand-text",
                        type: "text_block",
                        settings: {
                            content: "Premium custom desk setups, hardware components, and mechanical keyboard gear curated for power users."
                        }
                    }
                ]
            },
            
            /* Column 2: Collections Link Group */
            {
                id: "footer-col-2-container",
                type: "box_block",
                label: "Column 2: Collections",
                settings: {
                    direction: "column",
                    width: "auto",
                    align: "start"
                },
                children: [
                    {
                        id: "footer-default-col-collections",
                        type: "link_group_block",
                        settings: {
                            title: "Collections"
                        },
                        children: [
                            {
                                id: "footer-link-col-1",
                                type: "link_block",
                                settings: {
                                    text: "Custom Keyboards",
                                    href: "/shop/keyboards"
                                }
                            },
                            {
                                id: "footer-link-col-2",
                                type: "link_block",
                                settings: {
                                    text: "Desk Mats",
                                    href: "/shop/deskmats"
                                }
                            },
                            {
                                id: "footer-link-col-3",
                                type: "link_block",
                                settings: {
                                    text: "Hardware Spec Bundles",
                                    href: "/shop/bundles"
                                }
                            }
                        ]
                    }
                ]
            },

            /* Column 3: Customer Care Link Group */
            {
                id: "footer-col-3-container",
                type: "box_block",
                label: "Column 3: Support",
                settings: {
                    direction: "column",
                    width: "auto",
                    align: "start"
                },
                children: [
                    {
                        id: "footer-default-col-support",
                        type: "link_group_block",
                        settings: {
                            title: "Customer Support"
                        },
                        children: [
                            {
                                id: "footer-link-sup-1",
                                type: "link_block",
                                settings: {
                                    text: "FAQs & Guides",
                                    href: "/faqs"
                                }
                            },
                            {
                                id: "footer-link-sup-2",
                                type: "link_block",
                                settings: {
                                    text: "Track Order Status",
                                    href: "/track"
                                }
                            },
                            {
                                id: "footer-link-sup-3",
                                type: "link_block",
                                settings: {
                                    text: "Warranty Claims",
                                    href: "/warranty"
                                }
                            }
                        ]
                    }
                ]
            },

            /* Column 4: Newsletter & Socials */
            {
                id: "footer-col-4-container",
                type: "box_block",
                label: "Column 4: Social",
                settings: {
                    direction: "column",
                    width: "flex-grow",
                    align: "start"
                },
                children: [
                    {
                        id: "footer-default-col-socials",
                        type: "social_links_block",
                        settings: {
                            platforms: [
                                { platform: "facebook", url: "https://facebook.com" },
                                { platform: "instagram", url: "https://instagram.com" },
                                { platform: "youtube", url: "https://youtube.com" }
                            ]
                        }
                    }
                ]
            }
        ]
    }
];
