"use client";

import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Palette, Trash2, X, MoreHorizontal } from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";
import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder";

import ThemeSettings from "./ThemeSettings";
import ComponentSettings from "./ComponentSettings";
import ComponentStyles from "./ComponentStyles";
import ComponentActions from "./ComponentActions";

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
                            <ScrollArea.Viewport className="h-full w-full p-4">
                                <ComponentSettings
                                    selectedNode={selectedNode}
                                    componentSettingsMap={componentSettingsMap}
                                    validationErrors={validationErrors}
                                    onUpdateSetting={onUpdateSetting}
                                    onUpdateLabel={onUpdateLabel}
                                />
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
                                <ComponentStyles
                                    selectedNode={selectedNode}
                                    componentSettingsMap={componentSettingsMap}
                                    validationErrors={validationErrors}
                                    onUpdateSetting={onUpdateSetting}
                                />
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar orientation="vertical" className="w-1 p-0.5">
                                <ScrollArea.Thumb className="bg-zinc-200 rounded-xl hover:bg-zinc-300" />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </Tabs.Content>

                    {/* Actions / Events Tab */}
                    <Tabs.Content value="actions" className="flex-1 overflow-hidden outline-none bg-white">
                        <ScrollArea.Root className="h-full">
                            <ScrollArea.Viewport className="h-full w-full p-4">
                                <ComponentActions
                                    selectedNode={selectedNode}
                                    onUpdateAction={onUpdateAction}
                                />
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
                    <ScrollArea.Viewport className="h-full w-full p-4">
                        <ThemeSettings
                            theme={theme}
                            onUpdateTheme={onUpdateTheme}
                        />
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical" className="w-1.5 p-0.5">
                        <ScrollArea.Thumb className="bg-zinc-200 rounded-xl hover:bg-zinc-300" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            )}
        </aside>
    );
}
