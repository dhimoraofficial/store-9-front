"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2, Folder, FolderOpen, Edit2 } from "lucide-react";
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
    onAdd: (parentId: string | null, section: "header" | "main" | "footer" | "global", slotId?: string) => void;
    onUpdateLabel: (id: string, label: string) => void;
}

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
}: any) {
    const [open, setOpen] = useState(true);
    const hasChildren = childrenNodes.length > 0;

    return (
        <div>
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
}: TreeNodeProps) {
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const [open, setOpen] = useState(false);
    
    // Rename/Inline Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [tempLabel, setTempLabel] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Context Menu State
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    const registryEntry = componentSettingsMap?.[node.type];
    const activeLayout = node.settings?.layout || node.settings?.layoutStructure || "default";
    const slots = registryEntry?.slotsConfig
        ? (registryEntry.slotsConfig[activeLayout] || Object.values(registryEntry.slotsConfig)[0])
        : undefined;

    // Close context menu on outside click
    useEffect(() => {
        if (!contextMenu) return;
        const handleClose = () => setContextMenu(null);
        window.addEventListener("click", handleClose);
        window.addEventListener("contextmenu", handleClose);
        return () => {
            window.removeEventListener("click", handleClose);
            window.removeEventListener("contextmenu", handleClose);
        };
    }, [contextMenu]);

    // Handle context menu trigger
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
        });
    };

    // Rename handlers
    const startRename = () => {
        setTempLabel(node.label || componentSettingsMap?.[node.type]?.name || node.type);
        setIsEditing(true);
        setContextMenu(null);
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
                />
            );
        });
    };

    const hasRenderableChildren = hasChildren || (slots && slots.length > 0);

    return (
        <div>
            <div
                onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
                onContextMenu={handleContextMenu}
                className={`group relative flex items-center py-1.5 pr-1 cursor-pointer transition-all duration-150 overflow-hidden ${isSelected
                        ? "bg-zinc-100 text-zinc-950 font-semibold border-l-2 border-zinc-900"
                        : "hover:bg-zinc-50 text-zinc-600 border-l-2 border-transparent"
                    }`}
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

                <div className="flex-1 pr-12">
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
                        <div className="text-[11.5px] whitespace-nowrap select-none leading-snug font-medium truncate">
                            {node.label || componentSettingsMap?.[node.type]?.name || node.type}
                        </div>
                    )}
                </div>

                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-150 bg-inherit pl-2">
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

            {/* Floating Context Menu */}
            {contextMenu && (
                <div
                    style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                    onClick={(e) => e.stopPropagation()}
                    className="fixed z-[9999] min-w-[130px] bg-white border border-zinc-200 rounded-md shadow-lg py-1 flex flex-col text-[11.5px] font-medium text-zinc-700 editor-context-menu"
                >
                    <button
                        onClick={startRename}
                        className="editor-context-menu-item"
                    >
                        <Edit2 className="w-3 h-3" />
                        Rename
                    </button>
                    {(registryEntry?.acceptsChildren !== false) && !slots && (
                        <button
                            onClick={() => {
                                onAdd(node.id, section);
                                setContextMenu(null);
                            }}
                            className="editor-context-menu-item"
                        >
                            <Plus className="w-3 h-3" />
                            Add child
                        </button>
                    )}
                    <button
                        onClick={() => {
                            onDelete(node.id);
                            setContextMenu(null);
                        }}
                        className="editor-context-menu-item text-red-600 hover:text-red-700"
                    >
                        <Trash2 className="w-3 h-3" />
                        Delete
                    </button>
                </div>
            )}

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
