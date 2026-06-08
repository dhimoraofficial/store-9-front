"use client";

import React from "react";

export default function ClientComponent({ content, href, variant = "body", style }: any) {
    const resolveColorStyle = (color: string | undefined) => {
        if (!color) return undefined;
        const mapping: Record<string, string> = {
            primary: "var(--gray-12)",
            secondary: "var(--gray-11)",
            muted: "var(--gray-8)",
            accent: "var(--accent-9)"
        };
        return mapping[color] || color;
    };

    const finalStyle = { ...style };
    if (finalStyle.color) {
        finalStyle.color = resolveColorStyle(finalStyle.color);
    }

    const renderContent = () => {
        switch (variant) {
            case "h6":
                return (
                    <h6 className="text-base font-bold leading-tight select-none" style={finalStyle}>
                        {content}
                    </h6>
                );
            case "overline":
                return (
                    <span className="text-[10px] tracking-wider uppercase font-semibold leading-none select-none" style={finalStyle}>
                        {content}
                    </span>
                );
            case "caption":
                return (
                    <span className="text-xs leading-normal select-none" style={finalStyle}>
                        {content}
                    </span>
                );
            case "body":
            default:
                return (
                    <p className="text-sm leading-relaxed select-none" style={finalStyle}>
                        {content}
                    </p>
                );
        }
    };

    if (href) {
        return (
            <a
                href={href}
                className="hover:underline transition-all inline-block"
                style={{ textDecoration: "none" }}
            >
                {renderContent()}
            </a>
        );
    }

    return renderContent();
}
