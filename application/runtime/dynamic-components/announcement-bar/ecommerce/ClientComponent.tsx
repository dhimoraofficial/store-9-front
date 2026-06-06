"use client";

import React from "react";
import { cx } from "../../_shared";

interface AnnouncementBarProps {
    theme?: "pri" | "sec" | "bg";
    fontSize?: "xs" | "sm" | "base";
    fontWeight?: "normal" | "medium" | "semibold" | "bold";
    height?: string;
    mobileShow?: "true" | "false";
    layout?: "1-column" | "3-column";
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function ClientComponent({
    theme = "pri",
    fontSize = "xs",
    fontWeight = "normal",
    height = "36px",
    mobileShow = "true",
    layout = "3-column",
    className = "",
    children,
    style
}: AnnouncementBarProps) {
    const childrenArray = React.Children.toArray(children);

    if (childrenArray.length === 0) {
        return null;
    }

    const themeClasses = {
        pri: "bg-primary text-primary-foreground border-b border-primary/20",
        sec: "bg-secondary text-secondary-foreground border-b border-secondary/20",
        bg: "bg-background text-foreground border-b border-border"
    };

    const fontSizeClasses = {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base"
    };

    const fontWeightClasses = {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold"
    };

    const getChildSlot = (child: any) => {
        return child?.props?.schema?.settings?.slot || "center";
    };

    const customStyles: React.CSSProperties = {
        height: height || undefined,
        ...style
    };

    if (layout === "1-column") {
        const centerSlot = childrenArray.filter(
            (child: any) => getChildSlot(child) === "center" || !child?.props?.schema?.settings?.slot
        );

        return (
            <div
                style={customStyles}
                className={cx(
                    "w-full flex items-center select-none z-50 transition-colors duration-200 overflow-hidden",
                    themeClasses[theme],
                    fontSizeClasses[fontSize],
                    fontWeightClasses[fontWeight],
                    mobileShow === "false" ? "hidden lg:flex" : "flex",
                    className
                )}
            >
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center gap-4">
                    {centerSlot}
                </div>
            </div>
        );
    }

    // 3-column layout
    const leftSlot = childrenArray.filter((child: any) => getChildSlot(child) === "left");
    const middleSlot = childrenArray.filter((child: any) => getChildSlot(child) === "middle" || getChildSlot(child) === "center");
    const rightSlot = childrenArray.filter((child: any) => getChildSlot(child) === "right");

    return (
        <div
            style={customStyles}
            className={cx(
                "w-full flex items-center select-none z-50 transition-colors duration-200 overflow-hidden",
                themeClasses[theme],
                fontSizeClasses[fontSize],
                fontWeightClasses[fontWeight],
                mobileShow === "false" ? "hidden lg:flex" : "flex",
                className
            )}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full w-full gap-4">
                    {/* Left Slot */}
                    <div className="hidden md:flex items-center h-full gap-4 justify-start">
                        {leftSlot}
                    </div>

                    {/* Middle Slot */}
                    <div className="flex-1 flex items-center h-full gap-4 justify-center">
                        {middleSlot}
                    </div>

                    {/* Right Slot */}
                    <div className="hidden md:flex items-center h-full gap-4 justify-end">
                        {rightSlot}
                    </div>
                </div>
            </div>
        </div>
    );
}
