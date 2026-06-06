"use client";

import React from "react";
import { useSelector } from "react-redux";
import { cx } from "../../_shared";

interface FooterProps {
    theme?: "light" | "dark" | "slate";
    copyright?: string;
    col1Width?: string;
    col1Align?: string;
    col2Width?: string;
    col2Align?: string;
    col3Width?: string;
    col3Align?: string;
    col4Width?: string;
    col4Align?: string;
    col5Width?: string;
    col5Align?: string;
    bottomLeftWidth?: string;
    bottomLeftAlign?: string;
    bottomRightWidth?: string;
    bottomRightAlign?: string;
    className?: string;
    mobileGridColumns?: "1" | "2";
    mobileAlignment?: "inherit" | "center" | "left";
    children?: React.ReactNode;
}

export default function ClientComponent({
    theme = "light",
    copyright = "",
    col1Width = "flex-grow",
    col1Align = "start",
    col2Width = "auto",
    col2Align = "start",
    col3Width = "auto",
    col3Align = "start",
    col4Width = "flex-grow",
    col4Align = "start",
    col5Width = "auto",
    col5Align = "start",
    bottomLeftWidth = "auto",
    bottomLeftAlign = "start",
    bottomRightWidth = "auto",
    bottomRightAlign = "end",
    className = "",
    mobileGridColumns = "1",
    mobileAlignment = "inherit",
    children
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

    const getChildSlot = (child: any) => {
        return child?.props?.schema?.settings?.slot || "col1";
    };

    const col1Slot = childrenArray.filter((c: any) => getChildSlot(c) === "col1");
    const col2Slot = childrenArray.filter((c: any) => getChildSlot(c) === "col2");
    const col3Slot = childrenArray.filter((c: any) => getChildSlot(c) === "col3");
    const col4Slot = childrenArray.filter((c: any) => getChildSlot(c) === "col4");
    const col5Slot = childrenArray.filter((c: any) => getChildSlot(c) === "col5");
    const bottomLeftSlot = childrenArray.filter((c: any) => getChildSlot(c) === "bottomLeft");
    const bottomRightSlot = childrenArray.filter((c: any) => getChildSlot(c) === "bottomRight");

    const getWidthClass = (width: string) => {
        switch (width) {
            case "1": return "lg:w-[15%] lg:flex-1 min-w-[150px] max-w-full";
            case "2": return "lg:w-[20%] lg:flex-[2] min-w-[180px] max-w-full";
            case "3": return "lg:w-[25%] lg:flex-[3] min-w-[200px] max-w-full";
            case "flex-grow": return "lg:w-[35%] lg:flex-grow min-w-[220px] max-w-full";
            case "flex-1": return "lg:w-[20%] lg:flex-1 min-w-[180px] max-w-full";
            case "auto":
            default:
                return "lg:w-auto flex-initial min-w-[150px] max-w-full";
        }
    };

    const getAlignClass = (align: string) => {
        switch (align) {
            case "center": return "items-center text-center justify-center";
            case "end": return "items-end text-right justify-end";
            case "between": return "justify-between";
            case "start":
            default:
                return "items-start text-left justify-start";
        }
    };

    const renderSlot = (slotChildren: any[], width: string, align: string, fallbackNode?: React.ReactNode) => {
        const hasChildren = slotChildren.length > 0;
        
        const alignmentStyles = align === "center" 
            ? "[&_.inherit-align]:items-center [&_.inherit-align]:text-center [&_.justify-inherit]:justify-center" 
            : align === "end" 
                ? "[&_.inherit-align]:items-end [&_.inherit-align]:text-right [&_.justify-inherit]:justify-end" 
                : "[&_.inherit-align]:items-start [&_.inherit-align]:text-left [&_.justify-inherit]:justify-start";

        const mobileAlignOverride = mobileAlignment === "center"
            ? "max-lg:items-center max-lg:text-center max-lg:justify-center [&_.inherit-align]:max-lg:items-center [&_.inherit-align]:max-lg:text-center [&_.justify-inherit]:max-lg:justify-center"
            : mobileAlignment === "left"
                ? "max-lg:items-start max-lg:text-left max-lg:justify-start [&_.inherit-align]:max-lg:items-start [&_.inherit-align]:max-lg:text-left [&_.justify-inherit]:max-lg:justify-start"
                : "";

        if (!hasChildren) {
            return fallbackNode ? (
                <div className={cx("flex flex-col gap-4 min-w-0", getWidthClass(width), getAlignClass(align), alignmentStyles, mobileAlignOverride)}>
                    {fallbackNode}
                </div>
            ) : null;
        }

        return (
            <div className={cx("flex flex-col gap-4 min-w-0", getWidthClass(width), getAlignClass(align), alignmentStyles, mobileAlignOverride)}>
                {slotChildren}
            </div>
        );
    };

    const showCol1 = col1Slot.length > 0;
    const showCol2 = col2Slot.length > 0;
    const showCol3 = col3Slot.length > 0;
    const showCol4 = col4Slot.length > 0;
    const showCol5 = col5Slot.length > 0;

    return (
        <footer className={cx("w-full border-t py-12 md:py-16 transition-colors duration-200", themeClasses[theme], className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Main dynamic layout columns grid */}
                <div className={cx(
                    mobileGridColumns === "2"
                        ? "grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-8 lg:gap-10 justify-between w-full"
                        : "flex flex-col lg:flex-row gap-8 lg:gap-10 flex-wrap justify-between"
                )}>
                    {showCol1 && renderSlot(col1Slot, col1Width, col1Align)}
                    {showCol2 && renderSlot(col2Slot, col2Width, col2Align)}
                    {showCol3 && renderSlot(col3Slot, col3Width, col3Align)}
                    {showCol4 && renderSlot(col4Slot, col4Width, col4Align)}
                    {showCol5 && renderSlot(col5Slot, col5Width, col5Align)}
                </div>

                {/* Bottom Bar Compact Zone */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-inherit">
                    {renderSlot(
                        bottomLeftSlot, 
                        bottomLeftWidth, 
                        bottomLeftAlign, 
                        <p className={cx("text-xs", textMutedClasses[theme])}>{copyright}</p>
                    )}
                    {renderSlot(
                        bottomRightSlot, 
                        bottomRightWidth, 
                        bottomRightAlign
                    )}
                </div>

            </div>
        </footer>
    );
}
