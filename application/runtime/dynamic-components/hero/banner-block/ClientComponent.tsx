"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ClientComponent({
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
