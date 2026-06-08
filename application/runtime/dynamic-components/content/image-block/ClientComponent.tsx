"use client";

import { cn } from "@/application/utility";
import React from "react";

interface ImageBlockProps {
    src?: string;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ClientComponent({
    src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    alt = "Asset image",
    className = "",
    style
}: ImageBlockProps) {
    return (
        <div
            className={cn("w-full overflow-hidden min-w-0 transition-all duration-200", className)}
            style={{
                display: "block",
                position: "relative",
                width: style?.width || "100%",
                ...style
            }}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-center"
                style={{
                    objectFit: style?.objectFit || "cover",
                    aspectRatio: style?.aspectRatio || "auto"
                }}
            />
        </div>
    );
}
