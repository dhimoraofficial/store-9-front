"use client";

import React from "react";
import { Save, Undo2, Redo2, Monitor, Smartphone, Tablet, Eye, Palette } from "lucide-react";
import * as Separator from "@radix-ui/react-separator";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import PageSelector from "./PageSelector";
import Button from "@/application/widgets/button";

export type ViewportMode = "desktop" | "tablet" | "mobile";

interface EditorHeaderProps {
    currentRoute: string;
    routes: { route: string; type: string; layout?: string }[];
    status: "idle" | "loading" | "saving" | "failed";
    viewport: ViewportMode;
    onViewportChange: (v: ViewportMode) => void;
    onSave: () => void;
    onRouteLoaded?: () => void;
    isThemeOpen: boolean;
    onToggleTheme: () => void;
}

function Tip({ children, label }: { children: React.ReactNode; label: string }) {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    side="bottom"
                    sideOffset={8}
                    className="bg-zinc-800 text-white text-[10px] font-medium px-2 py-1 rounded-md shadow-lg z-[200]"
                >
                    {label}
                    <Tooltip.Arrow className="fill-zinc-800" />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    );
}

export default function EditorHeader({
    currentRoute,
    routes,
    status,
    viewport,
    onViewportChange,
    onSave,
    onRouteLoaded,
    isThemeOpen,
    onToggleTheme,
}: EditorHeaderProps) {
    return (
        <Tooltip.Provider delayDuration={200}>
            <header className="h-14 bg-white flex items-center justify-between px-5 shrink-0 select-none border-b border-zinc-200">
                {/* Left: Logo + breadcrumb */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center">
                        <img src="https://www.dhimora.com/icon.png" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-zinc-900">Theme Editor</p>
                        <p className="text-[10px] text-zinc-400 font-medium">Efficiency that scales</p>
                    </div>
                </div>

                {/* Center: Page selector */}
                <div className="flex-1 flex justify-center">
                    <PageSelector
                        currentRoute={currentRoute}
                        routes={routes}
                        onRouteLoaded={onRouteLoaded}
                    />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <Tip label="Undo">
                        <button disabled className="p-2 rounded-lg text-zinc-300 hover:text-zinc-600 hover:bg-zinc-50 disabled:opacity-70 disabled:pointer-events-none transition-colors">
                            <Undo2 className="w-[18px] h-[18px]" />
                        </button>
                    </Tip>
                    <Tip label="Redo">
                        <button disabled className="p-2 rounded-lg text-zinc-300 hover:text-zinc-600 hover:bg-zinc-50 disabled:opacity-70 disabled:pointer-events-none transition-colors">
                            <Redo2 className="w-[18px] h-[18px]" />
                        </button>
                    </Tip>

                    <Tip label="Global Theme">
                        <button
                            onClick={onToggleTheme}
                            className={`p-2 rounded-lg transition-colors cursor-pointer outline-none border ${
                                isThemeOpen
                                    ? "bg-zinc-100 text-zinc-900 border-zinc-200/60 shadow-inner"
                                    : "text-zinc-400 hover:text-zinc-650 hover:bg-zinc-50 border-transparent"
                            }`}
                        >
                            <Palette className="w-[18px] h-[18px]" />
                        </button>
                    </Tip>

                    <Separator.Root orientation="vertical" className="h-8 w-px bg-zinc-300 mx-1" />

                    <ToggleGroup.Root
                        type="single"
                        value={viewport}
                        onValueChange={(v) => { if (v) onViewportChange(v as ViewportMode); }}
                        className="flex items-center border border-zinc-100 rounded-lg overflow-hidden"
                    >
                        <ToggleGroup.Item value="desktop" className="p-2 text-zinc-400 data-[state=on]:bg-zinc-100 data-[state=on]:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer border-r border-zinc-200">
                            <Monitor className="w-[18px] h-[18px]" />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="tablet" className="p-2 text-zinc-400 data-[state=on]:bg-zinc-100 data-[state=on]:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer border-r border-zinc-200">
                            <Tablet className="w-[18px] h-[18px]" />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="mobile" className="p-2 text-zinc-400 data-[state=on]:bg-zinc-100 data-[state=on]:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer">
                            <Smartphone className="w-[18px] h-[18px]" />
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>

                    <Separator.Root orientation="vertical" className="h-8 w-px bg-zinc-300 mx-1" />

                    <Button
                        onClick={onSave}
                        disabled={status === "saving" || status === "loading"}
                        className="flex items-center bg-zinc-800 gap-2 text-white bg-bg disabled:opacity-40 text-[13px] font-semibold px-5 py-2 rounded-xl active:scale-[0.97] transition-all cursor-pointer shadow-sm"
                    >
                        <Save className="w-4 h-4" />
                        Save
                    </Button>
                </div>
            </header>
        </Tooltip.Provider>
    );
}
