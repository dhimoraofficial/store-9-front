import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Announcement Bar Schema
 * Renders the new premium dynamic announcement bar with sliding/fading text carousels,
 * nested contact details, and custom styling.
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
            leftWidth: "auto",
            leftAlign: "start",
            middleWidth: "flex-grow",
            middleAlign: "center",
            rightWidth: "auto",
            rightAlign: "end",
            leftWidgets: [
                {
                    widgetType: "link_icon",
                    icon: "phone",
                    text: "+977 981-8085380",
                    link: "tel:+9779818085380"
                },
                {
                    widgetType: "link_icon",
                    icon: "address",
                    text: "Kathmandu, Nepal"
                }
            ],
            middleWidgets: [
                {
                    widgetType: "carousel",
                    autoplaySpeed: 4000,
                    slides: [
                        { text: "✨ Free Shipping across Nepal on orders above NPR 5000!" },
                        { text: "🔥 Use Coupon CODE: NEPAL10 for 10% instant discount!", link: "/shop" },
                        { text: "⚡ Mid-Summer Clearance Sale up to 40% OFF!", link: "/shop/sale" }
                    ]
                }
            ],
            rightWidgets: [
                {
                    widgetType: "icons",
                    socials: [
                        { platform: "facebook", url: "https://facebook.com" },
                        { platform: "instagram", url: "https://instagram.com" },
                        { platform: "tiktok", url: "https://tiktok.com" }
                    ]
                }
            ]
        }
    }
];
