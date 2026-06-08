"use client";

import React from "react";

export default function ClientComponent({ title, direction = "column", children, style }: any) {
    return (
        <div className="flex flex-col gap-2 text-current w-full" style={style}>
            {title && (
                <h4 className="text-[13px] font-bold tracking-tight uppercase opacity-90 select-none">
                    {title}
                </h4>
            )}
            <div className={direction === "row" ? "flex flex-row flex-wrap items-center gap-4" : "flex flex-col gap-1.5"}>
                {children}
            </div>
        </div>
    );
}
