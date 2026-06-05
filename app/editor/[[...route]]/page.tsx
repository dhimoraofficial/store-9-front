"use client";

import { APP_API } from "@/application/providers/api";
import ThemeBuilder from "@/application/runtime/builder/ThemeBuilder";
import { ComponentSchema } from "@/application/runtime/builder/type";
import {
    addNode,
    deleteNode,
    moveNode,
    selectNode,
    setError,
    setSchemas,
    setStatus,
    setTheme,
    updateNodeAction,
    updateNodeLabel,
    updateNodeSettings,
} from "@/bundles/store/editorSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CanvasViewport from "../CanvasViewport";

import EditorPreviewBuilder from "@/application/runtime/builder/EditorPreviewBuilder";
import { RootState } from "@/bundles/store";
import EditorHeader, { ViewportMode } from "../EditorHeader";
import SidebarLeft from "../sidebar-left";
import SidebarRight from "../sidebar-right";
import AddComponentDialog from "./AddComponentDialog";
import ImportSchemaDialog from "./ImportSchemaDialog";
import { valdiateComponentSetting } from "@/application/runtime/dynamic-components/core";

const VIEWPORT_WIDTHS: Record<ViewportMode, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
};



function ThemeEditorWorkspace() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { schemas, theme, selectedNodeId, status, tenantInfo } = useSelector(
        (state: RootState) => state.editor
    );

    const params = useParams();
    const routeParams = params?.route as string[] | undefined;
    const [pageRouteInfo, setPageRouteInfo] = useState<any>(null);
    const [allRoutes, setAllRoutes] = useState<any[]>([]);
    const [viewport, setViewport] = useState<ViewportMode>("desktop");
    const [isThemeOpen, setIsThemeOpen] = useState(false);

    const [addingToParentId, setAddingToParentId] = useState<string | null>(null);
    const [addingToSection, setAddingToSection] = useState<"header" | "main" | "footer" | "global" | null>(null);
     const [showAddPopup, setShowAddPopup] = useState(false);
 
     // States for schema import
     const [importSection, setImportSection] = useState<"announcement" | "navbar" | "footer" | "main" | null>(null);
     const [showImportPopup, setShowImportPopup] = useState(false);
 
     const triggerImportPopup = (section: "announcement" | "navbar" | "footer" | "main") => {
         setImportSection(section);
         setShowImportPopup(true);
     };


    const [componentSettingsMap, setComponentSettingsMap] = useState<any>({});
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const availableComponents = React.useMemo(() => {
        return Object.entries(componentSettingsMap || {})
            .filter(([key]) => key !== "common")
            .map(([key, val]: [string, any]) => ({
                type: key,
                label: val.name || key,
                desc: val.desc || `${val.name || key} component block`,
                category: (val.category === "app" ? "app" : "section") as "section" | "app"
            }));
    }, [componentSettingsMap]);

    const routePath = "/" + (routeParams?.join("/") || "");

    // Load data
    const loadEditorData = async () => {
        if (!tenantInfo) return;
        dispatch(setStatus("loading"));
        try {
            const compRes = await APP_API.GET("/api/components", {}, undefined, true);
            if (compRes?.success) setComponentSettingsMap(compRes.components);

            const res = await APP_API.GET(
                `/api/schema?route=${encodeURIComponent(routePath)}`,
                {
                    "x-tenant-id": tenantInfo.tenant,
                    "x-store-id": tenantInfo.store,
                },
                undefined,
                true
            );

            if (res?.success) {
                // If route doesn't exist in DB, and is not a default route or root, redirect to editor home
                const isDefaultRoute =
                    routePath === "/" ||
                    routePath.startsWith("/product/") ||
                    routePath.startsWith("/products/") ||
                    routePath.startsWith("/category/") ||
                    routePath.startsWith("/categories/") ||
                    routePath.startsWith("/collection/") ||
                    routePath.startsWith("/collections/") ||
                    routePath === "/cart" ||
                    routePath === "/checkout" ||
                    routePath === "/search";

                if (!isDefaultRoute && res.pageRoute && !res.pageRoute.exists) {
                    toast.error(`Page ${routePath} does not exist. Redirecting…`);
                    router.push("/editor");
                    return;
                }
                const loadedSchemas: {
                    announcement: ComponentSchema[];
                    navbar: ComponentSchema[];
                    footer: ComponentSchema[];
                    whatsAppButton: ComponentSchema[];
                    main: ComponentSchema[];
                } = {
                    announcement: [], navbar: [], footer: [], whatsAppButton: [], main: [],
                };

                res.globals?.forEach((layout: any) => {
                    const schemaArr = Array.isArray(layout._c) ? layout._c : (layout._c ? [layout._c] : []);
                    if (layout.for === "announcement") loadedSchemas.announcement = schemaArr;
                    else if (layout.for === "navbar") loadedSchemas.navbar = schemaArr;
                    else if (layout.for === "footer") loadedSchemas.footer = schemaArr;
                    else if (layout._id === "whatsAppButton") loadedSchemas.whatsAppButton = schemaArr;
                });

                if (res.pageLayout) loadedSchemas.main = res.pageLayout._c || [];

                dispatch(setSchemas(loadedSchemas));
                setPageRouteInfo(res.pageRoute || null);
                setAllRoutes(res.allRoutes || []);
                if (res.theme?.config) dispatch(setTheme(res.theme.config));
            }
            dispatch(setStatus("idle"));
        } catch (err: any) {
            dispatch(setError(err.message || "Failed to load data"));
            dispatch(setStatus("failed"));
            toast.error("Failed to load layout schemas.");
        }
    };

    useEffect(() => {
        if (tenantInfo) {
            loadEditorData();
        }
    }, [dispatch, routePath, tenantInfo]);



    // Save
    const handleSave = async () => {
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Fix validation errors before saving.");
            return;
        }
        dispatch(setStatus("saving"));
        const tid = toast.loading("Saving…");

        const apiHeaders = {
            "x-tenant-id": tenantInfo?.tenant || "",
            "x-store-id": tenantInfo?.store || ""
        };

        try {
            await APP_API.POST("/api/schema", { key: "announcement", type: "global", for: "announcement", schema: schemas.announcement } as any, false, apiHeaders, undefined, true);
            await APP_API.POST("/api/schema", { key: "navbar", type: "global", for: "navbar", schema: schemas.navbar } as any, false, apiHeaders, undefined, true);
            await APP_API.POST("/api/schema", { key: "footer", type: "global", for: "footer", schema: schemas.footer } as any, false, apiHeaders, undefined, true);
            await APP_API.POST("/api/schema", { key: "whatsAppButton", type: "global", for: "main", schema: schemas.whatsAppButton } as any, false, apiHeaders, undefined, true);

            await APP_API.POST("/api/schema", { key: "theme", type: "global", for: "main", schema: theme } as any, false, apiHeaders, undefined, true);

            const layoutId = pageRouteInfo?.layout || (routePath === "/" ? "homepage" : routePath.substring(1).replace(/[^a-zA-Z0-9_-]/g, "-"));
            await APP_API.POST("/api/schema", { key: layoutId, type: "custom", for: "main", schema: schemas.main } as any, false, apiHeaders, undefined, true);

            if (pageRouteInfo && !pageRouteInfo.exists) {
                await APP_API.POST("/api/schema", {
                    key: "route",
                    route: pageRouteInfo.route,
                    type: pageRouteInfo.type || "SP",
                    layout: schemas.main
                } as any, false, apiHeaders, undefined, true);
                setPageRouteInfo({ ...pageRouteInfo, exists: true, layout: layoutId });
            }

            dispatch(setStatus("idle"));
            toast.success("Saved!", { id: tid });
        } catch (err: any) {
            dispatch(setError(err.message));
            dispatch(setStatus("failed"));
            toast.error("Save failed.", { id: tid });
        }
    };

    // Tree helpers
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

    const selectedNode = (() => {
        if (!selectedNodeId) return null;
        const roots = [...schemas.announcement, ...schemas.navbar, ...schemas.footer, ...schemas.whatsAppButton, ...schemas.main];
        return findNodeInTree(roots, selectedNodeId);
    })();

    const selectedNodeType = selectedNode?.type;
    const hasSettingsLoaded = !!(selectedNodeType && componentSettingsMap[selectedNodeType]?.settings);

    useEffect(() => {
        if (!selectedNodeType || hasSettingsLoaded) return;

        const loadNodeSettings = async () => {
            try {
                const res = await APP_API.GET(`/api/components?type=${selectedNodeType}`, {}, undefined, true);
                if (res?.success && res.component) {
                    setComponentSettingsMap((prev: any) => ({
                        ...prev,
                        [selectedNodeType]: {
                            ...prev[selectedNodeType],
                            settings: res.component[selectedNodeType]?.settings
                        }
                    }));
                }
            } catch (err) {
                console.error("Failed to load settings for", selectedNodeType, err);
            }
        };
        loadNodeSettings();
    }, [selectedNodeType, hasSettingsLoaded]);

    const triggerAddPopup = (parentId: string | null, section: "header" | "main" | "footer" | "global") => {
        setAddingToParentId(parentId);
        setAddingToSection(section);
        setShowAddPopup(true);
    };

    const handleAddComponent = (type: string) => {
        const randId = `${type}_${Math.random().toString(36).substr(2, 6)}`;
        const newNode: ComponentSchema = {
            id: randId,
            type: type as any,
            settings: {},
            label: type === "text" || type === "button" || type === "link" || type === "text_block" || type === "button_block" || type === "link_block" ? `New ${type.replace("_", " ")}` : undefined,
            children: [],
        };
        dispatch(addNode({ parentId: addingToParentId, section: addingToSection!, node: newNode }));
        dispatch(selectNode(randId));
        setIsThemeOpen(false);
        setShowAddPopup(false);
        setAddingToParentId(null);
        setAddingToSection(null);
        toast.success(`Added: ${type}`);
    };

    const handleUpdateSetting = (settingKey: string, val: any, settingConfig: any) => {
        if (!selectedNode) return;
        let isValid = true;
        if (settingConfig) {
            const activeConfig = Array.isArray(settingConfig) ? settingConfig[0] : settingConfig;
            if (activeConfig) {
                isValid = valdiateComponentSetting(activeConfig, val);
            }
        }
        const newErrors = { ...validationErrors };
        if (!isValid) newErrors[settingKey] = "Invalid";
        else delete newErrors[settingKey];
        setValidationErrors(newErrors);

        const settings = { ...(selectedNode.settings || {}) };
        if (val === "" || (Array.isArray(val) && val.length === 0)) {
            delete settings[settingKey];
        } else {
            settings[settingKey] = val;
        }
        dispatch(updateNodeSettings({ id: selectedNode.id, settings }));
    };



    return (
        <div className="h-screen flex flex-col bg-white font-sans text-zinc-800 antialiased overflow-hidden">
            <EditorHeader
                currentRoute={routePath}
                routes={allRoutes}
                status={status}
                viewport={viewport}
                onViewportChange={setViewport}
                onSave={handleSave}
                onRouteLoaded={() => {
                    dispatch(selectNode(null));
                    setIsThemeOpen(false);
                }}
                isThemeOpen={isThemeOpen}
                onToggleTheme={() => {
                    setIsThemeOpen(!isThemeOpen);
                    if (!isThemeOpen) {
                        dispatch(selectNode(null));
                    } else {
                        dispatch(selectNode(null));
                    }
                }}
            />

            <main className="flex-1 flex overflow-hidden min-h-0 bg-[#f4f5f7]">
                {/* Left sidebar */}
                <SidebarLeft
                    schemas={schemas}
                    selectedNodeId={selectedNodeId}
                    componentSettingsMap={componentSettingsMap}
                    onSelectNode={(id) => {
                        dispatch(selectNode(id));
                        if (id) setIsThemeOpen(false);
                    }}
                    onMoveNode={(id, dir) => dispatch(moveNode({ id, direction: dir }))}
                    onDeleteNode={(id) => {
                        dispatch(deleteNode({ id }));
                        if (selectedNodeId === id) dispatch(selectNode(null));
                        toast.success("Removed");
                    }}
                    onAddBlockTrigger={triggerAddPopup}
                    onImportSchemaTrigger={triggerImportPopup}
                />

                {/* Center: Preview Workspace (Zoomable and Movable Canvas) */}
                <CanvasViewport viewportWidth={VIEWPORT_WIDTHS[viewport]}>
                    <ThemeBuilder themeConfigs={theme || {}}>
                        <div className="w-full h-auto">
                            {schemas.announcement && <EditorPreviewBuilder schema={schemas.announcement} />}
                            {schemas.navbar && <EditorPreviewBuilder schema={schemas.navbar} />}

                            {schemas.main && (schemas.main.length > 0) && (
                                <EditorPreviewBuilder schema={schemas.main} />
                            )}

                            {schemas.footer && <EditorPreviewBuilder schema={schemas.footer} />}
                            {schemas.whatsAppButton && <EditorPreviewBuilder schema={schemas.whatsAppButton} />}
                        </div>
                    </ThemeBuilder>
                </CanvasViewport>

                {/* Right sidebar */}
                <SidebarRight
                    selectedNode={selectedNode}
                    isThemeOpen={isThemeOpen}
                    onCloseTheme={() => setIsThemeOpen(false)}
                    componentSettingsMap={componentSettingsMap}
                    theme={theme}
                    validationErrors={validationErrors}
                    onUpdateSetting={handleUpdateSetting}
                    onUpdateLabel={(id, label) => dispatch(updateNodeLabel({ id, label: label || null }))}
                    onUpdateTheme={(updates) => dispatch(setTheme(updates))}
                    onUpdateAction={(id, action) => dispatch(updateNodeAction({ id, action }))}
                    onDeleteNode={(id) => {
                        dispatch(deleteNode({ id }));
                        dispatch(selectNode(null));
                        toast.success("Removed");
                    }}
                    onSelectNode={(id) => {
                        dispatch(selectNode(id));
                        if (id) setIsThemeOpen(false);
                    }}
                />
            </main>

            {/* Add Component Dialog */}
            <AddComponentDialog
                open={showAddPopup}
                onOpenChange={setShowAddPopup}
                componentSettingsMap={componentSettingsMap}
                onAddComponent={handleAddComponent}
                availableComponents={availableComponents}
            />

            {/* Import / Export JSON Schema Dialog */}
            <ImportSchemaDialog
                open={showImportPopup}
                onOpenChange={setShowImportPopup}
                importSection={importSection}
                currentSchema={importSection ? schemas[importSection] : null}
                onApplySchema={(parsedSchema) => {
                    if (importSection) {
                        dispatch(setSchemas({ [importSection]: parsedSchema } as any));
                    }
                }}
            />

            <Toaster position="bottom-right" toastOptions={{ style: { fontSize: "13px" } }} />
        </div>
    );
}

export default function Page() {
    return <ThemeEditorWorkspace />;
}
