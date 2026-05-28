"use client"

import React from 'react';
import Link from 'next/link';
import { BaseProps } from "../type";

export interface ParsedLinkProps extends BaseProps {
    href?: string;
    target?: string;
    title?: string;
    display?: "inline" | "block" | "flex-row" | "flex-col";
    hoverBg?: "transparent" | "bg-ghost" | "bg-accent";
    hoverColor?: string;
    smoothTransition?: "true" | "false";
    analyticsId?: string;
    label?: string;
    content?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function ALink({
    href = "/",
    target = "_self",
    title,
    display = "inline",
    hoverBg = "transparent",
    smoothTransition = "false",
    analyticsId,
    label,
    content,
    children,
    style,
    id,
    className = "",
    ...props
}: ParsedLinkProps) {
    const resolvedChildren = children ?? content ?? label;

    const displayClasses: Record<string, string> = {
        "inline": "inline-block",
        "block": "block",
        "flex-row": "flex flex-row items-center",
        "flex-col": "flex flex-col"
    };

    const hoverBgClasses: Record<string, string> = {
        "transparent": "",
        "bg-ghost": "hover:bg-gray-100 dark:hover:bg-neutral-800",
        "bg-accent": "hover:bg-primary/10"
    };

    const transitionClass = smoothTransition === "true" ? "transition-all duration-200 ease-in-out" : "";

    const computedClassName = [
        displayClasses[display] || "inline-block",
        hoverBgClasses[hoverBg] || "",
        transitionClass,
        className
    ].filter(Boolean).join(" ");

    const isExternal = target === "_blank" || href.startsWith("http");

    const customStyles = {
        ...style,
        ...(props as any).hoverColor ? { "--hover-color": (props as any).hoverColor } : {}
    };

    if (isExternal) {
        return (
            <a
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={title}
                className={computedClassName}
                style={customStyles}
                data-analytics-id={analyticsId}
                {...(props as any)}
            >
                {resolvedChildren}
            </a>
        );
    }

    return (
        <Link
            id={id}
            href={href}
            target={target}
            title={title}
            className={computedClassName}
            style={customStyles}
            data-analytics-id={analyticsId}
            {...(props as any)}
        >
            {resolvedChildren}
        </Link>
    );
}

export interface ComponentTextSchemaSettings {
    as?: string;
}
