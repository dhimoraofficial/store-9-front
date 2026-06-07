"use client";

import React, { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Plus, ChevronRight, Columns, Code } from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";
import TreeNode from "./TreeNode";

interface SidebarLeftProps {
    width?: number;
    schemas: {
        announcement: ComponentSchema[];
        navbar: ComponentSchema[];
        main: ComponentSchema[];
        footer: ComponentSchema[];
        whatsAppButton: ComponentSchema[];
    };
    selectedNodeId: string | null;
    componentSettingsMap: any;
    onSelectNode: (id: string | null) => void;
    onMoveNode: (id: string, direction: "up" | "down") => void;
    onDeleteNode: (id: string) => void;
    onAddBlockTrigger: (parentId: string | null, section: "header" | "main" | "footer" | "global") => void;
    onImportSchemaTrigger: (section: "announcement" | "navbar" | "footer" | "main") => void;
    onUpdateLabel: (id: string, label: string) => void;
}

export default function SidebarLeft({
    width = 270,
    schemas,
    selectedNodeId,
    componentSettingsMap,
    onSelectNode,
    onMoveNode,
    onDeleteNode,
    onAddBlockTrigger,
    onImportSchemaTrigger,
    onUpdateLabel,
}: SidebarLeftProps) {
    const treeProps = {
        selectedId: selectedNodeId,
        componentSettingsMap,
        onSelect: onSelectNode,
        onDelete: onDeleteNode,
        onAdd: onAddBlockTrigger,
        onUpdateLabel,
    };

    const [annOpen, setAnnOpen] = useState(true);
    const [navOpen, setNavOpen] = useState(true);

    return (
        <aside 
            style={{ width: `${width}px` }}
            className="bg-white border-r border-zinc-200 flex flex-col shrink-0 h-full select-none overflow-hidden"
        >
            <ScrollArea.Root className="flex-1 h-full overflow-hidden">
                <ScrollArea.Viewport className="h-full w-full">
                    <div className="flex flex-col min-w-full w-max">
                        <div className="border-b border-zinc-100 pb-2">
                            <div className="flex items-center justify-between px-3.5 pt-3 pb-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-3.5 bg-zinc-800 rounded-full" />
                                    <span className="text-[10.5px] font-extrabold text-zinc-700 uppercase tracking-widest">Header</span>
                                </div>
                                <button
                                    onClick={() => onAddBlockTrigger("navbar", "header")}
                                    className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
                                    title="Add section to header"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="w-full">
                                <div
                                    onClick={() => setAnnOpen(!annOpen)}
                                    className="group flex items-center justify-between py-[7px] px-3.5 hover:bg-zinc-50 text-zinc-700 cursor-pointer"
                                >
                                    <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                                        <ChevronRight className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform ${annOpen ? "rotate-90" : ""}`} />
                                        <Columns className="w-4 h-4 text-zinc-500 shrink-0" />
                                        <span className="text-[12.5px] font-semibold text-zinc-800 truncate flex-1 min-w-0">Announcement bar</span>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1.5">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onImportSchemaTrigger("announcement"); }}
                                            className="p-0.5 rounded hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700"
                                            title="Import JSON schema"
                                        >
                                            <Code className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onAddBlockTrigger("announcement", "header"); }}
                                            className="p-0.5 rounded hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700"
                                            title="Add block"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                                {annOpen && (
                                    <div className="space-y-1 border-l border-zinc-100/85" style={{ marginLeft: "22px" }}>
                                        {schemas.announcement.map((node) => (
                                            <TreeNode key={node.id} node={node} section="header" isRoot={false} {...treeProps} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-full mt-0.5">
                                <div
                                    onClick={() => setNavOpen(!navOpen)}
                                    className="group flex items-center justify-between py-[7px] px-3.5 hover:bg-zinc-50 text-zinc-700 cursor-pointer"
                                >
                                    <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                                        <ChevronRight className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform ${navOpen ? "rotate-90" : ""}`} />
                                        <Columns className="w-4 h-4 text-zinc-500 shrink-0" />
                                        <span className="text-[12.5px] font-semibold text-zinc-800 truncate flex-1 min-w-0">Header</span>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1.5">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onImportSchemaTrigger("navbar"); }}
                                            className="p-0.5 rounded hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700"
                                            title="Import JSON schema"
                                        >
                                            <Code className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onAddBlockTrigger("navbar", "header"); }}
                                            className="p-0.5 rounded hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700"
                                            title="Add block"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                                {navOpen && (
                                    <div className="space-y-1.5 mt-1  border-l border-zinc-100/85" style={{ marginLeft: "22px" }}>
                                        {schemas.navbar.map((node) => (
                                            <TreeNode key={node.id} node={node} section="header" isRoot={false} {...treeProps} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="border-b border-zinc-100 pb-2">
                            <div className="flex items-center justify-between px-3.5 pt-3.5 pb-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-3.5 bg-zinc-800 rounded-full" />
                                    <span className="text-[10.5px] font-extrabold text-zinc-700 uppercase tracking-widest">Template</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => onImportSchemaTrigger("main")}
                                        className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
                                        title="Import JSON schema"
                                    >
                                        <Code className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onAddBlockTrigger(null, "main")}
                                        className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
                                        title="Add section to template"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                {schemas.main.length === 0 ? (
                                    <button
                                        onClick={() => onAddBlockTrigger(null, "main")}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer group"
                                    >
                                        <div className="w-5 h-5 rounded border border-dashed border-zinc-300 group-hover:border-zinc-400 flex items-center justify-center transition-colors shrink-0">
                                            <Plus className="w-3 h-3" />
                                        </div>
                                        <span className="text-[11.5px] font-medium">Add your first block</span>
                                    </button>
                                ) : (
                                    schemas.main.map((node) => (
                                        <TreeNode key={node.id} node={node} section="main" isRoot={true} {...treeProps} />
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="pb-4">
                            <div className="flex items-center justify-between px-3.5 pt-3.5 pb-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-3.5 bg-zinc-800 rounded-full" />
                                    <span className="text-[10.5px] font-extrabold text-zinc-700 uppercase tracking-widest">Footer</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => onImportSchemaTrigger("footer")}
                                        className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
                                        title="Import JSON schema"
                                    >
                                        <Code className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onAddBlockTrigger("footer", "footer")}
                                        className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
                                        title="Add section to footer"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                {schemas.footer.length === 0 ? (
                                    <button
                                        onClick={() => onAddBlockTrigger("footer", "footer")}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer group"
                                    >
                                        <div className="w-5 h-5 rounded border border-dashed border-zinc-300 group-hover:border-zinc-400 flex items-center justify-center transition-colors shrink-0">
                                            <Plus className="w-3 h-3" />
                                        </div>
                                        <span className="text-[11.5px] font-medium">Add footer block</span>
                                    </button>
                                ) : (
                                    schemas.footer.map((node) => (
                                        <TreeNode key={node.id} node={node} section="footer" isRoot={true} {...treeProps} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical" className="w-1.5 p-0.5">
                    <ScrollArea.Thumb className="bg-zinc-200 rounded-lg hover:bg-zinc-300" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar orientation="horizontal" className="h-1.5 p-0.5">
                    <ScrollArea.Thumb className="bg-zinc-200 rounded-lg hover:bg-zinc-300" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </aside>
    );
}
