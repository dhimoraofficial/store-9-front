"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ClientComponent({
    slides,
    autoplaySpeed = 4000,
    showArrows = "true",
    showDots = "true",
    style
}: any) {
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
    }, [items.length, autoplaySpeed, current]);

    if (items.length === 0) return null;
    const currentSlide = items[current] || {};

    const nextSlide = () => {
        if (isFading) return;
        setIsFading(true);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % items.length);
            setIsFading(false);
        }, 300);
    };

    const prevSlide = () => {
        if (isFading) return;
        setIsFading(true);
        setTimeout(() => {
            setCurrent((prev) => (prev - 1 + items.length) % items.length);
            setIsFading(false);
        }, 300);
    };

    const goToSlide = (index: number) => {
        if (isFading || index === current) return;
        setIsFading(true);
        setTimeout(() => {
            setCurrent(index);
            setIsFading(false);
        }, 300);
    };

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

            {(showArrows === "true" || showArrows === true) && items.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-zinc-950/40 text-white hover:bg-zinc-900 border border-zinc-500/20 backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-zinc-950/40 text-white hover:bg-zinc-900 border border-zinc-500/20 backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </>
            )}

            {(showDots === "true" || showDots === true) && items.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {items.map((_: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); goToSlide(idx); }}
                            className={`h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                                idx === current ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
