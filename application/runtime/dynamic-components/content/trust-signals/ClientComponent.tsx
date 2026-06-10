"use client";

import React from "react";
import * as Lucide from "lucide-react";

interface TrustSignalsProps {
    layoutVariant?: "classic" | "minimal" | "custom";
    signals?: Array<{ title: string; desc: string; icon: string }>;
    iconColor?: string;
    iconBgColor?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function ClientComponent({
    layoutVariant = "classic",
    signals = [],
    iconColor = "#E11D2E",
    iconBgColor = "#F3F4F6",
    style,
    children
}: TrustSignalsProps) {
    const list = signals || [];

    if (layoutVariant === "custom") {
        return (
            <div 
                className="w-full py-12 bg-white border-b border-[#E5E7EB]"
                style={style}
            >
                {children}
            </div>
        );
    }

    if (list.length === 0) return null;

    if (layoutVariant === "minimal") {
        return (
            <div 
                className="w-full py-16 bg-white border-b border-[#E5E7EB] flex flex-col items-center justify-center"
                style={style}
            >
                <div 
                    className="w-full max-w-[1280px] mx-auto px-6 md:px-16 grid gap-10 md:gap-6"
                    style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`
                    }}
                >
                    {list.map((item, idx) => {
                        const IconComponent = (item.icon && (Lucide as any)[item.icon]) || Lucide.HelpCircle;
                        return (
                            <div key={idx} className="flex flex-col items-center text-center justify-center gap-3">
                                <IconComponent size={28} style={{ color: iconColor }} />
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-base font-extrabold text-[#050505] leading-6 font-sans">
                                        {item.title}
                                    </span>
                                    <span className="text-xs text-[#6B7280] leading-4 mt-0.5 font-sans">
                                        {item.desc}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Default to 'classic' layout
    return (
        <div 
            className="w-full py-20 bg-white border-b border-[#E5E7EB] flex flex-col items-start justify-start"
            style={style}
        >
            <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-6 flex-wrap">
                {list.map((item, idx) => {
                    const IconComponent = (item.icon && (Lucide as any)[item.icon]) || Lucide.HelpCircle;
                    return (
                        <div key={idx} className="flex items-center gap-5 justify-start w-full md:w-auto">
                            <div 
                                className="p-5 rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: iconBgColor }}
                            >
                                <IconComponent size={22} style={{ color: iconColor }} />
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="text-lg font-black text-[#050505] leading-7 font-sans">
                                    {item.title}
                                </span>
                                <span className="text-sm text-[#6B7280] leading-5 font-sans">
                                    {item.desc}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
