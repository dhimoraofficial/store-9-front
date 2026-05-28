import { ComponentSchema } from "@/application/runtime/builder/type"

const announcementBar: ComponentSchema[] = []

const navbarSchema: ComponentSchema[] = [
  {
    id: "navbar-container",
    type: "flex_box",
    settings: {
      "style": {
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "space-between",
        "alignItems": "center",
        "backgroundColor": "#FFFFFF",
        "padding": "16px 48px",
        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        "width": "100%",
        "position": "sticky",
        "top": 0,
        "zIndex": 50,
        "borderBottom": "1px solid #F1F5F9"
      }
    },
    children: [
      // Left Logo block
      {
        id: "navbar-logo-link",
        type: "link_block",
        settings: {
          "link-href": "/",
          "style": {
            "display": "flex",
            "alignItems": "center",
            "textDecoration": "none",
            "gap": "6px"
          }
        },
        children: [
          {
            id: "navbar-logo-store",
            type: "text_block",
            settings: {
              "text-element": "span",
              "content": "STORE",
              "style": {
                "fontFamily": "'Orbitron', sans-serif",
                "fontSize": "22px",
                "fontWeight": "900",
                "color": "#0F172A",
                "letterSpacing": "-0.5px"
              }
            }
          },
          {
            id: "navbar-logo-nine",
            type: "text_block",
            settings: {
              "text-element": "span",
              "content": "9",
              "style": {
                "fontFamily": "'Orbitron', sans-serif",
                "fontSize": "26px",
                "fontWeight": "900",
                "color": "#DC2626",
                "fontStyle": "italic",
                "transform": "skewX(-10deg)",
                "display": "inline-block"
              }
            }
          },
          {
            id: "navbar-logo-nepal",
            type: "text_block",
            settings: {
              "text-element": "span",
              "content": "NEPAL",
              "style": {
                "fontFamily": "'Orbitron', sans-serif",
                "fontSize": "22px",
                "fontWeight": "900",
                "color": "#0F172A",
                "letterSpacing": "-0.5px"
              }
            }
          }
        ]
      },
      // Center Links block
      {
        id: "navbar-links",
        type: "flex_box",
        settings: {
          "style": {
            "display": "flex",
            "flexDirection": "row",
            "alignItems": "center",
            "gap": "32px"
          }
        },
        children: [
          {
            id: "nav-link-laptops",
            type: "link_block",
            settings: {
              "link-href": "/laptops",
              "style": { "textDecoration": "none" }
            },
            children: [
              {
                id: "nav-text-laptops",
                type: "text_block",
                settings: {
                  "text-element": "span",
                  "content": "Laptops",
                  "style": {
                    "fontSize": "14px",
                    "fontWeight": "700",
                    "color": "#1E293B",
                    "cursor": "pointer"
                  }
                }
              }
            ]
          },
          {
            id: "nav-link-accessories",
            type: "link_block",
            settings: {
              "link-href": "/accessories",
              "style": { "textDecoration": "none" }
            },
            children: [
              {
                id: "nav-text-accessories",
                type: "text_block",
                settings: {
                  "text-element": "span",
                  "content": "Accessories",
                  "style": {
                    "fontSize": "14px",
                    "fontWeight": "700",
                    "color": "#1E293B",
                    "cursor": "pointer"
                  }
                }
              }
            ]
          },
          {
            id: "nav-link-desktops",
            type: "link_block",
            settings: {
              "link-href": "/desktops",
              "style": { "textDecoration": "none" }
            },
            children: [
              {
                id: "nav-text-desktops",
                type: "text_block",
                settings: {
                  "text-element": "span",
                  "content": "Desktops",
                  "style": {
                    "fontSize": "14px",
                    "fontWeight": "700",
                    "color": "#1E293B",
                    "cursor": "pointer"
                  }
                }
              }
            ]
          },
          {
            id: "nav-link-home-office",
            type: "link_block",
            settings: {
              "link-href": "/home-office",
              "style": { "textDecoration": "none" }
            },
            children: [
              {
                id: "nav-text-home-office",
                type: "text_block",
                settings: {
                  "text-element": "span",
                  "content": "Home & Office",
                  "style": {
                    "fontSize": "14px",
                    "fontWeight": "700",
                    "color": "#1E293B",
                    "cursor": "pointer"
                  }
                }
              }
            ]
          }
        ]
      },
      // Right Actions block (Search, Cart, User)
      {
        id: "navbar-actions",
        type: "flex_box",
        settings: {
          "style": {
            "display": "flex",
            "flexDirection": "row",
            "alignItems": "center",
            "gap": "20px"
          }
        },
        children: [
          // Search input box wrapper
          {
            id: "search-input-wrapper",
            type: "flex_box",
            settings: {
              "style": {
                "position": "relative",
                "display": "flex",
                "alignItems": "center"
              }
            },
            children: [
              {
                id: "navbar-search",
                type: "search_query",
                settings: {
                  "input-type": "search",
                  "input-placeholder": "Search tech...",
                  "style": {
                    "width": "220px",
                    "height": "38px",
                    "borderRadius": "9999px",
                    "backgroundColor": "#F1F5F9",
                    "border": "1px solid #E2E8F0",
                    "paddingLeft": "16px",
                    "paddingRight": "40px",
                    "fontSize": "14px",
                    "color": "#1E293B",
                    "outline": "none"
                  }
                }
              },
              {
                id: "navbar-search-icon",
                type: "svg_icon",
                settings: {
                  "icon-name": "search",
                  "style": {
                    "position": "absolute",
                    "right": "14px",
                    "width": "16px",
                    "height": "16px",
                    "stroke": "#64748B",
                    "pointerEvents": "none"
                  }
                }
              }
            ]
          },
          // Cart Icon Link
          {
            id: "navbar-cart-link",
            type: "link_block",
            settings: {
              "link-href": "/cart",
              "style": {
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center",
                "textDecoration": "none"
              }
            },
            children: [
              {
                id: "navbar-cart-icon",
                type: "svg_icon",
                settings: {
                  "icon-name": "shopping-cart",
                  "style": {
                    "width": "20px",
                    "height": "20px",
                    "stroke": "#1E293B"
                  }
                }
              }
            ]
          },
          // User Icon Link
          {
            id: "navbar-user-link",
            type: "link_block",
            settings: {
              "link-href": "/account",
              "style": {
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center",
                "textDecoration": "none"
              }
            },
            children: [
              {
                id: "navbar-user-icon",
                type: "svg_icon",
                settings: {
                  "icon-name": "user",
                  "style": {
                    "width": "20px",
                    "height": "20px",
                    "stroke": "#1E293B"
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
]

const mainPageSchema: ComponentSchema[] = [
  {
    id: "main-section-wrapper",
    type: "flex_box",
    settings: {
      "style": {
        "backgroundColor": "#F8FAFC",
        "padding": "48px",
        "minHeight": "calc(100vh - 72px)",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
      }
    },
    children: [
      {
        id: "hero-grid-container",
        type: "flex_box",
        settings: {
          "style": {
            "display": "flex",
            "flexFlow": "row wrap",
            "gap": "32px",
            "width": "100%",
            "maxWidth": "1200px"
          }
        },
        children: [
          // Left Card: Featured Collection - Elite Performance Laptops
          {
            id: "featured-card",
            type: "flex_box",
            settings: {
              "style": {
                "flex": "2 1 600px",
                "backgroundImage": "linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.82)), url('https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80')",
                "backgroundSize": "cover",
                "backgroundPosition": "center",
                "borderRadius": "32px",
                "padding": "80px 64px 64px 64px",
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "space-between",
                "minHeight": "520px",
                "boxShadow": "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }
            },
            children: [
              // Content Group
              {
                id: "featured-content-group",
                type: "flex_box",
                settings: {
                  "style": {
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "16px",
                    "maxWidth": "460px"
                  }
                },
                children: [
                  {
                    id: "featured-label",
                    type: "text_block",
                    settings: {
                      "text-element": "span",
                      "content": "FEATURED COLLECTION",
                      "style": {
                        "color": "#DC2626",
                        "fontSize": "13px",
                        "fontWeight": "800",
                        "letterSpacing": "0.2em"
                      }
                    }
                  },
                  {
                    id: "featured-title",
                    type: "text_block",
                    settings: {
                      "text-element": "h1",
                      "content": "Elite Performance Laptops.",
                      "style": {
                        "color": "#111827",
                        "fontSize": "48px",
                        "fontWeight": "900",
                        "lineHeight": "1.1",
                        "letterSpacing": "-1px"
                      }
                    }
                  },
                  {
                    id: "featured-desc",
                    type: "text_block",
                    settings: {
                      "text-element": "p",
                      "content": "Experience uncompromising power with our latest high-performance lineup.",
                      "style": {
                        "color": "#4B5563",
                        "fontSize": "16px",
                        "lineHeight": "1.5",
                        "marginTop": "8px"
                      }
                    }
                  }
                ]
              },
              // Button block
              {
                id: "featured-btn-container",
                type: "flex_box",
                settings: {
                  "style": {
                    "display": "flex",
                    "marginTop": "32px"
                  }
                },
                children: [
                  {
                    id: "featured-btn",
                    type: "button_block",
                    settings: {
                      "content": "SHOP LAPTOPS →",
                      "style": {
                        "backgroundColor": "#DC2626",
                        "color": "#FFFFFF",
                        "borderRadius": "12px",
                        "padding": "16px 28px",
                        "fontWeight": "800",
                        "fontSize": "14px",
                        "letterSpacing": "0.05em",
                        "boxShadow": "0 10px 20px -3px rgba(220, 38, 38, 0.4)",
                        "border": "none",
                        "cursor": "pointer"
                      }
                    }
                  }
                ]
              }
            ]
          },
          // Right Stack Container
          {
            id: "right-stack",
            type: "flex_box",
            settings: {
              "style": {
                "flex": "1 1 320px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "32px"
              }
            },
            children: [
              // Top-Right Card: Winter Specials
              {
                id: "winter-specials-card",
                type: "flex_box",
                settings: {
                  "style": {
                    "backgroundImage": "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=600&q=80')",
                    "backgroundSize": "cover",
                    "backgroundPosition": "center",
                    "borderRadius": "32px",
                    "padding": "40px",
                    "display": "flex",
                    "flexDirection": "column",
                    "justifyContent": "flex-end",
                    "minHeight": "244px",
                    "boxShadow": "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }
                },
                children: [
                  {
                    id: "winter-label",
                    type: "text_block",
                    settings: {
                      "text-element": "span",
                      "content": "LIMITED TIME",
                      "style": {
                        "color": "#F87171",
                        "fontSize": "11px",
                        "fontWeight": "800",
                        "letterSpacing": "0.15em",
                        "marginBottom": "8px"
                      }
                    }
                  },
                  {
                    id: "winter-title",
                    type: "text_block",
                    settings: {
                      "text-element": "h2",
                      "content": "Winter Specials",
                      "style": {
                        "color": "#FFFFFF",
                        "fontSize": "24px",
                        "fontWeight": "800",
                        "lineHeight": "1.2",
                        "marginBottom": "20px"
                      }
                    }
                  },
                  {
                    id: "winter-btn-container",
                    type: "flex_box",
                    settings: {
                      "style": {
                        "display": "flex"
                      }
                    },
                    children: [
                      {
                        id: "winter-btn",
                        type: "button_block",
                        settings: {
                          "content": "VIEW DEALS",
                          "style": {
                            "backgroundColor": "#DC2626",
                            "color": "#FFFFFF",
                            "borderRadius": "10px",
                            "padding": "12px 24px",
                            "fontWeight": "800",
                            "fontSize": "12px",
                            "letterSpacing": "0.05em",
                            "boxShadow": "0 8px 16px -3px rgba(220, 38, 38, 0.3)",
                            "border": "none",
                            "cursor": "pointer"
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              // Bottom-Right Card: Pro Gaming PCs
              {
                id: "custom-gear-card",
                type: "flex_box",
                settings: {
                  "style": {
                    "backgroundImage": "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80')",
                    "backgroundSize": "cover",
                    "backgroundPosition": "center",
                    "borderRadius": "32px",
                    "padding": "40px",
                    "display": "flex",
                    "flexDirection": "column",
                    "justifyContent": "flex-end",
                    "minHeight": "244px",
                    "boxShadow": "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }
                },
                children: [
                  {
                    id: "custom-label",
                    type: "text_block",
                    settings: {
                      "text-element": "span",
                      "content": "CUSTOM GEAR",
                      "style": {
                        "color": "#F87171",
                        "fontSize": "11px",
                        "fontWeight": "800",
                        "letterSpacing": "0.15em",
                        "marginBottom": "8px"
                      }
                    }
                  },
                  {
                    id: "custom-title",
                    type: "text_block",
                    settings: {
                      "text-element": "h2",
                      "content": "Pro Gaming PCs",
                      "style": {
                        "color": "#FFFFFF",
                        "fontSize": "24px",
                        "fontWeight": "800",
                        "lineHeight": "1.2",
                        "marginBottom": "20px"
                      }
                    }
                  },
                  {
                    id: "custom-btn-container",
                    type: "flex_box",
                    settings: {
                      "style": {
                        "display": "flex"
                      }
                    },
                    children: [
                      {
                        id: "custom-btn",
                        type: "button_block",
                        settings: {
                          "content": "START BUILD",
                          "style": {
                            "backgroundColor": "#DC2626",
                            "color": "#FFFFFF",
                            "borderRadius": "10px",
                            "padding": "12px 24px",
                            "fontWeight": "800",
                            "fontSize": "12px",
                            "letterSpacing": "0.05em",
                            "boxShadow": "0 8px 16px -3px rgba(220, 38, 38, 0.3)",
                            "border": "none",
                            "cursor": "pointer"
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

const footerSchema: ComponentSchema[] = []

// IGNORE THIS ALL
const globalsComponents: ComponentSchema[] = []
const tenantThemeConfig = {}

export { announcementBar, navbarSchema, footerSchema, globalsComponents, tenantThemeConfig, mainPageSchema }