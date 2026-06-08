"use client";

import { cn } from "@/application/utility";
import React from "react";

interface ContainerBlockProps {
    direction?: "column" | "row";
    width?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1" | "full" | string;
    maxWidth?: string;
    mxAuto?: "true" | "false";
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
    width = "auto",
    maxWidth = "var(--container-max-width)",
    mxAuto = "true",
    align = "stretch",
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
}: ContainerBlockProps) {
    const widthClasses = {
        "auto": "lg:w-auto flex-initial lg:min-w-[150px] max-w-full",
        "1": "lg:w-[15%] lg:flex-1 lg:min-w-[150px] max-w-full",
        "2": "lg:w-[20%] lg:flex-[2] lg:min-w-[180px] max-w-full",
        "3": "lg:w-[25%] lg:flex-[3] lg:min-w-[200px] max-w-full",
        "flex-grow": "flex-grow min-w-[150px]",
        "flex-1": "flex-1 min-w-[150px]",
        "full": "w-full min-w-0"
    };

    const alignClasses = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch"
    };

    const justifyClasses = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between"
    };

    const gapClasses = {
        none: "gap-0",
        small: "gap-2 md:gap-3",
        medium: "gap-4 md:gap-5",
        large: "gap-6 md:gap-8"
    };

    const bgClasses = {
        transparent: "bg-transparent",
        white: "bg-white border border-zinc-100",
        "slate-50": "bg-slate-50 border border-slate-100",
        "slate-100": "bg-slate-100 border border-slate-200/50",
        "zinc-900": "bg-zinc-900 text-white border border-zinc-950",
        primary: "bg-primary text-primary-foreground border border-transparent",
        secondary: "bg-secondary text-secondary-foreground border border-zinc-100"
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
    const customStyle = {
        ...style,
        ...(isCustomWidth ? { width: width, flex: `0 0 ${width}` } : {}),
        ...(maxWidth && maxWidth !== "none" ? { maxWidth } : {}),
        ...(display === "grid" ? { gridTemplateColumns: `repeat(${gridColumns || 1}, minmax(0, 1fr))` } : {})
    };

    return (
        <div
            className={cn(
                "min-w-0 transition-all duration-200 w-full",
                display === "grid" ? "grid" : "flex",
                display === "flex" && (direction === "row" ? "flex-row flex-wrap" : "flex-col"),
                mxAuto === "true" ? "mx-auto" : "",
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
