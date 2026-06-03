"use client";

import React from "react";
import { Palette, Layers, Settings2, Maximize2, Type } from "lucide-react";
import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

interface ThemeSettingsProps {
    theme: ThemeConfigs;
    onUpdateTheme: (updates: Partial<ThemeConfigs>) => void;
}

function SectionHeader({ icon: Icon, title }: { icon: React.ComponentType<any>; title: string }) {
    return (
        <div className="flex items-center gap-2 py-2 mb-1">
            <div className="p-1 rounded-md bg-zinc-50 shrink-0">
                <Icon className="w-3 h-3 text-zinc-500" />
            </div>
            <span className="text-[12px] font-bold text-zinc-600 tracking-widest">{title}</span>
        </div>
    );
}

function ColorRow({
    label,
    subLabel,
    value,
    onChange,
}: {
    label: string;
    subLabel: string;
    value: string;
    onChange: (val: string) => void;
}) {
    const safeColor = typeof value === "string" && value.startsWith("#") ? value : "#000000";

    return (
        <div className="flex items-center justify-between gap-3 py-2.5 border-b border-zinc-50">
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-zinc-700 tracking-tight">{label}</span>
                <span className="text-[9px] font-mono text-zinc-400 mt-0.5">{subLabel}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {/* Color Swatch — larger, more clickable */}
                <div className="relative w-7 h-7 rounded-md border-2 border-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer shrink-0 hover:shadow-[0_0_0_2px_rgba(0,0,0,0.2)] transition-shadow">
                    <input
                        type="color"
                        value={safeColor}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-150"
                    />
                    <div className="w-full h-full" style={{ backgroundColor: typeof value === "string" ? value : "#000" }} />
                </div>
                {/* Hex Input */}
                <div className="w-[86px] flex items-center bg-zinc-50 border border-zinc-200 rounded-md px-2 py-1 hover:border-zinc-300 transition-colors">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full bg-transparent text-[11px] font-mono text-zinc-700 outline-none border-none p-0 tracking-wider font-semibold"
                    />
                </div>
            </div>
        </div>
    );
}

function TextRow({
    label,
    subLabel,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    subLabel: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}) {
    return (
        <div className="flex items-center justify-between gap-3 py-2.5 border-b border-zinc-50">
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-zinc-700 tracking-tight">{label}</span>
                <span className="text-[9px] font-mono text-zinc-400 mt-0.5">{subLabel}</span>
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-[110px] shrink-0 border border-zinc-200 rounded-md px-2.5 py-1.5 text-[11px] text-right font-mono outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-950/10 bg-white font-semibold text-zinc-700 transition-colors"
                placeholder={placeholder || "e.g. 8px"}
            />
        </div>
    );
}

function SelectRow({
    label,
    subLabel,
    value,
    options,
    onChange,
}: {
    label: string;
    subLabel: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
}) {
    return (
        <div className="flex items-center justify-between gap-3 py-2.5 border-b border-zinc-50">
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-zinc-700 tracking-tight">{label}</span>
                <span className="text-[9px] font-mono text-zinc-400 mt-0.5">{subLabel}</span>
            </div>
            <Select.Root value={value} onValueChange={onChange}>
                <Select.Trigger className="w-[130px] shrink-0 flex items-center justify-between border border-zinc-200 rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-zinc-700 outline-none focus:border-zinc-400 bg-white cursor-pointer hover:border-zinc-300 transition-colors data-[placeholder]:text-zinc-400">
                    <Select.Value />
                    <Select.Icon>
                        <ChevronDown className="w-3 h-3 text-zinc-400 ml-1 shrink-0" />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content
                        position="popper"
                        sideOffset={4}
                        className="z-[200] w-[var(--radix-select-trigger-width)] bg-white border border-zinc-200 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden outline-none"
                    >
                        <Select.Viewport className="p-1">
                            {options.map((opt) => (
                                <Select.Item
                                    key={opt}
                                    value={opt}
                                    className="flex items-center justify-between px-3 py-2 text-[11.5px] font-semibold text-zinc-700 rounded-md cursor-pointer outline-none data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none"
                                >
                                    <Select.ItemText>{opt}</Select.ItemText>
                                    <Select.ItemIndicator><Check className="w-3 h-3 text-zinc-500" /></Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}

export default function ThemeSettings({ theme, onUpdateTheme }: ThemeSettingsProps) {
    const v = (key: keyof ThemeConfigs) => (theme && theme[key] as string) || "";

    return (
        <div className="space-y-6">
            <div>
                <SectionHeader icon={Palette} title="Brand Palette" />
                <div className="bg-white rounded-lg border border-zinc-100 px-3 overflow-hidden">
                    <ColorRow label="Primary Accent" subLabel="primary" value={v("primary")} onChange={(val) => onUpdateTheme({ primary: val })} />
                    <ColorRow label="Secondary Color" subLabel="secondary" value={v("secondary")} onChange={(val) => onUpdateTheme({ secondary: val })} />
                    <ColorRow label="Highlight Accent" subLabel="accent" value={v("accent")} onChange={(val) => onUpdateTheme({ accent: val })} />
                </div>
            </div>

            {/* Surface & Text */}
            <div>
                <SectionHeader icon={Layers} title="Surfaces & Text" />
                <div className="bg-white rounded-lg border border-zinc-100 px-3 overflow-hidden">
                    <ColorRow label="App Background" subLabel="bgApp" value={v("bgApp")} onChange={(val) => onUpdateTheme({ bgApp: val })} />
                    <ColorRow label="Surface Background" subLabel="bgSurface" value={v("bgSurface")} onChange={(val) => onUpdateTheme({ bgSurface: val })} />
                    <ColorRow label="Navigation Bar" subLabel="bgNavigation" value={v("bgNavigation")} onChange={(val) => onUpdateTheme({ bgNavigation: val })} />
                    <ColorRow label="Base Text" subLabel="textMain" value={v("textMain")} onChange={(val) => onUpdateTheme({ textMain: val })} />
                    <ColorRow label="Muted Text" subLabel="textMuted" value={v("textMuted")} onChange={(val) => onUpdateTheme({ textMuted: val })} />
                    <ColorRow label="Inverted Text" subLabel="textInverted" value={v("textInverted")} onChange={(val) => onUpdateTheme({ textInverted: val })} />
                    <ColorRow label="Borders & Outlines" subLabel="borderPrimary" value={v("borderPrimary")} onChange={(val) => onUpdateTheme({ borderPrimary: val })} />
                </div>
            </div>

            {/* Buttons */}
            <div>
                <SectionHeader icon={Settings2} title="Buttons" />
                <div className="bg-white rounded-lg border border-zinc-100 px-3 overflow-hidden">
                    <TextRow label="Border Radius" subLabel="btnRadius" value={v("btnRadius")} onChange={(val) => onUpdateTheme({ btnRadius: val })} placeholder="e.g. 8px" />
                    <TextRow label="Padding" subLabel="btnPaddingBase" value={v("btnPaddingBase")} onChange={(val) => onUpdateTheme({ btnPaddingBase: val })} placeholder="e.g. 10px 20px" />
                    <TextRow label="Hover Opacity" subLabel="btnHoverOpacity" value={v("btnHoverOpacity")} onChange={(val) => onUpdateTheme({ btnHoverOpacity: val })} placeholder="e.g. 0.85" />
                </div>
            </div>

            {/* Spacing & Radii */}
            <div>
                <SectionHeader icon={Maximize2} title="Spacing & Radii" />
                <div className="bg-white rounded-lg border border-zinc-100 px-3 overflow-hidden">
                    <TextRow label="Base Spacing" subLabel="spacingUnit" value={v("spacingUnit")} onChange={(val) => onUpdateTheme({ spacingUnit: val })} placeholder="e.g. 4px" />
                    <TextRow label="Max Container Width" subLabel="containerMaxWidth" value={v("containerMaxWidth")} onChange={(val) => onUpdateTheme({ containerMaxWidth: val })} placeholder="e.g. 1280px" />
                    <TextRow label="Grid Gutter" subLabel="gridGutter" value={v("gridGutter")} onChange={(val) => onUpdateTheme({ gridGutter: val })} placeholder="e.g. 16px" />
                    <TextRow label="Base Border Radius" subLabel="borderRadiusBase" value={v("borderRadiusBase")} onChange={(val) => onUpdateTheme({ borderRadiusBase: val })} placeholder="e.g. 6px" />
                    <TextRow label="Large Card Radius" subLabel="borderRadiusLarge" value={v("borderRadiusLarge")} onChange={(val) => onUpdateTheme({ borderRadiusLarge: val })} placeholder="e.g. 16px" />
                </div>
            </div>

            {/* Typography */}
            <div className="pb-6">
                <SectionHeader icon={Type} title="Typography" />
                <div className="bg-white rounded-lg border border-zinc-100 px-3 overflow-hidden">
                    <SelectRow label="Sans-Serif Font" subLabel="fontFamilySans" value={v("fontFamilySans")} options={["Inter", "Roboto", "Outfit", "system-ui", "sans-serif"]} onChange={(val) => onUpdateTheme({ fontFamilySans: val })} />
                    <SelectRow label="Monospace Font" subLabel="fontFamilyMono" value={v("fontFamilyMono")} options={["JetBrains Mono", "Roboto", "monospace"]} onChange={(val) => onUpdateTheme({ fontFamilyMono: val })} />
                    <TextRow label="Base Font Size" subLabel="fontSizeRoot" value={v("fontSizeRoot")} onChange={(val) => onUpdateTheme({ fontSizeRoot: val })} placeholder="e.g. 16px" />
                    <TextRow label="Line Height" subLabel="lineHeightBase" value={v("lineHeightBase")} onChange={(val) => onUpdateTheme({ lineHeightBase: val })} placeholder="e.g. 1.5" />
                </div>
            </div>
        </div>
    );
}
