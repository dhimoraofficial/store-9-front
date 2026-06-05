"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Info, ShieldCheck, Truck, ArrowUpRight, Search, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { cx } from "../../_shared";

interface SetupBannerProps {
    theme?: "pri" | "sec" | "bg";
    height?: string;
    layoutStructure?: "split" | "stack" | "full-bleed";
    mobileShow?: "true" | "false";
    leftWidth?: string;
    leftAlign?: string;
    leftWidgets?: any[];
    rightWidth?: string;
    rightAlign?: string;
    rightWidgets?: any[];
    className?: string;
}

export default function ClientComponent({
    theme = "pri",
    height = "auto",
    layoutStructure = "split",
    mobileShow = "true",
    leftWidth = "6",
    leftAlign = "start",
    leftWidgets = [],
    rightWidth = "6",
    rightAlign = "start",
    rightWidgets = [],
    className = ""
}: SetupBannerProps) {
    const hasLeft = Array.isArray(leftWidgets) && leftWidgets.length > 0 && leftWidth !== "0";
    const hasRight = Array.isArray(rightWidgets) && rightWidgets.length > 0 && rightWidth !== "0";

    if (!hasLeft && !hasRight) {
        return null;
    }

    // Theme-based class styles
    const themeClasses = {
        pri: "bg-primary text-primary-foreground border-b border-primary/20",
        sec: "bg-secondary text-secondary-foreground border-b border-secondary/20",
        bg: "bg-background text-foreground border-b border-border"
    };

    const getColSpanClass = (width: string) => {
        switch (width) {
            case "0": return "hidden";
            case "1": return "col-span-12 md:col-span-1";
            case "2": return "col-span-12 md:col-span-2";
            case "3": return "col-span-12 md:col-span-3";
            case "4": return "col-span-12 md:col-span-4";
            case "5": return "col-span-12 md:col-span-5";
            case "6": return "col-span-12 md:col-span-6";
            case "7": return "col-span-12 md:col-span-7";
            case "8": return "col-span-12 md:col-span-8";
            case "9": return "col-span-12 md:col-span-9";
            case "10": return "col-span-12 md:col-span-10";
            case "11": return "col-span-12 md:col-span-11";
            case "12": return "col-span-12 md:col-span-12";
            default:
                return "col-span-12 md:col-span-6";
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

    const renderSocialIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes("facebook")) return <Facebook className="w-4 h-4" />;
        if (p.includes("instagram")) return <Instagram className="w-4 h-4" />;
        if (p.includes("twitter") || p === "x") return <Twitter className="w-4 h-4" />;
        if (p.includes("youtube")) return <Youtube className="w-4 h-4" />;
        if (p.includes("warranty")) return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
        if (p.includes("shipping") || p.includes("delivery")) return <Truck className="w-4 h-4 text-blue-500" />;
        if (p.includes("location") || p.includes("address")) return <MapPin className="w-4 h-4" />;
        return <ArrowUpRight className="w-4 h-4" />;
    };

    // Fading Text & Image Carousel Widget
    const HeroCarousel = ({ slides, autoplaySpeed }: { slides: any[], autoplaySpeed?: number | string }) => {
        const [activeIdx, setActiveIdx] = useState(0);
        const [isFading, setIsFading] = useState(false);
        const [isPaused, setIsPaused] = useState(false);
        const timerRef = useRef<NodeJS.Timeout | null>(null);

        const cleanSlides = Array.isArray(slides) ? slides.filter(s => s?.title || s?.bgImage) : [];
        const speed = Number(autoplaySpeed || 4000);

        useEffect(() => {
            if (cleanSlides.length <= 1 || isPaused) {
                if (timerRef.current) clearInterval(timerRef.current);
                return;
            }

            timerRef.current = setInterval(() => {
                setIsFading(true);
                setTimeout(() => {
                    setActiveIdx((prev) => (prev + 1) % cleanSlides.length);
                    setIsFading(false);
                }, 400);
            }, speed);

            return () => {
                if (timerRef.current) clearInterval(timerRef.current);
            };
        }, [cleanSlides.length, speed, isPaused]);

        if (cleanSlides.length === 0) return null;

        const currentSlide = cleanSlides[activeIdx];

        return (
            <div 
                className="relative overflow-hidden w-full h-[400px] md:h-[500px] rounded-2xl bg-slate-950 flex items-center shadow-lg border border-border/10 animate-fade-in"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Background Image Containment to eliminate LCP CLS */}
                {currentSlide.bgImage && (
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                        <Image 
                            src={currentSlide.bgImage} 
                            alt={currentSlide.title || "Hero banner slide image"} 
                            fill 
                            priority 
                            className="object-cover"
                        />
                    </div>
                )}

                <div className={cx(
                    "relative z-10 p-8 md:p-12 w-full max-w-2xl transition-opacity duration-300 ease-in-out flex flex-col items-start gap-4",
                    isFading ? "opacity-0" : "opacity-100"
                )}>
                    {currentSlide.badgeText && (
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs uppercase font-extrabold tracking-widest rounded-full">
                            {currentSlide.badgeText}
                        </span>
                    )}

                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                        {currentSlide.title}
                    </h2>

                    {currentSlide.subtitle && (
                        <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed">
                            {currentSlide.subtitle}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-4 pt-2">
                        {currentSlide.primaryCtaText && currentSlide.primaryCtaUrl && (
                            <a
                                href={currentSlide.primaryCtaUrl}
                                className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-xs font-bold uppercase tracking-wider rounded-lg"
                            >
                                {currentSlide.primaryCtaText}
                            </a>
                        )}
                        {currentSlide.secondaryCtaText && currentSlide.secondaryCtaUrl && (
                            <a
                                href={currentSlide.secondaryCtaUrl}
                                className="px-6 py-3 border border-slate-500/50 hover:bg-white/10 text-white transition-all text-xs font-bold uppercase tracking-wider rounded-lg"
                            >
                                {currentSlide.secondaryCtaText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Static Banner Card Widget
    const HeroBanner = ({ widget }: { widget: any }) => {
        const widgetHeight = widget.height || "380px";
        return (
            <div 
                style={{ height: widgetHeight }}
                className="relative overflow-hidden w-full rounded-2xl bg-slate-950 flex items-center shadow-lg border border-border/10"
            >
                {widget.bgImage && (
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
                        <Image 
                            src={widget.bgImage} 
                            alt={widget.title || "Banner backdrop image"} 
                            fill 
                            priority 
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="relative z-10 p-8 md:p-12 w-full max-w-xl flex flex-col items-start gap-4">
                    {widget.badgeText && (
                        <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs uppercase font-bold tracking-widest rounded-full">
                            {widget.badgeText}
                        </span>
                    )}

                    <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                        {widget.title}
                    </h3>

                    {widget.subtitle && (
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {widget.subtitle}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3 pt-1">
                        {widget.primaryCtaText && widget.primaryCtaUrl && (
                            <a
                                href={widget.primaryCtaUrl}
                                className="px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-xs font-bold uppercase rounded-lg"
                            >
                                {widget.primaryCtaText}
                            </a>
                        )}
                        {widget.secondaryCtaText && widget.secondaryCtaUrl && (
                            <a
                                href={widget.secondaryCtaUrl}
                                className="px-5 py-2.5 border border-slate-500/50 hover:bg-white/10 text-white transition-all text-xs font-bold uppercase rounded-lg"
                            >
                                {widget.secondaryCtaText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderWidget = (widget: any) => {
        if (!widget || !widget.widgetType) return null;

        switch (widget.widgetType) {
            case "carousel": {
                return <HeroCarousel key={JSON.stringify(widget)} slides={widget.slides || []} autoplaySpeed={widget.autoplaySpeed} />;
            }
            case "banner": {
                return <HeroBanner key={JSON.stringify(widget)} widget={widget} />;
            }
            case "search": {
                return (
                    <form 
                        key={JSON.stringify(widget)}
                        onSubmit={(e) => e.preventDefault()}
                        className="flex w-full max-w-md bg-white border border-border/80 shadow-sm overflow-hidden rounded-xl"
                    >
                        <input
                            type="text"
                            placeholder={widget.placeholder || "Search products or specs..."}
                            className="flex-1 px-4 py-3 text-sm focus:outline-none text-slate-800"
                        />
                        <button 
                            type="submit" 
                            className="px-6 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all flex items-center justify-center gap-1.5"
                        >
                            <Search className="w-3.5 h-3.5" />
                            <span>{widget.buttonText || "Find"}</span>
                        </button>
                    </form>
                );
            }
            case "specs": {
                const list = Array.isArray(widget.specList) ? widget.specList : [];
                return (
                    <div 
                        key={JSON.stringify(widget)}
                        className="grid grid-cols-2 gap-4 w-full border border-border/50 p-4 rounded-xl bg-background/50 backdrop-blur-sm shadow-sm"
                    >
                        {list.map((spec: any, idx: number) => (
                            <div key={idx} className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{spec.label}</span>
                                <span className="text-sm font-bold tracking-tight truncate">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                );
            }
            case "text": {
                const sizeClasses = {
                    sm: "text-sm",
                    base: "text-base",
                    lg: "text-lg",
                    xl: "text-xl",
                    "2xl": "text-2xl md:text-3xl",
                    "3xl": "text-3xl md:text-4xl",
                    "4xl": "text-4xl md:text-5xl lg:text-6xl",
                    "5xl": "text-5xl md:text-6xl lg:text-7xl"
                };

                const weightClasses = {
                    normal: "font-normal",
                    medium: "font-medium",
                    semibold: "font-semibold",
                    bold: "font-bold",
                    black: "font-black"
                };

                return (
                    <div 
                        key={JSON.stringify(widget)}
                        className={cx(
                            sizeClasses[widget.size as keyof typeof sizeClasses] || "text-base",
                            weightClasses[widget.weight as keyof typeof weightClasses] || "font-normal",
                            "leading-tight max-w-2xl py-1"
                        )}
                    >
                        {widget.content}
                    </div>
                );
            }
            case "icons": {
                const socials = Array.isArray(widget.socials) ? widget.socials : [];
                return (
                    <div key={JSON.stringify(widget)} className="flex flex-wrap items-center gap-4 py-2">
                        {socials.map((social: any, idx: number) => (
                            <a
                                key={idx}
                                href={social.url || "#"}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 bg-background/40 hover:bg-background/80 hover:border-border transition-all text-xs font-medium shadow-sm hover:scale-[1.02]"
                            >
                                {renderSocialIcon(social.platform || "")}
                                <span className="capitalize">{social.platform}</span>
                            </a>
                        ))}
                    </div>
                );
            }
            default:
                return null;
        }
    };

    const renderSlot = (widgets: any[], width: string, align: string) => {
        const hasWidgets = Array.isArray(widgets) && widgets.length > 0;
        if (!hasWidgets) return null;

        return (
            <div className={cx(
                "flex flex-col w-full h-full gap-5",
                getAlignClass(align)
            )}>
                {widgets.map((widget) => renderWidget(widget))}
            </div>
        );
    };

    const customStyles: React.CSSProperties = {
        height: height || undefined
    };

    const renderGridStructure = () => {
        if (layoutStructure === "stack") {
            return (
                <div className="flex flex-col gap-10 w-full">
                    {hasLeft && (
                        <div className="w-full">
                            {renderSlot(leftWidgets, leftWidth, leftAlign)}
                        </div>
                    )}
                    {hasRight && (
                        <div className="w-full">
                            {renderSlot(rightWidgets, rightWidth, rightAlign)}
                        </div>
                    )}
                </div>
            );
        }

        if (layoutStructure === "full-bleed") {
            return (
                <div className="w-full text-center max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
                    {hasLeft && renderSlot(leftWidgets, leftWidth, leftAlign)}
                    {hasRight && renderSlot(rightWidgets, rightWidth, rightAlign)}
                </div>
            );
        }

        // Default: split grid using 12 columns
        return (
            <div className="grid grid-cols-12 gap-10 items-center w-full">
                {hasLeft && (
                    <div className={cx(getColSpanClass(leftWidth), "w-full")}>
                        {renderSlot(leftWidgets, leftWidth, leftAlign)}
                    </div>
                )}
                {hasRight && (
                    <div className={cx(getColSpanClass(rightWidth), "w-full")}>
                        {renderSlot(rightWidgets, rightWidth, rightAlign)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section 
            style={customStyles}
            className={cx(
                "w-full flex items-center select-none py-12 md:py-20 overflow-hidden transition-colors duration-200",
                themeClasses[theme],
                mobileShow === "false" ? "hidden lg:flex" : "flex",
                className
            )}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
                {renderGridStructure()}
            </div>
        </section>
    );
}
