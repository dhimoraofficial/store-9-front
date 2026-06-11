import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Premium Default Contact Us Page Layout Schema
 * Designed for high-end technical sales, workstation consultations, and enterprise SLA ticketing.
 */
export const defaultContactSchema: ComponentSchema[] = [
    {
        "id": "contact-top-spacer",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "32px",
            "spacer-height-mobile": "16px"
        }
    },
    {
        "id": "contact-hero-stack",
        "type": "stack_box",
        "settings": {
            "w": "100%",
            "mw": "1200px",
            "m": "auto",
            "style": {
                "borderRadius": "16px",
                "overflow": "hidden",
                "boxShadow": "0 20px 40px rgba(0, 0, 0, 0.08)"
            }
        },
        "children": [
            {
                "id": "contact-hero-bg-img",
                "type": "image_block",
                "settings": {
                    "img-src": "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1600",
                    "img-alt": "Premium enterprise tech server rack backdrop",
                    "img-object-fit": "cover",
                    "style": {
                        "width": "100%",
                        "height": "380px"
                    }
                }
            },
            {
                "id": "contact-hero-overlay",
                "type": "flex_box",
                "settings": {
                    "box-display": "flex",
                    "box-direction": "col",
                    "box-align": "center",
                    "box-justify": "center",
                    "w": "100%",
                    "h": "100%",
                    "style": {
                        "padding": "3rem 1.5rem",
                        "backgroundColor": "rgba(15, 23, 42, 0.5)",
                        "backdropFilter": "blur(4px)",
                        "textAlign": "center"
                    }
                },
                "children": [
                    {
                        "id": "contact-hero-badge",
                        "type": "badge_block",
                        "settings": {
                            "badge-text": "SUPPORT PORTAL",
                            "style": {
                                "color": "#E0F2FE",
                                "border": "1px solid rgba(224, 242, 254, 0.4)",
                                "backgroundColor": "rgba(224, 242, 254, 0.1)",
                                "padding": "4px 14px",
                                "borderRadius": "9999px",
                                "fontSize": "11px",
                                "fontWeight": "700",
                                "letterSpacing": "2px",
                                "marginBottom": "1rem"
                            }
                        }
                    },
                    {
                        "id": "contact-hero-title",
                        "type": "text_block",
                        "settings": {
                            "content": "Get in Touch with Our Hardware Experts",
                            "text-element": "h1",
                            "text-size": "38px",
                            "text-weight": "bold",
                            "text-color": "#ffffff",
                            "style": {
                                "fontFamily": "Inter, sans-serif",
                                "letterSpacing": "-0.5px"
                            }
                        }
                    },
                    {
                        "id": "contact-hero-subtitle",
                        "type": "text_block",
                        "settings": {
                            "content": "Whether you are designing enterprise computing infrastructures, tracking system warranty status, or planning a B2B project deployment, our engineering desk is here to help.",
                            "text-element": "p",
                            "text-size": "15px",
                            "text-color": "rgba(255, 255, 255, 0.85)",
                            "style": {
                                "maxWidth": "680px",
                                "marginTop": "0.5rem",
                                "lineHeight": "1.6"
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "contact-spacer-1",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "48px",
            "spacer-height-mobile": "24px"
        }
    },
    {
        "id": "contact-methods-grid",
        "type": "box_block",
        "settings": {
            "display": "grid",
            "gridColumns": "4",
            "gap": "medium",
            "width": "full"
        },
        "children": [
            {
                "id": "contact-call-card",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "small",
                    "backgroundColor": "white",
                    "hoverEffect": "scale-up",
                    "style": {
                        "padding": "28px 24px",
                        "borderRadius": "16px",
                        "border": "1px solid rgba(226, 232, 240, 0.8)",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                    }
                },
                "children": [
                    {
                        "id": "contact-call-link",
                        "type": "link_icon_block",
                        "settings": {
                            "icon": "Phone",
                            "text": "Call Technical Sales",
                            "href": "tel:+97715912445",
                            "style": {
                                "color": "#1978E5",
                                "fontSize": "15px",
                                "fontWeight": "700",
                                "marginBottom": "8px"
                            }
                        }
                    },
                    {
                        "id": "contact-call-desc",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "+977 1-5912445\nDirect advisory line for custom builds, specifications audits, and stock validation.",
                            "variant": "caption",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "13px",
                                "lineHeight": "1.5"
                            }
                        }
                    }
                ]
            },
            {
                "id": "contact-email-card",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "small",
                    "backgroundColor": "white",
                    "hoverEffect": "scale-up",
                    "style": {
                        "padding": "28px 24px",
                        "borderRadius": "16px",
                        "border": "1px solid rgba(226, 232, 240, 0.8)",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                    }
                },
                "children": [
                    {
                        "id": "contact-email-link",
                        "type": "link_icon_block",
                        "settings": {
                            "icon": "Mail",
                            "text": "Support Desk",
                            "href": "mailto:support@ambinfosys.com.np",
                            "style": {
                                "color": "#1978E5",
                                "fontSize": "15px",
                                "fontWeight": "700",
                                "marginBottom": "8px"
                            }
                        }
                    },
                    {
                        "id": "contact-email-desc",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "support@ambinfosys.com.np\nSubmit general inquiries, service requests, and manufacturer warranty claims.",
                            "variant": "caption",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "13px",
                                "lineHeight": "1.5"
                            }
                        }
                    }
                ]
            },
            {
                "id": "contact-visit-card",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "small",
                    "backgroundColor": "white",
                    "hoverEffect": "scale-up",
                    "style": {
                        "padding": "28px 24px",
                        "borderRadius": "16px",
                        "border": "1px solid rgba(226, 232, 240, 0.8)",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                    }
                },
                "children": [
                    {
                        "id": "contact-visit-link",
                        "type": "link_icon_block",
                        "settings": {
                            "icon": "MapPin",
                            "text": "Experience Store",
                            "href": "#store-locations",
                            "style": {
                                "color": "#1978E5",
                                "fontSize": "15px",
                                "fontWeight": "700",
                                "marginBottom": "8px"
                            }
                        }
                    },
                    {
                        "id": "contact-visit-desc",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "New Road, Kathmandu\nVisit our flagship hardware hub to inspect workstations and handle immediate pickups.",
                            "variant": "caption",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "13px",
                                "lineHeight": "1.5"
                            }
                        }
                    }
                ]
            },
            {
                "id": "contact-enterprise-card",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "small",
                    "backgroundColor": "white",
                    "hoverEffect": "scale-up",
                    "style": {
                        "padding": "28px 24px",
                        "borderRadius": "16px",
                        "border": "1px solid rgba(226, 232, 240, 0.8)",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                    }
                },
                "children": [
                    {
                        "id": "contact-enterprise-link",
                        "type": "link_icon_block",
                        "settings": {
                            "icon": "Building",
                            "text": "Enterprise Accounts",
                            "href": "mailto:b2b@ambinfosys.com.np",
                            "style": {
                                "color": "#1978E5",
                                "fontSize": "15px",
                                "fontWeight": "700",
                                "marginBottom": "8px"
                            }
                        }
                    },
                    {
                        "id": "contact-enterprise-desc",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "b2b@ambinfosys.com.np\nDedicated routing for public tenders, volume buying contracts, and VAT documentation.",
                            "variant": "caption",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "13px",
                                "lineHeight": "1.5"
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "contact-spacer-2",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "56px",
            "spacer-height-mobile": "32px"
        }
    },
    {
        "id": "contact-main-grid",
        "type": "box_block",
        "settings": {
            "display": "grid",
            "gridColumns": "2",
            "gap": "large",
            "width": "full"
        },
        "children": [
            {
                "id": "contact-help-panel",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "medium",
                    "backgroundColor": "rgba(248, 250, 252, 0.65)",
                    "style": {
                        "padding": "36px",
                        "borderRadius": "24px",
                        "border": "1px solid rgba(226, 232, 240, 0.5)"
                    }
                },
                "children": [
                    {
                        "id": "contact-help-title",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Lifecycle Integration Support",
                            "variant": "body",
                            "style": {
                                "color": "#0F172A",
                                "fontSize": "22px",
                                "fontWeight": "800",
                                "marginBottom": "8px",
                                "letterSpacing": "-0.5px"
                            }
                        }
                    },
                    {
                        "id": "contact-help-intro",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "AMB technical consultants provide direct assistance for professional workflows and commercial deployments:",
                            "variant": "body",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "14px",
                                "lineHeight": "1.6",
                                "marginBottom": "16px"
                            }
                        }
                    },
                    {
                        "id": "help-point-1",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "✓ Multi-GPU Workstation Compatibility & Render Node Audits",
                            "variant": "body",
                            "style": {
                                "color": "#0F172A",
                                "fontSize": "14px",
                                "fontWeight": "600",
                                "marginBottom": "8px"
                            }
                        }
                    },
                    {
                        "id": "help-point-2",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "✓ Structured Optical Fiber, Switch, & Network Site Layouts",
                            "variant": "body",
                            "style": {
                                "color": "#0F172A",
                                "fontSize": "14px",
                                "fontWeight": "600",
                                "marginBottom": "8px"
                            }
                        }
                    },
                    {
                        "id": "help-point-3",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "✓ Official Manufacturer RMA & Replacement Logistics Processing",
                            "variant": "body",
                            "style": {
                                "color": "#0F172A",
                                "fontSize": "14px",
                                "fontWeight": "600",
                                "marginBottom": "8px"
                            }
                        }
                    },
                    {
                        "id": "help-point-4",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "✓ On-Site Enterprise Hardware Deployment & SLA Response Units",
                            "variant": "body",
                            "style": {
                                "color": "#0F172A",
                                "fontSize": "14px",
                                "fontWeight": "600",
                                "marginBottom": "24px"
                            }
                        }
                    },
                    {
                        "id": "quick-help-links",
                        "type": "link_group_block",
                        "settings": {
                            "title": "Quick Help Portal",
                            "direction": "column"
                        },
                        "children": [
                            {
                                "id": "quick-help-faq",
                                "type": "link_block",
                                "settings": {
                                    "text": "• Frequently Asked Questions",
                                    "href": "/faq",
                                    "style": {
                                        "color": "#1978E5",
                                        "fontSize": "14px",
                                        "fontWeight": "600",
                                        "textDecoration": "none"
                                    }
                                }
                            },
                            {
                                "id": "quick-help-warranty",
                                "type": "link_block",
                                "settings": {
                                    "text": "• Warranty & Returns Policy",
                                    "href": "/warranty",
                                    "style": {
                                        "color": "#1978E5",
                                        "fontSize": "14px",
                                        "fontWeight": "600",
                                        "textDecoration": "none"
                                    }
                                }
                            },
                            {
                                "id": "quick-help-tracking",
                                "type": "link_block",
                                "settings": {
                                    "text": "• Real-Time Order Tracking",
                                    "href": "/track-order",
                                    "style": {
                                        "color": "#1978E5",
                                        "fontSize": "14px",
                                        "fontWeight": "600",
                                        "textDecoration": "none"
                                    }
                                }
                            },
                            {
                                "id": "quick-help-service",
                                "type": "link_block",
                                "settings": {
                                    "text": "• Authorized Service Centers",
                                    "href": "/service-center",
                                    "style": {
                                        "color": "#1978E5",
                                        "fontSize": "14px",
                                        "fontWeight": "600",
                                        "textDecoration": "none"
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "id": "contact-visit-panel",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "medium",
                    "backgroundColor": "rgba(248, 250, 252, 0.65)",
                    "style": {
                        "padding": "36px",
                        "borderRadius": "24px",
                        "border": "1px solid rgba(226, 232, 240, 0.5)"
                    }
                },
                "children": [
                    {
                        "id": "visit-panel-title",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Showroom Headquarters",
                            "variant": "body",
                            "style": {
                                "color": "#0F172A",
                                "fontSize": "22px",
                                "fontWeight": "800",
                                "marginBottom": "8px",
                                "letterSpacing": "-0.5px"
                            }
                        }
                    },
                    {
                        "id": "visit-panel-intro",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Located at the technology hub of Kathmandu, equipped for component trials, pickup coordination, and hardware consults.",
                            "variant": "body",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "14px",
                                "lineHeight": "1.6",
                                "marginBottom": "20px"
                            }
                        }
                    },
                    {
                        "id": "visit-map-wrap",
                        "type": "box_block",
                        "settings": {
                            "direction": "column",
                            "style": {
                                "borderRadius": "16px",
                                "overflow": "hidden",
                                "border": "1px solid rgba(226, 232, 240, 0.8)",
                                "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                                "marginBottom": "20px"
                            }
                        },
                        "children": [
                            {
                                "id": "visit-map",
                                "type": "image_block",
                                "settings": {
                                    "src": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
                                    "alt": "AMB Infosys Office Showroom",
                                    "style": {
                                        "aspectRatio": "1.6",
                                        "objectFit": "cover"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "id": "visit-info-box",
                        "type": "box_block",
                        "settings": {
                            "direction": "column",
                            "gap": "small",
                            "style": {
                                "padding": "20px",
                                "borderRadius": "12px",
                                "backgroundColor": "white",
                                "border": "1px solid rgba(226, 232, 240, 0.8)"
                            }
                        },
                        "children": [
                            {
                                "id": "visit-address-title",
                                "type": "rich_text_block",
                                "settings": {
                                    "content": "Store Address",
                                    "variant": "caption",
                                    "style": {
                                        "color": "#0F172A",
                                        "fontSize": "11px",
                                        "fontWeight": "700",
                                        "letterSpacing": "0.5px"
                                    }
                                }
                            },
                            {
                                "id": "visit-address-text",
                                "type": "rich_text_block",
                                "settings": {
                                    "content": "Level 2, AMB Building, New Road (Opposite Rastriya Banijya Bank), Kathmandu, Nepal 44600",
                                    "variant": "body",
                                    "style": {
                                        "color": "#64748B",
                                        "fontSize": "13px",
                                        "lineHeight": "1.5"
                                    }
                                }
                            },
                            {
                                "id": "visit-hours-title",
                                "type": "rich_text_block",
                                "settings": {
                                    "content": "Opening Hours",
                                    "variant": "caption",
                                    "style": {
                                        "color": "#0F172A",
                                        "fontSize": "11px",
                                        "fontWeight": "700",
                                        "letterSpacing": "0.5px",
                                        "marginTop": "8px"
                                    }
                                }
                            },
                            {
                                "id": "visit-hours-text",
                                "type": "rich_text_block",
                                "settings": {
                                    "content": "Sunday – Friday: 10:00 AM – 7:00 PM\n(Saturday: Closed)",
                                    "variant": "body",
                                    "style": {
                                        "color": "#64748B",
                                        "fontSize": "13px",
                                        "lineHeight": "1.5"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "contact-spacer-3",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "48px",
            "spacer-height-mobile": "28px"
        }
    },
    {
        "id": "contact-bottom-cta",
        "type": "box_block",
        "settings": {
            "direction": "row",
            "justify": "between",
            "align": "center",
            "width": "full",
            "style": {
                "padding": "32px 48px",
                "backgroundImage": "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                "borderRadius": "24px",
                "boxShadow": "0 20px 40px rgba(15, 23, 42, 0.15)",
                "border": "1px solid rgba(255, 255, 255, 0.08)"
            }
        },
        "children": [
            {
                "id": "contact-bottom-text",
                "type": "rich_text_block",
                "settings": {
                    "content": "Need immediate server or network integration assistance?",
                    "variant": "body",
                    "style": {
                        "color": "white",
                        "fontSize": "16px",
                        "fontWeight": "700",
                        "letterSpacing": "-0.3px"
                    }
                }
            },
            {
                "id": "contact-bottom-action",
                "type": "link_block",
                "settings": {
                    "text": "Open SLA Ticket",
                    "href": "mailto:sla@ambinfosys.com.np",
                    "style": {
                        "padding": "12px 24px",
                        "backgroundColor": "white",
                        "borderRadius": "8px",
                        "color": "#0F172A",
                        "fontWeight": "700",
                        "fontSize": "14px",
                        "textDecoration": "none",
                        "boxShadow": "0 4px 6px rgba(0, 0, 0, 0.05)"
                    }
                }
            }
        ]
    },
    {
        "id": "contact-bottom-spacer",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "64px",
            "spacer-height-mobile": "32px"
        }
    }
];
