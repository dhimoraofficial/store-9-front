"use client";

import React, { useState } from "react";
import * as Lucide from "lucide-react";

export default function ClientComponent({ title, question, answer, variant = "default", style }: any) {
    const [isOpen, setIsOpen] = useState(false);

    const variantStyles = {
        default: {
            card: "border border-slate-200 rounded-xl bg-white hover:border-slate-300 shadow-sm",
            button: "px-6 py-4 hover:bg-slate-50/50",
            body: "px-6 py-4 border-t border-slate-100 bg-slate-50/30"
        },
        minimal: {
            card: "border-b border-slate-200 bg-transparent",
            button: "py-4 hover:opacity-80",
            body: "pb-4 bg-transparent text-slate-500"
        },
        bordered: {
            card: "border-2 border-slate-900 rounded-xl bg-white hover:shadow-md",
            button: "px-6 py-4 hover:bg-slate-50/50",
            body: "px-6 py-4 border-t-2 border-slate-900 bg-slate-50/30"
        },
        soft: {
            card: "rounded-xl bg-slate-100/70 hover:bg-slate-100 transition-colors",
            button: "px-6 py-4",
            body: "px-6 pb-4 bg-transparent text-slate-600"
        }
    };

    const currentVariant = variantStyles[variant as keyof typeof variantStyles] || variantStyles.default;

    return (
        <div className="w-full flex flex-col gap-3" style={style}>
            {title && (
                <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
                    {title}
                </h3>
            )}
            <div className={`w-full overflow-hidden transition-all duration-200 ${currentVariant.card}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex justify-between items-center text-left gap-4 transition-colors focus:outline-none ${currentVariant.button}`}
                    aria-expanded={isOpen}
                >
                    <span className="font-medium text-slate-800 text-[15px] leading-snug">
                        {question || "Frequently Asked Question"}
                    </span>
                    <Lucide.ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "transform rotate-180 text-primary" : ""
                        }`}
                    />
                </button>
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[500px]" : "max-h-0"
                    }`}
                >
                    <div className={currentVariant.body}>
                        {answer || "Please enter the answer in the component settings."}
                    </div>
                </div>
            </div>
        </div>
    );
}
