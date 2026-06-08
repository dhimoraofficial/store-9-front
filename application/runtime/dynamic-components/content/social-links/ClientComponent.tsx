"use client";

import React from "react";
import * as Lucide from "lucide-react";
import { cn } from "@/application/utility";

interface SocialLinksProps {
    platforms?: Array<{ platform: string; url: string }>;
    iconSize?: "small" | "medium" | "large";
    gap?: "none" | "small" | "medium" | "large";
    style?: React.CSSProperties;
}

export default function ClientComponent({
    platforms = [],
    iconSize = "medium",
    gap = "small",
    style
}: SocialLinksProps) {
    const list = platforms || [];
    if (list.length === 0) return null;

    const sizeClasses = {
        small: {
            wrapper: "w-6 h-6",
            icon: "w-3.5 h-3.5"
        },
        medium: {
            wrapper: "w-8 h-8",
            icon: "w-4.5 h-4.5"
        },
        large: {
            wrapper: "w-10 h-10",
            icon: "w-5.5 h-5.5"
        }
    };

    const gapClasses = {
        none: "gap-0",
        small: "gap-2",
        medium: "gap-4",
        large: "gap-6"
    };

    const currentSize = sizeClasses[iconSize] || sizeClasses.medium;

    return (
        <div className={cn("flex items-center", gapClasses[gap])} style={style}>
            {list.map((plat: any, idx: number) => {
                const url = plat.url || "#";
                const type = plat.platform || "facebook";
                
                let Icon: any = Lucide.Share2;
                if (type === "facebook") Icon = Lucide.Facebook;
                if (type === "instagram") Icon = Lucide.Instagram;
                if (type === "twitter" || type === "x") Icon = Lucide.Twitter;
                if (type === "youtube") Icon = Lucide.Youtube;
                if (type === "linkedin") Icon = Lucide.Linkedin;
                
                return (
                    <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "rounded-full bg-zinc-950/5 hover:bg-zinc-950/10 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center transition-all text-current border border-zinc-200/40",
                            currentSize.wrapper
                        )}
                    >
                        <Icon className={currentSize.icon} />
                    </a>
                );
            })}
        </div>
    );
}
