import { ComponentSchema } from "@/application/runtime/builder/type";

/**
 * Default Homepage Layout Schema
 * Premium, minimal fashion storefront representation.
 */
export const defaultHomepageSchema: ComponentSchema[] = [
    {
        "id": "home-top-spacer",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "24px",
            "spacer-height-mobile": "12px"
        }
    },
    {
        "id": "home-hero-carousel",
        "type": "carousel_box",
        "settings": {
            "auto-play": "true",
            "interval-speed": "5000",
            "show-arrows": "true",
            "show-dots": "true",
            "overflow-behavior": "snap-to-slide",
            "box-radius": "4px"
        },
        "children": [
            {
                "id": "hero-slide-capsule",
                "type": "stack_box",
                "settings": {
                    "overlayColor": "rgba(26, 26, 26, 0.45)",
                    "style": {
                        "minHeight": "500px",
                        "width": "100%",
                        "borderRadius": "4px",
                        "overflow": "hidden"
                    }
                },
                "children": [
                    {
                        "id": "slide-capsule-bg-image",
                        "type": "image_block",
                        "settings": {
                            "img-src": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600",
                            "img-alt": "Curated Spring Summer apparel showcase",
                            "img-object-fit": "cover",
                            "style": {
                                "height": "500px",
                                "width": "100%"
                            }
                        }
                    },
                    {
                        "id": "slide-capsule-content-wrapper",
                        "type": "flex_box",
                        "settings": {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-align": "center",
                            "box-justify": "center",
                            "box-gap": "1rem",
                            "style": {
                                "height": "100%",
                                "width": "100%",
                                "textAlign": "center",
                                "padding": "2rem"
                            }
                        },
                        "children": [
                            {
                                "id": "slide-capsule-badge",
                                "type": "badge_block",
                                "settings": {
                                    "badge-text": "Spring / Summer Capsule",
                                    "style": {
                                        "backgroundColor": "#C5A880",
                                        "color": "#FFFFFF",
                                        "padding": "4px 12px",
                                        "fontSize": "11px",
                                        "letterSpacing": "2px",
                                        "textTransform": "uppercase"
                                    }
                                }
                            },
                            {
                                "id": "slide-capsule-heading",
                                "type": "text_block",
                                "settings": {
                                    "content": "The Art of Modern Minimalist Dressing",
                                    "text-element": "h2",
                                    "text-size": "42px",
                                    "text-weight": "bold",
                                    "text-color": "#ffffff",
                                    "style": {
                                        "fontFamily": "Playfair Display, Georgia, serif",
                                        "letterSpacing": "1px"
                                    }
                                }
                            },
                            {
                                "id": "slide-capsule-desc",
                                "type": "text_block",
                                "settings": {
                                    "content": "Engineered for maximum versatility. Curated everyday foundations made of pure organic linen and silk.",
                                    "text-element": "p",
                                    "text-size": "15px",
                                    "text-color": "#f3f4f6",
                                    "style": {
                                        "maxWidth": "580px",
                                        "lineHeight": "1.6"
                                    }
                                }
                            },
                            {
                                "id": "slide-capsule-cta-btn",
                                "type": "button_block",
                                "settings": {
                                    "btn-label": "Explore The Collection",
                                    "btn-size": "md",
                                    "btn-variant": "primary",
                                    "btn-action": "/collection/new-arrivals",
                                    "style": {
                                        "backgroundColor": "#FFFFFF",
                                        "color": "#1A1A1A",
                                        "borderRadius": "0px",
                                        "fontSize": "12px",
                                        "fontWeight": "600",
                                        "letterSpacing": "1px",
                                        "textTransform": "uppercase",
                                        "border": "none",
                                        "padding": "14px 28px"
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "id": "hero-slide-knitwear",
                "type": "stack_box",
                "settings": {
                    "overlayColor": "rgba(26, 26, 26, 0.4)",
                    "style": {
                        "minHeight": "500px",
                        "width": "100%",
                        "borderRadius": "4px",
                        "overflow": "hidden"
                    }
                },
                "children": [
                    {
                        "id": "slide-knitwear-bg-image",
                        "type": "image_block",
                        "settings": {
                            "img-src": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1600",
                            "img-alt": "Premium organic cotton knitwear",
                            "img-object-fit": "cover",
                            "style": {
                                "height": "500px",
                                "width": "100%"
                            }
                        }
                    },
                    {
                        "id": "slide-knitwear-content-wrapper",
                        "type": "flex_box",
                        "settings": {
                            "box-display": "flex",
                            "box-direction": "col",
                            "box-align": "center",
                            "box-justify": "center",
                            "box-gap": "1rem",
                            "style": {
                                "height": "100%",
                                "width": "100%",
                                "textAlign": "center",
                                "padding": "2rem"
                            }
                        },
                        "children": [
                            {
                                "id": "slide-knitwear-badge",
                                "type": "badge_block",
                                "settings": {
                                    "badge-text": "Eco-Conscious Fabric",
                                    "style": {
                                        "backgroundColor": "#E07A5F",
                                        "color": "#FFFFFF",
                                        "padding": "4px 12px",
                                        "fontSize": "11px",
                                        "letterSpacing": "2px",
                                        "textTransform": "uppercase"
                                    }
                                }
                            },
                            {
                                "id": "slide-knitwear-heading",
                                "type": "text_block",
                                "settings": {
                                    "content": "Traceable Organic Wool Classics",
                                    "text-element": "h2",
                                    "text-size": "42px",
                                    "text-weight": "bold",
                                    "text-color": "#ffffff",
                                    "style": {
                                        "fontFamily": "Playfair Display, Georgia, serif"
                                    }
                                }
                            },
                            {
                                "id": "slide-knitwear-desc",
                                "type": "text_block",
                                "settings": {
                                    "content": "Discover premium wool knits designed to stand the test of time, made with ethical pasture-to-garment traceability.",
                                    "text-element": "p",
                                    "text-size": "15px",
                                    "text-color": "#f3f4f6",
                                    "style": {
                                        "maxWidth": "580px",
                                        "lineHeight": "1.6"
                                    }
                                }
                            },
                            {
                                "id": "slide-knitwear-cta-btn",
                                "type": "button_block",
                                "settings": {
                                    "btn-label": "Shop Knitwear",
                                    "btn-size": "md",
                                    "btn-variant": "primary",
                                    "btn-action": "/category/knitwear",
                                    "style": {
                                        "backgroundColor": "#FFFFFF",
                                        "color": "#1A1A1A",
                                        "borderRadius": "0px",
                                        "fontSize": "12px",
                                        "fontWeight": "600",
                                        "letterSpacing": "1px",
                                        "textTransform": "uppercase",
                                        "border": "none",
                                        "padding": "14px 28px"
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
        "id": "home-middle-spacer-1",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "36px",
            "spacer-height-mobile": "20px"
        }
    },
    {
        "id": "home-trust-grid",
        "type": "grid_box",
        "settings": {
            "box-display": "grid",
            "w": "100%",
            "style": {
                "gridTemplateColumns": "repeat(auto-fit, minmax(260px, 1fr))",
                "gap": "1.5rem"
            },
            "mw": "1200px",
            "m": "auto"
        },
        "children": [
            {
                "id": "trust-card-sourcing",
                "type": "card_box",
                "settings": {
                    "box-padding": "24px",
                    "box-radius": "4px",
                    "box-bg": "#ffffff",
                    "box-border": "1px solid #EBEBEB"
                },
                "children": [
                    {
                        "id": "trust-sourcing-flex",
                        "type": "flex_box",
                        "settings": {
                            "box-display": "flex",
                            "box-direction": "row",
                            "box-align": "center",
                            "box-gap": "1rem"
                        },
                        "children": [
                            {
                                "id": "trust-sourcing-icon",
                                "type": "svg_icon",
                                "settings": {
                                    "icon-name": "menu",
                                    "icon-color": "#C5A880",
                                    "icon-size": "22px"
                                }
                            },
                            {
                                "id": "trust-sourcing-text-stack",
                                "type": "flex_box",
                                "settings": {
                                    "box-display": "flex",
                                    "box-direction": "col"
                                },
                                "children": [
                                    {
                                        "id": "trust-s-t1",
                                        "type": "text_block",
                                        "settings": {
                                            "content": "100% Traceable Fibres",
                                            "text-size": "14px",
                                            "text-weight": "bold",
                                            "text-color": "#1A1A1A"
                                        }
                                    },
                                    {
                                        "id": "trust-s-t2",
                                        "type": "text_block",
                                        "settings": {
                                            "content": "Organic linen & certified merino wool",
                                            "text-size": "11px",
                                            "text-color": "#7A7A7A"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "trust-card-shipping",
                "type": "card_box",
                "settings": {
                    "box-padding": "24px",
                    "box-radius": "4px",
                    "box-bg": "#ffffff",
                    "box-border": "1px solid #EBEBEB"
                },
                "children": [
                    {
                        "id": "trust-shipping-flex",
                        "type": "flex_box",
                        "settings": {
                            "box-display": "flex",
                            "box-direction": "row",
                            "box-align": "center",
                            "box-gap": "1rem"
                        },
                        "children": [
                            {
                                "id": "trust-shipping-icon",
                                "type": "svg_icon",
                                "settings": {
                                    "icon-name": "map-pin",
                                    "icon-color": "#C5A880",
                                    "icon-size": "22px"
                                }
                            },
                            {
                                "id": "trust-shipping-text-stack",
                                "type": "flex_box",
                                "settings": {
                                    "box-display": "flex",
                                    "box-direction": "col"
                                },
                                "children": [
                                    {
                                        "id": "trust-sh-t1",
                                        "type": "text_block",
                                        "settings": {
                                            "content": "Complimentary Shipping",
                                            "text-size": "14px",
                                            "text-weight": "bold",
                                            "text-color": "#1A1A1A"
                                        }
                                    },
                                    {
                                        "id": "trust-sh-t2",
                                        "type": "text_block",
                                        "settings": {
                                            "content": "Free global carbon-neutral shipping",
                                            "text-size": "11px",
                                            "text-color": "#7A7A7A"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "trust-card-returns",
                "type": "card_box",
                "settings": {
                    "box-padding": "24px",
                    "box-radius": "4px",
                    "box-bg": "#ffffff",
                    "box-border": "1px solid #EBEBEB"
                },
                "children": [
                    {
                        "id": "trust-returns-flex",
                        "type": "flex_box",
                        "settings": {
                            "box-display": "flex",
                            "box-direction": "row",
                            "box-align": "center",
                            "box-gap": "1rem"
                        },
                        "children": [
                            {
                                "id": "trust-returns-icon",
                                "type": "svg_icon",
                                "settings": {
                                    "icon-name": "phone",
                                    "icon-color": "#C5A880",
                                    "icon-size": "22px"
                                }
                            },
                            {
                                "id": "trust-returns-text-stack",
                                "type": "flex_box",
                                "settings": {
                                    "box-display": "flex",
                                    "box-direction": "col"
                                },
                                "children": [
                                    {
                                        "id": "trust-r-t1",
                                        "type": "text_block",
                                        "settings": {
                                            "content": "Hassle-Free Exchange",
                                            "text-size": "14px",
                                            "text-weight": "bold",
                                            "text-color": "#1A1A1A"
                                        }
                                    },
                                    {
                                        "id": "trust-r-t2",
                                        "type": "text_block",
                                        "settings": {
                                            "content": "30-day extended returns policy",
                                            "text-size": "11px",
                                            "text-color": "#7A7A7A"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "home-middle-spacer-2",
        "type": "spacer_block",
        "settings": {
            "spacer-height-desktop": "48px",
            "spacer-height-mobile": "24px"
        }
    },
    {
        "id": "home-featured-title-flex",
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
                "id": "featured-section-title",
                "type": "text_block",
                "settings": {
                    "content": "CURATED ESSENTIALS",
                    "text-element": "h3",
                    "text-size": "20px",
                    "text-weight": "bold",
                    "text-color": "#1A1A1A",
                    "style": {
                        "letterSpacing": "2.5px"
                    }
                }
            },
            {
                "id": "featured-section-subtitle",
                "type": "text_block",
                "settings": {
                    "content": "Premium apparel foundations to construct your core capsule wardrobe.",
                    "text-element": "span",
                    "text-size": "13px",
                    "text-color": "#7A7A7A"
                }
            }
        ]
    },
    {
        "id": "home-featured-products-loop",
        "type": "product_loop_context",
        "settings": {
            "limit": 8,
            "productSort": "best-selling",
            "style": {
                "marginBottom": "4rem"
            },
            "m": "auto",
            "mw": "1200px"
        }
    },
    {
        "id": "home-promotional-split-banner",
        "type": "split_hero_box",
        "settings": {
            "splitRatio": "50-50",
            "style": {
                "backgroundColor": "#FFFFFF",
                "border": "1px solid #EBEBEB",
                "borderRadius": "4px",
                "overflow": "hidden",
                "padding": "3rem",
                "alignItems": "center",
                "marginBottom": "4rem"
            },
            "mw": "1200px",
            "m": "auto"
        },
        "children": [
            {
                "id": "promo-text-column",
                "type": "flex_box",
                "settings": {
                    "box-display": "flex",
                    "box-direction": "col",
                    "box-gap": "1.25rem",
                    "box-justify": "center"
                },
                "children": [
                    {
                        "id": "promo-tag",
                        "type": "badge_block",
                        "settings": {
                            "badge-text": "Sartorial Quality",
                            "style": {
                                "backgroundColor": "#C5A880",
                                "color": "#FFFFFF",
                                "width": "fit-content"
                            }
                        }
                    },
                    {
                        "id": "promo-title",
                        "type": "text_block",
                        "settings": {
                            "content": "Crafted for Generations",
                            "text-element": "h3",
                            "text-size": "28px",
                            "text-weight": "bold",
                            "text-color": "#1A1A1A",
                            "style": {
                                "fontFamily": "Playfair Display, Georgia, serif"
                            }
                        }
                    },
                    {
                        "id": "promo-desc",
                        "type": "text_block",
                        "settings": {
                            "content": "Every seam is stitched with longevity in mind. By partnering with historic weaver mills in Italy and organic cotton cooperatives, we guarantee pieces that look elegant and retain their shape, season after season.",
                            "text-element": "p",
                            "text-size": "14px",
                            "text-color": "#4A4A4A",
                            "style": {
                                "lineHeight": "1.6"
                            }
                        }
                    },
                    {
                        "id": "promo-cta-btn",
                        "type": "button_block",
                        "settings": {
                            "btn-label": "Read Our Sourcing Story",
                            "btn-size": "md",
                            "btn-variant": "secondary",
                            "btn-action": "/story",
                            "style": {
                                "border": "1px solid #1A1A1A",
                                "padding": "12px 24px",
                                "textTransform": "uppercase",
                                "fontSize": "11px",
                                "fontWeight": "600",
                                "letterSpacing": "1px",
                                "backgroundColor": "transparent",
                                "cursor": "pointer"
                            }
                        }
                    }
                ]
            },
            {
                "id": "promo-image-column",
                "type": "image_block",
                "settings": {
                    "img-src": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
                    "img-alt": "Trench coat tailoring detail",
                    "img-object-fit": "cover",
                    "img-radius": "4px",
                    "style": {
                        "height": "360px",
                        "width": "100%"
                    }
                }
            }
        ]
    },
    {
        "id": "brands-header-flex",
        "type": "flex_box",
        "settings": {
            "box-display": "flex",
            "box-direction": "col",
            "box-align": "center",
            "style": {
                "marginBottom": "1.5rem"
            }
        },
        "children": [
            {
                "id": "brands-title",
                "type": "text_block",
                "settings": {
                    "content": "AS SEEN ON LEADING COUTURE LOOKS",
                    "text-element": "h4",
                    "text-size": "11px",
                    "text-weight": "600",
                    "text-color": "#7A7A7A",
                    "style": {
                        "letterSpacing": "2.5px"
                    }
                }
            }
        ]
    },
    {
        "id": "brands-scroller-box",
        "type": "carousel_box",
        "settings": {
            "auto-play": "true",
            "interval-speed": "3000",
            "show-arrows": "false",
            "show-dots": "false",
            "overflow-behavior": "free-scroll",
            "style": {
                "borderTop": "1px solid #EBEBEB",
                "borderBottom": "1px solid #EBEBEB",
                "padding": "1.5rem 0"
            }
        },
        "children": [
            {
                "id": "brands-list-flex",
                "type": "flex_box",
                "settings": {
                    "box-display": "flex",
                    "box-direction": "row",
                    "box-align": "center",
                    "box-justify": "space-around",
                    "box-gap": "3rem",
                    "style": {
                        "width": "100%"
                    }
                },
                "children": [
                    {
                        "id": "b1",
                        "type": "text_block",
                        "settings": {
                            "content": "VOGUE",
                            "text-size": "16px",
                            "text-weight": "800",
                            "text-color": "#A3A3A3",
                            "style": {
                                "letterSpacing": "3px"
                            }
                        }
                    },
                    {
                        "id": "b2",
                        "type": "text_block",
                        "settings": {
                            "content": "ELLE",
                            "text-size": "16px",
                            "text-weight": "800",
                            "text-color": "#A3A3A3",
                            "style": {
                                "letterSpacing": "3px"
                            }
                        }
                    },
                    {
                        "id": "b3",
                        "type": "text_block",
                        "settings": {
                            "content": "BAZAAR",
                            "text-size": "16px",
                            "text-weight": "800",
                            "text-color": "#A3A3A3",
                            "style": {
                                "letterSpacing": "3px"
                            }
                        }
                    },
                    {
                        "id": "b4",
                        "type": "text_block",
                        "settings": {
                            "content": "GQ",
                            "text-size": "16px",
                            "text-weight": "800",
                            "text-color": "#A3A3A3",
                            "style": {
                                "letterSpacing": "3px"
                            }
                        }
                    }
                ]
            }
        ]
    }
]