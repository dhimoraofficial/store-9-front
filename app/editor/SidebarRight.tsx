"use client";

import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { 
    Palette, Maximize2, Type, Layers, Settings2, Trash2, X, 
    MoreHorizontal, ChevronDown, Sparkles, Globe, Link2
} from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";
import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder";

interface SidebarRightProps {
    selectedNode: ComponentSchema | null;
    isThemeOpen: boolean;
    onCloseTheme: () => void;
    componentSettingsMap: any;
    theme: ThemeConfigs;
    validationErrors: Record<string, string>;
    onUpdateSetting: (settingKey: string, val: string, settingConfig: any) => void;
    onUpdateLabel: (id: string, label: string) => void;
    onUpdateTheme: (updates: Partial<ThemeConfigs>) => void;
    onUpdateAction?: (id: string, action: any | null) => void;
    onDeleteNode?: (id: string) => void;
    onSelectNode?: (id: string | null) => void;
}

export default function SidebarRight({
    selectedNode,
    isThemeOpen,
    onCloseTheme,
    componentSettingsMap,
    theme,
    validationErrors,
    onUpdateSetting,
    onUpdateLabel,
    onUpdateTheme,
    onUpdateAction,
    onDeleteNode,
    onSelectNode,
}: SidebarRightProps) {
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
                                className="w-full bg-transparent text-[11px] font-mono text-zinc-700 outline-none border-none p-0 tracking-wider text-right font-semibold"
                            />
                        </div>
                    )}

                    {category === "text" && (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onUpdateTheme({ [key]: e.target.value })}
                            className="w-full border border-zinc-200 rounded-lg px-2.5 py-1.5 text-[11px] text-right font-mono outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-100 bg-white font-semibold"
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

    // Hide sidebar completely if neither component is selected nor global theme editor is open
    if (!selectedNode && !isThemeOpen) return null;

    return (
        <aside className="w-[300px] bg-white border-l border-zinc-200 flex flex-col shrink-0 h-full select-none shadow-sm font-sans">
            {/* Header when node is selected */}
            {selectedNode && (
                <div className="h-12 border-b border-zinc-150 px-4 flex items-center justify-between shrink-0 bg-white">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-500 uppercase shrink-0">
                            {selectedNode.type.substring(0, 2)}
                        </div>
                        <span className="text-[12.5px] font-bold text-zinc-800 truncate capitalize">
                            {selectedNode.type} Element
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        {/* Radix Dropdown Menu for customization actions */}
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="p-1 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-650 transition-colors cursor-pointer outline-none">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content 
                                    align="end" 
                                    sideOffset={4}
                                    className="z-[100] w-48 bg-white border border-zinc-200 rounded-lg shadow-[0_3px_12px_rgba(0,0,0,0.05)] p-1 outline-none font-sans"
                                >
                                    {onDeleteNode && (
                                        <DropdownMenu.Item
                                            onSelect={() => onDeleteNode(selectedNode.id)}
                                            className="flex items-center gap-2 px-2.5 py-1.5 text-[11.5px] font-semibold text-red-650 hover:text-red-700 hover:bg-red-50/50 rounded-md cursor-pointer outline-none transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 shrink-0" />
                                            <span>Delete section</span>
                                        </DropdownMenu.Item>
                                    )}
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>

                        {onSelectNode && (
                            <button
                                onClick={() => onSelectNode(null)}
                                className="p-1 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-650 transition-colors cursor-pointer outline-none"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Header when global theme editor is open */}
            {!selectedNode && isThemeOpen && (
                <div className="h-12 border-b border-zinc-150 px-4 flex items-center justify-between shrink-0 bg-white">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-550 shrink-0">
                            <Palette className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[12.5px] font-bold text-zinc-805 truncate">
                            Global Theme Settings
                        </span>
                    </div>
                    <button
                        onClick={onCloseTheme}
                        className="p-1 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-650 transition-colors cursor-pointer outline-none"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Content Switcher */}
            {selectedNode ? (
                /* ─── Selected Node Tabs Layout ─── */
                <Tabs.Root defaultValue="settings" className="flex-1 flex flex-col overflow-hidden h-full bg-white">
                    <Tabs.List className="flex border-b border-zinc-150 shrink-0 bg-white p-1">
                        <Tabs.Trigger
                            value="settings"
                            className="flex-1 text-[11px] font-bold text-zinc-400 py-2 rounded-lg data-[state=active]:bg-zinc-50 data-[state=active]:text-zinc-900 hover:text-zinc-700 outline-none transition-all cursor-pointer text-center"
                        >
                            Settings
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="style"
                            className="flex-1 text-[11px] font-bold text-zinc-400 py-2 rounded-lg data-[state=active]:bg-zinc-50 data-[state=active]:text-zinc-900 hover:text-zinc-700 outline-none transition-all cursor-pointer text-center"
                        >
                            Style
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="actions"
                            className="flex-1 text-[11px] font-bold text-zinc-400 py-2 rounded-lg data-[state=active]:bg-zinc-50 data-[state=active]:text-zinc-900 hover:text-zinc-700 outline-none transition-all cursor-pointer text-center"
                        >
                            Actions
                        </Tabs.Trigger>
                    </Tabs.List>

                    {/* Settings Tab */}
                    <Tabs.Content value="settings" className="flex-1 overflow-hidden outline-none bg-white">
                        <ScrollArea.Root className="h-full">
                            <ScrollArea.Viewport className="h-full w-full p-4 space-y-5">
                                {/* Text Label configuration */}
                                {(selectedNode.type === "text" ||
                                    selectedNode.type === "button" ||
                                    selectedNode.type === "link" ||
                                    selectedNode.type === "text_block" ||
                                    selectedNode.type === "button_block" ||
                                    selectedNode.type === "link_block") && (
                                    <div className="space-y-1.5 pb-4 border-b border-zinc-100">
                                        <span className="text-[12px] font-semibold text-zinc-700">Content Text</span>
                                        <input
                                            type="text"
                                            value={selectedNode.label || ""}
                                            onChange={(e) => onUpdateLabel(selectedNode.id, e.target.value)}
                                            className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-zinc-450 focus:ring-1 focus:ring-zinc-955 bg-white text-zinc-800 font-semibold"
                                            placeholder="Enter text content…"
                                        />
                                    </div>
                                )}

                                {/* Component settings */}
                                {(() => {
                                    const entry = componentSettingsMap?.[selectedNode.type];
                                    const settings = entry ? (entry.settings || (entry.name ? null : entry)) : null;
                                    if (settings && Object.keys(settings).length > 0) {
                                        return (
                                            <div className="space-y-4">
                                                {Object.entries(settings).map(
                                                    ([key, config]: [string, any]) => {
                                                        const currentVal = selectedNode.settings?.[key] ?? "";
                                                        return (
                                                            <div key={key} className="space-y-1.5">
                                                                <div className="flex justify-between items-center">
                                                                    <label className="text-[12px] font-semibold text-zinc-700">{key}</label>
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
                                                                        placeholder="Enter value…"
                                                                    />
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="text-center py-8 text-zinc-400 text-[11.5px] italic">
                                            No specific component settings.
                                        </div>
                                    );
                                })()}
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar orientation="vertical" className="w-1.5 p-0.5">
                                <ScrollArea.Thumb className="bg-zinc-200 rounded-xl hover:bg-zinc-300" />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </Tabs.Content>

                    {/* Style Tab */}
                    <Tabs.Content value="style" className="flex-1 overflow-hidden outline-none bg-white">
                        <ScrollArea.Root className="h-full">
                            <ScrollArea.Viewport className="h-full w-full">
                                <div className="p-4 space-y-5">
                                    {/* Padding */}
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
                                    {/* Margin */}
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Margin</p>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                            {renderSliderInput("Top", "mT", selectedNode.settings?.mT || "", componentSettingsMap.common?.mT)}
                                            {renderSliderInput("Bottom", "mB", selectedNode.settings?.mB || "", componentSettingsMap.common?.mB)}
                                            {renderSliderInput("Left", "mL", selectedNode.settings?.mL || "", componentSettingsMap.common?.mL)}
                                            {renderSliderInput("Right", "mR", selectedNode.settings?.mR || "", componentSettingsMap.common?.mR)}
                                        </div>
                                    </div>
                                    <div className="h-px bg-zinc-100" />
                                    {/* Custom CSS */}
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
                                                className="w-full border border-zinc-200 rounded-lg p-2.5 text-[11px] font-mono outline-none focus:border-zinc-400 bg-zinc-50 resize-none"
                                            />
                                        </Collapsible.Content>
                                    </Collapsible.Root>
                                </div>
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar orientation="vertical" className="w-1 p-0.5">
                                <ScrollArea.Thumb className="bg-zinc-200 rounded-xl" />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </Tabs.Content>

                    {/* Actions / Events Tab */}
                    <Tabs.Content value="actions" className="flex-1 overflow-hidden outline-none bg-white">
                        <ScrollArea.Root className="h-full">
                            <ScrollArea.Viewport className="h-full w-full p-4 space-y-5">
                                <div className="space-y-4">
                                    <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest pb-1 border-b border-zinc-50">
                                        Interactions
                                    </div>
                                    <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                                        Define what happens when users click or interact with this component.
                                    </p>

                                    {/* Action Selector */}
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-semibold text-zinc-700">Action On Click</label>
                                        <select
                                            value={(() => {
                                                const act = selectedNode.action;
                                                if (!act) return "";
                                                if (Array.isArray(act)) return act[0]?.type || "";
                                                return act.type || "";
                                            })()}
                                            onChange={(e) => {
                                                const newType = e.target.value;
                                                if (!newType) {
                                                    onUpdateAction?.(selectedNode.id, null);
                                                } else {
                                                    onUpdateAction?.(selectedNode.id, {
                                                        type: newType as any,
                                                        prop: {}
                                                    });
                                                }
                                            }}
                                            className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-zinc-700 outline-none focus:border-zinc-400 bg-white cursor-pointer"
                                        >
                                            <option value="">(None)</option>
                                            <option value="navigateTo">Navigate to Page</option>
                                            <option value="addToCart">Add to Cart</option>
                                            <option value="checkoutCart">Checkout Cart</option>
                                            <option value="openSearch">Open Search Bar</option>
                                            <option value="toggleCart">Toggle Cart Sidebar</option>
                                            <option value="toggleMenu">Toggle Mobile Menu</option>
                                            <option value="signIn">Sign In Page</option>
                                            <option value="signOut">Sign Out</option>
                                            <option value="subscribeEmail">Subscribe Newsletter</option>
                                        </select>
                                    </div>

                                    {/* Conditional Props depending on Action */}
                                    {(() => {
                                        const act = selectedNode.action;
                                        const actionObj = Array.isArray(act) ? act[0] : act;
                                        if (!actionObj || !actionObj.type) return null;

                                        if (actionObj.type === "navigateTo") {
                                            return (
                                                <div className="space-y-1.5 pt-1.5">
                                                    <label className="text-[12px] font-semibold text-zinc-700">Destination URL / Route</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. /about-us"
                                                        value={actionObj.prop?.to || ""}
                                                        onChange={(e) => {
                                                            onUpdateAction?.(selectedNode.id, {
                                                                type: "navigateTo",
                                                                prop: { to: e.target.value }
                                                            });
                                                        }}
                                                        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-zinc-400 bg-white text-zinc-800 font-mono font-semibold"
                                                    />
                                                    <p className="text-[10px] text-zinc-400 leading-normal font-semibold">
                                                        Enter a relative path (e.g., /cart) or external URL.
                                                    </p>
                                                </div>
                                            );
                                        }

                                        if (actionObj.type === "addToCart") {
                                            return (
                                                <div className="space-y-1.5 pt-1.5">
                                                    <label className="text-[12px] font-semibold text-zinc-700">Product ID / Variant ID</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. prod_0123"
                                                        value={actionObj.prop?.productId || ""}
                                                        onChange={(e) => {
                                                            onUpdateAction?.(selectedNode.id, {
                                                                type: "addToCart",
                                                                prop: { productId: e.target.value }
                                                            });
                                                        }}
                                                        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-zinc-400 bg-white text-zinc-800 font-mono font-semibold"
                                                    />
                                                </div>
                                            );
                                        }

                                        return (
                                            <div className="bg-zinc-50 border border-zinc-150 rounded-lg p-3 text-[11px] text-zinc-500 leading-normal font-semibold">
                                                Action of type <span className="font-mono font-bold text-zinc-700">{actionObj.type}</span> will be triggered. No extra parameters required.
                                            </div>
                                        );
                                    })()}
                                </div>
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar orientation="vertical" className="w-1.5 p-0.5">
                                <ScrollArea.Thumb className="bg-zinc-200 rounded-xl hover:bg-zinc-300" />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </Tabs.Content>
                </Tabs.Root>
            ) : (
                /* ─── Global Theme Editor View (flat list) ─── */
                <ScrollArea.Root className="flex-1 overflow-hidden bg-white">
                    <ScrollArea.Viewport className="h-full w-full p-4 space-y-6">
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
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical" className="w-1.5 p-0.5">
                        <ScrollArea.Thumb className="bg-zinc-200 rounded-xl hover:bg-zinc-300" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            )}
        </aside>
    );
}
