import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Layers, X, Search, Plus } from "lucide-react";
import {
    LUCIDE_ICONS_MAP,
    getDialogComponentIcon,
    ComponentMockupPreview
} from "./ComponentMockupPreview";

interface CompDef {
    type: string;
    label: string;
    desc: string;
    category: "section" | "app";
}

interface AddComponentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    componentSettingsMap: any;
    onAddComponent: (type: string) => void;
    availableComponents: CompDef[];
    parentType: string | null;
    slotId: string | null;
}

const CATEGORIES = [
    { value: "all", label: "All" },
    { value: "navbar", label: "Navbar" },
    { value: "hero", label: "Hero" },
    { value: "about", label: "About" },
    { value: "services", label: "Services" },
    { value: "cta", label: "CTA" },
    { value: "portfolio", label: "Portfolio" },
    { value: "pricing", label: "Pricing" },
    { value: "blog", label: "Blog" },
    { value: "testimonials", label: "Testimonials" },
    { value: "footer", label: "Footer" },
    { value: "layout", label: "Layout" },
    { value: "content", label: "Content" },
    { value: "forms", label: "Forms" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "legacy", label: "Legacy" }
];

export default function AddComponentDialog({
    open,
    onOpenChange,
    componentSettingsMap,
    onAddComponent,
    availableComponents,
    parentType,
    slotId
}: AddComponentDialogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [hoveredComp, setHoveredComp] = useState("container");

    const filteredComponents = availableComponents.filter((comp) => {
        const matchesSearch = comp.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.type.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;

        if (parentType && slotId) {
            const registryEntry = componentSettingsMap?.[parentType];
            const layouts = registryEntry?.slotsConfig ? Object.values(registryEntry.slotsConfig) : [];
            let allowedChildren: string[] = [];
            for (const layoutSlots of layouts) {
                const matchedSlot = (layoutSlots as any[]).find(s => s.id === slotId);
                if (matchedSlot) {
                    allowedChildren = [...allowedChildren, ...(matchedSlot.allowedChildren || [])];
                }
            }
            if (allowedChildren.length > 0) {
                return allowedChildren.includes(comp.type);
            }
        }

        if (activeCategory === "all") return true;
        const registryEntry = componentSettingsMap?.[comp.type];
        const category = registryEntry?.category || "legacy";
        return category === activeCategory;
    });

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-zinc-900/10 backdrop-blur-[2px] z-[100] transition-all" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[760px] h-[500px] rounded-2xl border border-zinc-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden z-[100] outline-none transition-all font-sans">

                    {/* Unified Header */}
                    <div className="flex items-center justify-between px-5.5 py-4 border-b border-zinc-100 bg-white shrink-0">
                        <div>
                            <Dialog.Title className="text-[13.5px] font-bold text-zinc-900 flex items-center gap-1.5 leading-none">
                                <Layers className="w-4 h-4 text-zinc-500 shrink-0" />
                                Insert Component
                            </Dialog.Title>
                            <p className="text-[10.5px] text-zinc-400 font-medium mt-1.5 leading-none">Select a component block to add to your section template</p>
                        </div>
                        <Dialog.Close asChild>
                            <button className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-md hover:bg-zinc-50 transition-colors cursor-pointer outline-none">
                                <X className="w-4 h-4" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Modal Body */}
                    <div className="flex-1 flex min-h-0">
                        {/* Left Pane: Categories + Component list */}
                        <div className="w-[440px] flex flex-col h-full bg-white shrink-0">
                            {/* Categories Pill Row */}
                            <div className="px-5 pt-4 pb-2 border-b border-zinc-50 shrink-0">
                                <div className="flex gap-1 overflow-x-auto pb-1.5 -mx-1 px-1 scrollbar-none">
                                    {CATEGORIES.map((cat) => {
                                        const isActive = activeCategory === cat.value;
                                        return (
                                            <button
                                                key={cat.value}
                                                type="button"
                                                onClick={() => setActiveCategory(cat.value)}
                                                className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all shrink-0 cursor-pointer outline-none ${isActive
                                                    ? "text-zinc-800 bg-zinc-100"
                                                    : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"
                                                    }`}
                                            >
                                                {cat.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                {/* Search Input */}
                                <div className="relative mt-2">
                                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search components..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-md pl-9 pr-3.5 py-1.5 text-[11.5px] outline-none text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-300 focus:bg-white transition-all font-sans font-medium"
                                    />
                                </div>
                            </div>

                            {/* Scrollable List */}
                            <div className="flex-1 overflow-y-auto py-2.5 px-4.5 flex flex-col gap-1">
                                {filteredComponents.map((comp) => {
                                    const registryEntry = componentSettingsMap?.[comp.type];
                                    const displayName = registryEntry?.name || comp.label;
                                    const iconName = registryEntry?.icon;
                                    const IconComponent = (iconName && LUCIDE_ICONS_MAP[iconName]) || getDialogComponentIcon(comp.type);
                                    const isSelected = hoveredComp === comp.type;

                                    return (
                                        <button
                                            key={comp.type}
                                            onMouseEnter={() => setHoveredComp(comp.type)}
                                            onClick={() => onAddComponent(comp.type)}
                                            className={`w-full flex items-center text-left px-3 py-2 rounded-lg transition-all cursor-pointer group border ${isSelected
                                                ? "bg-zinc-50 border-zinc-200/80 shadow-sm"
                                                : "hover:bg-zinc-50/50 border-transparent"
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 shrink-0 transition-all ${isSelected ? "bg-zinc-900 text-white" : ""}`}>
                                                <IconComponent className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[12.5px] font-bold text-zinc-900 leading-snug truncate">{displayName}</div>
                                                <div className="text-[10px] text-zinc-400 truncate mt-0.5 leading-normal">{comp.desc}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                                {filteredComponents.length === 0 && (
                                    <p className="text-[11.5px] text-zinc-400 text-center py-20 font-medium">No components found</p>
                                )}
                            </div>
                        </div>

                        {/* Right Pane: Interactive Mock Preview + Description */}
                        <div className="flex-1 bg-zinc-50/50 border-l border-zinc-100 flex flex-col h-full p-5 justify-between">
                            <div className="space-y-4">
                                <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-zinc-400 block">Preview</span>
                                {/* Mock Preview Frame */}
                                <div className="w-full aspect-[4/3] bg-white rounded-lg border border-zinc-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex items-center justify-center p-4 relative overflow-hidden">
                                    <ComponentMockupPreview type={hoveredComp} componentSettingsMap={componentSettingsMap} />
                                </div>
                                {/* Description Card */}
                                {(() => {
                                    const hoveredCompDef = availableComponents.find(c => c.type === hoveredComp);
                                    const registryEntry = componentSettingsMap?.[hoveredComp];
                                    const settingsCount = registryEntry?.settings ? Object.keys(registryEntry.settings).length : 0;
                                    return hoveredCompDef ? (
                                        <div className="bg-white border border-zinc-200/60 rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider rounded bg-zinc-100 text-zinc-600`}>
                                                    {registryEntry?.category || "legacy"}
                                                </span>
                                                {settingsCount > 0 && (
                                                    <span className="text-[9.5px] text-zinc-400 font-mono">{settingsCount} options</span>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-[12.5px] font-bold text-zinc-800 leading-tight">
                                                    {registryEntry?.name || hoveredCompDef.label}
                                                </h4>
                                                <p className="text-[11px] text-zinc-400 mt-1 leading-normal">
                                                    {registryEntry?.desc || hoveredCompDef.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ) : null;
                                })()}
                            </div>

                            {/* Insert Action Button */}
                            <button
                                onClick={() => onAddComponent(hoveredComp)}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-zinc-950 hover:bg-zinc-800 text-white text-[12px] font-bold rounded-lg border border-zinc-950 transition-all active:scale-[0.98] shadow-[0_2px_4px_rgba(0,0,0,0.05)] cursor-pointer shrink-0"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Insert Component
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
