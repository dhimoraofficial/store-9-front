"use client"

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { BaseProps } from "../type";

export interface ParsedCarouselBoxProps extends BaseProps {
    children?: ReactNode;
    autoPlay?: "true" | "false";
    intervalSpeed?: string;
    showArrows?: "true" | "false";
    showDots?: "true" | "false";
    overflowBehavior?: "free-scroll" | "snap-to-slide";
}

export default function ACarouselBox({
    children,
    autoPlay = "false",
    intervalSpeed = "3000",
    showArrows = "true",
    showDots = "true",
    overflowBehavior = "snap-to-slide",
    style,
    id,
    className = ""
}: ParsedCarouselBoxProps) {
    const childrenArray = React.Children.toArray(children);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const isAutoPlay = autoPlay === "true";
    const speed = parseInt(intervalSpeed, 10) || 3000;
    const isSnap = overflowBehavior === "snap-to-slide";

    useEffect(() => {
        if (!isAutoPlay || childrenArray.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % childrenArray.length);
        }, speed);

        return () => clearInterval(interval);
    }, [isAutoPlay, speed, childrenArray.length]);

    useEffect(() => {
        if (scrollContainerRef.current && isSnap) {
            const container = scrollContainerRef.current;
            const slideWidth = container.clientWidth;
            container.scrollTo({
                left: currentIndex * slideWidth,
                behavior: "smooth"
            });
        }
    }, [currentIndex, isSnap]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? childrenArray.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === childrenArray.length - 1 ? 0 : prev + 1));
    };

    const computedClassName = [
        "relative w-full overflow-hidden",
        className
    ].filter(Boolean).join(" ");

    return (
        <div id={id} className={computedClassName} style={style}>
            <div
                ref={scrollContainerRef}
                className={`flex w-full overflow-x-auto scrollbar-none ${
                    isSnap ? "snap-x snap-mandatory scroll-smooth" : "scroll-auto"
                }`}
                style={{ scrollbarWidth: "none" }}
            >
                {childrenArray.map((child, index) => (
                    <div
                        key={index}
                        className={`w-full flex-shrink-0 ${
                            isSnap ? "snap-start snap-always" : ""
                        }`}
                    >
                        {child}
                    </div>
                ))}
            </div>

            {showArrows === "true" && childrenArray.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-md text-gray-800 dark:text-white transition-all z-10"
                        aria-label="Previous slide"
                    >
                        ❮
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-md text-gray-800 dark:text-white transition-all z-10"
                        aria-label="Next slide"
                    >
                        ❯
                    </button>
                </>
            )}

            {showDots === "true" && childrenArray.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {childrenArray.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                currentIndex === index
                                    ? "bg-primary w-4"
                                    : "bg-gray-400/65"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
