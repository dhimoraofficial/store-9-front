"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";
import { getDynamicComponentIcon } from "./utils";

interface TreeNodeProps {
    node: ComponentSchema;
    section: "header" | "main" | "footer" | "global";
    isRoot?: boolean;
    selectedId: string | null;
    componentSettingsMap: any;
    onSelect: (id: string | null) => void;
    onDelete: (id: string) => void;
    onAdd: (parentId: string | null, section: "header" | "main" | "footer" | "global") => void;
}

export default function TreeNode({
    node,
    section,
    isRoot = false,
    selectedId,
    componentSettingsMap,
    onSelect,
    onDelete,
    onAdd,
}: TreeNodeProps) {
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div
                onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
                className={`group relative flex items-center py-1.5 pr-1 cursor-pointer transition-all duration-150 overflow-hidden ${isSelected
                        ? "bg-zinc-100 text-zinc-950 font-semibold border-l-2 border-zinc-900"
                        : "hover:bg-zinc-50 text-zinc-600 border-l-2 border-transparent"
                    }`}
                style={{ paddingLeft: isRoot ? "12px" : "6px" }}
            >
                {hasChildren ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                        className="p-0.5 rounded shrink-0 mr-1 hover:bg-zinc-200/60 transition-colors"
                    >
                        {open
                            ? <ChevronDown className="w-3 h-3 text-zinc-400" />
                            : <ChevronRight className="w-3 h-3 text-zinc-400" />
                        }
                    </button>
                ) : (
                    <span className="w-4 shrink-0 mr-1" />
                )}

                <span className="shrink-0 mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                    {getDynamicComponentIcon(node.type, node.id, componentSettingsMap)}
                </span>

                <div className="flex-1 pr-12">
                    <div className="text-[11.5px] whitespace-nowrap select-none leading-snug font-medium">
                        {node.label || componentSettingsMap?.[node.type]?.name || node.type}
                    </div>
                </div>

                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-150 bg-inherit pl-2">
                    {(componentSettingsMap?.[node.type]?.acceptsChildren !== false) && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onAdd(node.id, section); }}
                            className="p-1 rounded-md border border-transparent hover:border-zinc-300 text-zinc-400 hover:text-zinc-700 transition-all"
                            title="Add child"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    )}
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
                        className="p-1 rounded-md border border-transparent hover:border-red-200  text-zinc-400 hover:text-red-500 transition-all"
                        title="Delete"
                    >
                        <Trash2 className="w-3 h-3" />
                    </button>
                </span>
            </div>

            {/* Children — indented with a subtle left border guide and vertical spacing */}
            {hasChildren && open && (
                <div
                    className="border-l border-zinc-100/80 space-y-1.5 mt-1 pb-0.5"
                    style={{ marginLeft: isRoot ? "20px" : "14px" }}
                >
                    {node.children!.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            section={section}
                            isRoot={false}
                            selectedId={selectedId}
                            componentSettingsMap={componentSettingsMap}
                            onSelect={onSelect}
                            onDelete={onDelete}
                            onAdd={onAdd}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
