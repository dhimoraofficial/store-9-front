"use client";

import { cn } from "@/application/utility";
import React from "react";

interface BoxBlockProps {
    direction?: "column" | "row";
    width?: "auto" | "1" | "2" | "3" | "flex-grow" | "flex-1" | "full" | string;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between";
    gap?: "none" | "small" | "medium" | "large";
    backgroundColor?: "transparent" | "white" | "slate-50" | "slate-100" | "zinc-900";
    padding?: "none" | "small" | "medium" | "large";
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function ClientComponent({
    direction = "column",
    width = "auto",
    align = "start",
    justify = "start",
    gap = "medium",
    backgroundColor = "transparent",
    padding = "none",
    className = "",
    children,
    style
}: BoxBlockProps) {
    // Width mapping matching old footer width options
    const widthClasses = {
        "auto": "lg:w-auto flex-initial lg:min-w-[150px] max-w-full",
        "1": "lg:w-[15%] lg:flex-1 lg:min-w-[150px] max-w-full",
        "2": "lg:w-[20%] lg:flex-[2] lg:min-w-[180px] max-w-full",
        "3": "lg:w-[25%] lg:flex-[3] lg:min-w-[200px] max-w-full",
        "flex-grow": "lg:w-[35%] lg:flex-grow lg:min-w-[220px] max-w-full",
        "flex-1": "lg:w-[20%] lg:flex-1 lg:min-w-[180px] max-w-full",
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

    const gapClasses = {
        none: "gap-0",
        small: "gap-2",
        medium: "gap-4",
        large: "gap-6"
    };

    const bgClasses = {
        transparent: "bg-transparent",
        white: "bg-white",
        "slate-50": "bg-slate-50",
        "slate-100": "bg-slate-100",
        "zinc-900": "bg-zinc-900 text-white"
    };

    const paddingClasses = {
        none: "p-0",
        small: "p-2 md:p-3",
        medium: "p-4 md:p-5",
        large: "p-6 md:p-8"
    };

    const isCustomWidth = typeof width === "string" && /^\d+(\.\d+)?rem$/.test(width);
    const customStyle = {
        ...style,
        ...(isCustomWidth ? { width: width, flex: `0 0 ${width}` } : {})
    };

    return (
        <div
            className={cn(
                "flex min-w-0 transition-all duration-200",
                direction === "row" ? "flex-row flex-wrap" : "flex-col",
                widthClasses[width as keyof typeof widthClasses] || "",
                alignClasses[align],
                justifyClasses[justify],
                gapClasses[gap],
                bgClasses[backgroundColor],
                paddingClasses[padding],
                className
            )}
            style={customStyle}
        >
            {children}
        </div>
    );
}
