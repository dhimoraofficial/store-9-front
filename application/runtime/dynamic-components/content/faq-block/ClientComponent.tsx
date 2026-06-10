"use client";

import React, { useState } from "react";
import * as Lucide from "lucide-react";

export default function ClientComponent({ title, question, answer, style }: any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full flex flex-col gap-3" style={style}>
            {title && (
                <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
                    {title}
                </h3>
            )}
            <div className="w-full border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-200 hover:border-slate-300 shadow-sm">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left gap-4 hover:bg-slate-50/50 transition-colors focus:outline-none"
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
                        isOpen ? "max-h-[500px] border-t border-slate-100" : "max-h-0"
                    }`}
                >
                    <div className="px-6 py-4 text-[14px] text-slate-600 leading-relaxed bg-slate-50/30">
                        {answer || "Please enter the answer in the component settings."}
                    </div>
                </div>
            </div>
        </div>
    );
}
