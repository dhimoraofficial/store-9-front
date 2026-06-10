"use client";

import React from "react";
import { cn } from "@/application/utility";

interface Brand {
    name: string;
    logoUrl?: string;
}

interface BrandMarqueeProps {
    brands?: Brand[];
    scrollSpeed?: "slow" | "medium" | "fast";
    opacity?: number;
    fontFamily?: "monospace" | "sans-serif" | "serif";
    backgroundColor?: string;
    textColor?: string;
    style?: React.CSSProperties;
}

export default function ClientComponent({
    brands = [],
    scrollSpeed = "medium",
    opacity = 0.3,
    fontFamily = "monospace",
    backgroundColor = "#F3F4F6",
    textColor = "#6B7280",
    style
}: BrandMarqueeProps) {
    const items: Brand[] = brands.length > 0 ? brands : [
        { name: "ASUS" }, { name: "HP" }, { name: "LENOVO" }, { name: "ACER" },
        { name: "DELL" }, { name: "MSI" }, { name: "APPLE" }, { name: "RAZER" }
    ];

    // Duplicate list to ensure seamless infinite loop on any screen width
    const displayList = [...items, ...items];

    const animDuration = {
        slow: "40s",
        medium: "25s",
        fast: "15s"
    }[scrollSpeed] ?? "25s";

    const fontClass = {
        monospace: "font-mono tracking-[6px] font-black text-xl uppercase",
        "sans-serif": "font-sans font-bold tracking-widest text-lg uppercase",
        serif: "font-serif font-semibold text-lg"
    }[fontFamily] ?? "font-mono tracking-[6px] font-black text-xl uppercase";

    return (
        <div
            className="w-full overflow-hidden border-b border-zinc-200/50 py-10 select-none"
            style={{ backgroundColor, ...style }}
        >
            <div className="flex w-max">
                <div
                    className={cn("flex shrink-0 items-center gap-24 px-12 brand-marquee-track")}
                    style={{ animationDuration: animDuration }}
                >
                    {displayList.map((brand, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "flex items-center justify-center shrink-0 transition-opacity hover:opacity-60",
                                fontClass
                            )}
                            style={{ opacity, color: textColor }}
                        >
                            {brand.logoUrl ? (
                                <img
                                    src={brand.logoUrl}
                                    alt={brand.name}
                                    className="h-7 w-auto object-contain"
                                    style={{ opacity: 1 }}
                                />
                            ) : (
                                <span>{brand.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
