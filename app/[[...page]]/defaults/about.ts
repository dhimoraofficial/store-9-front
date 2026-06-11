import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default About Us Page Layout Schema
 * Premium, minimal fashion storefront representation.
 */
export const defaultAboutSchema: ComponentSchema[] = [
    {
        "id": "about-top-spacer",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "48px",
            "spacer-height-mobile": "24px"
        }
    },
    {
        "id": "about-hero-section",
        "type": "stack_box",
        "settings": {
            "w": "100%",
            "mw": "1200px",
            "m": "auto",
            "style": {
                "borderRadius": "4px",
                "overflow": "hidden"
            }
        },
        "children": [
            {
                "id": "about-hero-bg-img",
                "type": "image_block",
                "settings": {
                    "img-src": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
                    "img-alt": "Studio and organic textiles",
                    "img-object-fit": "cover",
                    "style": {
                        "width": "100%",
                        "height": "450px"
                    }
                }
            },
            {
                "id": "about-hero-overlay-flex",
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
                        "backgroundColor": "rgba(15, 23, 42, 0.55)",
                        "backdropFilter": "blur(2px)",
                        "textAlign": "center"
                    }
                },
                "children": [
                    {
                        "id": "about-hero-badge",
                        "type": "badge_block",
                        "settings": {
                            "badge-text": "OUR HERITAGE",
                            "style": {
                                "color": "#ffffff",
                                "border": "1px solid rgba(255, 255, 255, 0.4)",
                                "padding": "4px 12px",
                                "borderRadius": "9999px",
                                "fontSize": "10px",
                                "fontWeight": "bold",
                                "letterSpacing": "1.5px",
                                "marginBottom": "1rem"
                            }
                        }
                    },
                    {
                        "id": "about-hero-title",
                        "type": "text_block",
                        "settings": {
                            "content": "CRAFTED WITH INTENT",
                            "text-element": "h1",
                            "text-size": "38px",
                            "text-weight": "bold",
                            "text-color": "#ffffff",
                            "style": {
                                "fontFamily": "Playfair Display, Georgia, serif",
                                "letterSpacing": "2.5px"
                            }
                        }
                    },
                    {
                        "id": "about-hero-subtitle",
                        "type": "text_block",
                        "settings": {
                            "content": "Honoring traditional craftsmanship and premium organic textiles.",
                            "text-element": "p",
                            "text-size": "14px",
                            "text-color": "#f3f4f6",
                            "style": {
                                "maxWidth": "500px",
                                "marginTop": "0.5rem",
                                "textAlign": "center"
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "about-spacer-1",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "36px",
            "spacer-height-mobile": "20px"
        }
    },
    {
        "id": "about-brand-marquee",
        "type": "brand_marquee_block",
        "settings": {
            "scrollSpeed": "slow",
            "opacity": "0.5",
            "backgroundColor": "var(--bg-surface)",
            "textColor": "var(--text-muted)",
            "brands": [
                { "name": "ORGANIC COTTON" },
                { "name": "TRACEABLE SILK" },
                { "name": "RECYCLED MERINO" },
                { "name": "FAIR WORKSPACES" },
                { "name": "ZERO WASTE" },
                { "name": "ECO-FRIENDLY DYES" }
            ]
        }
    },
    {
        "id": "about-spacer-2",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "64px",
            "spacer-height-mobile": "32px"
        }
    },
    {
        "id": "about-story-split-section",
        "type": "box_block",
        "settings": {
            "direction": "row",
            "wrap": "wrap",
            "w": "100%",
            "mw": "1200px",
            "m": "auto",
            "style": {
                "gap": "4rem",
                "alignItems": "center"
            }
        },
        "children": [
            {
                "id": "about-story-img-container",
                "type": "box_block",
                "settings": {
                    "width": "flex-1",
                    "style": {
                        "minWidth": "320px"
                    }
                },
                "children": [
                    {
                        "id": "about-story-narrative-img",
                        "type": "image_block",
                        "settings": {
                            "img-src": "https://images.unsplash.com/photo-1558603668-6570496b66f8?w=800",
                            "img-alt": "Loom and textiles craftsmanship",
                            "img-object-fit": "cover",
                            "style": {
                                "width": "100%",
                                "height": "460px",
                                "borderRadius": "4px",
                                "border": "1px solid var(--border-primary)"
                            }
                        }
                    }
                ]
            },
            {
                "id": "about-story-text-container",
                "type": "box_block",
                "settings": {
                    "width": "flex-1",
                    "style": {
                        "minWidth": "320px"
                    }
                },
                "children": [
                    {
                        "id": "about-story-eyebrow",
                        "type": "text_block",
                        "settings": {
                            "content": "OUR STORY",
                            "text-element": "span",
                            "text-size": "11px",
                            "text-weight": "bold",
                            "text-color": "var(--secondary)",
                            "style": {
                                "letterSpacing": "2.5px"
                            }
                        }
                    },
                    {
                        "id": "about-story-heading",
                        "type": "text_block",
                        "settings": {
                            "content": "Garments designed to last, materials made to elevate.",
                            "text-element": "h2",
                            "text-size": "28px",
                            "text-weight": "bold",
                            "text-color": "var(--text-main)",
                            "style": {
                                "fontFamily": "Playfair Display, Georgia, serif",
                                "lineHeight": "1.3",
                                "marginBottom": "1rem"
                            }
                        }
                    },
                    {
                        "id": "about-story-p1",
                        "type": "text_block",
                        "settings": {
                            "content": "Our journey began with a simple mission: to build essential, high-quality closet staples that defy the cycle of fast fashion. We believe in the beauty of simplicity and the longevity of premium fabrics.",
                            "text-element": "p",
                            "text-size": "13.5px",
                            "text-color": "var(--text-muted)",
                            "style": {
                                "lineHeight": "1.7",
                                "marginBottom": "1rem"
                            }
                        }
                    },
                    {
                        "id": "about-story-p2",
                        "type": "text_block",
                        "settings": {
                            "content": "By partnering directly with family-run mills and ethical workshops, we ensure that every thread is fully traceable, organic, and crafted under fair conditions. This allows us to offer premium linen, silk, and merino wool items that are as comfortable as they are sustainable.",
                            "text-element": "p",
                            "text-size": "13.5px",
                            "text-color": "var(--text-muted)",
                            "style": {
                                "lineHeight": "1.7",
                                "marginBottom": "1.5rem"
                            }
                        }
                    },
                    {
                        "id": "about-story-cta",
                        "type": "button_block",
                        "settings": {
                            "button-text": "Explore Our Collections",
                            "btn-label": "Explore Our Collections",
                            "href": "/search",
                            "style": {
                                "backgroundColor": "var(--primary)",
                                "color": "var(--text-inverted)",
                                "borderRadius": "4px",
                                "fontSize": "11px",
                                "fontWeight": "bold",
                                "letterSpacing": "1px",
                                "textTransform": "uppercase",
                                "padding": "12px 24px",
                                "border": "none"
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "about-spacer-3",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "64px",
            "spacer-height-mobile": "32px"
        }
    },
    {
        "id": "about-trust-signals",
        "type": "trust_signals_block",
        "settings": {
            "layoutVariant": "classic",
            "iconColor": "#E11D2E",
            "iconBgColor": "var(--bg-surface)",
            "signals": [
                {
                    "title": "Carbon Neutral Shipping",
                    "desc": "Free delivery globally with offset carbon impact",
                    "icon": "Truck"
                },
                {
                    "title": "100% Organic Fibers",
                    "desc": "Certified GOTS standard materials exclusively",
                    "icon": "Leaf"
                },
                {
                    "title": "Lifetime Stitch Repair",
                    "desc": "Complimentary mending service for all items",
                    "icon": "Heart"
                }
            ]
        }
    },
    {
        "id": "about-spacer-4",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "64px",
            "spacer-height-mobile": "32px"
        }
    },
    {
        "id": "about-values-header-flex",
        "type": "flex_box",
        "settings": {
            "box-display": "flex",
            "box-direction": "col",
            "box-align": "center",
            "box-gap": "0.5rem",
            "style": {
                "marginBottom": "2rem"
            }
        },
        "children": [
            {
                "id": "about-values-title",
                "type": "text_block",
                "settings": {
                    "content": "OUR GUIDING VALUES",
                    "text-element": "h3",
                    "text-size": "20px",
                    "text-weight": "bold",
                    "text-color": "var(--text-main)",
                    "style": {
                        "letterSpacing": "2.5px"
                    }
                }
            },
            {
                "id": "about-values-subtitle",
                "type": "text_block",
                "settings": {
                    "content": "How we construct our collections and operate our business.",
                    "text-element": "span",
                    "text-size": "13px",
                    "text-color": "var(--text-muted)"
                }
            }
        ]
    },
    {
        "id": "about-values-grid",
        "type": "grid_box",
        "settings": {
            "box-display": "grid",
            "w": "100%",
            "style": {
                "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))",
                "gap": "1.5rem"
            },
            "mw": "1200px",
            "m": "auto"
        },
        "children": [
            {
                "id": "value-card-quality",
                "type": "card_box",
                "settings": {
                    "box-padding": "28px",
                    "box-radius": "4px",
                    "box-bg": "var(--bg-surface)",
                    "box-border": "1px solid var(--border-primary)"
                },
                "children": [
                    {
                        "id": "value-quality-flex",
                        "type": "flex_box",
                        "settings": {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-align": "start",
                            "box-gap": "1rem"
                        },
                        "children": [
                            {
                                "id": "value-quality-icon",
                                "type": "svg_icon",
                                "settings": {
                                    "icon-name": "shield-check",
                                    "icon-color": "var(--secondary)",
                                    "icon-size": "24px"
                                }
                            },
                            {
                                "id": "value-quality-title",
                                "type": "text_block",
                                "settings": {
                                    "content": "Traceable Sourcing",
                                    "text-size": "15px",
                                    "text-weight": "bold",
                                    "text-color": "var(--text-main)"
                                }
                            },
                            {
                                "id": "value-quality-desc",
                                "type": "text_block",
                                "settings": {
                                    "content": "Every fiber has a history. We trace all materials back to their agricultural origins to guarantee pesticide-free and animal-friendly farms.",
                                    "text-size": "12.5px",
                                    "text-color": "var(--text-muted)",
                                    "style": {
                                        "lineHeight": "1.5"
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "id": "value-card-design",
                "type": "card_box",
                "settings": {
                    "box-padding": "28px",
                    "box-radius": "4px",
                    "box-bg": "var(--bg-surface)",
                    "box-border": "1px solid var(--border-primary)"
                },
                "children": [
                    {
                        "id": "value-design-flex",
                        "type": "flex_box",
                        "settings": {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-align": "start",
                            "box-gap": "1rem"
                        },
                        "children": [
                            {
                                "id": "value-design-icon",
                                "type": "svg_icon",
                                "settings": {
                                    "icon-name": "sparkles",
                                    "icon-color": "var(--secondary)",
                                    "icon-size": "24px"
                                }
                            },
                            {
                                "id": "value-design-title",
                                "type": "text_block",
                                "settings": {
                                    "content": "Aesthetic Utility",
                                    "text-size": "15px",
                                    "text-weight": "bold",
                                    "text-color": "var(--text-main)"
                                }
                            },
                            {
                                "id": "value-design-desc",
                                "type": "text_block",
                                "settings": {
                                    "content": "We design capsule items that integrate seamlessly with your wardrobe. Versatility is the primary lens for color and silhouette choice.",
                                    "text-size": "12.5px",
                                    "text-color": "var(--text-muted)",
                                    "style": {
                                        "lineHeight": "1.5"
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "id": "value-card-sustainability",
                "type": "card_box",
                "settings": {
                    "box-padding": "28px",
                    "box-radius": "4px",
                    "box-bg": "var(--bg-surface)",
                    "box-border": "1px solid var(--border-primary)"
                },
                "children": [
                    {
                        "id": "value-sustainability-flex",
                        "type": "flex_box",
                        "settings": {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-align": "start",
                            "box-gap": "1rem"
                        },
                        "children": [
                            {
                                "id": "value-sustainability-icon",
                                "type": "svg_icon",
                                "settings": {
                                    "icon-name": "heart",
                                    "icon-color": "var(--secondary)",
                                    "icon-size": "24px"
                                }
                            },
                            {
                                "id": "value-sustainability-title",
                                "type": "text_block",
                                "settings": {
                                    "content": "Radical Care",
                                    "text-size": "15px",
                                    "text-weight": "bold",
                                    "text-color": "var(--text-main)"
                                }
                            },
                            {
                                "id": "value-sustainability-desc",
                                "type": "text_block",
                                "settings": {
                                    "content": "We build relationships, not just products. From supporting the craftspeople to offering post-purchase repairs, we stand by our creations.",
                                    "text-size": "12.5px",
                                    "text-color": "var(--text-muted)",
                                    "style": {
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
        "id": "about-bottom-spacer",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "80px",
            "spacer-height-mobile": "40px"
        }
    }
];
