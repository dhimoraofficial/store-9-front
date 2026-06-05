"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Phone, Mail, MapPin, Send, Facebook, Instagram, Twitter, Youtube, ShieldCheck, ArrowUpRight } from "lucide-react";
import { cx } from "../../_shared";

interface FooterProps {
    theme?: "light" | "dark" | "slate";
    copyright?: string;
    col1Width?: string;
    col1Align?: string;
    col1Widgets?: any[];
    col2Width?: string;
    col2Align?: string;
    col2Widgets?: any[];
    col3Width?: string;
    col3Align?: string;
    col3Widgets?: any[];
    col4Width?: string;
    col4Align?: string;
    col4Widgets?: any[];
    col5Width?: string;
    col5Align?: string;
    col5Widgets?: any[];
    bottomLeftWidth?: string;
    bottomLeftAlign?: string;
    bottomLeftWidgets?: any[];
    bottomRightWidth?: string;
    bottomRightAlign?: string;
    bottomRightWidgets?: any[];
    className?: string;
    mobileGridColumns?: "1" | "2";
    mobileAlignment?: "inherit" | "center" | "left";
}

export default function ClientComponent({
    theme = "light",
    copyright = "",
    col1Width = "flex-grow",
    col1Align = "start",
    col1Widgets = [],
    col2Width = "auto",
    col2Align = "start",
    col2Widgets = [],
    col3Width = "auto",
    col3Align = "start",
    col3Widgets = [],
    col4Width = "flex-grow",
    col4Align = "start",
    col4Widgets = [],
    col5Width = "auto",
    col5Align = "start",
    col5Widgets = [],
    bottomLeftWidth = "auto",
    bottomLeftAlign = "start",
    bottomLeftWidgets = [],
    bottomRightWidth = "auto",
    bottomRightAlign = "end",
    bottomRightWidgets = [],
    className = "",
    mobileGridColumns = "1",
    mobileAlignment = "inherit"
}: FooterProps) {
    const tenantInfo = useSelector((state: any) => state.editor?.tenantInfo);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            setSubscribed(true);
            setNewsletterEmail("");
        }
    };

    // Color theme mappings
    const themeClasses = {
        light: "bg-slate-50 text-slate-800 border-slate-200",
        dark: "bg-slate-950 text-slate-300 border-slate-900",
        slate: "bg-slate-900 text-slate-200 border-slate-800"
    };

    const textMutedClasses = {
        light: "text-slate-500",
        dark: "text-slate-400",
        slate: "text-slate-400"
    };

    const headingClasses = {
        light: "text-slate-900",
        dark: "text-white",
        slate: "text-white"
    };

    const containerBorderTheme = {
        light: "border-slate-200 bg-white focus-within:border-primary",
        dark: "border-slate-800 bg-slate-900 focus-within:border-primary",
        slate: "border-slate-700 bg-slate-800 focus-within:border-primary"
    };

    const socialButtonThemeClasses = {
        light: "bg-slate-200/60 hover:bg-primary hover:text-white text-slate-700",
        dark: "bg-slate-800/60 hover:bg-primary hover:text-white text-slate-300",
        slate: "bg-slate-800/60 hover:bg-primary hover:text-white text-slate-300"
    };

    const brandName = tenantInfo?.store || "Storefront";

    const renderSocialIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes("facebook")) return <Facebook className="w-4 h-4" />;
        if (p.includes("instagram")) return <Instagram className="w-4 h-4" />;
        if (p.includes("twitter")) return <Twitter className="w-4 h-4" />;
        if (p.includes("youtube")) return <Youtube className="w-4 h-4" />;
        return <ArrowUpRight className="w-4 h-4" />;
    };

    // Responsive Desktop width and flex basis rules to prevent component shifts
    const getWidthClass = (width: string) => {
        switch (width) {
            case "1": return "lg:w-[15%] lg:flex-1 min-w-[150px] max-w-full";
            case "2": return "lg:w-[20%] lg:flex-[2] min-w-[180px] max-w-full";
            case "3": return "lg:w-[25%] lg:flex-[3] min-w-[200px] max-w-full";
            case "flex-grow": return "lg:w-[35%] lg:flex-grow min-w-[220px] max-w-full";
            case "flex-1": return "lg:w-[20%] lg:flex-1 min-w-[180px] max-w-full";
            case "auto":
            default:
                return "lg:w-auto flex-initial min-w-[150px] max-w-full";
        }
    };

    const getAlignClass = (align: string) => {
        switch (align) {
            case "center": return "items-center text-center justify-center";
            case "end": return "items-end text-right justify-end";
            case "between": return "justify-between";
            case "start":
            default:
                return "items-start text-left justify-start";
        }
    };

    const renderWidget = (widget: any) => {
        if (!widget || !widget.widgetType) return null;

        switch (widget.widgetType) {
            case "logo": {
                const logoName = widget.brandName || brandName;
                return (
                    <div key={JSON.stringify(widget)} className="space-y-3 w-full flex flex-col inherit-align break-words">
                        <div className="flex items-center space-x-2">
                            {widget.logoSrc ? (
                                <img
                                    src={widget.logoSrc}
                                    alt={logoName}
                                    style={{ height: widget.logoHeight || "32px" }}
                                    className="object-contain"
                                />
                            ) : (
                                <span className={cx("text-xl font-extrabold tracking-tight uppercase break-all", headingClasses[theme])}>
                                    {logoName}
                                </span>
                            )}
                        </div>
                        {widget.description && (
                            <p className={cx("text-sm leading-relaxed max-w-sm break-words", textMutedClasses[theme])}>
                                {widget.description}
                            </p>
                        )}
                    </div>
                );
            }
            case "contact_info": {
                return (
                    <div key={JSON.stringify(widget)} className="space-y-2.5 text-sm w-full flex flex-col inherit-align break-words">
                        {widget.address && (
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span className="break-words">{widget.address}</span>
                            </div>
                        )}
                        {widget.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <a href={`tel:${widget.phone}`} className="hover:text-primary transition-colors break-all">
                                    {widget.phone}
                                </a>
                            </div>
                        )}
                        {widget.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <a href={`mailto:${widget.email}`} className="hover:text-primary transition-colors break-all">
                                    {widget.email}
                                </a>
                            </div>
                        )}
                    </div>
                );
            }
            case "nav_menu": {
                const menuLinks = Array.isArray(widget.links) ? widget.links : [];
                return (
                    <div key={JSON.stringify(widget)} className="w-full flex flex-col inherit-align break-words">
                        {widget.menuTitle && (
                            <h4 className={cx("text-sm font-bold tracking-wider uppercase mb-4 break-words", headingClasses[theme])}>
                                {widget.menuTitle}
                            </h4>
                        )}
                        <ul className="space-y-2.5 text-sm w-full">
                            {menuLinks.map((link: any, idx: number) => {
                                const destination = link.link || "#";
                                const labelText = link.text || "Link";
                                return (
                                    <li key={idx} className="break-words">
                                        <a href={destination} className="hover:text-primary transition-colors block break-words">
                                            {labelText}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            }
            case "newsletter": {
                return (
                    <div key={JSON.stringify(widget)} className="space-y-3.5 w-full flex flex-col inherit-align break-words">
                        {widget.newsletterTitle && (
                            <h4 className={cx("text-sm font-bold tracking-wider uppercase break-words", headingClasses[theme])}>
                                {widget.newsletterTitle}
                            </h4>
                        )}
                        {widget.newsletterDesc && (
                            <p className={cx("text-sm leading-relaxed max-w-sm break-words", textMutedClasses[theme])}>
                                {widget.newsletterDesc}
                            </p>
                        )}
                        {/* Horizontal input group with unified border-radius envelope */}
                        <form onSubmit={handleSubscribe} className={cx("flex items-stretch w-full max-w-sm rounded-lg overflow-hidden border focus-within:ring-1 focus-within:ring-primary/20", containerBorderTheme[theme])}>
                            <input
                                type="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-grow px-4 py-2.5 bg-transparent border-0 text-sm outline-none focus:ring-0 min-w-0"
                            />
                            <button
                                type="submit"
                                className="px-5 bg-primary text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center border-l border-inherit flex-shrink-0"
                            >
                                {widget.buttonText || "Join"}
                            </button>
                        </form>
                        {subscribed && (
                            <p className="text-xs text-green-500 font-medium">✓ Successfully subscribed!</p>
                        )}
                    </div>
                );
            }
            case "social_links": {
                const socials = Array.isArray(widget.socials) ? widget.socials : [];
                if (socials.length === 0) return null;
                return (
                    <div key={JSON.stringify(widget)} className="flex items-center gap-3 flex-wrap pt-1 w-full justify-inherit">
                        {socials.map((social: any, idx: number) => (
                            <a
                                key={idx}
                                href={social.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cx("p-2 rounded-lg transition-colors flex items-center justify-center flex-shrink-0", socialButtonThemeClasses[theme])}
                                aria-label={social.platform || "social"}
                            >
                                {renderSocialIcon(social.platform || "")}
                            </a>
                        ))}
                    </div>
                );
            }
            case "app_downloads": {
                return (
                    <div key={JSON.stringify(widget)} className="space-y-2 w-full flex flex-col inherit-align break-words">
                        <span className="text-xs text-muted-foreground block font-semibold">GET OUR MOBILE APP:</span>
                        <div className="flex items-center gap-3 flex-wrap justify-inherit">
                            {widget.playStoreUrl && (
                                <a href={widget.playStoreUrl} className="hover:opacity-90 transition-opacity flex-shrink-0">
                                    <img
                                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                                        alt="Get it on Google Play"
                                        className="h-10 object-contain"
                                    />
                                </a>
                            )}
                            {widget.appStoreUrl && (
                                <a href={widget.appStoreUrl} className="hover:opacity-90 transition-opacity flex-shrink-0">
                                    <img
                                        src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                                        alt="Download on the App Store"
                                        className="h-[27px] object-contain"
                                    />
                                </a>
                            )}
                        </div>
                    </div>
                );
            }
            case "secure_badge": {
                return (
                    <div key={JSON.stringify(widget)} className="flex items-center gap-2.5 text-sm font-medium w-full justify-inherit break-words">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="break-words">{widget.badgeText || "SSL Encryption Guarantee"}</span>
                    </div>
                );
            }
            default:
                return null;
        }
    };

    const renderSlot = (widgets: any[], width: string, align: string, fallbackNode?: React.ReactNode) => {
        const hasWidgets = Array.isArray(widgets) && widgets.length > 0;
        
        // Define alignment rules for children nested alignment CSS selectors
        const alignmentStyles = align === "center" 
            ? "[&_.inherit-align]:items-center [&_.inherit-align]:text-center [&_.justify-inherit]:justify-center" 
            : align === "end" 
                ? "[&_.inherit-align]:items-end [&_.inherit-align]:text-right [&_.justify-inherit]:justify-end" 
                : "[&_.inherit-align]:items-start [&_.inherit-align]:text-left [&_.justify-inherit]:justify-start";

        const mobileAlignOverride = mobileAlignment === "center"
            ? "max-lg:items-center max-lg:text-center max-lg:justify-center [&_.inherit-align]:max-lg:items-center [&_.inherit-align]:max-lg:text-center [&_.justify-inherit]:max-lg:justify-center"
            : mobileAlignment === "left"
                ? "max-lg:items-start max-lg:text-left max-lg:justify-start [&_.inherit-align]:max-lg:items-start [&_.inherit-align]:max-lg:text-left [&_.justify-inherit]:max-lg:justify-start"
                : "";

        // Wide columns automatically span 2 columns in a 2-column mobile grid to avoid crushing
        const isWideSlot = widgets.some(w => ["logo", "newsletter", "app_downloads"].includes(w.widgetType));
        const colSpanClass = (mobileGridColumns === "2" && isWideSlot) ? "col-span-2 lg:col-span-1" : "";

        // Tighten gap spacing to 16px (gap-4) to match target spacing hierarchy
        if (!hasWidgets) {
            return fallbackNode ? (
                <div className={cx("flex flex-col gap-4 min-w-0", getWidthClass(width), getAlignClass(align), alignmentStyles, mobileAlignOverride, colSpanClass)}>
                    {fallbackNode}
                </div>
            ) : null;
        }

        return (
            <div className={cx("flex flex-col gap-4 min-w-0", getWidthClass(width), getAlignClass(align), alignmentStyles, mobileAlignOverride, colSpanClass)}>
                {widgets.map((widget) => renderWidget(widget))}
            </div>
        );
    };

    // Show columns that either have widgets or defaults
    const showCol1 = col1Widgets.length > 0;
    const showCol2 = col2Widgets.length > 0;
    const showCol3 = col3Widgets.length > 0;
    const showCol4 = col4Widgets.length > 0;
    const showCol5 = col5Widgets.length > 0;

    return (
        <footer className={cx("w-full border-t py-12 md:py-16 transition-colors duration-200", themeClasses[theme], className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Main dynamic layout columns grid */}
                <div className={cx(
                    mobileGridColumns === "2"
                        ? "grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-8 lg:gap-10 justify-between w-full"
                        : "flex flex-col lg:flex-row gap-8 lg:gap-10 flex-wrap justify-between"
                )}>
                    {showCol1 && renderSlot(col1Widgets, col1Width, col1Align)}
                    {showCol2 && renderSlot(col2Widgets, col2Width, col2Align)}
                    {showCol3 && renderSlot(col3Widgets, col3Width, col3Align)}
                    {showCol4 && renderSlot(col4Widgets, col4Width, col4Align)}
                    {showCol5 && renderSlot(col5Widgets, col5Width, col5Align)}
                </div>

                {/* Bottom Bar Compact Zone */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-inherit">
                    {renderSlot(
                        bottomLeftWidgets, 
                        bottomLeftWidth, 
                        bottomLeftAlign, 
                        <p className={cx("text-xs", textMutedClasses[theme])}>{copyright}</p>
                    )}
                    {renderSlot(
                        bottomRightWidgets, 
                        bottomRightWidth, 
                        bottomRightAlign
                    )}
                </div>

            </div>
        </footer>
    );
}
