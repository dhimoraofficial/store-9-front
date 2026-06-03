"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";

interface ComponentSettingsProps {
    selectedNode: ComponentSchema;
    componentSettingsMap: any;
    validationErrors: Record<string, string>;
    onUpdateSetting: (settingKey: string, val: string, settingConfig: any) => void;
    onUpdateLabel: (id: string, label: string) => void;
}

function RadixSelect({
    value,
    options,
    onChange,
}: {
    value: string;
    options: string[];
    onChange: (val: string) => void;
}) {
    return (
        <Select.Root value={value || "__none__"} onValueChange={(v) => onChange(v === "__none__" ? "" : v)}>
            <Select.Trigger className="w-full flex items-center justify-between border border-zinc-200 rounded-md px-3 py-2 text-[12px] font-sans font-semibold text-zinc-700 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-950/10 bg-white cursor-pointer hover:border-zinc-300 transition-colors data-[placeholder]:text-zinc-400">
                <Select.Value placeholder="Select option…" />
                <Select.Icon>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={4}
                    className="z-[200] w-[var(--radix-select-trigger-width)] bg-white border border-zinc-200 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden outline-none font-sans"
                >
                    <Select.Viewport className="p-1">
                        <Select.Item
                            value="__none__"
                            className="flex items-center justify-between px-3 py-2 text-[12px] text-zinc-400 font-sans font-medium rounded-md cursor-pointer outline-none hover:bg-zinc-50 data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none"
                        >
                            <Select.ItemText>(None)</Select.ItemText>
                            <Select.ItemIndicator><Check className="w-3 h-3 text-zinc-500" /></Select.ItemIndicator>
                        </Select.Item>
                        {options.map((v) => (
                            <Select.Item
                                key={v}
                                value={v}
                                className="flex items-center justify-between px-3 py-2 text-[12px] font-sans font-semibold text-zinc-700 rounded-md cursor-pointer outline-none hover:bg-zinc-50 data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none"
                            >
                                <Select.ItemText>{v}</Select.ItemText>
                                <Select.ItemIndicator><Check className="w-3 h-3 text-zinc-500" /></Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}

export default function ComponentSettings({
    selectedNode,
    componentSettingsMap,
    validationErrors,
    onUpdateSetting,
}: ComponentSettingsProps) {

    const entry = componentSettingsMap?.[selectedNode.type];
    const settings = entry ? (entry.settings || (entry.name ? null : entry)) : null;

    // Filter settings to only keep prop settings (config.tp !== "style")
    const propSettings = settings
        ? Object.entries(settings).filter(([_, config]: [string, any]) => config.tp !== "style")
        : [];

    return (
        <div className="space-y-5">
            {propSettings.length > 0 ? (
                <div className="space-y-4">
                    {propSettings.map(([key, config]: [string, any]) => {
                        const currentVal = selectedNode.settings?.[key] ?? "";
                        const hasError = !!validationErrors[key];
                        return (
                            <div key={key} className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide capitalize">
                                    {key.replace(/-/g, " ")}
                                </label>
                                {config.opt ? (
                                    <RadixSelect
                                        value={currentVal}
                                        options={config.opt}
                                        onChange={(v) => onUpdateSetting(key, v, config)}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={currentVal}
                                        onChange={(e) => onUpdateSetting(key, e.target.value, config)}
                                        className={`w-full border rounded-md px-3 py-2 text-[12px] font-sans font-semibold outline-none focus:ring-1 transition-colors ${hasError
                                            ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/50 text-red-900"
                                            : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-950/10 bg-white text-zinc-800"
                                            }`}
                                        placeholder="Enter value…"
                                    />
                                )}
                                {hasError && (
                                    <p className="text-[10px] text-red-500 font-medium">{validationErrors[key]}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-10">
                    <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                    </div>
                    <p className="text-[11.5px] text-zinc-400 font-medium">No settings available</p>
                    <p className="text-[10px] text-zinc-300 mt-0.5">Try the Style tab for visual properties</p>
                </div>
            )}
        </div>
    );
}
