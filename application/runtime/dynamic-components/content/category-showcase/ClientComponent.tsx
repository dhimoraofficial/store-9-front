"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/application/utility";

interface Category {
    name: string;
    image?: string;
    href?: string;
}

interface CategoryShowcaseProps {
    eyebrow?: string;
    heading?: string;
    categories?: Category[];
    circleSize?: number;
    circleBg?: string;
    circleBorder?: string;
    labelColor?: string;
    style?: React.CSSProperties;
}

export default function ClientComponent({
    eyebrow = "EXPLORE COLLECTIONS",
    heading = "Shop by Category",
    categories = [],
    circleSize = 144,
    circleBg = "#F3F4F6",
    circleBorder = "1px solid #E5E7EB",
    labelColor = "#10112F",
    style
}: CategoryShowcaseProps) {
    const items: Category[] = categories.length > 0 ? categories : [
        { name: "Laptops",     href: "/category/laptops" },
        { name: "Gaming PCs",  href: "/category/gaming-pcs" },
        { name: "Wearables",   href: "/category/wearables" },
        { name: "Accessories", href: "/category/accessories" }
    ];

    const imgSize = Math.round(circleSize * 0.54); // ~54% of circle

    return (
        <div
            className="w-full"
            style={{
                paddingTop: "clamp(40px, 8vw, 96px)",
                paddingBottom: "clamp(40px, 8vw, 96px)",
                background: "white",
                ...style
            }}
        >
            {/* Container */}
            <div className="w-full max-w-[var(--container-max-width)] mx-auto px-4 md:px-8 lg:px-16 flex flex-col gap-12 md:gap-16">

                {/* Section header */}
                <div className="flex flex-col items-center gap-3 text-center">
                    {eyebrow && (
                        <span style={{
                            color: "#E11D2E",
                            fontFamily: "JetBrains Mono, monospace",
                            fontWeight: 900,
                            fontSize: 12,
                            letterSpacing: "1.2px",
                            textTransform: "uppercase"
                        }}>
                            {eyebrow}
                        </span>
                    )}
                    {heading && (
                        <h2 style={{
                            color: "#050505",
                            fontFamily: "Hanken Grotesk, sans-serif",
                            fontWeight: 900,
                            fontSize: "clamp(24px, 4vw, 32px)",
                            lineHeight: 1.25
                        }}>
                            {heading}
                        </h2>
                    )}
                </div>

                {/* Category grid */}
                <div className="flex flex-row flex-wrap justify-center gap-8 md:gap-12 lg:gap-20 w-full">
                    {items.map((cat, idx) => {
                        const inner = (
                            <div className={cn(
                                "flex flex-col items-center gap-4 group",
                                cat.href ? "cursor-pointer" : ""
                            )}>
                                {/* Circle */}
                                <div
                                    className="flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                                    style={{
                                        width: circleSize,
                                        height: circleSize,
                                        borderRadius: 9999,
                                        background: circleBg,
                                        outline: circleBorder,
                                        outlineOffset: "-1px"
                                    }}
                                >
                                    {cat.image ? (
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            style={{
                                                width: imgSize,
                                                height: imgSize,
                                                objectFit: "contain"
                                            }}
                                        />
                                    ) : (
                                        <div style={{ width: imgSize, height: imgSize, background: "rgba(0,0,0,0.06)", borderRadius: 8 }} />
                                    )}
                                </div>

                                {/* Label */}
                                <span style={{
                                    color: labelColor,
                                    fontFamily: "JetBrains Mono, monospace",
                                    fontWeight: 900,
                                    fontSize: 12,
                                    letterSpacing: "1.2px",
                                    textTransform: "uppercase"
                                }}>
                                    {cat.name}
                                </span>
                            </div>
                        );

                        return cat.href ? (
                            <Link key={idx} href={cat.href} className="no-underline">
                                {inner}
                            </Link>
                        ) : (
                            <div key={idx}>{inner}</div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
