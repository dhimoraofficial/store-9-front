"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ClientComponent({ slides, autoplaySpeed = 4000, style }: any) {
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
