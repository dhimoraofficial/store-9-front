"use client";

import { cn } from "@/application/utility";
import React from "react";
import { useSelector } from "react-redux";

interface FooterProps {
    theme?: "light" | "dark" | "slate";
    copyright?: string;
    className?: string;
    mobileGridColumns?: "1" | "2";
    mobileAlignment?: "inherit" | "center" | "left";
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function ClientComponent({
    theme = "light",
    copyright = "",
    className = "",
    mobileGridColumns = "1",
    mobileAlignment = "inherit",
    children,
    style
}: FooterProps) {
    const tenantInfo = useSelector((state: any) => state.editor?.tenantInfo);
    const childrenArray = React.Children.toArray(children);

    // Color theme mappings
    const themeClasses = {
        light: "bg-slate-50 text-slate-800 border-slate-200",
        dark: "bg-slate-950 text-slate-300 border-slate-900",
        slate: "bg-slate-900 text-slate-200 border-slate-800"
    };

    const textMutedClasses = {
        light: "text-slate-500",
        dark: "text-slate-400",
        slate: "text-slate-400"
    };

    // Filter children for bottom bar vs main grid (supporting legacy bottom bar slots)
    const getChildSlot = (child: any) => {
        return child?.props?.schema?.settings?.slot;
    };

    const bottomLeftChildren = childrenArray.filter((c: any) => getChildSlot(c) === "bottomLeft");
    const bottomRightChildren = childrenArray.filter((c: any) => getChildSlot(c) === "bottomRight");
    
    // Main columns are everything else
    const mainColumns = childrenArray.filter((c: any) => {
        const slot = getChildSlot(c);
        return slot !== "bottomLeft" && slot !== "bottomRight";
    });

    const mobileAlignOverride = mobileAlignment === "center"
        ? "max-lg:items-center max-lg:text-center max-lg:justify-center [&_.inherit-align]:max-lg:items-center [&_.inherit-align]:max-lg:text-center [&_.justify-inherit]:max-lg:justify-center"
        : mobileAlignment === "left"
            ? "max-lg:items-start max-lg:text-left max-lg:justify-start [&_.inherit-align]:max-lg:items-start [&_.inherit-align]:max-lg:text-left [&_.justify-inherit]:max-lg:justify-start"
            : "";

    return (
        <footer 
            className={cn("w-full border-t py-12 md:py-16 transition-colors duration-200", themeClasses[theme], className)}
            style={style}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Main columns grid (rendered sequentially) */}
                <div className={cn(
                    mobileGridColumns === "2"
                        ? "grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-8 lg:gap-10 justify-between w-full"
                        : "flex flex-col lg:flex-row gap-8 lg:gap-10 lg:flex-wrap justify-between w-full"
                )}>
                    {mainColumns}
                </div>

                {/* Bottom Bar zone */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-inherit">
                    {/* Bottom Left: fallback to copyright notice if empty */}
                    <div className={cn("flex flex-col gap-2 min-w-0 items-start text-left justify-start", mobileAlignOverride)}>
                        {bottomLeftChildren.length > 0 ? (
                            bottomLeftChildren
                        ) : (
                            <p className={cn("text-xs font-medium", textMutedClasses[theme])}>{copyright}</p>
                        )}
                    </div>
                    {/* Bottom Right */}
                    {bottomRightChildren.length > 0 && (
                        <div className={cn("flex flex-col gap-2 min-w-0 items-end text-right justify-end", mobileAlignOverride)}>
                            {bottomRightChildren}
                        </div>
                    )}
                </div>

            </div>
        </footer>
    );
}
