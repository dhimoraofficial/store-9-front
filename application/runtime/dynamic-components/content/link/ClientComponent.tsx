"use client";

import React from "react";
import Link from "next/link";

export default function ClientComponent({ text, href, style }: any) {
    if (!text) return null;
    return (
        <Link
            href={href || "#"}
            className="text-[12px] font-medium opacity-70 hover:opacity-100 hover:underline transition-all text-current leading-normal"
            style={style}
        >
            {text}
        </Link>
    );
}
