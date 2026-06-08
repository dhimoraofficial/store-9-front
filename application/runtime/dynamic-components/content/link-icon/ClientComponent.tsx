"use client";

import React from "react";
import Link from "next/link";
import * as Lucide from "lucide-react";

export default function ClientComponent({ icon, text, href, style }: any) {
    if (!text) return null;
    const IconComponent = (icon && (Lucide as any)[icon]) || Lucide.HelpCircle;
    const body = (
        <span className="flex items-center gap-1.2 text-[12px] font-medium">
            <IconComponent className="w-3.5 h-3.5 shrink-0 opacity-80" />
            <span>{text}</span>
        </span>
    );
    if (href) {
        return (
            <Link href={href} className="hover:underline transition-all text-current" style={style}>
                {body}
            </Link>
        );
    }
    return <span className="text-current" style={style}>{body}</span>;
}
