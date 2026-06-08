"use client";

import React from "react";

export default function ClientComponent({ content, href, style }: any) {
    if (href) {
        return (
            <a
                href={href}
                className="hover:text-primary transition-colors inline-block text-[13px] leading-relaxed select-none hover:underline"
                style={style}
            >
                {content}
            </a>
        );
    }
    return (
        <span className="text-[13px] leading-relaxed select-none" style={style}>
            {content}
        </span>
    );
}
