"use client";

import React, { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
    Plus,
    Trash2,
    ChevronRight,
    Code2,
    Link,
    AlignLeft,
    Layers,
    Image,
    Columns,
    Square,
    MessageCircle,
    Search,
    Grid,
    CreditCard,
    Maximize2,
    Sidebar,
    ListCollapse,
    Folder,
    Pin,
    Type,
    Sparkles,
    ArrowUpDown,
    Minus,
    Video,
    Star,
    Tag,
    Code,
    Percent,
    MapPin,
    DollarSign,
    Clock,
    FileText,
    CheckSquare,
    Radio,
    ChevronDown,
    Hash,
    Layout,
    Sliders,
    ShoppingBag,
    FolderOpen,
    ShoppingCart,
    Images,
    Laptop
} from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";

interface SidebarLeftProps {
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
}

const LUCIDE_ICONS_MAP: Record<string, React.ComponentType<any>> = {
    Plus,
    X: Plus, // fallback for close/x if needed
    Layout,
    Search,
    Settings2: Sliders,
    Sliders,
    Laptop,
    Code2,
    Link,
    AlignLeft,
    Layers,
    ImageIcon: Image,
    Image,
    Square,
    MessageCircle,
    Grid,
    CreditCard,
    Maximize2,
    Sidebar,
    ListCollapse,
    Folder,
    Pin,
    Columns,
    Type,
    Sparkles,
    ArrowUpDown,
    Minus,
    Video,
    Star,
    Tag,
    Code,
    Percent,
    MapPin,
    DollarSign,
    Clock,
    FileText,
    CheckSquare,
    Radio,
    ChevronDown,
    Hash,
    ShoppingBag,
    FolderOpen,
    ShoppingCart,
    Images
};

/* ─── Helper to select component icon ─── */
function getComponentIcon(type: string, id: string) {
    const lType = type?.toLowerCase() || "";
    const lId = id?.toLowerCase() || "";

    if (lId.includes("announcement")) return <Square className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;
    if (lId.includes("navbar") || lType === "navbar") return <Columns className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;
    if (lId.includes("footer") || lType === "footer") return <Columns className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;

    // Containers
    if (lId.includes("liquid") || lType.includes("liquid") || lType === "box" || lType === "flex_box" || lType === "grid_box" || lType === "card_box" || lType === "carousel_box" || lType === "modal_box" || lType === "drawer_box" || lType === "accordion_box" || lType === "tabs_box" || lType === "sticky_box" || lType === "split_hero_box" || lType === "stack_box" || lType === "masonry_box") return <Code2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;

    // Texts
    if (lType === "text" || lType === "text_block") return <AlignLeft className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;

    // Images & Videos
    if (lType === "image" || lType === "image_block" || lType === "video_block") return <Image className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;

    // Links
    if (lType === "link" || lType === "link_block") return <Link className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;

    // Buttons & Inputs
    if (lType === "button" || lType === "button_block" || lType === "input" || lType === "input_block" || lType === "input_field" || lType === "textarea_field" || lType === "checkbox_field" || lType === "radio_field" || lType === "select_field" || lType === "quantity_selector") return <Square className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;

    // Search
    if (lType === "search_query") return <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;

    // WhatsApp
    if (lId.includes("whatsapp") || lType.includes("whatsapp")) return <MessageCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;

    // Form & loops / other structures
    return <Layers className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;
}

function getDynamicComponentIcon(type: string, id: string, componentSettingsMap: any) {
    const entry = componentSettingsMap?.[type];
    const iconName = entry?.icon;
    if (iconName && LUCIDE_ICONS_MAP[iconName]) {
        const IconComp = LUCIDE_ICONS_MAP[iconName];
        return <IconComp className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;
    }
    return getComponentIcon(type, id);
}

/* ─── Tree Node Component ─── */
function TreeNode({
    node,
    section,
    isRoot = false,
    selectedId,
    componentSettingsMap,
    onSelect,
    onDelete,
    onAdd,
}: {
    node: ComponentSchema;
    section: "header" | "main" | "footer" | "global";
    isRoot?: boolean;
    selectedId: string | null;
    componentSettingsMap: any;
    onSelect: (id: string | null) => void;
    onDelete: (id: string) => void;
    onAdd: (parentId: string | null, section: "header" | "main" | "footer" | "global") => void;
}) {
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const [open, setOpen] = useState(false);

    return (
        <div className="overflow-x-hidden">
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

                <div className="flex-1 min-w-0 pr-12">
                    <div className="text-[11.5px] truncate select-none leading-snug font-medium">
                        {node.label || componentSettingsMap?.[node.type]?.name || node.type}
                    </div>
                </div>

                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-150">
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

export default function SidebarLeft({
    schemas,
    selectedNodeId,
    componentSettingsMap,
    onSelectNode,
    onMoveNode,
    onDeleteNode,
    onAddBlockTrigger,
    onImportSchemaTrigger,
}: SidebarLeftProps) {
    const treeProps = {
        selectedId: selectedNodeId,
        componentSettingsMap,
        onSelect: onSelectNode,
        onDelete: onDeleteNode,
        onAdd: onAddBlockTrigger,
    };

    // Collapse groups if user desires
    const [annOpen, setAnnOpen] = useState(true);
    const [navOpen, setNavOpen] = useState(true);
    const [footOpen, setFootOpen] = useState(true);

    return (
        <aside className="w-[270px] bg-white border-r border-zinc-200 flex flex-col shrink-0 h-full select-none overflow-hidden">
            <ScrollArea.Root className="flex-1 h-full overflow-hidden">
                <ScrollArea.Viewport className="h-full w-full" style={{ overflowY: "scroll" }}>
                    <div className="flex flex-col">
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

                            <div className="space-y-1 overflow-x-hidden">
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

                            <div className="space-y-1 overflow-x-hidden">
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
            </ScrollArea.Root>
        </aside>
    );
}
