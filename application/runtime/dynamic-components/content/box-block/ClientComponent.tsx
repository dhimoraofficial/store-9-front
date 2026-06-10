"use client";

import { cn } from "@/application/utility";
import React from "react";

interface BoxBlockProps {
    direction?: "column" | "row";
    wrap?: "wrap" | "nowrap";
    width?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1" | "full" | string;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between";
    gap?: "none" | "small" | "medium" | "large";
    backgroundColor?: "transparent" | "white" | "slate-50" | "slate-100" | "zinc-900" | "primary" | "secondary";
    padding?: "none" | "small" | "medium" | "large";
    display?: "flex" | "grid";
    gridColumns?: string;
    hoverEffect?: "none" | "shadow-raise" | "scale-up" | "bg-tint";
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function ClientComponent({
    direction = "column",
    wrap = "wrap",
    width = "auto",
    align = "start",
    justify = "start",
    gap = "medium",
    backgroundColor = "transparent",
    padding = "none",
    display = "flex",
    gridColumns = "1",
    hoverEffect = "none",
    className = "",
    children,
    style
}: BoxBlockProps) {
    // Width mapping matching old footer width options
    const widthClasses = {
        "auto": "w-full md:w-auto md:flex-initial lg:min-w-[150px] max-w-full",
        "1": "w-full md:w-[45%] lg:w-[15%] lg:flex-1 lg:min-w-[150px] max-w-full",
        "2": "w-full md:w-[45%] lg:w-[20%] lg:flex-[2] lg:min-w-[180px] max-w-full",
        "3": "w-full md:w-[45%] lg:w-[25%] lg:flex-[3] lg:min-w-[200px] max-w-full",
        "flex-grow": "w-full md:w-[45%] lg:w-[35%] lg:flex-grow lg:min-w-[220px] max-w-full",
        "flex-1": "w-full md:w-[45%] lg:w-[20%] lg:flex-1 lg:min-w-[180px] max-w-full",
        "full": "w-full"
    };

    const alignClasses = {
        start: "items-start text-left",
        center: "items-center text-center",
        end: "items-end text-right",
        stretch: "items-stretch"
    };

    const justifyClasses = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between"
    };

    // Responsive grid columns: 1 col on mobile, 2 on tablet, N on desktop
    // Static strings required so Tailwind includes them at build time
    const gridColClasses: Record<string, string> = {
        "1": "grid-cols-1",
        "2": "grid-cols-1 md:grid-cols-2",
        "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        "5": "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
        "6": "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        "12": "grid-cols-2 md:grid-cols-6 lg:grid-cols-12",
    };

    const gapClasses = {
        none: "gap-0",
        small: "gap-2 md:gap-3",
        medium: "gap-4 md:gap-5",
        large: "gap-4 md:gap-6"
    };

    const bgClasses = {
        transparent: "bg-transparent",
        white: "bg-white",
        "slate-50": "bg-slate-50",
        "slate-100": "bg-slate-100",
        "zinc-900": "bg-zinc-900 text-white",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground"
    };

    const paddingClasses = {
        none: "p-0",
        small: "p-2 md:p-3",
        medium: "p-4 md:p-5",
        large: "p-6 md:p-8"
    };

    const hoverClasses = {
        none: "",
        "shadow-raise": "hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out",
        "scale-up": "hover:scale-[1.02] transition-transform duration-300 ease-out",
        "bg-tint": "hover:bg-zinc-900/[0.03] dark:hover:bg-white/[0.03] transition-colors duration-300 ease-out"
    };

    const isCustomWidth = typeof width === "string" && /^\d+(\.\d+)?rem$/.test(width);
    const isCustomGridCols = display === "grid" && gridColumns && !gridColClasses[gridColumns];
    const customStyle = {
        ...style,
        ...(isCustomWidth ? { width: width, flex: `0 0 ${width}` } : {}),
        // Fallback for non-standard column counts not in the responsive lookup table
        ...(isCustomGridCols ? { gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` } : {}),
    };

    return (
        <div
            className={cn(
                "min-w-0 transition-all duration-200",
                display === "grid" ? "grid" : "flex",
                display === "grid" && (gridColClasses[gridColumns] || ""),
                display === "flex" && (direction === "row"
                    ? (wrap === "nowrap" ? "flex-row flex-nowrap" : "flex-row flex-wrap")
                    : "flex-col"),
                widthClasses[width as keyof typeof widthClasses] || "",
                alignClasses[align],
                justifyClasses[justify],
                gapClasses[gap],
                bgClasses[backgroundColor],
                paddingClasses[padding],
                hoverClasses[hoverEffect],
                className
            )}
            style={customStyle}
        >
            {children}
        </div>
    );
}
