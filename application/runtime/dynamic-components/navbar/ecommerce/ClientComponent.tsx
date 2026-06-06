"use client";

import { 
  ChevronDown, 
  Flame, 
  Heart, 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  X,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowUpRight
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cx } from "../../_shared";

interface NavLinkItem {
    label: string;
    href: string;
    hasMegamenu?: boolean;
    badge?: string;
}

interface MegamenuColumn {
    columnTitle: string;
    items: { label: string; href: string }[];
}

interface EcommerceNavbarProps {
    layoutVariant?: 
      | "single-row" 
      | "double-row" 
      | "split-row" 
      | "minimalist-center" 
      | "saas-dashboard" 
      | "glassmorphic-sticky" 
      | "boxed-centered" 
      | "brand-heavy" 
      | "compact-utility" 
      | "sidebar-drawer";
    activeIndicator?: "none" | "underline" | "pill";
    logoSrc?: string;
    logoHeight?: string;
    searchPlaceholder?: string;
    searchBarWidth?: "small" | "medium" | "large" | "full";
    wishlistShow?: boolean;
    cartShow?: boolean;
    accountShow?: boolean;
    contactShow?: boolean;
    contactText?: string;
    contactHref?: string;
    categoriesShow?: boolean;
    categoriesText?: string;
    navLinks?: NavLinkItem[];
    megamenuData?: MegamenuColumn[];
    className?: string;
    brandName?: string;
    brandSlogan?: string;
    backgroundColor?: string;
    hoverStyle?: "text-primary" | "glow-bg" | "scale-up" | "slide-underline";
    enableGlassmorphism?: boolean;
    topLeftWidth?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1";
    topLeftAlign?: "start" | "center" | "end" | "between";
    topLeftWidgets?: any[];
    topMiddleWidth?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1";
    topMiddleAlign?: "start" | "center" | "end" | "between";
    topMiddleWidgets?: any[];
    topRightWidth?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1";
    topRightAlign?: "start" | "center" | "end" | "between";
    topRightWidgets?: any[];
    bottomLeftWidth?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1";
    bottomLeftAlign?: "start" | "center" | "end" | "between";
    bottomLeftWidgets?: any[];
    bottomMiddleWidth?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1";
    bottomMiddleAlign?: "start" | "center" | "end" | "between";
    bottomMiddleWidgets?: any[];
    bottomRightWidth?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1";
    bottomRightAlign?: "start" | "center" | "end" | "between";
    bottomRightWidgets?: any[];
    mobileTriggerAlign?: "left" | "right";
    mobileLogoAlign?: "left" | "center";
    mobileSearchPosition?: "header" | "drawer" | "hidden";
    mobileUtilitiesPosition?: "header" | "drawer" | "hidden";
    style?: React.CSSProperties;
}

export default function ClientComponent({
    layoutVariant = "single-row",
    activeIndicator = "none",
    logoSrc,
    logoHeight = "40px",
    searchPlaceholder = "Search products...",
    searchBarWidth = "medium",
    wishlistShow = true,
    cartShow = true,
    accountShow = true,
    contactShow = false,
    contactText = "Contact Us",
    contactHref = "#",
    categoriesShow = false,
    categoriesText = "SHOP CATEGORIES",
    navLinks = [],
    megamenuData = [],
    className = "",
    brandName = "",
    brandSlogan = "",
    backgroundColor = "",
    hoverStyle = "text-primary",
    enableGlassmorphism = false,
    topLeftWidth = "auto",
    topLeftAlign = "start",
    topLeftWidgets = [],
    topMiddleWidth = "flex-grow",
    topMiddleAlign = "center",
    topMiddleWidgets = [],
    topRightWidth = "auto",
    topRightAlign = "end",
    topRightWidgets = [],
    bottomLeftWidth = "auto",
    bottomLeftAlign = "start",
    bottomLeftWidgets = [],
    bottomMiddleWidth = "flex-grow",
    bottomMiddleAlign = "center",
    bottomMiddleWidgets = [],
    bottomRightWidth = "auto",
    bottomRightAlign = "end",
    bottomRightWidgets = [],
    mobileTriggerAlign = "right",
    mobileLogoAlign = "left",
    mobileSearchPosition = "drawer",
    mobileUtilitiesPosition = "header",
    style
}: EcommerceNavbarProps) {
    const tenantInfo = useSelector((state: any) => state.editor?.tenantInfo);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activePath, setActivePath] = useState("/");
    const [hoveredLink, setHoveredLink] = useState<number | null>(null);
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [expandedMobileItem, setExpandedMobileItem] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setActivePath(window.location.pathname);
        }
    }, []);

    const sanitizeBrandName = (name: string) => {
        if (!name) return "";
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(name.trim())) {
            return "";
        }
        return name;
    };

    const getCleanBrandName = () => {
        return sanitizeBrandName(brandName) || sanitizeBrandName(tenantInfo?.store) || "";
    };

    const getCleanBrandSlogan = () => {
        return sanitizeBrandName(brandSlogan) || "";
    };

    // Search bar width presets
    const searchWidthClasses = {
        small: "max-w-xs",
        medium: "max-w-md",
        large: "max-w-xl",
        full: "w-full"
    };

    // Class name generator for links with custom hover animations
    const getLinkClasses = (linkHref: string, isMegamenu: boolean = false) => {
        const isActive = activePath === linkHref;
        return cx(
            "relative px-3 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5 rounded-lg",
            isActive ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary",
            activeIndicator === "pill" && isActive && "bg-primary/15 text-primary rounded-full",
            hoverStyle === "glow-bg" && "hover:bg-primary/10 hover:text-primary",
            hoverStyle === "scale-up" && "hover:scale-105 hover:text-primary",
            hoverStyle === "slide-underline" && "group"
        );
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchVal);
    };

    const renderMegamenu = (linkIdx: number) => {
        return (
            hoveredLink === linkIdx && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 w-[700px] transition-all duration-300">
                    <div className="bg-background border border-border shadow-2xl rounded-xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2">
                        {megamenuData.map((col, cIdx) => (
                            <div key={cIdx} className="space-y-3">
                                <h4 className="text-sm font-bold text-foreground border-b border-border pb-1 tracking-wider uppercase">
                                    {col.columnTitle}
                                </h4>
                                <ul className="space-y-1.5">
                                    {col.items.map((sub, sIdx) => (
                                        <li key={sIdx}>
                                            <a
                                                href={sub.href}
                                                className="text-sm text-muted hover:text-primary transition-colors block py-0.5"
                                            >
                                                {sub.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )
        );
    };

    const renderBrandLogo = () => {
        const cleanName = getCleanBrandName();
        const cleanSlogan = getCleanBrandSlogan();

        return (
            <a href="/" className="flex items-center gap-2 flex-shrink-0 group max-w-[220px] overflow-hidden">
                {logoSrc ? (
                    <img
                        src={logoSrc}
                        alt={cleanName}
                        style={{ height: logoHeight }}
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-extrabold shadow-sm transition-transform duration-300 group-hover:rotate-6 flex-shrink-0">
                        {cleanName ? cleanName.charAt(0) : "S"}
                    </div>
                )}
                
                {(cleanName || cleanSlogan) && (
                    <div className="flex flex-col leading-tight min-w-0">
                        {cleanName && (
                            <span className="text-base font-bold text-foreground tracking-tight uppercase group-hover:text-primary transition-colors truncate">
                                {cleanName}
                            </span>
                        )}
                        {cleanSlogan && (
                            <span className="text-[9px] text-muted-foreground font-semibold tracking-wider uppercase truncate">
                                {cleanSlogan.toUpperCase()}
                            </span>
                        )}
                    </div>
                )}
            </a>
        );
    };

    const customBgStyle = backgroundColor ? { backgroundColor } : {};
    const baseContainerClass = cx(
        "w-full z-50 transition-all duration-300 border-b border-border shadow-sm",
        enableGlassmorphism ? "bg-background/80 backdrop-blur-md" : (backgroundColor ? "" : "bg-background"),
        layoutVariant === "glassmorphic-sticky" && "sticky top-4 mx-auto max-w-7xl rounded-2xl border border-white/20 shadow-lg my-2 px-2",
        className
    );

    const getSlotWidthClass = (widthOption: string) => {
        switch (widthOption) {
            case "1": return "flex-[1] min-w-[150px]";
            case "2": return "flex-[2] min-w-[200px]";
            case "3": return "flex-[3] min-w-[250px]";
            case "flex-grow": return "flex-grow min-w-[200px]";
            case "flex-1": return "flex-1 min-w-[150px]";
            case "auto":
            default: return "flex-initial";
        }
    };

    const getSlotAlignClass = (alignOption: string) => {
        switch (alignOption) {
            case "center": return "justify-center";
            case "end": return "justify-end";
            case "between": return "justify-between";
            case "start":
            default: return "justify-start";
        }
    };

    const renderWidgets = (widgets: any[]) => {
        if (!widgets || !Array.isArray(widgets)) return null;
        return widgets.map((widget, index) => {
            const wType = widget.widgetType;
            if (wType === "branding" || wType === "logo") {
                const wLogoSrc = widget.logoSrc || logoSrc;
                const wLogoHeight = widget.logoHeight || logoHeight;
                const wBrandName = sanitizeBrandName(widget.brandName) || getCleanBrandName();
                const wBrandSlogan = sanitizeBrandName(widget.brandSlogan) || getCleanBrandSlogan();

                return (
                    <a key={index} href="/" className="flex items-center gap-2 flex-shrink-0 group max-w-[220px] overflow-hidden">
                        {wLogoSrc ? (
                            <img
                                src={wLogoSrc}
                                alt={wBrandName}
                                style={{ height: wLogoHeight }}
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-extrabold shadow-sm transition-transform duration-300 group-hover:rotate-6 flex-shrink-0">
                                {wBrandName ? wBrandName.charAt(0) : "S"}
                            </div>
                        )}
                        {(wBrandName || wBrandSlogan) && (
                            <div className="flex flex-col leading-tight min-w-0">
                                {wBrandName && (
                                    <span className="text-base font-bold text-foreground tracking-tight uppercase group-hover:text-primary transition-colors truncate">
                                        {wBrandName}
                                    </span>
                                )}
                                {wBrandSlogan && (
                                    <span className="text-[9px] text-muted-foreground font-semibold tracking-wider uppercase truncate">
                                        {wBrandSlogan.toUpperCase()}
                                    </span>
                                )}
                            </div>
                        )}
                    </a>
                );
            }
            if (wType === "search") {
                const wPlaceholder = widget.searchPlaceholder || searchPlaceholder;
                const wWidth = widget.searchBarWidth || searchBarWidth;

                return (
                    <div key={index} className={cx("flex flex-grow items-center justify-center min-w-[200px]", searchWidthClasses[wWidth as keyof typeof searchWidthClasses] || "max-w-md")}>
                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                            <input
                                type="text"
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                placeholder={wPlaceholder}
                                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white text-foreground rounded-full px-5 py-2 pl-11 text-xs outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200 shadow-xs"
                            />
                            <Search className="absolute left-4 top-3 w-3.5 h-3.5 text-muted-foreground/60" />
                        </form>
                    </div>
                );
            }
            if (wType === "navigation" || wType === "nav_menu") {
                return (
                    <div key={index} className="flex items-center gap-4">
                        {categoriesShow && (
                            <div className="relative">
                                <button
                                    onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                                    className="flex items-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-all"
                                >
                                    <span>{categoriesText}</span>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                {categoriesDropdownOpen && (
                                    <div className="absolute left-0 mt-2 z-50 w-64 bg-background border border-border shadow-xl rounded-lg py-2 animate-in fade-in slide-in-from-top-1">
                                        {megamenuData.map((category, idx) => (
                                            <div key={idx} className="px-4 py-2 hover:bg-secondary/40">
                                                <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                                                    {category.columnTitle}
                                                </span>
                                                <div className="pl-2 space-y-1">
                                                    {category.items.map((sub, subIdx) => (
                                                        <a
                                                            key={subIdx}
                                                            href={sub.href}
                                                            className="block text-sm text-foreground/80 hover:text-primary py-0.5"
                                                        >
                                                            {sub.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {categoriesShow && <div className="h-6 w-px bg-border hidden sm:block" />}
                        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
                            {navLinks.map((link, idx) => (
                                <div
                                    key={idx}
                                    className="relative"
                                    onMouseEnter={() => setHoveredLink(idx)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    <a href={link.href} className={getLinkClasses(link.href, link.hasMegamenu)}>
                                        {link.badge === "fire" && <Flame className="w-4 h-4 text-orange-500 animate-pulse" />}
                                        <span>{link.label}</span>
                                        {link.hasMegamenu && <ChevronDown className="w-3 h-3 text-muted-foreground" />}
                                    </a>
                                    {link.hasMegamenu && renderMegamenu(idx)}
                                </div>
                            ))}
                        </nav>
                    </div>
                );
            }
            if (wType === "utilities") {
                return (
                    <div key={index} className="flex items-center gap-2">
                        {wishlistShow && (
                            <a href="/wishlist" className="p-2 text-foreground/80 hover:text-primary rounded-full hover:bg-secondary/40 transition-all" title="Wishlist">
                                <Heart className="w-5 h-5" />
                            </a>
                        )}
                        {accountShow && (
                            <a href="/account" className="p-2 text-foreground/80 hover:text-primary rounded-full hover:bg-secondary/40 transition-all" title="My Account">
                                <User className="w-5 h-5" />
                            </a>
                        )}
                        {cartShow && (
                            <a href="/cart" className="p-2 text-foreground/80 hover:text-primary rounded-full hover:bg-secondary/40 transition-all relative" title="Shopping Cart">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center">0</span>
                            </a>
                        )}
                    </div>
                );
            }
            if (wType === "cart") {
                return (
                    <a key={index} href="/cart" className="p-2 text-foreground/80 hover:text-primary rounded-full hover:bg-secondary/40 transition-all relative" title="Shopping Cart">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center">0</span>
                    </a>
                );
            }
            if (wType === "account") {
                return (
                    <a key={index} href="/account" className="p-2 text-foreground/80 hover:text-primary rounded-full hover:bg-secondary/40 transition-all" title="My Account">
                        <User className="w-5 h-5" />
                    </a>
                );
            }
            if (wType === "wishlist") {
                return (
                    <a key={index} href="/wishlist" className="p-2 text-foreground/80 hover:text-primary rounded-full hover:bg-secondary/40 transition-all" title="Wishlist">
                        <Heart className="w-5 h-5" />
                    </a>
                );
            }
            if (wType === "contact_cta") {
                const wText = widget.contactText || contactText;
                const wHref = widget.contactHref || contactHref;

                return (
                    <a
                        key={index}
                        href={wHref}
                        className="bg-primary text-primary-foreground font-bold text-xs uppercase px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-all flex-shrink-0"
                    >
                        {wText}
                    </a>
                );
            }
            return null;
        });
    };

    const isDoubleRow = layoutVariant === "double-row" || 
        (bottomLeftWidgets && bottomLeftWidgets.length > 0) ||
        (bottomMiddleWidgets && bottomMiddleWidgets.length > 0) ||
        (bottomRightWidgets && bottomRightWidgets.length > 0);

    return (
        <header className={baseContainerClass} style={{ ...customBgStyle, ...style }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                
                {/* Desktop View Header Bar */}
                <div className="hidden lg:flex h-16 items-center gap-4 border-b border-border/60 w-full">
                    <div className={cx("flex items-center gap-4 min-w-0", getSlotWidthClass(topLeftWidth), getSlotAlignClass(topLeftAlign))}>
                        {renderWidgets(topLeftWidgets)}
                    </div>
                    <div className={cx("flex items-center gap-4 min-w-0", getSlotWidthClass(topMiddleWidth), getSlotAlignClass(topMiddleAlign))}>
                        {renderWidgets(topMiddleWidgets)}
                    </div>
                    <div className={cx("flex items-center gap-4 min-w-0", getSlotWidthClass(topRightWidth), getSlotAlignClass(topRightAlign))}>
                        {renderWidgets(topRightWidgets)}
                    </div>
                </div>

                {/* Mobile View Header Bar */}
                <div className="flex lg:hidden h-16 items-center justify-between gap-4 w-full relative">
                    {/* Left: Trigger or Logo */}
                    <div className="flex items-center gap-2">
                        {mobileTriggerAlign === "left" && (
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 text-foreground/80 hover:text-primary hover:bg-secondary/40 rounded-lg transition-colors"
                                aria-label="Toggle Menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                        {mobileLogoAlign === "left" && (
                            <div className={cx(mobileTriggerAlign === "left" && "ml-1")}>
                                {renderBrandLogo()}
                            </div>
                        )}
                    </div>

                    {/* Center: Logo brand if configured */}
                    {mobileLogoAlign === "center" && (
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                            {renderBrandLogo()}
                        </div>
                    )}

                    {/* Right: Utilities and/or Trigger */}
                    <div className="flex items-center gap-2">
                        {mobileUtilitiesPosition === "header" && (
                            <div className="flex items-center gap-1.5">
                                {wishlistShow && (
                                    <a href="/wishlist" className="p-2 text-foreground/80 hover:text-primary rounded-full" title="Wishlist">
                                        <Heart className="w-5 h-5" />
                                    </a>
                                )}
                                {accountShow && (
                                    <a href="/account" className="p-2 text-foreground/80 hover:text-primary rounded-full" title="My Account">
                                        <User className="w-5 h-5" />
                                    </a>
                                )}
                                {cartShow && (
                                    <a href="/cart" className="p-2 text-foreground/80 hover:text-primary rounded-full relative" title="Shopping Cart">
                                        <ShoppingCart className="w-5 h-5" />
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center">0</span>
                                    </a>
                                )}
                            </div>
                        )}

                        {mobileTriggerAlign === "right" && (
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 text-foreground/80 hover:text-primary hover:bg-secondary/40 rounded-lg transition-colors"
                                aria-label="Toggle Menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Search Row if placed in header */}
                {mobileSearchPosition === "header" && (
                    <div className="block lg:hidden pb-3 w-full">
                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                            <input
                                type="text"
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white text-foreground rounded-full px-5 py-2 pl-11 text-xs outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200 shadow-xs"
                            />
                            <Search className="absolute left-4 top-3 w-3.5 h-3.5 text-muted-foreground/60" />
                        </form>
                    </div>
                )}

                {/* Bottom Row Container (Desktop) */}
                {isDoubleRow && (
                    <div className="hidden lg:flex h-12 items-center gap-4 w-full">
                        <div className={cx("flex items-center gap-4 min-w-0", getSlotWidthClass(bottomLeftWidth), getSlotAlignClass(bottomLeftAlign))}>
                            {renderWidgets(bottomLeftWidgets)}
                        </div>
                        <div className={cx("flex items-center gap-4 min-w-0", getSlotWidthClass(bottomMiddleWidth), getSlotAlignClass(bottomMiddleAlign))}>
                            {renderWidgets(bottomMiddleWidgets)}
                        </div>
                        <div className={cx("flex items-center gap-4 min-w-0", getSlotWidthClass(bottomRightWidth), getSlotAlignClass(bottomRightAlign))}>
                            {renderWidgets(bottomRightWidgets)}
                        </div>
                    </div>
                )}
            </div>

            {/* MOBILE OVERLAY DRAWER */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-black/45 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />

                    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background p-6 shadow-xl flex flex-col justify-between overflow-y-auto">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-foreground">Menu Options</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-foreground hover:bg-secondary rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {mobileSearchPosition === "drawer" && (
                                <form onSubmit={handleSearchSubmit} className="relative w-full">
                                    <input
                                        type="text"
                                        value={searchVal}
                                        onChange={(e) => setSearchVal(e.target.value)}
                                        placeholder={searchPlaceholder}
                                        className="w-full bg-slate-50 text-foreground border border-border focus:border-primary rounded-xl px-4 py-2 pl-10 text-sm outline-none"
                                    />
                                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground/60" />
                                </form>
                            )}

                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link, idx) => (
                                    <div key={idx} className="border-b border-border/50 pb-2">
                                        <div className="flex items-center justify-between">
                                            <a
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="text-base font-semibold text-foreground/90 hover:text-primary py-2 block flex items-center gap-1.5"
                                            >
                                                {link.badge === "fire" && <Flame className="w-4 h-4 text-orange-500" />}
                                                <span>{link.label}</span>
                                            </a>
                                            {link.hasMegamenu && (
                                                <button
                                                    onClick={() => setExpandedMobileItem(expandedMobileItem === idx ? null : idx)}
                                                    className="p-2 text-muted hover:text-foreground hover:bg-secondary rounded-lg"
                                                >
                                                    <ChevronDown
                                                        className={cx(
                                                            "w-4 h-4 transition-transform duration-200",
                                                            expandedMobileItem === idx && "rotate-180"
                                                        )}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {link.hasMegamenu && expandedMobileItem === idx && (
                                            <div className="pl-4 mt-2 space-y-4 animate-in slide-in-from-top-1 duration-150">
                                                {megamenuData.map((col, cIdx) => (
                                                    <div key={cIdx} className="space-y-1">
                                                        <h5 className="text-xs font-bold text-muted uppercase tracking-wider">
                                                            {col.columnTitle}
                                                        </h5>
                                                        <ul className="pl-2 space-y-1">
                                                            {col.items.map((sub, sIdx) => (
                                                                <li key={sIdx}>
                                                                    <a
                                                                        href={sub.href}
                                                                        onClick={() => setMobileMenuOpen(false)}
                                                                        className="text-sm text-foreground/80 hover:text-primary py-1 block"
                                                                    >
                                                                        {sub.label}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        <div className="pt-6 border-t border-border mt-auto space-y-4">
                            {mobileUtilitiesPosition === "drawer" && (
                                <div className="flex items-center justify-around py-2 bg-secondary/35 rounded-xl">
                                    {wishlistShow && (
                                        <a href="/wishlist" className="flex flex-col items-center gap-1 text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                            <Heart className="w-5 h-5" />
                                            <span className="text-[10px] font-semibold">Wishlist</span>
                                        </a>
                                    )}
                                    {accountShow && (
                                        <a href="/account" className="flex flex-col items-center gap-1 text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                            <User className="w-5 h-5" />
                                            <span className="text-[10px] font-semibold">Account</span>
                                        </a>
                                    )}
                                    {cartShow && (
                                        <a href="/cart" className="flex flex-col items-center gap-1 text-foreground/80 hover:text-primary transition-colors relative" onClick={() => setMobileMenuOpen(false)}>
                                            <ShoppingCart className="w-5 h-5" />
                                            <span className="absolute top-0 right-2 bg-red-500 text-white rounded-full text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center">0</span>
                                            <span className="text-[10px] font-semibold">Cart</span>
                                        </a>
                                    )}
                                </div>
                            )}

                            {contactShow && (
                                <a
                                    href={contactHref}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full text-center px-4 py-3 rounded-lg text-sm font-bold text-white bg-primary hover:opacity-90 transition-all"
                                >
                                    {contactText}
                                </a>
                            )}
                            <div className="flex justify-center gap-4 text-xs text-muted-foreground pt-1">
                                <span>Press Esc to close</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
