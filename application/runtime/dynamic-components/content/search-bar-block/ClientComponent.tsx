"use client";

import { cn } from "@/application/utility";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface SearchBarBlockProps {
    placeholder?: string;
    maxWidth?: "small" | "medium" | "large" | "full";
    style?: React.CSSProperties;
}

export default function ClientComponent({
    placeholder = "Search products...",
    maxWidth = "medium",
    style
}: SearchBarBlockProps) {
    const [searchVal, setSearchVal] = useState("");

    const searchWidthClasses = {
        small: "max-w-xs",
        medium: "max-w-md",
        large: "max-w-xl",
        full: "w-full"
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchVal);
    };

    return (
        <div 
            className={cn(
                "flex flex-grow items-center justify-center min-w-[200px] w-full", 
                searchWidthClasses[maxWidth]
            )}
            style={style}
        >
            <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-foreground rounded-full px-5 py-2 pl-11 text-xs outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 shadow-xs"
                />
                <Search className="absolute left-4 top-3 w-3.5 h-3.5 text-muted-foreground/60" />
            </form>
        </div>
    );
}
