import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Announcement Bar Schema
 * Renders the new premium dynamic announcement bar using dynamic slot-routed child components.
 */
export const defaultAnnouncementBar: ComponentSchema[] = [
    {
        id: "global-announcement-bar",
        type: "announcement_bar_ecommerce",
        settings: {
            theme: "pri",
            fontSize: "xs",
            fontWeight: "medium",
            height: "38px",
            mobileShow: "true",
            layout: "3-column"
        },
        children: [
            {
                id: "ann-phone",
                type: "link_icon_block",
                settings: {
                    icon: "Phone",
                    text: "+977 981-8085380",
                    href: "tel:+9779818085380",
                    slot: "left"
                }
            },
            {
                id: "ann-address",
                type: "link_icon_block",
                settings: {
                    icon: "MapPin",
                    text: "Kathmandu, Nepal",
                    slot: "left"
                }
            },
            {
                id: "ann-carousel",
                type: "text_carousel",
                settings: {
                    autoplaySpeed: "4000",
                    slides: [
                        { text: "✨ Free Shipping across Nepal on orders above NPR 5000!" },
                        { text: "🔥 Use Coupon CODE: NEPAL10 for 10% instant discount!", href: "/shop" },
                        { text: "⚡ Mid-Summer Clearance Sale up to 40% OFF!", href: "/shop/sale" }
                    ],
                    slot: "middle"
                }
            },
            {
                id: "ann-socials",
                type: "social_links_block",
                settings: {
                    platforms: [
                        { platform: "facebook", url: "https://facebook.com" },
                        { platform: "instagram", url: "https://instagram.com" },
                        { platform: "tiktok", url: "https://tiktok.com" }
                    ],
                    slot: "right"
                }
            }
        ]
    }
];
