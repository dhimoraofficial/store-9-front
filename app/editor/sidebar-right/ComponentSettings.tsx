"use client";

import React from "react";
import { ComponentSchema } from "@/application/runtime/builder/type";

interface ComponentSettingsProps {
    selectedNode: ComponentSchema;
    componentSettingsMap: any;
    validationErrors: Record<string, string>;
    onUpdateSetting: (settingKey: string, val: string, settingConfig: any) => void;
    onUpdateLabel: (id: string, label: string) => void;
}

export default function ComponentSettings({
    selectedNode,
    componentSettingsMap,
    validationErrors,
    onUpdateSetting,
    onUpdateLabel,
}: ComponentSettingsProps) {
    const isTextLike =
        selectedNode.type === "text" ||
        selectedNode.type === "button" ||
        selectedNode.type === "link" ||
        selectedNode.type === "text_block" ||
        selectedNode.type === "button_block" ||
        selectedNode.type === "link_block";

    const entry = componentSettingsMap?.[selectedNode.type];
    const settings = entry ? (entry.settings || (entry.name ? null : entry)) : null;

    // Filter settings to only keep prop settings (config.tp !== "style")
    const propSettings = settings
        ? Object.entries(settings).filter(([_, config]: [string, any]) => config.tp !== "style")
        : [];

    return (
        <div className="space-y-5">
            {/* Text Label configuration */}
            {isTextLike && (
                <div className="space-y-1.5 pb-4 border-b border-zinc-100">
                    <span className="text-[12px] font-semibold text-zinc-700">Content Text</span>
                    <input
                        type="text"
                        value={selectedNode.label || ""}
                        onChange={(e) => onUpdateLabel(selectedNode.id, e.target.value)}
                        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-zinc-450 focus:ring-1 focus:ring-zinc-950 bg-white text-zinc-800 font-semibold"
                        placeholder="Enter text content…"
                    />
                </div>
            )}

            {propSettings.length > 0 ? (
                <div className="space-y-4">
                    {propSettings.map(([key, config]: [string, any]) => {
                        const currentVal = selectedNode.settings?.[key] ?? "";
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
                                        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-zinc-750 outline-none focus:border-zinc-400 bg-white cursor-pointer font-semibold"
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
                                        placeholder="Enter value…"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                !isTextLike && (
                    <div className="text-center py-8 text-zinc-400 text-[11.5px] italic font-semibold">
                        No settings available for this component.
                    </div>
                )
            )}
        </div>
    );
}
