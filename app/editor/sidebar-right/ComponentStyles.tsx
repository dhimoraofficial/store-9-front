"use client";

import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";

interface ComponentStylesProps {
    selectedNode: ComponentSchema;
    componentSettingsMap: any;
    validationErrors: Record<string, string>;
    onUpdateSetting: (settingKey: string, val: string, settingConfig: any) => void;
}

export default function ComponentStyles({
    selectedNode,
    componentSettingsMap,
    validationErrors,
    onUpdateSetting,
}: ComponentStylesProps) {
    const [cssOpen, setCssOpen] = useState(false);

    // Helpers to manage numeric rem values for sliders
    const getRemValue = (val: string): number => {
        if (!val) return 0;
        const num = parseFloat(val);
        return isNaN(num) ? 0 : num;
    };

    const renderSliderInput = (
        label: string,
        settingKey: string,
        currentVal: string | number,
        config: any
    ) => {
        const strVal = typeof currentVal === "number" ? `${currentVal}rem` : String(currentVal || "");
        const numericVal = getRemValue(strVal);

        return (
            <div key={settingKey} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-medium text-zinc-500">{label}</span>
                    <div className="flex items-center gap-0.5 bg-zinc-50 border border-zinc-200 rounded px-1.5 py-0.5">
                        <input
                            type="text"
                            value={strVal.replace("rem", "") || "0"}
                            onChange={(e) => {
                                const clean = e.target.value.replace(/[^0-9.]/g, "");
                                onUpdateSetting(settingKey, clean ? `${clean}rem` : "", config);
                            }}
                            className="w-7 bg-transparent text-[11px] font-mono text-zinc-700 outline-none text-right"
                        />
                        <span className="text-[9px] text-zinc-400 font-mono">rem</span>
                    </div>
                </div>
                <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.25"
                    value={numericVal}
                    onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        onUpdateSetting(settingKey, val === 0 ? "" : `${val}rem`, config);
                    }}
                    className="w-full h-1 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-zinc-800"
                />
            </div>
        );
    };

    const entry = componentSettingsMap?.[selectedNode.type];
    const settings = entry ? (entry.settings || (entry.name ? null : entry)) : null;

    // Filter settings to only keep style settings (config.tp === "style")
    const styleSettings = settings
        ? Object.entries(settings).filter(([_, config]: [string, any]) => config.tp === "style")
        : [];

    return (
        <div className="p-4 space-y-5">
            {/* Padding spacing block */}
            <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Padding</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {renderSliderInput("Top", "pT", selectedNode.settings?.pT || "", componentSettingsMap.common?.pT)}
                    {renderSliderInput("Bottom", "pB", selectedNode.settings?.pB || "", componentSettingsMap.common?.pB)}
                    {renderSliderInput("Left", "pL", selectedNode.settings?.pL || "", componentSettingsMap.common?.pL)}
                    {renderSliderInput("Right", "pR", selectedNode.settings?.pR || "", componentSettingsMap.common?.pR)}
                </div>
            </div>

            <div className="h-px bg-zinc-100" />

            {/* Margin spacing block */}
            <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Margin</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {renderSliderInput("Top", "mT", selectedNode.settings?.mT || "", componentSettingsMap.common?.mT)}
                    {renderSliderInput("Bottom", "mB", selectedNode.settings?.mB || "", componentSettingsMap.common?.mB)}
                    {renderSliderInput("Left", "mL", selectedNode.settings?.mL || "", componentSettingsMap.common?.mL)}
                    {renderSliderInput("Right", "mR", selectedNode.settings?.mR || "", componentSettingsMap.common?.mR)}
                </div>
            </div>

            {/* Element Style properties section */}
            {styleSettings.length > 0 && (
                <>
                    <div className="h-px bg-zinc-100" />
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Element Styling</p>
                        <div className="space-y-4">
                            {styleSettings.map(([key, config]: [string, any]) => {
                                const currentVal = selectedNode.settings?.[key] ?? "";
                                const isColor =
                                    key.toLowerCase().includes("color") ||
                                    key.toLowerCase().includes("bg") ||
                                    (config.rgx && (config.rgx.includes("#") || config.rgx.includes("rgba")));

                                if (isColor) {
                                    return (
                                        <div key={key} className="flex items-center justify-between gap-4 py-1">
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[12px] font-semibold text-zinc-700 truncate capitalize">
                                                    {key.replace(/-/g, " ")}
                                                </span>
                                                <span className="text-[9px] font-mono text-zinc-400 mt-0.5">{config.tp}</span>
                                            </div>
                                            <div className="shrink-0 w-36">
                                                <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 hover:border-zinc-300 transition-all shadow-inner">
                                                    <div className="w-5 h-5 rounded-xl border border-zinc-300 shrink-0 overflow-hidden relative shadow-sm cursor-pointer">
                                                        <input
                                                            type="color"
                                                            value={typeof currentVal === "string" && currentVal.startsWith("#") ? currentVal : "#000000"}
                                                            onChange={(e) => onUpdateSetting(key, e.target.value, config)}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-150"
                                                        />
                                                        <div className="w-full h-full" style={{ backgroundColor: typeof currentVal === "string" ? currentVal : "#000" }} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={currentVal}
                                                        onChange={(e) => onUpdateSetting(key, e.target.value, config)}
                                                        className="w-full bg-transparent text-[11px] font-mono text-zinc-700 outline-none border-none p-0 tracking-wider text-right font-semibold"
                                                        placeholder="#000000"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={key} className="space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[12px] font-semibold text-zinc-700 capitalize">
                                                {key.replace(/-/g, " ")}
                                            </label>
                                            <span className="text-[9px] text-zinc-400 font-mono">{config.tp}</span>
                                        </div>
                                        {config.opt ? (
                                            <select
                                                value={currentVal}
                                                onChange={(e) => onUpdateSetting(key, e.target.value, config)}
                                                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-zinc-750 outline-none focus:border-zinc-400 bg-white cursor-pointer"
                                            >
                                                <option value="">(None)</option>
                                                {config.opt.map((v: string) => (
                                                    <option key={v} value={v}>{v}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={currentVal}
                                                onChange={(e) => onUpdateSetting(key, e.target.value, config)}
                                                className={`w-full border rounded-lg px-3 py-2 text-[12px] font-semibold outline-none focus:ring-1 ${
                                                    validationErrors[key]
                                                        ? "border-red-300 focus:border-red-450 focus:ring-red-100 bg-red-50/50 text-red-900"
                                                        : "border-zinc-200 focus:border-zinc-450 focus:ring-zinc-950/10 bg-white text-zinc-800"
                                                }`}
                                                placeholder="Enter style value…"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}

            <div className="h-px bg-zinc-100" />

            {/* Custom CSS text area */}
            <Collapsible.Root open={cssOpen} onOpenChange={setCssOpen}>
                <Collapsible.Trigger asChild>
                    <button className="w-full flex items-center justify-between py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 cursor-pointer outline-none">
                        <span>Custom CSS</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${cssOpen ? "rotate-180" : ""}`} />
                    </button>
                </Collapsible.Trigger>
                <Collapsible.Content className="pt-2">
                    <textarea
                        rows={4}
                        placeholder="font-weight: 700;"
                        value={selectedNode.settings?.customCss || ""}
                        onChange={(e) => onUpdateSetting("customCss", e.target.value, { tp: "style", as: "customCss" })}
                        className="w-full border border-zinc-200 rounded-lg p-2.5 text-[11px] font-mono outline-none focus:border-zinc-400 bg-zinc-50 resize-none font-semibold text-zinc-700"
                    />
                </Collapsible.Content>
            </Collapsible.Root>
        </div>
    );
}
