"use client";

import React, { useState, useEffect } from "react";
import * as Lucide from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { getProductsForContainer } from "./ecommerce/product-container/data";
import ProductCardAppDisplay, { ProductCardSkeleton } from "./product-card/Component";


// 1. Text Block
export function TextBlockComponent({ content, href, className, style }: any) {
    if (!content) return null;
    const body = <span className="text-[12px] font-medium leading-none">{content}</span>;
    if (href) {
        return (
            <Link href={href} className={`hover:underline transition-all ${className || ""}`} style={style}>
                {body}
            </Link>
        );
    }
    return <span className={className} style={style}>{body}</span>;
}

// 2. Social Links Block
export function SocialLinksBlockComponent({ platforms, style }: any) {
    const list = platforms || [];
    if (list.length === 0) return null;
    return (
        <div className="flex items-center gap-1.5" style={style}>
            {list.map((plat: any, idx: number) => {
                const url = plat.url || "#";
                const type = plat.platform || "facebook";
                
                let Icon: any = Lucide.Share2;
                if (type === "facebook") Icon = Lucide.Facebook;
                else if (type === "instagram") Icon = Lucide.Instagram;
                else if (type === "twitter" || type === "x") Icon = Lucide.Twitter;
                else if (type === "youtube") Icon = Lucide.Youtube;
                else if (type === "linkedin") Icon = Lucide.Linkedin;
                else {
                    const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
                    const dynamicIcon = (Lucide as any)[capitalized] || (Lucide as any)[type];
                    if (dynamicIcon) Icon = dynamicIcon;
                }
                
                return (
                    <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6.5 h-6.5 rounded-full bg-zinc-950/5 hover:bg-zinc-950/10 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center transition-all text-current border border-zinc-200/40"
                    >
                        <Icon className="w-3 h-3" />
                    </a>
                );
            })}
        </div>
    );
}

// 3. Link Icon Block
export function LinkIconBlockComponent({ icon, text, href, style }: any) {
    if (!text) return null;
    const IconComponent = (icon && (Lucide as any)[icon]) || Lucide.HelpCircle;
    const body = (
        <span className="flex items-center gap-1.2 text-[12px] font-medium">
            <IconComponent className="w-3.5 h-3.5 shrink-0 opacity-80" />
            <span>{text}</span>
        </span>
    );
    if (href) {
        return (
            <Link href={href} className="hover:underline transition-all text-current" style={style}>
                {body}
            </Link>
        );
    }
    return <span className="text-current" style={style}>{body}</span>;
}

// 4. Text Carousel Block
export function TextCarouselBlockComponent({ slides, autoplaySpeed = 3000, style }: any) {
    const items = slides || [];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (items.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % items.length);
        }, autoplaySpeed);
        return () => clearInterval(interval);
    }, [items.length, autoplaySpeed]);

    if (items.length === 0) return null;

    return (
        <div className="relative overflow-hidden h-5 w-48 md:w-64 flex items-center justify-center text-current" style={style}>
            {items.map((slide: any, idx: number) => {
                const text = slide.text || "";
                const href = slide.href;
                const active = idx === current;
                
                const body = (
                    <span className="text-[12px] font-semibold text-center select-none truncate block">
                        {text}
                    </span>
                );

                return (
                    <div
                        key={idx}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                            active
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                    >
                        {href ? (
                            <Link href={href} className="hover:underline text-current">
                                {body}
                            </Link>
                        ) : (
                            body
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// 5. Hero Carousel Block
export function HeroCarouselBlockComponent({ slides, autoplaySpeed = 4000, style }: any) {
    const [current, setCurrent] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const items = slides || [];

    useEffect(() => {
        if (items.length <= 1) return;
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % items.length);
                setIsFading(false);
            }, 300);
        }, autoplaySpeed);
        return () => clearInterval(interval);
    }, [items.length, autoplaySpeed]);

    if (items.length === 0) return null;
    const currentSlide = items[current] || {};

    return (
        <div
            style={style}
            className="relative overflow-hidden w-full h-[400px] md:h-[500px] rounded-2xl bg-zinc-950 flex items-center shadow-lg border border-zinc-200/10"
        >
            {currentSlide.bgImage && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <Image
                        src={currentSlide.bgImage}
                        alt={currentSlide.title || "Hero Banner"}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div
                className={`relative z-10 p-8 md:p-12 w-full max-w-2xl transition-opacity duration-300 flex flex-col items-start gap-4 ${
                    isFading ? "opacity-0" : "opacity-100"
                }`}
            >
                {currentSlide.badgeText && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs uppercase font-extrabold tracking-widest rounded-full">
                        {currentSlide.badgeText}
                    </span>
                )}
                {currentSlide.title && (
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                        {currentSlide.title}
                    </h2>
                )}
                {currentSlide.subtitle && (
                    <p className="text-zinc-300 text-sm md:text-base max-w-lg leading-relaxed">
                        {currentSlide.subtitle}
                    </p>
                )}
                <div className="flex flex-wrap gap-4 pt-2">
                    {currentSlide.primaryCtaText && currentSlide.primaryCtaUrl && (
                        <Link
                            href={currentSlide.primaryCtaUrl}
                            className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-xs font-bold uppercase tracking-wider rounded-lg"
                        >
                            {currentSlide.primaryCtaText}
                        </Link>
                    )}
                    {currentSlide.secondaryCtaText && currentSlide.secondaryCtaUrl && (
                        <Link
                            href={currentSlide.secondaryCtaUrl}
                            className="px-6 py-3 border border-zinc-500/50 hover:bg-white/10 text-white transition-all text-xs font-bold uppercase tracking-wider rounded-lg"
                        >
                            {currentSlide.secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

// 6. Hero Banner Block
export function HeroBannerBlockComponent({
    title,
    subtitle,
    badgeText,
    primaryCtaText,
    primaryCtaUrl,
    secondaryCtaText,
    secondaryCtaUrl,
    bgImage,
    height = "380px",
    style
}: any) {
    return (
        <div
            style={{ ...style, height }}
            className="relative overflow-hidden w-full rounded-2xl bg-zinc-950 flex items-center shadow-lg border border-zinc-200/10"
        >
            {bgImage && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
                    <Image
                        src={bgImage}
                        alt={title || "Banner Backdrop"}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="relative z-10 p-8 md:p-12 w-full max-w-xl flex flex-col items-start gap-4">
                {badgeText && (
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs uppercase font-bold tracking-widest rounded-full">
                        {badgeText}
                    </span>
                )}
                {title && (
                    <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                        {title}
                    </h3>
                )}
                {subtitle && (
                    <p className="text-zinc-300 text-sm leading-relaxed">
                        {subtitle}
                    </p>
                )}
                <div className="flex flex-wrap gap-3 pt-1">
                    {primaryCtaText && primaryCtaUrl && (
                        <Link
                            href={primaryCtaUrl}
                            className="px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-xs font-bold uppercase rounded-lg"
                        >
                            {primaryCtaText}
                        </Link>
                    )}
                    {secondaryCtaText && secondaryCtaUrl && (
                        <Link
                            href={secondaryCtaUrl}
                            className="px-5 py-2.5 border border-zinc-500/50 hover:bg-white/10 text-white transition-all text-xs font-bold uppercase rounded-lg"
                        >
                            {secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

// 7. Search Block
export function SearchBlockComponent({ placeholder = "Search products...", buttonText = "Find", style }: any) {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            style={style}
            className="flex w-full max-w-md bg-white border border-zinc-200 shadow-sm overflow-hidden rounded-xl"
        >
            <input
                type="text"
                placeholder={placeholder}
                className="flex-1 px-4 py-3 text-sm focus:outline-none text-zinc-800"
            />
            <button
                type="submit"
                className="px-6 bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all flex items-center justify-center gap-1.5"
            >
                <Lucide.Search className="w-3.5 h-3.5" />
                <span>{buttonText}</span>
            </button>
        </form>
    );
}

// 8. Specs Block
export function SpecsBlockComponent({ specList = [], style }: any) {
    const list = specList || [];
    if (list.length === 0) return null;
    return (
        <div
            style={style}
            className="grid grid-cols-2 gap-4 w-full border border-zinc-200/50 p-4 rounded-xl bg-background/50 backdrop-blur-sm shadow-sm text-current"
        >
            {list.map((spec: any, idx: number) => (
                <div key={idx} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">
                        {spec.label}
                    </span>
                    <span className="text-sm font-bold tracking-tight truncate">
                        {spec.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

// 9. Link Group Block
export function LinkGroupBlockComponent({ title, children, style }: any) {
    return (
        <div className="flex flex-col gap-2.5 text-current" style={style}>
            {title && (
                <h4 className="text-[13px] font-bold tracking-tight uppercase opacity-90 select-none">
                    {title}
                </h4>
            )}
            <div className="flex flex-col gap-1.5">
                {children}
            </div>
        </div>
    );
}

// 10. Link Block
export function LinkBlockComponent({ text, href, style }: any) {
    if (!text) return null;
    return (
        <Link
            href={href || "#"}
            className="text-[12px] font-medium opacity-70 hover:opacity-100 hover:underline transition-all text-current leading-normal"
            style={style}
        >
            {text}
        </Link>
    );
}

// 11. Generic Layout Container (card_box, flex_box, grid_box, split_hero_box)
export function LayoutBoxComponent({
    children,
    style,
    "box-display": boxDisplay,
    "box-direction": boxDirection,
    "box-align": boxAlign,
    "box-justify": boxJustify,
    "box-gap": boxGap,
    "box-padding": boxPadding,
    "box-radius": boxRadius,
    "box-bg": boxBg,
    "box-border": boxBorder,
    splitRatio,
    ...rest
}: any) {
    const finalStyle: React.CSSProperties = {
        display: boxDisplay || undefined,
        flexDirection: boxDirection === "col" ? "column" : boxDirection === "row" ? "row" : boxDirection || undefined,
        alignItems: boxAlign === "center" ? "center" : boxAlign === "start" ? "flex-start" : boxAlign === "end" ? "flex-end" : boxAlign || undefined,
        justifyContent: boxJustify === "center" ? "center" : boxJustify === "start" ? "flex-start" : boxJustify === "end" ? "flex-end" : boxJustify === "between" ? "space-between" : boxJustify || undefined,
        gap: boxGap || undefined,
        padding: boxPadding || undefined,
        borderRadius: boxRadius || undefined,
        backgroundColor: boxBg || undefined,
        border: boxBorder || undefined,
        ...style
    };

    if (splitRatio === "25-75") {
        return (
            <div style={{ ...finalStyle, display: "grid", gridTemplateColumns: "1fr 3fr" }} className="min-w-0 w-full">
                {children}
            </div>
        );
    }

    return (
        <div style={finalStyle} className="min-w-0">
            {children}
        </div>
    );
}

// 12. Stack Container (stack_box)
export function StackBoxComponent({ children, overlayColor, style }: any) {
    return (
        <div style={{ ...style, position: "relative" }} className="w-full overflow-hidden">
            {React.Children.map(children, (child, idx) => {
                if (idx === 0) {
                    return <div className="w-full h-full relative z-0">{child}</div>;
                }
                return (
                    <div 
                        className="absolute inset-0 flex flex-col items-center justify-center z-10" 
                        style={overlayColor ? { backgroundColor: overlayColor } : undefined}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
}

// 13. Carousel Container (carousel_box)
export function CarouselBoxComponent({ children, "auto-play": autoPlay, "interval-speed": intervalSpeed = 5000, "show-arrows": showArrows, "show-dots": showDots, style }: any) {
    const slides = React.Children.toArray(children);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (autoPlay !== "true" || slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, Number(intervalSpeed));
        return () => clearInterval(interval);
    }, [autoPlay, intervalSpeed, slides.length]);

    if (slides.length === 0) return null;

    return (
        <div style={style} className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((slide, idx) => (
                    <div key={idx} className="w-full flex-shrink-0">
                        {slide}
                    </div>
                ))}
            </div>
            {showDots === "true" && slides.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === current ? "bg-white w-4" : "bg-white/50"}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// 14. SVG Icon Element (svg_icon)
export function SvgIconComponent({ "icon-name": iconName, "icon-color": iconColor, "icon-size": iconSize, style }: any) {
    if (!iconName) return null;
    const formattedName = iconName
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
    const IconComponent = (Lucide as any)[formattedName] || (Lucide as any)[iconName] || Lucide.HelpCircle;
    const size = iconSize || "22px";
    return (
        <IconComponent
            style={{ color: iconColor, width: size, height: size, ...style }}
            className="shrink-0"
        />
    );
}

// 15. Spacer Block Element (spacer_block)
export function SpacerBlockComponent({ "spacer-height-desktop": desktopHeight, "spacer-height-mobile": mobileHeight, style }: any) {
    return (
        <div
            style={{
                ...style,
                "--spacer-desktop": desktopHeight || "24px",
                "--spacer-mobile": mobileHeight || "12px",
            } as React.CSSProperties}
            className="h-[var(--spacer-mobile)] md:h-[var(--spacer-desktop)] w-full"
        />
    );
}

// 16. Badge Element (badge_block)
export function BadgeBlockComponent({ "badge-text": badgeText, children, style, className }: any) {
    return (
        <span style={style} className={className}>
            {badgeText || children}
        </span>
    );
}

// 17. Button Block Element (button_block)
export function ButtonBlockComponent({ "button-text": buttonText, href, children, style, className, onClick }: any) {
    const label = buttonText || children || "Button";
    const baseClass = "inline-flex items-center justify-center transition-all";
    if (href) {
        return (
            <Link href={href} style={style} className={`${baseClass} ${className || ""}`} onClick={onClick}>
                {label}
            </Link>
        );
    }
    return (
        <button style={style} className={`${baseClass} ${className || ""}`} onClick={onClick}>
            {label}
        </button>
    );
}

// 18. Product Loop Context Element (product_loop_context)
export function ProductLoopContextComponent({ limit = 12, productSort = "default", style }: any) {
    const pathname = usePathname() || "";
    const searchParams = useSearchParams();
    const query = searchParams ? searchParams.get("q") || "" : "";

    const tenantInfo = useSelector((state: any) => state.editor?.tenantInfo);
    const tenant = tenantInfo?.tenant || "";
    const store = tenantInfo?.store || "";

    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const parts = pathname.split("/").filter(Boolean);
        const handle = parts[parts.length - 1];

        let fetchData = "featured";
        if (pathname.includes("/category/") || pathname.includes("/collection/") || pathname.includes("/categories/") || pathname.includes("/collections/")) {
            fetchData = `category:${handle}`;
        } else if (pathname === "/search" && query) {
            fetchData = `search:${query}`;
        }

        getProductsForContainer(fetchData, {
            tenant,
            store,
            end: limit,
        })
            .then((data) => {
                if (isMounted) {
                    setProducts(data || []);
                }
            })
            .catch((err) => {
                console.error("Error fetching products in loop:", err);
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [pathname, query, tenant, store, limit]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2 w-full" style={style}>
                {Array.from({ length: 4 }).map((_, idx) => (
                    <ProductCardSkeleton key={idx} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex align-center justify-center h-[200px] border border-dashed border-zinc-200 rounded-lg w-full" style={style}>
                <span className="text-sm text-zinc-500 m-auto">No products found.</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2 w-full" style={style}>
            {products.map((prod) => (
                <ProductCardAppDisplay key={prod.id} {...prod} />
            ))}
        </div>
    );
}
