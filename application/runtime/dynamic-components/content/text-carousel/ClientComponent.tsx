"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ClientComponent({ slides, autoplaySpeed = 3000, style }: any) {
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
