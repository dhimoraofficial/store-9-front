import React from "react";
import { BaseProps } from "../type";

export interface ParsedTextProps extends BaseProps {
    element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong";
    overflow?: "clip" | "ellipsis" | "truncate-2-lines";
    hoverEffect?: "none" | "underline" | "color-change";
    label?: string;
    content?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function AText({
    element: Tag = "p",
    overflow = "clip",
    hoverEffect = "none",
    label,
    content,
    children,
    style,
    id,
    className = "",
}: ParsedTextProps) {
    const overflowClasses: Record<string, string> = {
        "clip": "",
        "ellipsis": "truncate",
        "truncate-2-lines": "line-clamp-2"
    };

    const hoverClasses: Record<string, string> = {
        "none": "",
        "underline": "hover:underline",
        "color-change": "hover:text-primary transition-colors"
    };

    const computedClassName = [
        overflowClasses[overflow] || "",
        hoverClasses[hoverEffect] || "",
        className
    ].filter(Boolean).join(" ");

    const resolvedChildren = children ?? content ?? label;

    return (
        <Tag id={id} className={computedClassName} style={style}>
            {resolvedChildren}
        </Tag>
    );
}

export interface ComponentTextSchemaSettings {
    // Basic types for backward compatibility
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label"
}
