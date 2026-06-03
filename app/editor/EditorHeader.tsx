"use client";

import React from "react";
import {
    Save, Undo2, Redo2, Monitor, Smartphone, Tablet,
    Palette, Loader2, AlertCircle, Eye
} from "lucide-react";
import * as Separator from "@radix-ui/react-separator";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import PageSelector from "./PageSelector";

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
                    className="bg-zinc-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-md shadow-xl z-[200] font-sans"
                >
                    {label}
                    <Tooltip.Arrow className="fill-zinc-900" />
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
    const isBusy = status === "saving" || status === "loading";
    const isFailed = status === "failed";

    return (
        <Tooltip.Provider delayDuration={300}>
            <header className="h-12 bg-white flex items-center justify-between px-4 shrink-0 select-none border-b border-zinc-200/80 font-sans">

                {/* ── Left: Brand ─────────────────────────── */}
                <div className="flex items-center gap-2.5 shrink-0 w-[180px]">
                    <div className="w-7 h-7 rounded-md bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
                        <img src="https://www.dhimora.com/icon.png" className="w-5 h-5 object-contain" alt="Logo" />
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-zinc-900 leading-tight">Theme Editor</p>
                        <p className="text-[9.5px] text-zinc-400 font-medium leading-tight">Efficiency that scales</p>
                    </div>
                </div>

                {/* ── Center: Page selector ────────────────── */}
                <div className="flex-1 flex justify-center">
                    <PageSelector
                        currentRoute={currentRoute}
                        routes={routes}
                        onRouteLoaded={onRouteLoaded}
                    />
                </div>

                {/* ── Right: Actions ───────────────────────── */}
                <div className="flex items-center gap-1 shrink-0 w-[180px] justify-end">

                    {/* Undo / Redo */}
                    <Tip label="Undo (coming soon)">
                        <button disabled className="p-1.5 rounded-md text-zinc-300 border border-transparent cursor-not-allowed">
                            <Undo2 className="w-3.5 h-3.5" />
                        </button>
                    </Tip>
                    <Tip label="Redo (coming soon)">
                        <button disabled className="p-1.5 rounded-md text-zinc-300 border border-transparent cursor-not-allowed">
                            <Redo2 className="w-3.5 h-3.5" />
                        </button>
                    </Tip>

                    {/* Theme palette */}
                    <Tip label="Global Theme">
                        <button
                            onClick={onToggleTheme}
                            className={`p-1.5 rounded-md transition-all cursor-pointer outline-none border ${
                                isThemeOpen
                                    ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300"
                            }`}
                        >
                            <Palette className="w-3.5 h-3.5" />
                        </button>
                    </Tip>

                    <Separator.Root orientation="vertical" className="h-5 w-px bg-zinc-200 mx-1" />

                    {/* Viewport toggle — pill group with clear selected state */}
                    <div className="flex items-center border border-zinc-200 rounded-md overflow-hidden">
                        {[
                            { value: "desktop", icon: Monitor, label: "Desktop" },
                            { value: "tablet", icon: Tablet, label: "Tablet" },
                            { value: "mobile", icon: Smartphone, label: "Mobile" },
                        ].map(({ value, icon: Icon, label }, i, arr) => (
                            <Tip key={value} label={label}>
                                <button
                                    onClick={() => onViewportChange(value as ViewportMode)}
                                    className={`p-1.5 transition-all cursor-pointer outline-none border-r last:border-r-0 border-zinc-200 ${
                                        viewport === value
                                            ? "bg-zinc-900 text-white"
                                            : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 bg-white"
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </button>
                            </Tip>
                        ))}
                    </div>

                    <Separator.Root orientation="vertical" className="h-5 w-px bg-zinc-200 mx-1" />

                    {/* Preview */}
                    <Tip label="Preview page">
                        <button
                            onClick={() => window.open(`/${currentRoute}`, "_blank")}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] font-semibold text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-200 hover:border-zinc-300 rounded-md transition-all cursor-pointer outline-none hover:bg-zinc-50 active:scale-[0.97]"
                        >
                            <Eye className="w-3.5 h-3.5" />
                            Preview
                        </button>
                    </Tip>

                    {/* Save */}
                    <button
                        onClick={onSave}
                        disabled={isBusy}
                        className={`flex items-center gap-1.5 text-[11.5px] font-bold px-3.5 py-1.5 rounded-md border active:scale-[0.97] transition-all cursor-pointer select-none outline-none ${
                            isFailed
                                ? "bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                                : isBusy
                                ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed"
                                : "bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-900 shadow-sm"
                        }`}
                    >
                        {isBusy ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : isFailed ? (
                            <AlertCircle className="w-3.5 h-3.5" />
                        ) : (
                            <Save className="w-3.5 h-3.5" />
                        )}
                        {isBusy ? "Saving…" : isFailed ? "Retry" : "Save"}
                    </button>
                </div>
            </header>
        </Tooltip.Provider>
    );
}
