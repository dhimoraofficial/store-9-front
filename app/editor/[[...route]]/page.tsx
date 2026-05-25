"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/application/runtime/store";
import { EditorStoreProvider } from "@/application/runtime/store/Provider";
import {
    setSchemas,
    selectNode,
    updateNodeSettings,
    updateNodeLabel,
    deleteNode,
    addNode,
    moveNode,
    setTheme,
    setStatus,
    setError,
} from "@/application/runtime/store/editorSlice";
import { APP } from "@/app";
import { APP_API } from "@/application/providers/api";
import EditorPreviewBuilder from "@/application/runtime/builder/EditorPreviewBuilder";
import ThemeBuilder from "@/application/runtime/builder/ThemeBuilder";
import { ComponentSchema } from "@/application/runtime/builder/type";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import {
    Plus,
    Trash2,
    ChevronUp,
    ChevronDown,
    Save,
    Settings,
    Layers,
    Eye,
    Check,
    AlertCircle,
    X,
    Layout,
    Globe,
    ExternalLink,
    Palette,
    Type,
    Maximize2,
    Sliders
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Available components for popups
const AVAILABLE_COMPONENTS = [
    { type: "box", label: "Box Container", desc: "A generic div container for layout grouping" },
    { type: "button", label: "Button", desc: "An interactive button element" },
    { type: "text", label: "Text", desc: "Typography blocks for titles and descriptions" },
    { type: "image", label: "Image", desc: "A responsive native image container" },
    { type: "icon", label: "Icon", desc: "A scalable vector icon by name" },
    { type: "input", label: "Input Field", desc: "A text field wrapper for forms" },
    { type: "link", label: "Link", desc: "An anchor or Next router link element" },
    { type: "search_query", label: "Search bar", desc: "Input field that performs search redirection" },
];

function ThemeEditorWorkspace() {
    const dispatch = useDispatch();
    const { schemas, theme, selectedNodeId, activeSection, status, error } = useSelector(
        (state: RootState) => state.editor
    );

    const params = useParams();
    const routeParams = params?.route as string[] | undefined;
    const [pageRouteInfo, setPageRouteInfo] = useState<any>(null);

    const [addingToParentId, setAddingToParentId] = useState<string | null>(null);
    const [addingToSection, setAddingToSection] = useState<"header" | "main" | "footer" | "global" | null>(null);
    const [showAddPopup, setShowAddPopup] = useState(false);
    
    // Components schema definition map
    const [componentSettingsMap, setComponentSettingsMap] = useState<any>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const routePath = "/" + (routeParams?.join("/") || "");

    // Load components metadata and schemas on mount / route changes
    useEffect(() => {
        async function loadEditorData() {
            dispatch(setStatus("loading"));
            try {
                // 1. Load component maps
                const compRes = await APP_API.GET("/api/components", {}, undefined, true);
                if (compRes && compRes.success) {
                    setComponentSettingsMap(compRes.components);
                }

                // 2. Load schemas dynamically for the active route
                const res = await APP_API.GET(`/api/schema?route=${encodeURIComponent(routePath)}`, {}, undefined, true);
                
                if (res && res.success) {
                    const loadedSchemas: any = {
                        announcement: null,
                        navbar: null,
                        footer: null,
                        whatsAppButton: null,
                        main: []
                    };

                    // Extract globals
                    res.globals?.forEach((layout: any) => {
                        const schemaObj = Array.isArray(layout._c) ? layout._c[0] : layout._c;
                        if (layout.for === "announcement") {
                            loadedSchemas.announcement = schemaObj || null;
                        } else if (layout.for === "navbar") {
                            loadedSchemas.navbar = schemaObj || null;
                        } else if (layout.for === "footer") {
                            loadedSchemas.footer = schemaObj || null;
                        } else if (layout.id === "whatsAppButton") {
                            loadedSchemas.whatsAppButton = schemaObj || null;
                        }
                    });

                    // Extract main layout
                    if (res.pageLayout) {
                        loadedSchemas.main = res.pageLayout._c || [];
                    }

                    dispatch(setSchemas(loadedSchemas));
                    setPageRouteInfo(res.pageRoute || null);

                    if (res.theme?.config) {
                        dispatch(setTheme(res.theme.config));
                    }
                }
                dispatch(setStatus("idle"));
            } catch (err: any) {
                dispatch(setError(err.message || "Failed to load data"));
                dispatch(setStatus("failed"));
                toast.error("Failed to load layout schemas from database.");
            }
        }

        loadEditorData();
    }, [dispatch, routePath]);

    // Save schemas back to MongoDB
    const handleSave = async () => {
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please fix all validation errors before saving.");
            return;
        }

        dispatch(setStatus("saving"));
        const saveToast = toast.loading("Saving changes to database...");

        try {
            // Save globals using the clean ApplicationLayout schema formats
            if (schemas.announcement) {
                await APP_API.POST("/api/schema", { key: "announcement", type: "global", for: "announcement", schema: [schemas.announcement] } as any, false, {}, undefined, true);
            }
            if (schemas.navbar) {
                await APP_API.POST("/api/schema", { key: "navbar", type: "global", for: "navbar", schema: [schemas.navbar] } as any, false, {}, undefined, true);
            }
            if (schemas.footer) {
                await APP_API.POST("/api/schema", { key: "footer", type: "global", for: "footer", schema: [schemas.footer] } as any, false, {}, undefined, true);
            }
            if (schemas.whatsAppButton) {
                await APP_API.POST("/api/schema", { key: "whatsAppButton", type: "global", for: "main", schema: [schemas.whatsAppButton] } as any, false, {}, undefined, true);
            }

            // Save the active route layout document
            const activeLayoutId = pageRouteInfo?.layout || (routePath === "/" ? "homepage" : routePath.substring(1).replace(/[^a-zA-Z0-9]/g, "-"));
            await APP_API.POST("/api/schema", { key: activeLayoutId, type: "custom", for: "main", schema: schemas.main } as any, false, {}, undefined, true);

            // Save theme config
            await APP_API.POST("/api/schema", { key: "theme", type: "global", for: "main", schema: theme } as any, false, {}, undefined, true);

            dispatch(setStatus("idle"));
            toast.success("All layout schemas and theme saved successfully!", { id: saveToast });
        } catch (err: any) {
            dispatch(setError(err.message));
            dispatch(setStatus("failed"));
            toast.error("Failed to save schemas.", { id: saveToast });
        }
    };

    // Find a selected node recursively to inspect its values
    const findNodeInTree = (nodes: ComponentSchema[], id: string): ComponentSchema | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findNodeInTree(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const getSelectedNode = (): ComponentSchema | null => {
        if (!selectedNodeId) return null;
        const roots = [
            schemas.announcement,
            schemas.navbar,
            schemas.footer,
            schemas.whatsAppButton,
            ...schemas.main,
        ].filter(Boolean) as ComponentSchema[];

        return findNodeInTree(roots, selectedNodeId);
    };

    const selectedNode = getSelectedNode();

    // Trigger Figma-style popup to add component
    const triggerAddPopup = (parentId: string | null, section: "header" | "main" | "footer" | "global") => {
        setAddingToParentId(parentId);
        setAddingToSection(section);
        setShowAddPopup(true);
    };

    // Handle adding a component from popup
    const handleAddComponent = (type: string) => {
        const randId = `${type}_${Math.random().toString(36).substr(2, 6)}`;
        const newNode: ComponentSchema = {
            id: randId,
            type: type as any,
            settings: {},
            label: type === "text" || type === "button" || type === "link" ? `New ${type}` : undefined,
            children: [],
        };

        dispatch(addNode({ parentId: addingToParentId, section: addingToSection!, node: newNode }));
        dispatch(selectNode(randId)); // Focus new component
        setShowAddPopup(false);
        setAddingToParentId(null);
        setAddingToSection(null);
        toast.success(`Added component: ${type}`);
    };

    // Handle updating setting field
    const handleUpdateSetting = (settingKey: string, val: string, settingConfig: any) => {
        if (!selectedNode) return;

        // Perform validation
        let isValid = true;
        if (settingConfig) {
            const rgx = settingConfig.rgx;
            const opt = settingConfig.opt;

            if (rgx) {
                const regex = new RegExp(rgx);
                isValid = regex.test(val) || (opt && opt.includes(val)) || val === "";
            } else if (opt) {
                isValid = opt.includes(val) || val === "";
            }
        }

        const newErrors = { ...validationErrors };
        if (!isValid) {
            newErrors[settingKey] = `Value "${val}" is invalid. Expected format: ${settingConfig?.rgx || "options mismatch"}`;
        } else {
            delete newErrors[settingKey];
        }
        setValidationErrors(newErrors);

        const currentSettings = { ...(selectedNode.settings || {}) };
        if (val === "") {
            delete currentSettings[settingKey];
        } else {
            currentSettings[settingKey] = val;
        }

        dispatch(updateNodeSettings({ id: selectedNode.id, settings: currentSettings }));
    };

    // Render tree node recursive component
    const renderTreeNode = (node: ComponentSchema, depth: number = 0) => {
        if (!node) return null;
        const isSelected = selectedNodeId === node.id;
        const hasChildren = node.children && node.children.length > 0;

        return (
            <div key={node.id} className="select-none group">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(selectNode(node.id));
                    }}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition-all duration-150 ${
                        isSelected
                            ? "bg-slate-900 text-white font-medium shadow-sm"
                            : "hover:bg-slate-100 text-slate-700"
                    }`}
                    style={{ marginLeft: `${depth * 12}px` }}
                >
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? "bg-slate-800 text-slate-200 border border-slate-700" : "bg-slate-200/70 text-slate-600"
                        }`}>
                            {node.type}
                        </span>
                        <span className="text-xs truncate max-w-[120px] font-mono">{node.id}</span>
                    </div>

                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            title="Move Up"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(moveNode({ id: node.id, direction: "up" }));
                            }}
                            className={`p-1 rounded ${isSelected ? "hover:bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-500"}`}
                        >
                            <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                            title="Move Down"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(moveNode({ id: node.id, direction: "down" }));
                            }}
                            className={`p-1 rounded ${isSelected ? "hover:bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-500"}`}
                        >
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                            title="Add Child"
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerAddPopup(node.id, activeSection || "main");
                            }}
                            className={`p-1 rounded ${isSelected ? "hover:bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-500"}`}
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                            title="Delete"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(deleteNode({ id: node.id }));
                                toast.success(`Removed component: ${node.id}`);
                            }}
                            className={`p-1 rounded ${isSelected ? "hover:bg-slate-800 text-red-400" : "hover:bg-slate-200 text-red-500"}`}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {hasChildren && (
                    <div className="mt-0.5 border-l border-slate-200 ml-3">
                        {node.children!.map((child) => renderTreeNode(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    // Color pickers / inputs mapping helper
    const renderThemeInput = (label: string, key: string, category: 'color' | 'text' | 'select', options?: string[]) => {
        const value = theme?.[key] || "";
        return (
            <div className="flex flex-col gap-1.5" key={key}>
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-600 capitalize">{label}</span>
                    <span className="text-[10px] font-mono text-slate-400">{key}</span>
                </div>
                
                {category === 'color' && (
                    <div className="flex gap-2">
                        <div className="relative w-8 h-8 rounded-md border border-slate-200 overflow-hidden shrink-0 shadow-sm">
                            <input 
                                type="color" 
                                value={value.startsWith("#") && value.length === 7 ? value : "#ffffff"} 
                                onChange={(e) => dispatch(setTheme({ [key]: e.target.value }))}
                                className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0"
                            />
                        </div>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => dispatch(setTheme({ [key]: e.target.value }))}
                            className="flex-1 border border-slate-200 rounded-md px-2.5 py-1 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none bg-slate-50/50"
                            placeholder="#HEX or CSS color"
                        />
                    </div>
                )}

                {category === 'text' && (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => dispatch(setTheme({ [key]: e.target.value }))}
                        className="w-full border border-slate-200 rounded-md px-2.5 py-1 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none bg-slate-50/50"
                        placeholder="e.g. 8px, Roboto, 1rem"
                    />
                )}

                {category === 'select' && options && (
                    <select
                        value={value}
                        onChange={(e) => dispatch(setTheme({ [key]: e.target.value }))}
                        className="w-full border border-slate-200 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white"
                    >
                        {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
            {/* ── HEADER BAR ─────────────────────────────────────── */}
            <header className="h-14 bg-slate-950 text-white flex items-center justify-between px-6 border-b border-slate-900 shadow-md shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <span className="text-slate-950 font-black text-sm">D</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xs leading-none">Dhimora Workspace</span>
                        <span className="text-[9px] text-slate-400 mt-1 font-mono tracking-wide">
                            Editor Server v1.0.2
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 font-mono">
                        <span className="text-slate-500">Tenant:</span>
                        <span className="text-slate-200">{APP.tenant?.slice(0, 8)}...</span>
                        <span className="text-slate-500 ml-2">Store:</span>
                        <span className="text-slate-200">{APP.store?.slice(0, 8)}...</span>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={status === "saving" || status === "loading"}
                        className="flex items-center gap-1.5 bg-white text-slate-950 hover:bg-slate-100 disabled:opacity-50 text-[11px] font-semibold px-4 py-1.5 rounded-lg shadow-sm active:scale-95 transition-all"
                    >
                        <Save className="w-3.5 h-3.5" />
                        {status === "saving" ? "Saving..." : "Save Configs"}
                    </button>
                </div>
            </header>

            {/* ── MAIN WORKSPACE CONTAINER ──────────────────────── */}
            <main className="flex-1 flex overflow-hidden">
                
                {/* ── LEFT PANEL: HIERARCHY TREE ───────────────────── */}
                <section className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm select-none">
                    <div className="h-11 border-b border-slate-150 flex items-center px-4 justify-between bg-slate-50/50">
                        <h2 className="font-semibold text-slate-800 flex items-center gap-2 text-xs">
                            <Layers className="w-3.5 h-3.5 text-slate-500" />
                            Layout Hierarchy
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-5">
                        
                        {/* 1. ANNOUNCEMENT SECTION */}
                        <div className="space-y-1.5">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Announcement Bar</span>
                                <button
                                    onClick={() => triggerAddPopup(null, "header")}
                                    className="text-slate-500 hover:text-slate-800 p-0.5"
                                    title="Add Announcement"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </h3>
                            <div className="space-y-1 p-2 bg-slate-50/70 rounded-lg border border-slate-100">
                                {schemas.announcement && renderTreeNode(schemas.announcement)}
                                {!schemas.announcement && (
                                    <div className="text-[10px] text-slate-400 italic p-1">No announcement items</div>
                                )}
                            </div>
                        </div>

                        {/* 2. NAVIGATION/HEADER SECTION */}
                        <div className="space-y-1.5">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Navbar/Header</span>
                                <button
                                    onClick={() => triggerAddPopup(null, "header")}
                                    className="text-slate-500 hover:text-slate-800 p-0.5"
                                    title="Add Header Element"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </h3>
                            <div className="space-y-1 p-2 bg-slate-50/70 rounded-lg border border-slate-100">
                                {schemas.navbar && renderTreeNode(schemas.navbar)}
                                {!schemas.navbar && (
                                    <div className="text-[10px] text-slate-400 italic p-1">No header items</div>
                                )}
                            </div>
                        </div>

                        {/* 3. MAIN/PAGE BODY SECTION */}
                        <div className="space-y-1.5">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Main Layout (SP Body)</span>
                                <button
                                    onClick={() => triggerAddPopup(null, "main")}
                                    className="text-slate-500 hover:text-slate-800 p-0.5"
                                    title="Add Section block"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </h3>
                            <div className="space-y-1 p-2 bg-slate-50/70 rounded-lg border border-slate-100 max-h-72 overflow-y-auto">
                                {schemas.main && schemas.main.map((node) => renderTreeNode(node))}
                                {(!schemas.main || schemas.main.length === 0) && (
                                    <div className="text-[10px] text-slate-400 italic p-1">No sections added</div>
                                )}
                            </div>
                        </div>

                        {/* 4. FOOTER SECTION */}
                        <div className="space-y-1.5">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Footer</span>
                                <button
                                    onClick={() => triggerAddPopup(null, "footer")}
                                    className="text-slate-500 hover:text-slate-800 p-0.5"
                                    title="Add Footer Element"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </h3>
                            <div className="space-y-1 p-2 bg-slate-50/70 rounded-lg border border-slate-100">
                                {schemas.footer && renderTreeNode(schemas.footer)}
                                {!schemas.footer && (
                                    <div className="text-[10px] text-slate-400 italic p-1">No footer items</div>
                                )}
                            </div>
                        </div>

                        {/* 5. GLOBAL FLOATING SECTION */}
                        <div className="space-y-1.5">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Global Utilities</span>
                                <button
                                    onClick={() => triggerAddPopup(null, "global")}
                                    className="text-slate-500 hover:text-slate-800 p-0.5"
                                    title="Add Global Utility"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </h3>
                            <div className="space-y-1 p-2 bg-slate-50/70 rounded-lg border border-slate-100">
                                {schemas.whatsAppButton && renderTreeNode(schemas.whatsAppButton)}
                                {!schemas.whatsAppButton && (
                                    <div className="text-[10px] text-slate-400 italic p-1">No global items</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CENTER PANEL: LIVE PREVIEW SANDBOX ──────────── */}
                <section className="flex-1 flex flex-col p-6 overflow-y-auto">
                    <div className="mb-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                            <Eye className="w-4 h-4 text-slate-400" />
                            Live Sandbox Preview (Changes apply in real-time)
                        </div>
                        <div className="bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1 rounded-md font-mono flex items-center gap-1.5 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Active layout: / (SP Route)
                        </div>
                    </div>

                    <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[550px]">
                        {/* Address Bar */}
                        <div className="h-9 bg-slate-50 border-b border-slate-150 flex items-center px-4 gap-2 justify-between">
                            <div className="flex gap-1.5 shrink-0">
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                            </div>
                            <div className="w-full max-w-md bg-white border border-slate-200 rounded-md text-[10px] px-3 py-0.5 text-slate-400 flex items-center gap-1.5 shadow-inner shrink-0">
                                <Globe className="w-3 h-3 text-slate-300" />
                                <span>http://localhost:3000/</span>
                            </div>
                            <div className="w-8 shrink-0"></div>
                        </div>

                        {/* Rendering sandbox contents using Live Redux Theme Configs */}
                        <ThemeBuilder themeConfigs={theme || {}}>
                            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
                                {schemas.announcement && <EditorPreviewBuilder schema={schemas.announcement} />}
                                {schemas.navbar && <EditorPreviewBuilder schema={schemas.navbar} />}
                                
                                <div className="min-h-[300px] p-4 bg-white border border-dashed border-slate-200 rounded-lg shadow-sm">
                                    {schemas.main && schemas.main.length > 0 ? (
                                        <EditorPreviewBuilder schema={schemas.main} />
                                    ) : (
                                        <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-xs">
                                            <Layout className="w-7 h-7 mb-2 text-slate-300" />
                                            Main body area is empty. Add elements in hierarchy.
                                        </div>
                                    )}
                                </div>

                                {schemas.footer && <EditorPreviewBuilder schema={schemas.footer} />}
                                {schemas.whatsAppButton && <EditorPreviewBuilder schema={schemas.whatsAppButton} />}
                            </div>
                        </ThemeBuilder>
                    </div>
                </section>

                {/* ── RIGHT PANEL: INSPECTOR (RADIX TABS) ─────────── */}
                <section className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-sm">
                    <Tabs.Root defaultValue="properties" className="flex-1 flex flex-col overflow-hidden">
                        <Tabs.List className="flex border-b border-slate-200 bg-slate-50 shrink-0 h-11">
                            <Tabs.Trigger 
                                value="properties" 
                                className="flex-1 text-[11px] font-bold text-slate-500 hover:text-slate-900 data-[state=active]:text-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-slate-900 focus:outline-none transition-all"
                            >
                                Properties
                            </Tabs.Trigger>
                            <Tabs.Trigger 
                                value="theme" 
                                className="flex-1 text-[11px] font-bold text-slate-500 hover:text-slate-900 data-[state=active]:text-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-slate-900 focus:outline-none transition-all"
                            >
                                Global Theme
                            </Tabs.Trigger>
                        </Tabs.List>

                        {/* properties inspector tab */}
                        <Tabs.Content value="properties" className="flex-1 overflow-y-auto p-4 focus:outline-none">
                            {selectedNode ? (
                                <div className="space-y-5">
                                    {/* Selected component identity */}
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                                        <Sliders className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                        <div className="overflow-hidden">
                                            <span className="text-[9px] uppercase font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                                                {selectedNode.type}
                                            </span>
                                            <div className="text-[10px] text-slate-400 font-mono mt-1.5 truncate">
                                                ID: {selectedNode.id}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Label Editor */}
                                    {(selectedNode.type === "text" ||
                                        selectedNode.type === "button" ||
                                        selectedNode.type === "link") && (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                                Content Text
                                            </label>
                                            <input
                                                type="text"
                                                value={selectedNode.label || ""}
                                                onChange={(e) =>
                                                    dispatch(
                                                        updateNodeLabel({
                                                            id: selectedNode.id,
                                                            label: e.target.value || null,
                                                        })
                                                    )
                                                }
                                                className="w-full text-xs border border-slate-200 rounded-md px-3 py-1.5 focus:ring-1 focus:ring-slate-900 focus:outline-none shadow-sm bg-slate-50/50"
                                                placeholder="Label text..."
                                            />
                                        </div>
                                    )}

                                    {/* Custom dynamic fields */}
                                    {componentSettingsMap ? (
                                        <div className="space-y-5">
                                            {/* Dynamic Component Settings */}
                                            {componentSettingsMap[selectedNode.type] && (
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
                                                        Component Settings
                                                    </h4>
                                                    {Object.entries(componentSettingsMap[selectedNode.type]).map(
                                                        ([key, config]: [string, any]) => {
                                                            const currentVal = selectedNode.settings?.[key] ?? "";
                                                            return (
                                                                <div key={key} className="flex flex-col gap-1.5">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-[11px] font-medium text-slate-600">{key}</span>
                                                                        <span className="text-[9px] text-slate-400 uppercase font-mono">({config.tp})</span>
                                                                    </div>

                                                                    {config.opt ? (
                                                                        <select
                                                                            value={currentVal}
                                                                            onChange={(e) =>
                                                                                handleUpdateSetting(key, e.target.value, config)
                                                                            }
                                                                            className="w-full text-xs border border-slate-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-sm"
                                                                        >
                                                                            <option value="">(None)</option>
                                                                            {config.opt.map((optVal: string) => (
                                                                                <option key={optVal} value={optVal}>
                                                                                    {optVal}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    ) : (
                                                                        <input
                                                                            type="text"
                                                                            value={currentVal}
                                                                            onChange={(e) =>
                                                                                handleUpdateSetting(key, e.target.value, config)
                                                                            }
                                                                            className={`w-full text-xs border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 ${
                                                                                validationErrors[key]
                                                                                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                                                                                    : "border-slate-200 focus:ring-slate-900"
                                                                            }`}
                                                                            placeholder={config.rgx ? `e.g. ${config.rgx}` : "value..."}
                                                                        />
                                                                    )}
                                                                    {validationErrors[key] && (
                                                                        <p className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                                                                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                                                            Format mismatch
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}

                                            {/* Common styling options */}
                                            {componentSettingsMap.common && (
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
                                                        Common Layout & styles
                                                    </h4>
                                                    {Object.entries(componentSettingsMap.common).map(
                                                        ([key, config]: [string, any]) => {
                                                            const currentVal = selectedNode.settings?.[key] ?? "";
                                                            if (Array.isArray(config)) return null;

                                                            return (
                                                                <div key={key} className="flex flex-col gap-1.5">
                                                                    <span className="text-[11px] font-medium text-slate-600">{key} ({config.as})</span>

                                                                    {config.opt ? (
                                                                        <select
                                                                            value={currentVal}
                                                                            onChange={(e) =>
                                                                                handleUpdateSetting(key, e.target.value, config)
                                                                            }
                                                                            className="w-full text-xs border border-slate-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-sm"
                                                                        >
                                                                            <option value="">(None)</option>
                                                                            {config.opt.map((optVal: string) => (
                                                                                <option key={optVal} value={optVal}>
                                                                                    {optVal}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    ) : (
                                                                        <input
                                                                            type="text"
                                                                            value={currentVal}
                                                                            onChange={(e) =>
                                                                                handleUpdateSetting(key, e.target.value, config)
                                                                            }
                                                                            className={`w-full text-xs border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 ${
                                                                                validationErrors[key]
                                                                                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                                                                                    : "border-slate-200 focus:ring-slate-900"
                                                                            }`}
                                                                            placeholder={config.rgx ? "e.g. 1rem, 16px" : "value..."}
                                                                        />
                                                                    )}
                                                                    {validationErrors[key] && (
                                                                        <p className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                                                                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                                                            Requires rem unit (e.g. 1rem)
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-xs text-slate-400 italic">
                                            Loading settings manifest...
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-4">
                                    <Layers className="w-7 h-7 mb-2 text-slate-300" />
                                    Select an element from hierarchy or preview to start editing properties.
                                </div>
                            )}
                        </Tabs.Content>

                        {/* global theme config inspector tab */}
                        <Tabs.Content value="theme" className="flex-1 overflow-y-auto p-4 space-y-6 focus:outline-none">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-1.5">
                                    <Palette className="w-3.5 h-3.5" />
                                    Brand Palette
                                </h4>
                                {renderThemeInput("Primary Brand", "primary", "color")}
                                {renderThemeInput("Secondary Brand", "secondary", "color")}
                                {renderThemeInput("Accent Accent", "accent", "color")}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-1.5">
                                    <Palette className="w-3.5 h-3.5" />
                                    Surfaces & Neutral Text
                                </h4>
                                {renderThemeInput("Canvas Background", "bgApp", "color")}
                                {renderThemeInput("Surface Background", "bgSurface", "color")}
                                {renderThemeInput("Navigation Sidebar", "bgNavigation", "color")}
                                {renderThemeInput("Main Text readability", "textMain", "color")}
                                {renderThemeInput("Secondary/Muted text", "textMuted", "color")}
                                {renderThemeInput("Inverted/Light text", "textInverted", "color")}
                                {renderThemeInput("Borders outline", "borderPrimary", "color")}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-1.5">
                                    <Sliders className="w-3.5 h-3.5" />
                                    Interactive Buttons
                                </h4>
                                {renderThemeInput("Button Border Radius", "btnRadius", "text")}
                                {renderThemeInput("Button Padding (X Y)", "btnPaddingBase", "text")}
                                {renderThemeInput("Button Hover opacity", "btnHoverOpacity", "text")}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-1.5">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    Sizing & Spacing Scale
                                </h4>
                                {renderThemeInput("Core multiplier unit", "spacingUnit", "text")}
                                {renderThemeInput("Max Container width", "containerMaxWidth", "text")}
                                {renderThemeInput("Grid Gutter Spacing", "gridGutter", "text")}
                                {renderThemeInput("Base Border Radius", "borderRadiusBase", "text")}
                                {renderThemeInput("Card/Large Border Radius", "borderRadiusLarge", "text")}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-1.5">
                                    <Type className="w-3.5 h-3.5" />
                                    Brand Typography
                                </h4>
                                {renderThemeInput("Sans Serif Font Family", "fontFamilySans", "select", ["Inter", "Roboto", "Outfit", "system-ui", "sans-serif"])}
                                {renderThemeInput("Mono Font Family", "fontFamilyMono", "select", ["JetBrains Mono", "Roboto", "monospace"])}
                                {renderThemeInput("Root font-size", "fontSizeRoot", "text")}
                                {renderThemeInput("Text Line Height multiplier", "lineHeightBase", "text")}
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>
                </section>
            </main>

            {/* ── RADIX DIALOG MODAL FOR INSERTING ELEMENT ─────── */}
            <Dialog.Root open={showAddPopup} onOpenChange={setShowAddPopup}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 transition-opacity" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md max-h-[450px] rounded-xl shadow-xl flex flex-col border border-slate-200 overflow-hidden z-50 outline-none animate-in fade-in zoom-in-95 duration-150">
                        {/* Title & Description for accessibility */}
                        <div className="sr-only">
                            <Dialog.Title>Insert Layout Element</Dialog.Title>
                            <Dialog.Description>Select a component block to add to your layout hierarchy</Dialog.Description>
                        </div>
                        
                        {/* Modal Header */}
                        <div className="h-12 border-b border-slate-150 flex items-center justify-between px-5 bg-slate-50 shrink-0">
                            <span className="font-semibold text-slate-800 text-xs">
                                Insert Layout Element
                            </span>
                            <Dialog.Close asChild>
                                <button className="text-slate-400 hover:text-slate-600 p-0.5 rounded hover:bg-slate-200/50 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </Dialog.Close>
                        </div>

                        {/* List items */}
                        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 gap-2 bg-white">
                            {AVAILABLE_COMPONENTS.map((comp) => (
                                <button
                                    key={comp.type}
                                    onClick={() => handleAddComponent(comp.type)}
                                    className="flex items-start text-left p-3 border border-slate-100 rounded-lg hover:border-slate-300 hover:bg-slate-50/70 transition-all group/item"
                                >
                                    <div className="bg-slate-100 text-slate-700 rounded p-2 mr-3 font-mono text-[10px] uppercase font-bold group-hover/item:bg-slate-900 group-hover/item:text-white transition-colors">
                                        {comp.type.substring(0, 3)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-semibold text-slate-700 group-hover/item:text-slate-900">
                                            {comp.label}
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                                            {comp.desc}
                                        </div>
                                    </div>
                                    <Plus className="w-4 h-4 text-slate-300 self-center opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
                                </button>
                            ))}
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <Toaster position="bottom-right" toastOptions={{ style: { fontSize: "12px" } }} />
        </div>
    );
}

export default function Page() {
    return (
        <EditorStoreProvider>
            <ThemeEditorWorkspace />
        </EditorStoreProvider>
    );
}
