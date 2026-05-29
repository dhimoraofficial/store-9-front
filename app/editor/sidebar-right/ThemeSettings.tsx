"use client";

import React from "react";
import { Palette, Layers, Settings2, Maximize2, Type } from "lucide-react";
import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder";

interface ThemeSettingsProps {
    theme: ThemeConfigs;
    onUpdateTheme: (updates: Partial<ThemeConfigs>) => void;
}

export default function ThemeSettings({
    theme,
    onUpdateTheme,
}: ThemeSettingsProps) {
    const renderThemeInput = (
        label: string,
        key: keyof ThemeConfigs,
        category: "color" | "text" | "select",
        options?: string[]
    ) => {
        const value = (theme && theme[key]) || "";

        return (
            <div key={String(key)} className="flex items-center justify-between gap-4 py-2.5 border-b border-zinc-50 font-sans">
                <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-semibold text-zinc-700 tracking-tight">{label}</span>
                    <span className="text-[9px] font-mono text-zinc-400 mt-0.5">{String(key)}</span>
                </div>

                <div className="shrink-0 w-36">
                    {category === "color" && (
                        <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 hover:border-zinc-300 transition-all shadow-inner">
                            <div className="w-5 h-5 rounded-xl border border-zinc-300 shrink-0 overflow-hidden relative shadow-sm cursor-pointer">
                                <input
                                    type="color"
                                    value={typeof value === "string" && value.startsWith("#") ? value : "#000000"}
                                    onChange={(e) => onUpdateTheme({ [key]: e.target.value })}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-150"
                                />
                                <div className="w-full h-full" style={{ backgroundColor: typeof value === "string" ? value : "#000" }} />
                            </div>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => onUpdateTheme({ [key]: e.target.value })}
                                className="w-full bg-transparent text-[11px] font-mono text-zinc-750 outline-none border-none p-0 tracking-wider text-right font-semibold"
                            />
                        </div>
                    )}

                    {category === "text" && (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onUpdateTheme({ [key]: e.target.value })}
                            className="w-full border border-zinc-200 rounded-lg px-2.5 py-1.5 text-[11px] text-right font-mono outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-100 bg-white font-semibold text-zinc-750"
                            placeholder="e.g. 8px"
                        />
                    )}

                    {category === "select" && options && (
                        <select
                            value={value}
                            onChange={(e) => onUpdateTheme({ [key]: e.target.value })}
                            className="w-full border border-zinc-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-zinc-700 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-100 bg-white cursor-pointer"
                        >
                            {options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Brand Colors */}
            <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-105 pb-2">
                    <Palette className="w-3.5 h-3.5" />
                    Brand Palette
                </div>
                {renderThemeInput("Primary Accent", "primary", "color")}
                {renderThemeInput("Secondary Color", "secondary", "color")}
                {renderThemeInput("Highlight Accent", "accent", "color")}
            </div>

            {/* Surface Settings */}
            <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-105 pb-2">
                    <Layers className="w-3.5 h-3.5" />
                    Surfaces & Text
                </div>
                {renderThemeInput("Main App Background", "bgApp", "color")}
                {renderThemeInput("Surface Background", "bgSurface", "color")}
                {renderThemeInput("Navigation Bar", "bgNavigation", "color")}
                {renderThemeInput("Base Text", "textMain", "color")}
                {renderThemeInput("Muted Text Style", "textMuted", "color")}
                {renderThemeInput("Inverted Contrast Text", "textInverted", "color")}
                {renderThemeInput("Borders & Outlines", "borderPrimary", "color")}
            </div>

            {/* Buttons Styling */}
            <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-105 pb-2">
                    <Settings2 className="w-3.5 h-3.5" />
                    Buttons
                </div>
                {renderThemeInput("Border Radius", "btnRadius", "text")}
                {renderThemeInput("Padding", "btnPaddingBase", "text")}
                {renderThemeInput("Hover State Opacity", "btnHoverOpacity", "text")}
            </div>

            {/* Spacing & Sizes */}
            <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-105 pb-2">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Spacing & Radii
                </div>
                {renderThemeInput("Base Spacing Unit", "spacingUnit", "text")}
                {renderThemeInput("Max Container Width", "containerMaxWidth", "text")}
                {renderThemeInput("Grid Gutter Spacing", "gridGutter", "text")}
                {renderThemeInput("Base Border Radius", "borderRadiusBase", "text")}
                {renderThemeInput("Large Card Radius", "borderRadiusLarge", "text")}
            </div>

            {/* Typography Scale */}
            <div className="space-y-3 pb-6">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-105 pb-2">
                    <Type className="w-3.5 h-3.5" />
                    Typography Scales
                </div>
                {renderThemeInput("Sans-Serif Font Family", "fontFamilySans", "select", ["Inter", "Roboto", "Outfit", "system-ui", "sans-serif"])}
                {renderThemeInput("Monospace Font Family", "fontFamilyMono", "select", ["JetBrains Mono", "Roboto", "monospace"])}
                {renderThemeInput("Base Font Size", "fontSizeRoot", "text")}
                {renderThemeInput("Standard Line Height", "lineHeightBase", "text")}
            </div>
        </div>
    );
}
