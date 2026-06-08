"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2, Folder, FolderOpen, Edit2, Copy } from "lucide-react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { ComponentSchema } from "@/application/runtime/builder/type";
import { getDynamicComponentIcon } from "./utils";

let globalDraggedId: string | null = null;

interface TreeNodeProps {
    node: ComponentSchema;
    section: "header" | "main" | "footer" | "global";
    isRoot?: boolean;
    selectedId: string | null;
    componentSettingsMap: any;
    onSelect: (id: string | null) => void;
    onDelete: (id: string) => void;
    onAdd: (parentId: string | null, section: "header" | "main" | "footer" | "global", slotId?: string) => void;
    onUpdateLabel: (id: string, label: string) => void;
    onDuplicate: (id: string) => void;
    onMoveToTarget: (dragId: string, dropId: string, position: "before" | "after" | "inside") => void;
    onMoveToSlot: (dragId: string, parentId: string, slotId: string) => void;
}

const isDescendant = (node: ComponentSchema, targetId: string | null): boolean => {
    if (!targetId || !node.children) return false;
    for (const child of node.children) {
        if (child.id === targetId) return true;
        if (isDescendant(child, targetId)) return true;
    }
    return false;
};

function VirtualSlotFolderNode({
    parentId,
    slot,
    childrenNodes,
    section,
    selectedId,
    componentSettingsMap,
    onSelect,
    onDelete,
    onAdd,
    onUpdateLabel,
    onDuplicate,
    onMoveToTarget,
    onMoveToSlot,
}: any) {
    const [open, setOpen] = useState(true);
    const [isDragOver, setIsDragOver] = useState(false);
    const hasChildren = childrenNodes.length > 0;

    const hasSelectedChild = childrenNodes.some(
        (child: any) => child.id === selectedId || isDescendant(child, selectedId)
    );

    useEffect(() => {
        if (hasSelectedChild) {
            setOpen(true);
        }
    }, [hasSelectedChild]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const dragId = e.dataTransfer.getData("text/plain");
        if (dragId) {
            onMoveToSlot(dragId, parentId, slot.id);
        }
    };

    return (
        <div
            className={`transition-all duration-200 rounded ${isDragOver ? "ring-2 ring-indigo-500 bg-indigo-50/20" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className="group relative flex items-center py-1 pr-1 cursor-pointer transition-all duration-150 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded pl-1.5"
            >
                <button
                    onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                    className="p-0.5 rounded shrink-0 mr-1 hover:bg-zinc-200/60 transition-colors"
                >
                    {open
                        ? <ChevronDown className="w-3 h-3 text-zinc-400" />
                        : <ChevronRight className="w-3 h-3 text-zinc-400" />
                    }
                </button>
                
                <span className="shrink-0 mr-1.5 text-zinc-400 group-hover:text-zinc-500 transition-colors">
                    {open ? <FolderOpen className="w-3.5 h-3.5" /> : <Folder className="w-3.5 h-3.5" />}
                </span>

                <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider font-extrabold select-none leading-snug">
                        {slot.label}
                    </div>
                </div>

                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all bg-inherit pl-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onAdd(parentId, section, slot.id); }}
                        className="p-1 rounded-md border border-transparent hover:border-zinc-300 text-zinc-400 hover:text-zinc-700 transition-all"
                        title={`Add component to ${slot.label}`}
                    >
                        <Plus className="w-3 h-3" />
                    </button>
                </span>
            </div>

            {open && (
                <div className="border-l border-dashed border-zinc-200/80 space-y-1 mt-1 pb-0.5 ml-2.5 pl-3">
                    {childrenNodes.map((child: any) => (
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
                            onUpdateLabel={onUpdateLabel}
                            onDuplicate={onDuplicate}
                            onMoveToTarget={onMoveToTarget}
                            onMoveToSlot={onMoveToSlot}
                        />
                    ))}
                    {!hasChildren && (
                        <div className="text-[10px] text-zinc-400 font-medium py-1 select-none pl-1 italic">
                            Empty Slot - Click + to add
                        </div>
                    )}
                </div>
            )}
        </div>
    );
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
    onUpdateLabel,
    onDuplicate,
    onMoveToTarget,
    onMoveToSlot,
}: TreeNodeProps) {
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const [open, setOpen] = useState(false);
    const [dropIndicator, setDropIndicator] = useState<"before" | "after" | "inside" | null>(null);

    const hasSelectedChild = isDescendant(node, selectedId);
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (hasSelectedChild) {
            setOpen(true);
        }
    }, [hasSelectedChild]);

    useEffect(() => {
        if (isSelected && rowRef.current) {
            rowRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [isSelected]);
    
    // Rename/Inline Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [tempLabel, setTempLabel] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const registryEntry = componentSettingsMap?.[node.type];
    const activeLayout = node.settings?.layout || node.settings?.layoutStructure || "default";
    const slots = registryEntry?.slotsConfig
        ? (registryEntry.slotsConfig[activeLayout] || Object.values(registryEntry.slotsConfig)[0])
        : undefined;

    // Rename handlers
    const startRename = () => {
        setTempLabel(node.label || componentSettingsMap?.[node.type]?.name || node.type);
        setIsEditing(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            saveRename();
        } else if (e.key === "Escape") {
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        saveRename();
    };

    const saveRename = () => {
        setIsEditing(false);
        const trimmed = tempLabel.trim();
        if (trimmed && trimmed !== (node.label || componentSettingsMap?.[node.type]?.name || node.type)) {
            onUpdateLabel(node.id, trimmed);
        }
    };

    const renderChildrenTree = () => {
        if (!slots || slots.length === 0) {
            return (node.children || []).map((child) => (
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
                    onUpdateLabel={onUpdateLabel}
                    onDuplicate={onDuplicate}
                    onMoveToTarget={onMoveToTarget}
                    onMoveToSlot={onMoveToSlot}
                />
            ));
        }

        return slots.map((slot: any) => {
            const slotChildren = (node.children || []).filter(
                (child) => child.settings?.slot === slot.id || (slot.id === "center" && !child.settings?.slot)
            );
            
            return (
                <VirtualSlotFolderNode
                    key={slot.id}
                    parentId={node.id}
                    slot={slot}
                    childrenNodes={slotChildren}
                    section={section}
                    selectedId={selectedId}
                    componentSettingsMap={componentSettingsMap}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    onAdd={onAdd}
                    onUpdateLabel={onUpdateLabel}
                    onDuplicate={onDuplicate}
                    onMoveToTarget={onMoveToTarget}
                    onMoveToSlot={onMoveToSlot}
                />
            );
        });
    };

    const hasRenderableChildren = hasChildren || (slots && slots.length > 0);

    const getDropIndicatorClass = () => {
        if (!dropIndicator) return "";
        if (dropIndicator === "before") return "border-t-2 border-t-indigo-500";
        if (dropIndicator === "after") return "border-b-2 border-b-indigo-500";
        if (dropIndicator === "inside") return "bg-indigo-50/40 ring-1 ring-indigo-400";
        return "";
    };

    return (
        <div>
            <ContextMenu.Root>
                <ContextMenu.Trigger>
                    <div
                        ref={rowRef}
                        onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
                        draggable={!isEditing}
                        onDragStart={(e) => {
                            e.stopPropagation();
                            e.dataTransfer.setData("text/plain", node.id);
                            e.dataTransfer.effectAllowed = "move";
                            globalDraggedId = node.id;
                        }}
                        onDragEnd={(e) => {
                            e.stopPropagation();
                            globalDraggedId = null;
                            setDropIndicator(null);
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (globalDraggedId === node.id) return;
                            
                            const rect = e.currentTarget.getBoundingClientRect();
                            const relativeY = e.clientY - rect.top;
                            const height = rect.height;
                            
                            let pos: "before" | "after" | "inside" = "after";
                            const acceptsChildren = registryEntry?.acceptsChildren !== false && !slots;
                            
                            if (acceptsChildren) {
                                if (relativeY < height * 0.3) {
                                    pos = "before";
                                } else if (relativeY > height * 0.7) {
                                    pos = "after";
                                } else {
                                    pos = "inside";
                                }
                            } else {
                                if (relativeY < height * 0.5) {
                                    pos = "before";
                                } else {
                                    pos = "after";
                                }
                            }
                            setDropIndicator(pos);
                        }}
                        onDragLeave={(e) => {
                            e.stopPropagation();
                            setDropIndicator(null);
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDropIndicator(null);
                            const dragId = e.dataTransfer.getData("text/plain");
                            if (dragId && dragId !== node.id && dropIndicator) {
                                onMoveToTarget(dragId, node.id, dropIndicator);
                            }
                        }}
                        className={`group relative flex items-center py-1.5 pr-1 cursor-grab active:cursor-grabbing transition-all duration-150 overflow-hidden ${isSelected
                                ? "bg-zinc-100 text-zinc-950 font-semibold border-l-2 border-zinc-900"
                                : "hover:bg-zinc-50 text-zinc-600 border-l-2 border-transparent"
                            } ${getDropIndicatorClass()}`}
                        style={{ paddingLeft: isRoot ? "12px" : "6px" }}
                    >
                        {hasRenderableChildren ? (
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

                        <div className="flex-1 pr-16">
                            {isEditing ? (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={tempLabel}
                                    onChange={(e) => setTempLabel(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    autoFocus
                                    onFocus={(e) => e.target.select()}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full bg-white text-zinc-950 border border-zinc-300 rounded px-1.5 py-0.5 text-[11px] font-medium focus:outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800"
                                />
                            ) : (
                                <div 
                                    onDoubleClick={(e) => { e.stopPropagation(); startRename(); }}
                                    title="Double-click on comepont name to rename, Single click to expand and dbl click to select, i f"
                                    className="text-[11.5px] whitespace-nowrap select-none leading-snug font-medium truncate"
                                >
                                    {node.label || componentSettingsMap?.[node.type]?.name || node.type}
                                </div>
                            )}
                        </div>

                        <span className="absolute mr-1 right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-150 bg-inherit pl-2">
                            {(registryEntry?.acceptsChildren !== false) && !slots && (
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
                </ContextMenu.Trigger>

                <ContextMenu.Portal>
                    <ContextMenu.Content className="z-[9999] min-w-[130px] bg-white border border-zinc-200 rounded-md shadow-lg py-1 flex flex-col text-[11.5px] font-medium text-zinc-700 editor-context-menu outline-none">
                        <ContextMenu.Item
                            onSelect={startRename}
                            className="editor-context-menu-item outline-none"
                        >
                            <Edit2 className="w-3 h-3" />
                            Rename
                        </ContextMenu.Item>
                        <ContextMenu.Item
                            onSelect={() => onDuplicate(node.id)}
                            className="editor-context-menu-item outline-none"
                        >
                            <Copy className="w-3 h-3" />
                            Duplicate
                        </ContextMenu.Item>
                        {(registryEntry?.acceptsChildren !== false) && !slots && (
                            <ContextMenu.Item
                                onSelect={() => onAdd(node.id, section)}
                                className="editor-context-menu-item outline-none"
                            >
                                <Plus className="w-3 h-3" />
                                Add child
                            </ContextMenu.Item>
                        )}
                        <ContextMenu.Item
                            onSelect={() => onDelete(node.id)}
                            className="editor-context-menu-item text-red-600 hover:text-red-700 outline-none"
                        >
                            <Trash2 className="w-3 h-3" />
                            Delete
                        </ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>

            {hasRenderableChildren && open && (
                <div
                    className="border-l border-zinc-100/80 space-y-1.5 mt-1 pb-0.5"
                    style={{ marginLeft: isRoot ? "20px" : "14px" }}
                >
                    {renderChildrenTree()}
                </div>
            )}
        </div>
    );
}
