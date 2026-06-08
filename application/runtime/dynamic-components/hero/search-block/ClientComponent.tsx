"use client";

import React from "react";
import * as Lucide from "lucide-react";

export default function ClientComponent({ placeholder = "Search products...", buttonText = "Find", style }: any) {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            style={style}
            className="flex w-full max-w-md bg-white border border-zinc-200 shadow-sm overflow-hidden rounded-xl"
        >
            <input
                type="text"
                placeholder={placeholder}
                className="flex-1 px-4 py-3 text-sm focus:outline-none text-zinc-800"
            />
            <button
                type="submit"
                className="px-6 bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all flex items-center justify-center gap-1.5"
            >
                <Lucide.Search className="w-3.5 h-3.5" />
                <span>{buttonText}</span>
            </button>
        </form>
    );
}
