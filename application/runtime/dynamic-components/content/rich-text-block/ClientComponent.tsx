"use client";

import React from "react";

export default function ClientComponent({ content, href, variant = "body", style, responsiveSize }: any) {
    const uniqueId = React.useId().replace(/:/g, "");
    const responsiveClass = `rtc-${uniqueId}`;

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

    const hasResponsive = responsiveSize && (responsiveSize.mobileSize || responsiveSize.tabletSize || responsiveSize.desktopSize);

    const renderContent = () => {
        const combinedClass = hasResponsive ? responsiveClass : "";
        switch (variant) {
            case "h6":
                return (
                    <h6 className={`${combinedClass} text-base font-bold leading-tight select-none`} style={finalStyle}>
                        {content}
                    </h6>
                );
            case "overline":
                return (
                    <span className={`${combinedClass} text-[10px] tracking-wider uppercase font-semibold leading-none select-none`} style={finalStyle}>
                        {content}
                    </span>
                );
            case "caption":
                return (
                    <span className={`${combinedClass} text-xs leading-normal select-none`} style={finalStyle}>
                        {content}
                    </span>
                );
            case "body":
            default:
                return (
                    <p className={`${combinedClass} text-sm leading-relaxed select-none`} style={finalStyle}>
                        {content}
                    </p>
                );
        }
    };

    const elementContent = renderContent();

    const output = (
        <>
            {hasResponsive && (
                <style>{`
                    .${responsiveClass} {
                        ${responsiveSize.mobileSize ? `font-size: ${responsiveSize.mobileSize} !important;` : ""}
                    }
                    @media (min-width: 640px) {
                        .${responsiveClass} {
                            ${responsiveSize.tabletSize ? `font-size: ${responsiveSize.tabletSize} !important;` : ""}
                        }
                    }
                    @media (min-width: 1024px) {
                        .${responsiveClass} {
                            ${responsiveSize.desktopSize ? `font-size: ${responsiveSize.desktopSize} !important;` : ""}
                        }
                    }
                `}</style>
            )}
            {href ? (
                <a
                    href={href}
                    className="hover:underline transition-all inline-block"
                    style={{ textDecoration: "none" }}
                >
                    {elementContent}
                </a>
            ) : (
                elementContent
            )}
        </>
    );

    return output;
}
