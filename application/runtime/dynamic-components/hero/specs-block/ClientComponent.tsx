"use client";

import React from "react";

export default function ClientComponent({ specList = [], style }: any) {
    const list = specList || [];
    if (list.length === 0) return null;
    return (
        <div
            style={style}
            className="grid grid-cols-2 gap-4 w-full border border-zinc-200/50 p-4 rounded-xl bg-background/50 backdrop-blur-sm shadow-sm text-current"
        >
            {list.map((spec: any, idx: number) => (
                <div key={idx} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">
                        {spec.label}
                    </span>
                    <span className="text-sm font-bold tracking-tight truncate">
                        {spec.value}
                    </span>
                </div>
            ))}
        </div>
    );
}
