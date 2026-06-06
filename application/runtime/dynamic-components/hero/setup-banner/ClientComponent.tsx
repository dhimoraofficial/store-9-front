"use client";

import React from "react";
import { cx } from "../../_shared";

interface SetupBannerProps {
    theme?: "pri" | "sec" | "bg";
    height?: string;
    layoutStructure?: "split" | "stack" | "full-bleed";
    mobileShow?: "true" | "false";
    leftWidth?: string;
    leftAlign?: string;
    rightWidth?: string;
    rightAlign?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function ClientComponent({
    theme = "pri",
    height = "auto",
    layoutStructure = "split",
    mobileShow = "true",
    leftWidth = "6",
    leftAlign = "start",
    rightWidth = "6",
    rightAlign = "start",
    className = "",
    children
}: SetupBannerProps) {
    const childrenArray = React.Children.toArray(children);

    if (childrenArray.length === 0) {
        return null;
    }

    const themeClasses = {
        pri: "bg-primary text-primary-foreground border-b border-primary/20",
        sec: "bg-secondary text-secondary-foreground border-b border-secondary/20",
        bg: "bg-background text-foreground border-b border-border"
    };

    const getColSpanClass = (width: string) => {
        switch (width) {
            case "0": return "hidden";
            case "1": return "col-span-12 md:col-span-1";
            case "2": return "col-span-12 md:col-span-2";
            case "3": return "col-span-12 md:col-span-3";
            case "4": return "col-span-12 md:col-span-4";
            case "5": return "col-span-12 md:col-span-5";
            case "6": return "col-span-12 md:col-span-6";
            case "7": return "col-span-12 md:col-span-7";
            case "8": return "col-span-12 md:col-span-8";
            case "9": return "col-span-12 md:col-span-9";
            case "10": return "col-span-12 md:col-span-10";
            case "11": return "col-span-12 md:col-span-11";
            case "12": return "col-span-12 md:col-span-12";
            default:
                return "col-span-12 md:col-span-6";
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

    const getChildSlot = (child: any) => {
        return child?.props?.schema?.settings?.slot || "left";
    };

    const leftSlot = childrenArray.filter((child: any) => getChildSlot(child) === "left");
    const rightSlot = childrenArray.filter((child: any) => getChildSlot(child) === "right");

    const hasLeft = leftSlot.length > 0 && leftWidth !== "0";
    const hasRight = rightSlot.length > 0 && rightWidth !== "0";

    if (!hasLeft && !hasRight) {
        return null;
    }

    const renderSlot = (slotChildren: any[], align: string) => {
        return (
            <div className={cx(
                "flex flex-col w-full h-full gap-5",
                getAlignClass(align)
            )}>
                {slotChildren}
            </div>
        );
    };

    const customStyles: React.CSSProperties = {
        height: height || undefined
    };

    const renderGridStructure = () => {
        if (layoutStructure === "stack") {
            return (
                <div className="flex flex-col gap-10 w-full">
                    {hasLeft && (
                        <div className="w-full">
                            {renderSlot(leftSlot, leftAlign)}
                        </div>
                    )}
                    {hasRight && (
                        <div className="w-full">
                            {renderSlot(rightSlot, rightAlign)}
                        </div>
                    )}
                </div>
            );
        }

        if (layoutStructure === "full-bleed") {
            return (
                <div className="w-full text-center max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
                    {hasLeft && renderSlot(leftSlot, leftAlign)}
                    {hasRight && renderSlot(rightSlot, rightAlign)}
                </div>
            );
        }

        // Default split columns
        return (
            <div className="grid grid-cols-12 gap-10 items-center w-full">
                {hasLeft && (
                    <div className={cx(getColSpanClass(leftWidth), "w-full")}>
                        {renderSlot(leftSlot, leftAlign)}
                    </div>
                )}
                {hasRight && (
                    <div className={cx(getColSpanClass(rightWidth), "w-full")}>
                        {renderSlot(rightSlot, rightAlign)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section 
            style={customStyles}
            className={cx(
                "w-full flex items-center select-none py-12 md:py-20 overflow-hidden transition-colors duration-200",
                themeClasses[theme],
                mobileShow === "false" ? "hidden lg:flex" : "flex",
                className
            )}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
                {renderGridStructure()}
            </div>
        </section>
    );
}
