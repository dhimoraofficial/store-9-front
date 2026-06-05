"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin, Clock, Info, Facebook, Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import { cx } from "../../_shared";

interface AnnouncementBarProps {
    theme?: "pri" | "sec" | "bg";
    fontSize?: "xs" | "sm" | "base";
    fontWeight?: "normal" | "medium" | "semibold" | "bold";
    height?: string;
    mobileShow?: "true" | "false";
    leftWidgets?: any[];
    middleWidgets?: any[];
    rightWidgets?: any[];
    leftWidth?: string;
    leftAlign?: string;
    middleWidth?: string;
    middleAlign?: string;
    rightWidth?: string;
    rightAlign?: string;
    className?: string;
}

export default function ClientComponent({
    theme = "pri",
    fontSize = "xs",
    fontWeight = "normal",
    height = "36px",
    mobileShow = "true",
    leftWidgets = [],
    middleWidgets = [],
    rightWidgets = [],
    leftWidth = "auto",
    leftAlign = "start",
    middleWidth = "flex-grow",
    middleAlign = "center",
    rightWidth = "auto",
    rightAlign = "end",
    className = ""
}: AnnouncementBarProps) {
    // Check if there are absolutely any widgets to render; if not, render nothing at all.
    const hasLeft = Array.isArray(leftWidgets) && leftWidgets.length > 0;
    const hasMiddle = Array.isArray(middleWidgets) && middleWidgets.length > 0;
    const hasRight = Array.isArray(rightWidgets) && rightWidgets.length > 0;

    if (!hasLeft && !hasMiddle && !hasRight) {
        return null;
    }

    // Theme-based class styles
    const themeClasses = {
        pri: "bg-primary text-primary-foreground border-b border-primary/20",
        sec: "bg-secondary text-secondary-foreground border-b border-secondary/20",
        bg: "bg-background text-foreground border-b border-border"
    };

    const fontSizeClasses = {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base"
    };

    const fontWeightClasses = {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold"
    };

    const getWidthClass = (width: string) => {
        switch (width) {
            case "1": return "flex-[1] min-w-0";
            case "2": return "flex-[2] min-w-0";
            case "3": return "flex-[3] min-w-0";
            case "flex-grow": return "flex-grow min-w-0";
            case "flex-1": return "flex-1 min-w-0";
            case "auto":
            default:
                return "flex-initial min-w-0";
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
        if (p.includes("facebook")) return <Facebook className="w-3.5 h-3.5" />;
        if (p.includes("instagram")) return <Instagram className="w-3.5 h-3.5" />;
        if (p.includes("twitter") || p === "x") return <Twitter className="w-3.5 h-3.5" />;
        if (p.includes("youtube")) return <Youtube className="w-3.5 h-3.5" />;
        if (p.includes("linkedin")) {
            return (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            );
        }
        if (p.includes("tiktok")) {
            return (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.02 1.72-.01 2.58.01v3.9c-1.39-.08-2.71-.62-3.8-1.51-.11 3.51-.04 7.03-.09 10.54-.12 1.95-1.02 3.84-2.67 4.96-1.93 1.41-4.66 1.7-6.84.85-2.45-.88-4.3-3.21-4.61-5.83-.56-3.83 1.99-7.72 5.8-8.43v4.06c-1.84.45-3.07 2.26-2.82 4.14.2 1.64 1.61 2.94 3.26 2.94 1.66 0 3.07-1.29 3.26-2.94.12-2.76.04-5.52.07-8.28-.01-4.87-.01-9.74-.01-14.61z"/>
                </svg>
            );
        }
        return <ArrowUpRight className="w-3.5 h-3.5" />;
    };

    const renderDetailIcon = (iconType: string) => {
        const type = String(iconType || "").toLowerCase();
        switch (type) {
            case "phone": return <Phone className="w-3.5 h-3.5 flex-shrink-0" />;
            case "email": return <Mail className="w-3.5 h-3.5 flex-shrink-0" />;
            case "address": return <MapPin className="w-3.5 h-3.5 flex-shrink-0" />;
            case "clock": return <Clock className="w-3.5 h-3.5 flex-shrink-0" />;
            case "info":
            default:
                return <Info className="w-3.5 h-3.5 flex-shrink-0" />;
        }
    };

    // Text Carousel Widget with fade animation and local speed config
    const TextCarousel = ({ slides, autoplaySpeed }: { slides: any[], autoplaySpeed?: number | string }) => {
        const [activeIdx, setActiveIdx] = useState(0);
        const [isFading, setIsFading] = useState(false);
        const [isPaused, setIsPaused] = useState(false);
        const timerRef = useRef<NodeJS.Timeout | null>(null);

        const cleanSlides = Array.isArray(slides) ? slides.filter(s => s?.text) : [];
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
                }, 400); // mid-point fade animation transition delay
            }, speed);

            return () => {
                if (timerRef.current) clearInterval(timerRef.current);
            };
        }, [cleanSlides.length, speed, isPaused]);

        if (cleanSlides.length === 0) return null;

        const currentSlide = cleanSlides[activeIdx];

        return (
            <div 
                className="relative overflow-hidden w-full h-full flex items-center justify-center min-w-[200px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className={cx(
                    "transition-opacity duration-300 ease-in-out flex items-center justify-center",
                    isFading ? "opacity-0" : "opacity-100"
                )}>
                    {currentSlide.link ? (
                        <a 
                            href={currentSlide.link} 
                            className="hover:underline hover:opacity-90 inline-flex items-center gap-1 transition-all"
                        >
                            <span>{currentSlide.text}</span>
                            <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                        </a>
                    ) : (
                        <span>{currentSlide.text}</span>
                    )}
                </div>
            </div>
        );
    };

    const renderWidget = (widget: any) => {
        if (!widget || !widget.widgetType) return null;

        switch (widget.widgetType) {
            case "text": {
                return (
                    <span key={JSON.stringify(widget)} className="truncate max-w-full">
                        {widget.text}
                    </span>
                );
            }
            case "link_icon": {
                const icon = renderDetailIcon(widget.icon || "info");
                if (widget.link) {
                    return (
                        <a 
                            key={JSON.stringify(widget)} 
                            href={widget.link} 
                            className="flex items-center gap-1.5 hover:underline truncate max-w-full"
                        >
                            {icon}
                            <span>{widget.text}</span>
                        </a>
                    );
                }
                return (
                    <div key={JSON.stringify(widget)} className="flex items-center gap-1.5 truncate max-w-full">
                        {icon}
                        <span>{widget.text}</span>
                    </div>
                );
            }
            case "carousel": {
                return <TextCarousel key={JSON.stringify(widget)} slides={widget.slides || []} autoplaySpeed={widget.autoplaySpeed} />;
            }
            case "icons": {
                const socials = Array.isArray(widget.socials) ? widget.socials : [];
                return (
                    <div key={JSON.stringify(widget)} className="flex items-center gap-2.5">
                        {socials.map((social: any, idx: number) => (
                            <a
                                key={idx}
                                href={social.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-85 hover:opacity-100 hover:scale-105 transition-all p-0.5 flex items-center justify-center"
                                aria-label={social.platform || "social"}
                            >
                                {renderSocialIcon(social.platform || "")}
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
                "flex items-center h-full gap-4",
                getWidthClass(width),
                getAlignClass(align)
            )}>
                {widgets.map((widget) => renderWidget(widget))}
            </div>
        );
    };

    const customStyles: React.CSSProperties = {
        height: height || undefined
    };

    return (
        <div 
            style={customStyles}
            className={cx(
                "w-full flex items-center select-none z-50 transition-colors duration-200 overflow-hidden",
                themeClasses[theme],
                fontSizeClasses[fontSize],
                fontWeightClasses[fontWeight],
                mobileShow === "false" ? "hidden lg:flex" : "flex",
                className
            )}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full w-full gap-4">
                    {/* Left Slot - Hidden on mobile to make room for center announcement */}
                    <div className="hidden md:flex items-center h-full min-w-0">
                        {renderSlot(leftWidgets, leftWidth, leftAlign)}
                    </div>

                    {/* Middle Slot */}
                    <div className="flex-1 flex items-center h-full min-w-0">
                        {renderSlot(middleWidgets, middleWidth, middleAlign)}
                    </div>

                    {/* Right Slot - Hidden on mobile to make room for center announcement */}
                    <div className="hidden md:flex items-center h-full min-w-0">
                        {renderSlot(rightWidgets, rightWidth, rightAlign)}
                    </div>
                </div>
            </div>
        </div>
    );
}
