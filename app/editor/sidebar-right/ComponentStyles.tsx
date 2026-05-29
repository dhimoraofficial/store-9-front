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

export default function ComponentStyles({
    selectedNode,
    componentSettingsMap,
    validationErrors,
    onUpdateSetting,
}: ComponentStylesProps) {
    const entry = componentSettingsMap?.[selectedNode.type];
    const settings = entry ? (entry.settings || (entry.name ? null : entry)) : null;

    // Filter settings to only keep style settings (config.tp === "style")
    const styleSettings = settings
        ? Object.entries(settings).filter(([_, config]: [string, any]) => config.tp === "style")
        : [];

    const renderPlainInput = (label: string, settingKey: string, config: any) => {
        if (!config) return null;
        const activeConfig = Array.isArray(config) ? config[0] : config;
        const currentVal = selectedNode.settings?.[settingKey] ?? "";

        return (
            <div key={settingKey} className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 capitalize">
                    {label}
                </label>
                <div className={`relative flex items-center bg-white border rounded focus-within:ring-1 focus-within:ring-zinc-950/10 focus-within:border-zinc-400 ${
                    validationErrors[settingKey] ? "border-red-300 bg-red-50/50" : "border-zinc-200"
                }`}>
                    <input
                        type="text"
                        value={String(currentVal)}
                        onChange={(e) => onUpdateSetting(settingKey, e.target.value, config)}
                        className="w-full bg-transparent text-[11px] font-mono text-zinc-700 outline-none pl-2 pr-7 py-1"
                        placeholder={activeConfig?.rgx ? "e.g. 100%, auto" : "Enter value..."}
                    />
                    
                    {activeConfig?.opt && activeConfig.opt.length > 0 && (
                        <div className="absolute right-1 top-1/2 -translate-y-1/2">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <button className="p-0.5 rounded hover:bg-zinc-150 text-zinc-400 hover:text-zinc-650 transition-colors cursor-pointer outline-none flex items-center justify-center">
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content
                                        align="end"
                                        sideOffset={4}
                                        className="z-[100] min-w-[100px] bg-white border border-zinc-200 rounded shadow-md p-1 outline-none font-sans text-[11px]"
                                    >
                                        {activeConfig.opt.map((optVal: string) => (
                                            <DropdownMenu.Item
                                                key={optVal}
                                                onSelect={() => onUpdateSetting(settingKey, optVal, config)}
                                                className="px-2 py-1 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 rounded cursor-pointer outline-none transition-colors"
                                            >
                                                {optVal}
                                            </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 space-y-4">
            {/* Padding spacing block */}
            <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Padding</p>
                <div className="grid grid-cols-2 gap-2">
                    {renderPlainInput("All Padding", "p", componentSettingsMap.common?.p)}
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        {renderPlainInput("Horizontal (X)", "pX", componentSettingsMap.common?.pX)}
                        {renderPlainInput("Vertical (Y)", "pY", componentSettingsMap.common?.pY)}
                    </div>
                    {renderPlainInput("Top", "pT", componentSettingsMap.common?.pT)}
                    {renderPlainInput("Bottom", "pB", componentSettingsMap.common?.pB)}
                    {renderPlainInput("Left", "pL", componentSettingsMap.common?.pL)}
                    {renderPlainInput("Right", "pR", componentSettingsMap.common?.pR)}
                </div>
            </div>

            <div className="h-px bg-zinc-150" />

            {/* Margin spacing block */}
            <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Margin</p>
                <div className="grid grid-cols-2 gap-2">
                    {renderPlainInput("All Margin", "m", componentSettingsMap.common?.m)}
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        {renderPlainInput("Horizontal (X)", "mX", componentSettingsMap.common?.mX)}
                        {renderPlainInput("Vertical (Y)", "mY", componentSettingsMap.common?.mY)}
                    </div>
                    {renderPlainInput("Top", "mT", componentSettingsMap.common?.mT)}
                    {renderPlainInput("Bottom", "mB", componentSettingsMap.common?.mB)}
                    {renderPlainInput("Left", "mL", componentSettingsMap.common?.mL)}
                    {renderPlainInput("Right", "mR", componentSettingsMap.common?.mR)}
                </div>
            </div>

            <div className="h-px bg-zinc-150" />

            {/* Sizing block */}
            <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Sizing</p>
                <div className="grid grid-cols-2 gap-2">
                    {renderPlainInput("Width", "w", componentSettingsMap.common?.w)}
                    {renderPlainInput("Height", "h", componentSettingsMap.common?.h)}
                    {renderPlainInput("Max Width", "mw", componentSettingsMap.common?.mw)}
                    {renderPlainInput("Max Height", "mh", componentSettingsMap.common?.mh)}
                </div>
            </div>

            {/* Element Specific Styles */}
            {styleSettings.length > 0 && (
                <>
                    <div className="h-px bg-zinc-150" />
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Element Styling</p>
                        <div className="space-y-2">
                            {styleSettings.map(([key, config]: [string, any]) =>
                                renderPlainInput(key.replace(/-/g, " "), key, config)
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Custom CSS */}
            <div className="h-px bg-zinc-150" />
            <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600">Custom CSS</label>
                <textarea
                    rows={4}
                    placeholder="font-weight: 700;"
                    value={selectedNode.settings?.customCss || ""}
                    onChange={(e) => onUpdateSetting("customCss", e.target.value, { tp: "style", as: "customCss" })}
                    className="w-full border border-zinc-200 rounded p-2 text-[11px] font-mono outline-none focus:border-zinc-400 bg-white resize-none text-zinc-800"
                />
            </div>
        </div>
    );
}
