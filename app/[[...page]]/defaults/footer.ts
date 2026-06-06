import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Footer Layout Schema
 * Premium, clean 5-column and bottom bar slots-based footer.
 */
export const defaultFooterSchema: ComponentSchema[] = [
    {
        id: "main-footer-root-premium",
        type: "footer_ecommerce",
        settings: {
            theme: "dark",
            copyright: "© 2026 Generation Nepal. Powered by Dhimora Systems.",
            col1Width: "flex-grow",
            col1Align: "start",
            col2Width: "auto",
            col2Align: "start",
            col3Width: "auto",
            col3Align: "start",
            col4Width: "flex-grow",
            col4Align: "start",
            col5Width: "auto",
            col5Align: "start",
            bottomLeftWidth: "auto",
            bottomLeftAlign: "start",
            bottomRightWidth: "auto",
            bottomRightAlign: "end"
        },
        children: [
            /* Column 1: Brand Info */
            {
                id: "footer-default-brand-desc",
                type: "text_block",
                settings: {
                    slot: "col1",
                    content: "GENERATION NEPAL TECH"
                }
            },
            {
                id: "footer-default-brand-text",
                type: "text_block",
                settings: {
                    slot: "col1",
                    content: "Premium custom desk setups, hardware components, and mechanical keyboard gear curated for power users."
                }
            },
            
            /* Column 2: Collections Link Group */
            {
                id: "footer-default-col-collections",
                type: "link_group_block",
                settings: {
                    slot: "col2",
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
            },

            /* Column 3: Customer Care Link Group */
            {
                id: "footer-default-col-support",
                type: "link_group_block",
                settings: {
                    slot: "col3",
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
            },

            /* Column 4: Newsletter & Socials */
            {
                id: "footer-default-col-socials",
                type: "social_links_block",
                settings: {
                    slot: "col4",
                    platforms: [
                        { platform: "facebook", url: "https://facebook.com" },
                        { platform: "instagram", url: "https://instagram.com" },
                        { platform: "youtube", url: "https://youtube.com" }
                    ]
                }
            },

            /* Bottom Bar Elements */
            {
                id: "footer-default-bottom-copyright",
                type: "text_block",
                settings: {
                    slot: "bottomLeft",
                    content: "© 2026 Generation Nepal. All rights reserved."
                }
            },
            {
                id: "footer-default-secure-checkout",
                type: "link_icon_block",
                settings: {
                    slot: "bottomRight",
                    icon: "ShieldCheck",
                    text: "Secure SSL Checkout Guarantee"
                }
            }
        ]
    }
];
