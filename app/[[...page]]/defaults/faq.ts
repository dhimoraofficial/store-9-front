import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Premium Default FAQ Page Layout Schema
 * Styled with a modern, high-end technical workstation and gaming setup aesthetic.
 */
export const defaultFaqSchema: ComponentSchema[] = [
    {
        "id": "faq-top-spacer",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "32px",
            "spacer-height-mobile": "16px"
        }
    },
    {
        "id": "faq-hero-stack",
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
                "id": "faq-hero-bg-img",
                "type": "image_block",
                "settings": {
                    "img-src": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600",
                    "img-alt": "Premium gradient backdrop",
                    "img-object-fit": "cover",
                    "style": {
                        "width": "100%",
                        "height": "380px"
                    }
                }
            },
            {
                "id": "faq-hero-overlay",
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
                        "backgroundColor": "rgba(15, 23, 42, 0.45)",
                        "backdropFilter": "blur(4px)",
                        "textAlign": "center"
                    }
                },
                "children": [
                    {
                        "id": "faq-hero-badge",
                        "type": "badge_block",
                        "settings": {
                            "badge-text": "SUPPORT ARCHIVE",
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
                        "id": "faq-hero-title",
                        "type": "text_block",
                        "settings": {
                            "content": "How can we help?",
                            "text-element": "h1",
                            "text-size": "42px",
                            "text-weight": "bold",
                            "text-color": "#ffffff",
                            "style": {
                                "fontFamily": "Inter, sans-serif",
                                "letterSpacing": "-0.5px"
                            }
                        }
                    },
                    {
                        "id": "faq-hero-subtitle",
                        "type": "text_block",
                        "settings": {
                            "content": "Browse categories below or search our hardware & order knowledge base.",
                            "text-element": "p",
                            "text-size": "15px",
                            "text-color": "rgba(255, 255, 255, 0.85)",
                            "style": {
                                "maxWidth": "540px",
                                "marginTop": "0.5rem",
                                "marginBottom": "1.5rem",
                                "lineHeight": "1.5"
                            }
                        }
                    },
                    {
                        "id": "faq-search",
                        "type": "search_block",
                        "settings": {
                            "placeholder": "Search hardware configs, RMA status, or orders...",
                            "buttonText": "Search FAQs"
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "faq-spacer-marquee",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "24px",
            "spacer-height-mobile": "16px"
        }
    },
    {
        "id": "faq-brand-marquee",
        "type": "brand_marquee_block",
        "settings": {
            "scrollSpeed": "slow",
            "opacity": "0.4",
            "backgroundColor": "var(--bg-app)",
            "textColor": "var(--text-muted)",
            "brands": [
                { "name": "INTEL" },
                { "name": "AMD" },
                { "name": "NVIDIA" },
                { "name": "ASUS ROG" },
                { "name": "CORSAIR" },
                { "name": "MSI" },
                { "name": "GIGABYTE" },
                { "name": "RAZER" }
            ]
        }
    },
    {
        "id": "faq-spacer-1",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "48px",
            "spacer-height-mobile": "24px"
        }
    },
    {
        "id": "faq-quick-actions",
        "type": "box_block",
        "settings": {
            "display": "grid",
            "gridColumns": "3",
            "gap": "medium",
            "width": "full"
        },
        "children": [
            {
                "id": "action-track-order",
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
                        "id": "action-track-order-link",
                        "type": "link_icon_block",
                        "settings": {
                            "icon": "Package",
                            "text": "Cargo Tracking",
                            "href": "/track-order",
                            "style": {
                                "color": "#1E293B",
                                "fontSize": "16px",
                                "fontWeight": "700",
                                "marginBottom": "4px"
                            }
                        }
                    },
                    {
                        "id": "action-track-order-note",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Check transit milestones and local courier updates for your shipment.",
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
                "id": "action-warranty",
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
                        "id": "action-warranty-link",
                        "type": "link_icon_block",
                        "settings": {
                            "icon": "ShieldCheck",
                            "text": "RMA Operations Desk",
                            "href": "/warranty",
                            "style": {
                                "color": "#1E293B",
                                "fontSize": "16px",
                                "fontWeight": "700",
                                "marginBottom": "4px"
                            }
                        }
                    },
                    {
                        "id": "action-warranty-note",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Register official hardware claims or trace serial validation tickets.",
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
                "id": "action-service",
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
                        "id": "action-service-link",
                        "type": "link_icon_block",
                        "settings": {
                            "icon": "Wrench",
                            "text": "Service Lab Diagnostics",
                            "href": "/service-center",
                            "style": {
                                "color": "#1E293B",
                                "fontSize": "16px",
                                "fontWeight": "700",
                                "marginBottom": "4px"
                            }
                        }
                    },
                    {
                        "id": "action-service-note",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Schedule system benchmark testing or hardware node restoration.",
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
        "id": "faq-spacer-2",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "56px",
            "spacer-height-mobile": "32px"
        }
    },
    {
        "id": "faq-accordion-section",
        "type": "box_block",
        "settings": {
            "display": "grid",
            "gridColumns": "2",
            "gap": "large",
            "width": "full"
        },
        "children": [
            {
                "id": "faq-card-orders",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "medium",
                    "width": "full",
                    "style": {
                        "backgroundColor": "rgba(248, 250, 252, 0.65)",
                        "borderRadius": "24px",
                        "padding": "32px",
                        "border": "1px solid rgba(226, 232, 240, 0.5)"
                    }
                },
                "children": [
                    {
                        "id": "faq-orders-title",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Orders & Dispatch",
                            "variant": "body",
                            "style": {
                                "color": "#0F172A",
                                "fontSize": "20px",
                                "fontWeight": "800",
                                "marginBottom": "12px",
                                "letterSpacing": "-0.3px"
                            }
                        }
                    },
                    {
                        "id": "faq-order-q1",
                        "type": "faq_block",
                        "settings": {
                            "question": "How do I trace my cargo package?",
                            "answer": "Enter your order invoice number on our tracking console to query immediate status updates from our central hub or partner domestic cargo networks.",
                            "variant": "default"
                        }
                    },
                    {
                        "id": "faq-order-q2",
                        "type": "faq_block",
                        "settings": {
                            "question": "What are the standard delivery timelines?",
                            "answer": "Orders within the metro belt route are dispatched for same-day delivery. Shipments bound for outer industrial sectors take 2 to 4 business days.",
                            "variant": "default"
                        }
                    },
                    {
                        "id": "faq-order-q3",
                        "type": "faq_block",
                        "settings": {
                            "question": "Can I request VAT and corporate tax invoices?",
                            "answer": "Yes. Complete your profile with valid corporate registration credentials at checkout, and an official tax-compliant VAT invoice will be issued.",
                            "variant": "default"
                        }
                    }
                ]
            },
            {
                "id": "faq-card-warranty",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "medium",
                    "width": "full",
                    "style": {
                        "backgroundColor": "rgba(248, 250, 252, 0.65)",
                        "borderRadius": "24px",
                        "padding": "32px",
                        "border": "1px solid rgba(226, 232, 240, 0.5)"
                    }
                },
                "children": [
                    {
                        "id": "faq-warranty-title",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Warranty & RMA Policy",
                            "variant": "body",
                            "style": {
                                "color": "#0F172A",
                                "fontSize": "20px",
                                "fontWeight": "800",
                                "marginBottom": "12px",
                                "letterSpacing": "-0.3px"
                            }
                        }
                    },
                    {
                        "id": "faq-warranty-q1",
                        "type": "faq_block",
                        "settings": {
                            "question": "How is product authenticity certified?",
                            "answer": "Every component imports directly via brand authorized channels, complete with original box barcoding and static security seals intact.",
                            "variant": "default"
                        }
                    },
                    {
                        "id": "faq-warranty-q2",
                        "type": "faq_block",
                        "settings": {
                            "question": "What is the procedure to submit a claim?",
                            "answer": "Bring the system module to our main labs, or submit a request on our digital portal matching your unit serial code for diagnostic processing.",
                            "variant": "default"
                        }
                    },
                    {
                        "id": "faq-warranty-q3",
                        "type": "faq_block",
                        "settings": {
                            "question": "Which actions void hardware warranty?",
                            "answer": "Overclocking physical component structures, trace residue from fluid leaks, board short circuits from power fluctuations, or opening chassis seals voids protection.",
                            "variant": "default"
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "faq-spacer-metrics",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "48px",
            "spacer-height-mobile": "28px"
        }
    },
    {
        "id": "faq-metrics-bar",
        "type": "box_block",
        "settings": {
            "display": "grid",
            "gridColumns": "3",
            "gap": "medium",
            "width": "full"
        },
        "children": [
            {
                "id": "metric-1",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "align": "center",
                    "style": {
                        "padding": "20px",
                        "borderRight": "1px solid rgba(226, 232, 240, 0.8)",
                        "textAlign": "center"
                    }
                },
                "children": [
                    {
                        "id": "metric-val-1",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "99.4%",
                            "variant": "body",
                            "style": {
                                "color": "#1978E5",
                                "fontSize": "28px",
                                "fontWeight": "800",
                                "marginBottom": "4px"
                            }
                        }
                    },
                    {
                        "id": "metric-lbl-1",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "RMA Resolution Rate",
                            "variant": "caption",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "12px",
                                "fontWeight": "600",
                                "transform": "uppercase",
                                "letterSpacing": "1px"
                            }
                        }
                    }
                ]
            },
            {
                "id": "metric-2",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "align": "center",
                    "style": {
                        "padding": "20px",
                        "borderRight": "1px solid rgba(226, 232, 240, 0.8)",
                        "textAlign": "center"
                    }
                },
                "children": [
                    {
                        "id": "metric-val-2",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "15 Min",
                            "variant": "body",
                            "style": {
                                "color": "#1978E5",
                                "fontSize": "28px",
                                "fontWeight": "800",
                                "marginBottom": "4px"
                            }
                        }
                    },
                    {
                        "id": "metric-lbl-2",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Average Response Time",
                            "variant": "caption",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "12px",
                                "fontWeight": "600",
                                "transform": "uppercase",
                                "letterSpacing": "1px"
                            }
                        }
                    }
                ]
            },
            {
                "id": "metric-3",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "align": "center",
                    "style": {
                        "padding": "20px",
                        "textAlign": "center"
                    }
                },
                "children": [
                    {
                        "id": "metric-val-3",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "100%",
                            "variant": "body",
                            "style": {
                                "color": "#1978E5",
                                "fontSize": "28px",
                                "fontWeight": "800",
                                "marginBottom": "4px"
                            }
                        }
                    },
                    {
                        "id": "metric-lbl-3",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Authorized Imports Only",
                            "variant": "caption",
                            "style": {
                                "color": "#64748B",
                                "fontSize": "12px",
                                "fontWeight": "600",
                                "transform": "uppercase",
                                "letterSpacing": "1px"
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "faq-spacer-3",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "48px",
            "spacer-height-mobile": "28px"
        }
    },
    {
        "id": "faq-support-cta",
        "type": "box_block",
        "settings": {
            "direction": "row",
            "justify": "between",
            "align": "center",
            "gap": "medium",
            "width": "full",
            "style": {
                "padding": "48px 64px",
                "backgroundImage": "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                "borderRadius": "24px",
                "boxShadow": "0 20px 40px rgba(15, 23, 42, 0.15)",
                "border": "1px solid rgba(255, 255, 255, 0.08)"
            }
        },
        "children": [
            {
                "id": "faq-support-text",
                "type": "box_block",
                "settings": {
                    "direction": "column",
                    "gap": "small"
                },
                "children": [
                    {
                        "id": "faq-support-title",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Still Need Technical Advice?",
                            "variant": "body",
                            "style": {
                                "color": "white",
                                "fontSize": "24px",
                                "fontWeight": "800",
                                "letterSpacing": "-0.5px"
                            }
                        }
                    },
                    {
                        "id": "faq-support-desc",
                        "type": "rich_text_block",
                        "settings": {
                            "content": "Our support desk connects you directly with certified engineers for immediate resolution.",
                            "variant": "body",
                            "style": {
                                "color": "rgba(255, 255, 255, 0.8)",
                                "fontSize": "15px",
                                "lineHeight": "1.5"
                            }
                        }
                    }
                ]
            },
            {
                "id": "faq-support-actions",
                "type": "box_block",
                "settings": {
                    "direction": "row",
                    "gap": "medium",
                    "align": "center"
                },
                "children": [
                    {
                        "id": "faq-contact-support",
                        "type": "link_block",
                        "settings": {
                            "text": "Contact Advisory",
                            "href": "/contact",
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
                    },
                    {
                        "id": "faq-visit-store",
                        "type": "link_block",
                        "settings": {
                            "text": "Find Showrooms",
                            "href": "/store-locations",
                            "style": {
                                "padding": "12px 24px",
                                "backgroundColor": "rgba(255, 255, 255, 0.1)",
                                "border": "1px solid rgba(255, 255, 255, 0.2)",
                                "borderRadius": "8px",
                                "color": "white",
                                "fontWeight": "700",
                                "fontSize": "14px",
                                "textDecoration": "none"
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "faq-bottom-spacer",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "64px",
            "spacer-height-mobile": "32px"
        }
    }
];
