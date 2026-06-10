"use client";

import React from "react";
import { useSelector } from "react-redux";

interface LogoBlockProps {
    logoSrc?: string;
    logoHeight?: string;
    brandName?: string;
    brandSlogan?: string;
    style?: React.CSSProperties;
}

export default function ClientComponent({
    logoSrc = "",
    logoHeight = "40px",
    brandName = "",
    brandSlogan = "",
    style
}: LogoBlockProps) {
    const tenantInfo = useSelector((state: any) => state.editor?.tenantInfo);

    const sanitizeBrandName = (name: string) => {
        if (!name) return "";
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(name.trim())) {
            return "";
        }
        return name;
    };

    const getCleanBrandName = () => {
        return sanitizeBrandName(brandName) || sanitizeBrandName(tenantInfo?.store);
    };

    const getCleanBrandSlogan = () => {
        return sanitizeBrandName(brandSlogan) || "";
    };

    const cleanName = getCleanBrandName();
    const cleanSlogan = getCleanBrandSlogan();

    return (
        <a href="/" className="flex items-center gap-2 flex-shrink-0 group max-w-[220px] overflow-hidden" style={style}>
            {logoSrc ? (
                <img
                    src={logoSrc}
                    alt={cleanName}
                    style={{ height: logoHeight }}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
            ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-extrabold shadow-sm transition-transform duration-300 group-hover:rotate-6 flex-shrink-0">
                    {cleanName ? cleanName.charAt(0) : "S"}
                </div>
            )}
            
            {(cleanName || cleanSlogan) && (
                <div className="flex flex-col leading-tight min-w-0">
                    {cleanName && (
                        <span className="text-base font-bold text-foreground tracking-tight uppercase group-hover:text-indigo-600 transition-colors truncate">
                            {cleanName}
                        </span>
                    )}
                    {cleanSlogan && (
                        <span className="text-[9px] text-muted-foreground font-semibold tracking-wider uppercase truncate">
                            {cleanSlogan.toUpperCase()}
                        </span>
                    )}
                </div>
            )}
        </a>
    );
}
