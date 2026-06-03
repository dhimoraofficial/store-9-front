"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";

interface ComponentStylesProps {
    selectedNode: ComponentSchema;
    componentSettingsMap: any;
    validationErrors: Record<string, string>;
    onUpdateSetting: (settingKey: string, val: string, settingConfig: any) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-sans mb-2">
            {children}
        </p>
    );
}

export default function ComponentStyles({
    selectedNode,
    componentSettingsMap,
    validationErrors,
    onUpdateSetting,
}: ComponentStylesProps) {
    const entry = componentSettingsMap?.[selectedNode.type];
    const settings = entry ? (entry.settings || (entry.name ? null : entry)) : null;

    const styleSettings = settings
        ? Object.entries(settings).filter(([_, config]: [string, any]) => config.tp === "style")
        : [];

    const renderInput = (label: string, settingKey: string, config: any) => {
        if (!config) return null;
        const activeConfig = Array.isArray(config) ? config[0] : config;
        const currentVal = selectedNode.settings?.[settingKey] ?? "";
        const hasError = !!validationErrors[settingKey];
        const hasOptions = activeConfig?.opt && activeConfig.opt.length > 0;

        return (
            <div key={settingKey} className="space-y-0.5 font-sans">
                <label className="text-[10.5px] font-medium text-zinc-500 font-sans block capitalize">
                    {label}
                </label>
                <div className={`relative flex items-center bg-white border rounded-md transition-all ${
                    hasError ? "border-red-300 bg-red-50/30" : "border-zinc-200 focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-900/10"
                }`}>
                    <input
                        type="text"
                        value={String(currentVal)}
                        onChange={(e) => onUpdateSetting(settingKey, e.target.value, config)}
                        className="w-full bg-transparent text-[11.5px] font-mono text-zinc-800 outline-none px-2.5 py-1.5 font-sans leading-none"
                        style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace" }}
                        placeholder={activeConfig?.rgx ? "e.g. 100%, auto" : "—"}
                    />
                    {hasOptions && (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="shrink-0 px-1.5 py-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer outline-none border-l border-zinc-200 rounded-r-md">
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    align="end"
                                    sideOffset={4}
                                    className="z-[100] min-w-[120px] bg-white border border-zinc-200 rounded-md shadow-lg p-1 outline-none font-sans text-[11.5px]"
                                >
                                    {activeConfig.opt.map((optVal: string) => (
                                        <DropdownMenu.Item
                                            key={optVal}
                                            onSelect={() => onUpdateSetting(settingKey, optVal, config)}
                                            className={`px-2.5 py-1.5 rounded-md cursor-pointer outline-none transition-colors font-mono ${
                                                currentVal === optVal
                                                    ? "bg-zinc-900 text-white"
                                                    : "text-zinc-700 hover:bg-zinc-100"
                                            }`}
                                        >
                                            {optVal}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    )}
                </div>
                {hasError && (
                    <p className="text-[10px] text-red-500 font-sans mt-0.5">{validationErrors[settingKey]}</p>
                )}
            </div>
        );
    };

    return (
        <div className="font-sans divide-y divide-zinc-100">

            {/* ─── Padding ─── */}
            <div className="px-4 py-3.5 space-y-2.5">
                <SectionLabel>Padding</SectionLabel>
                <div className="space-y-2">
                    {renderInput("All sides", "p", componentSettingsMap.common?.p)}
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Horizontal (X)", "pX", componentSettingsMap.common?.pX)}
                        {renderInput("Vertical (Y)", "pY", componentSettingsMap.common?.pY)}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Top", "pT", componentSettingsMap.common?.pT)}
                        {renderInput("Bottom", "pB", componentSettingsMap.common?.pB)}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Left", "pL", componentSettingsMap.common?.pL)}
                        {renderInput("Right", "pR", componentSettingsMap.common?.pR)}
                    </div>
                </div>
            </div>

            {/* ─── Margin ─── */}
            <div className="px-4 py-3.5 space-y-2.5">
                <SectionLabel>Margin</SectionLabel>
                <div className="space-y-2">
                    {renderInput("All sides", "m", componentSettingsMap.common?.m)}
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Horizontal (X)", "mX", componentSettingsMap.common?.mX)}
                        {renderInput("Vertical (Y)", "mY", componentSettingsMap.common?.mY)}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Top", "mT", componentSettingsMap.common?.mT)}
                        {renderInput("Bottom", "mB", componentSettingsMap.common?.mB)}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Left", "mL", componentSettingsMap.common?.mL)}
                        {renderInput("Right", "mR", componentSettingsMap.common?.mR)}
                    </div>
                </div>
            </div>

            {/* ─── Sizing ─── */}
            <div className="px-4 py-3.5 space-y-2.5">
                <SectionLabel>Sizing</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                    {renderInput("Width", "w", componentSettingsMap.common?.w)}
                    {renderInput("Height", "h", componentSettingsMap.common?.h)}
                    {renderInput("Max Width", "mw", componentSettingsMap.common?.mw)}
                    {renderInput("Max Height", "mh", componentSettingsMap.common?.mh)}
                </div>
            </div>

            {/* ─── Element-specific style props ─── */}
            {styleSettings.length > 0 && (
                <div className="px-4 py-3.5 space-y-2.5">
                    <SectionLabel>Element Styling</SectionLabel>
                    <div className="space-y-2">
                        {styleSettings.map(([key, config]: [string, any]) =>
                            renderInput(key.replace(/-/g, " "), key, config)
                        )}
                    </div>
                </div>
            )}

            {/* ─── Custom CSS ─── */}
            <div className="px-4 py-3.5 space-y-2">
                <SectionLabel>Custom CSS</SectionLabel>
                <div className="rounded-md overflow-hidden border border-zinc-200 bg-[#0d0f14]">
                    <div className="flex items-center justify-between px-3 py-2 bg-[#12141b] border-b border-white/5 select-none">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-zinc-600" />
                            <span className="text-[10px] font-mono text-zinc-500">custom_css</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">CSS</span>
                    </div>
                    <textarea
                        rows={4}
                        placeholder="/* e.g. font-weight: 700; */"
                        value={selectedNode.settings?.customCss || ""}
                        onChange={(e) => onUpdateSetting("customCss", e.target.value, { tp: "style", as: "customCss" })}
                        className="w-full bg-transparent p-3 text-[11.5px] outline-none resize-none text-[#89ddff] placeholder:text-zinc-700"
                        style={{ fontFamily: "ui-monospace, 'Cascadia Code', monospace" }}
                    />
                </div>
            </div>
        </div>
    );
}
