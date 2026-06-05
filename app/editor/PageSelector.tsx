"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { 
    ChevronDown, Search, Plus, FileText, ShoppingBag, Folder, X, Check,
    Home, List, ShoppingCart, CreditCard, Lock, Scale, Link2, Globe, Sparkles
} from "lucide-react";
import { APP_API } from "@/application/providers/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/bundles/store";

interface RouteInfo {
    route: string;
    type: string;
    layout?: string;
    name?: string;
}

interface PageSelectorProps {
    currentRoute: string;
    routes: RouteInfo[];
    onRouteLoaded?: () => void;
}

interface TemplateItem {
    name: string;
    route: string;
    type: string;
    mode: "SP" | "DP";
}

// 1. Standard predefined templates relevant to Nepali E-commerce
const STANDARD_TEMPLATES: TemplateItem[] = [
    { name: "Home page", route: "/", type: "homepage", mode: "SP" },
    { name: "Products", route: "/products/<handle>", type: "product", mode: "DP" },
    { name: "Collections", route: "/collections/<handle>", type: "collection", mode: "DP" },
    { name: "About us", route: "/about-us", type: "SP", mode: "SP" },
    { name: "Contact us", route: "/contact-us", type: "SP", mode: "SP" },
    { name: "FAQ", route: "/faq", type: "SP", mode: "SP" },
    { name: "Refund policy", route: "/policies/refund-policy", type: "legal", mode: "SP" },
    { name: "Privacy policy", route: "/policies/privacy-policy", type: "legal", mode: "SP" },
    { name: "Terms of service", route: "/policies/terms-of-service", type: "legal", mode: "SP" },
    { name: "Cart", route: "/cart", type: "cart", mode: "SP" },
    { name: "Checkout", route: "/checkout", type: "checkout", mode: "SP" },
    { name: "Search", route: "/search", type: "search", mode: "SP" }
];

function getCategoryName(route: string, type: string): string {
    const r = route.toLowerCase();
    const t = type.toLowerCase();
    if (route === "/") return "Home page";
    if (t === "product" || r.startsWith("/products/")) return "Products";
    if (t === "collection" || r.startsWith("/collections/")) return "Collections";
    if (t === "cart" || r === "/cart") return "Cart";
    if (t === "checkout" || r === "/checkout") return "Checkout and customer accounts";
    if (t === "search" || r === "/search") return "Search";
    if (t === "legal" || r.startsWith("/policies/")) return "Legal";
    return "Pages";
}

function getRouteName(route: string, type: string): string {
    const standard = STANDARD_TEMPLATES.find(t => t.route === route);
    if (standard) return standard.name;

    if (route === "/") return "Home page";
    const clean = route.substring(1).replace(/-/g, " ");
    return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function getCategoryIcon(catName: string) {
    switch (catName) {
        case "Home page": return Home;
        case "Products": return ShoppingBag;
        case "Collections": return Folder;
        case "Cart": return ShoppingCart;
        case "Checkout and customer accounts": return CreditCard;
        case "Pages": return FileText;
        case "Search": return Search;
        case "Legal": return Scale;
        default: return FileText;
    }
}

export default function PageSelector({ currentRoute, routes, onRouteLoaded }: PageSelectorProps) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const { tenantInfo } = useSelector((state: RootState) => state.editor);
    const tenantId = tenantInfo?.tenant;
    const storeId = tenantInfo?.store;

    // Modal state
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newName, setNewName] = useState("Custom Page");
    const [newMode, setNewMode] = useState<"SP" | "DP">("SP");
    const [newPathPrefix, setNewPathPrefix] = useState("new-page");
    const [submitting, setSubmitting] = useState(false);

    // Confirmation for auto-creating default template
    const [confirmCreateOpen, setConfirmCreateOpen] = useState(false);
    const [pendingCreateRoute, setPendingCreateRoute] = useState<{
        route: string;
        name: string;
        type: string;
    } | null>(null);

    // 2. Build flat grouped template lists
    const categorizedList = useMemo(() => {
        // Core items
        const coreItems = [
            { name: "Home page", route: "/", type: "homepage", icon: Home },
            { name: "Products", route: "/products/<handle>", type: "product", icon: ShoppingBag },
            { name: "Collections", route: "/collections/<handle>", type: "collection", icon: Folder }
        ];

        // Utility items
        const utilityItems = [
            { name: "Cart", route: "/cart", type: "cart", icon: ShoppingCart },
            { name: "Checkout", route: "/checkout", type: "checkout", icon: CreditCard },
            { name: "Search", route: "/search", type: "search", icon: Search }
        ];

        // Helper to get category icon for custom routes
        const getIconForRoute = (route: string, type: string) => {
            const catName = getCategoryName(route, type);
            return getCategoryIcon(catName);
        };

        // Filter loaded routes from the database that are NOT Core or Utility
        const coreRoutes = new Set(["/", "/products/<handle>", "/collections/<handle>"]);
        const utilityRoutes = new Set(["/cart", "/checkout", "/search"]);

        // Dynamically identify and label user-created custom routes
        const dbCustomPages = routes
            .filter(r => !coreRoutes.has(r.route) && !utilityRoutes.has(r.route))
            .map(r => ({
                name: r.name || getRouteName(r.route, r.type),
                route: r.route,
                type: r.type,
                icon: getIconForRoute(r.route, r.type),
                isCustom: true
            }));

        // Standard predefined pages (About us, FAQ, Policies)
        const standardPredefinedPages = [
            { name: "About us", route: "/about-us", type: "SP", icon: FileText, isCustom: false },
            { name: "Contact us", route: "/contact-us", type: "SP", icon: FileText, isCustom: false },
            { name: "FAQ", route: "/faq", type: "SP", icon: FileText, isCustom: false },
            { name: "Refund policy", route: "/policies/refund-policy", type: "legal", icon: Scale, isCustom: false },
            { name: "Privacy policy", route: "/policies/privacy-policy", type: "legal", icon: Scale, isCustom: false },
            { name: "Terms of service", route: "/policies/terms-of-service", type: "legal", icon: Scale, isCustom: false }
        ];

        // Merge standard predefined pages if they are not already in dbCustomPages
        const mergedPages = [...dbCustomPages];
        standardPredefinedPages.forEach(std => {
            const exists = mergedPages.some(p => p.route === std.route);
            if (!exists) {
                mergedPages.push(std);
            }
        });

        return {
            core: coreItems,
            pages: mergedPages,
            utilities: utilityItems
        };
    }, [routes]);

    // Flat list for searching across templates
    const flatFiltered = useMemo(() => {
        if (!search.trim()) return null;
        const query = search.toLowerCase();
        const results: { name: string; route: string; type: string; icon: React.ComponentType<any> }[] = [];
        
        // Search Core
        categorizedList.core.forEach(item => {
            if (item.name.toLowerCase().includes(query) || item.route.toLowerCase().includes(query)) {
                results.push(item);
            }
        });

        // Search Pages
        categorizedList.pages.forEach(item => {
            if (item.name.toLowerCase().includes(query) || item.route.toLowerCase().includes(query)) {
                results.push(item);
            }
        });

        // Search Utilities
        categorizedList.utilities.forEach(item => {
            if (item.name.toLowerCase().includes(query) || item.route.toLowerCase().includes(query)) {
                results.push(item);
            }
        });

        return results;
    }, [categorizedList, search]);

    // Construct full path for creating templates
    const fullCreatedPath = useMemo(() => {
        const cleanPrefix = newPathPrefix.trim().replace(/^\/+/, "").replace(/\/+$/, "");
        if (newMode === "DP") {
            return `/${cleanPrefix || "dynamic"}/<handle>`;
        }
        return `/${cleanPrefix}`;
    }, [newPathPrefix, newMode]);

    const navigate = (route: string) => {
        onRouteLoaded?.();
        router.push(route === "/" ? "/editor" : `/editor${route}`);
    };

    const handleSelectRoute = (targetRoute: string, name: string, type: string) => {
        const isCoreOrUtility = ["/", "/products/<handle>", "/collections/<handle>", "/cart", "/checkout", "/search"].includes(targetRoute);
        const exists = routes.some(r => r.route === targetRoute);

        if (exists || isCoreOrUtility) {
            navigate(targetRoute);
        } else {
            setPendingCreateRoute({
                route: targetRoute,
                name: name,
                type: type === "legal" ? "legal" : "SP"
            });
            setConfirmCreateOpen(true);
        }
    };

    const handleConfirmCreate = async () => {
        if (!pendingCreateRoute) return;
        setSubmitting(true);
        const tid = toast.loading(`Initializing ${pendingCreateRoute.name}…`);
        try {
            const defaultLayoutId = pendingCreateRoute.route === "/" ? "homepage" : pendingCreateRoute.route.substring(1).replace(/[^a-zA-Z0-9]/g, "-");
            const res = await APP_API.POST("/api/schema", { 
                key: "route", 
                route: pendingCreateRoute.route, 
                type: pendingCreateRoute.type,
                name: pendingCreateRoute.name,
                layout: defaultLayoutId
            } as any, false, {
                "x-tenant-id": tenantId || "",
                "x-store-id": storeId || ""
            }, undefined, true);

            if (res?.success) {
                toast.success(`Created ${pendingCreateRoute.name} successfully!`, { id: tid });
                setConfirmCreateOpen(false);
                onRouteLoaded?.();
                router.push(`/editor${pendingCreateRoute.route}`);
            } else {
                toast.error(typeof res?.error === "string" ? res.error : "Failed to create", { id: tid });
            }
        } catch (err: any) {
            toast.error(err.message || "Error", { id: tid });
        } finally {
            setSubmitting(false);
            setPendingCreateRoute(null);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalPath = fullCreatedPath;
        if (!finalPath.startsWith("/")) {
            toast.error("Path must start with /");
            return;
        }
        setSubmitting(true);
        const tid = toast.loading("Creating template…");
        try {
            // Determine logical type
            let resolvedType = "SP";
            if (newMode === "DP") {
                const prefixLower = newPathPrefix.toLowerCase().trim();
                if (prefixLower.includes("product")) resolvedType = "product";
                else if (prefixLower.includes("collection")) resolvedType = "collection";
                else resolvedType = "DP";
            }

            const res = await APP_API.POST("/api/schema", { 
                key: "route", 
                route: finalPath, 
                type: resolvedType,
                name: newName
            } as any, false, {
                "x-tenant-id": tenantId || "",
                "x-store-id": storeId || ""
            }, undefined, true);

            if (res?.success) {
                toast.success("Created Template successfully!", { id: tid });
                setIsCreateOpen(false);
                router.push(`/editor${finalPath}`);
            } else {
                toast.error(typeof res?.error === "string" ? res.error : "Failed to create", { id: tid });
            }
        } catch (err: any) {
            toast.error(err.message || "Error", { id: tid });
        } finally {
            setSubmitting(false);
        }
    };

    const handleModeToggle = (modeVal: "SP" | "DP") => {
        setNewMode(modeVal);
        if (modeVal === "DP") {
            setNewName("Dynamic Template");
            if (newPathPrefix === "new-page" || newPathPrefix === "about-us") {
                setNewPathPrefix("products");
            }
        } else {
            setNewName("Custom Page");
            if (newPathPrefix === "products" || newPathPrefix === "collections") {
                setNewPathPrefix("about-us");
            }
        }
    };

    // Find details about the currently active route
    const currentObj = routes.find((r) => r.route === currentRoute) || { 
        route: currentRoute, 
        type: currentRoute.includes("<") ? "DP" : "SP", 
        name: getRouteName(currentRoute, "SP") 
    };

    const currentName = currentObj.name || getRouteName(currentObj.route, currentObj.type);
    const CurrentIcon = getCategoryIcon(getCategoryName(currentObj.route, currentObj.type));

    return (
        <>
            <DropdownMenu.Root onOpenChange={(open) => { if (!open) { setSearch(""); } }}>
                <DropdownMenu.Trigger asChild>
                    <button className="flex items-center gap-2 text-[12.5px] font-semibold text-zinc-700 hover:text-zinc-900 border border-zinc-200 bg-white hover:bg-zinc-50/50 px-4 py-1.5 rounded-lg transition-all cursor-pointer outline-none shadow-[0_1px_1.5px_rgba(0,0,0,0.015)] active:scale-[0.98] select-none">
                        <CurrentIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{currentName}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-0.5" />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        align="center"
                        sideOffset={6}
                        className="z-[100] w-[260px] bg-white rounded-lg border border-zinc-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.04)] overflow-hidden transition-all outline-none font-sans"
                    >
                        {/* Search Input Section */}
                        <div className="p-2 border-b border-zinc-100 bg-zinc-50/30">
                            <div className="relative">
                                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search store templates…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full bg-white text-zinc-800 text-[12px] rounded-md pl-8 pr-3 py-1.5 outline-none border border-zinc-200 focus:border-zinc-300 placeholder:text-zinc-400 font-semibold transition-all"
                                />
                            </div>
                        </div>

                        {/* Dropdown Body */}
                        <div className="max-h-[260px] overflow-y-auto py-1">
                            {flatFiltered ? (
                                // Search matches list
                                <div className="space-y-0.5 px-1 py-0.5">
                                    {flatFiltered.map((r) => (
                                        <DropdownMenu.Item
                                            key={r.route}
                                            onSelect={() => handleSelectRoute(r.route, r.name, r.type)}
                                            className="flex items-center gap-2.5 px-2.5 py-1.5 text-[11.5px] text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer outline-none rounded-md font-semibold transition-colors"
                                        >
                                            <r.icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="truncate">{r.name}</span>
                                                <span className="text-[9.5px] text-zinc-400 truncate font-mono">{r.route}</span>
                                            </div>
                                        </DropdownMenu.Item>
                                    ))}
                                    {flatFiltered.length === 0 && (
                                        <div className="text-[12px] text-zinc-400 text-center py-5">No templates found</div>
                                    )}
                                </div>
                            ) : (
                                // Core + Custom Pages + Utilities sorted in a single scannable list
                                <div className="space-y-0.5 px-1 py-0.5">
                                    {/* ─── Core Templates ─── */}
                                    {categorizedList.core.map((r) => {
                                        const isSelected = r.route === currentRoute;
                                        return (
                                            <DropdownMenu.Item
                                                key={r.route}
                                                onSelect={() => handleSelectRoute(r.route, r.name, r.type)}
                                                className={`flex items-center justify-between px-2.5 py-1.5 text-[11.5px] cursor-pointer outline-none rounded-md font-semibold transition-colors ${
                                                    isSelected ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                                }`}
                                            >
                                                <span className="flex items-center gap-2 min-w-0 truncate">
                                                    <r.icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                    <span className="truncate">{r.name}</span>
                                                </span>
                                                {isSelected && <Check className="w-3 h-3 text-emerald-600 shrink-0 ml-1.5" />}
                                            </DropdownMenu.Item>
                                        );
                                    })}

                                    <DropdownMenu.Separator className="h-px bg-zinc-100 my-1 mx-1.5" />

                                    {/* ─── Custom Pages & Policy Templates (Directly under Home/Products) ─── */}
                                    {categorizedList.pages.map((r) => {
                                        const isSelected = r.route === currentRoute;
                                        return (
                                            <DropdownMenu.Item
                                                key={r.route}
                                                onSelect={() => handleSelectRoute(r.route, r.name, r.type)}
                                                className={`flex items-center justify-between px-2.5 py-1.5 text-[11.5px] cursor-pointer outline-none rounded-md font-semibold transition-colors ${
                                                    isSelected ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                                }`}
                                            >
                                                <span className="flex items-center gap-2 min-w-0 truncate">
                                                    <r.icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                    <span className="truncate">{r.name}</span>
                                                </span>
                                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                                    {r.isCustom && (
                                                        <span className="text-[8px] bg-zinc-100 text-zinc-500 font-bold px-1 py-0.5 rounded tracking-wide select-none">
                                                            Custom
                                                        </span>
                                                    )}
                                                    {isSelected && <Check className="w-3 h-3 text-emerald-600 shrink-0" />}
                                                </div>
                                            </DropdownMenu.Item>
                                        );
                                    })}

                                    <DropdownMenu.Separator className="h-px bg-zinc-100 my-1 mx-1.5" />

                                    {/* ─── Utility Pages ─── */}
                                    {categorizedList.utilities.map((r) => {
                                        const isSelected = r.route === currentRoute;
                                        return (
                                            <DropdownMenu.Item
                                                key={r.route}
                                                onSelect={() => handleSelectRoute(r.route, r.name, r.type)}
                                                className={`flex items-center justify-between px-2.5 py-1.5 text-[11.5px] cursor-pointer outline-none rounded-md font-semibold transition-colors ${
                                                    isSelected ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                                }`}
                                            >
                                                <span className="flex items-center gap-2 min-w-0 truncate">
                                                    <r.icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                    <span className="truncate">{r.name}</span>
                                                </span>
                                                {isSelected && <Check className="w-3 h-3 text-emerald-600 shrink-0 ml-1.5" />}
                                            </DropdownMenu.Item>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <DropdownMenu.Separator className="h-px bg-zinc-100" />

                        {/* Footer Action */}
                        <div className="p-1 bg-zinc-50/40">
                            <button
                                onClick={() => setIsCreateOpen(true)}
                                className="w-full flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-zinc-900 hover:bg-white border border-transparent hover:border-zinc-200/50 py-1.5 rounded-md transition-all cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5 text-zinc-400" />
                                Create template
                            </button>
                        </div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* Create Dialog */}
            <Dialog.Root open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-zinc-900/10 backdrop-blur-[2px] z-[100] transition-all" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] bg-white rounded-2xl border border-zinc-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[100] outline-none overflow-hidden transition-all font-sans">
                        {/* Header */}
                        <div className="flex items-center justify-between px-5.5 py-4.5 border-b border-zinc-100">
                            <Dialog.Title className="text-[13.5px] font-bold text-zinc-900 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-zinc-500 shrink-0" />
                                Create Page Template
                            </Dialog.Title>
                            <Dialog.Close asChild>
                                <button className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-md hover:bg-zinc-50 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </Dialog.Close>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleCreate} className="p-5.5 space-y-4.5">
                            {/* Segment Toggle */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider select-none">Template Type</label>
                                <div className="flex gap-1 p-1 bg-zinc-100 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => handleModeToggle("SP")}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[12px] font-bold rounded-md transition-all cursor-pointer ${
                                            newMode === "SP" 
                                                ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/20" 
                                                : "text-zinc-500 hover:text-zinc-800"
                                        }`}
                                    >
                                        <Globe className="w-3.5 h-3.5" />
                                        Static Page (SP)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleModeToggle("DP")}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[12px] font-bold rounded-md transition-all cursor-pointer ${
                                            newMode === "DP" 
                                                ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/20" 
                                                : "text-zinc-500 hover:text-zinc-800"
                                        }`}
                                    >
                                        <Link2 className="w-3.5 h-3.5" />
                                        Dynamic Page (DP)
                                    </button>
                                </div>
                            </div>

                            {/* Template Name */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider select-none">Template Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder={newMode === "SP" ? "e.g. Winter Sale" : "e.g. Products detail template"}
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full border border-zinc-200 rounded-lg px-3.5 py-2.5 text-[12.5px] font-semibold outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 bg-white placeholder:text-zinc-400 transition-all"
                                />
                            </div>

                            {/* Route Path (Restricted for DP) */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider select-none">Route Path Prefix</label>
                                {newMode === "DP" ? (
                                    // For DP: edit /<thispart> and /<handle> is fixed
                                    <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 focus-within:bg-white focus-within:border-zinc-950 focus-within:ring-2 focus-within:ring-zinc-950/10 transition-all font-mono text-[12.5px]">
                                        <span className="text-zinc-400 select-none">/</span>
                                        <input
                                            type="text"
                                            required
                                            placeholder="products"
                                            value={newPathPrefix}
                                            onChange={(e) => setNewPathPrefix(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                                            className="flex-1 min-w-0 bg-transparent text-zinc-800 placeholder:text-zinc-400 outline-none font-semibold"
                                        />
                                        <span className="text-zinc-400 select-none text-[11px] bg-zinc-100 px-2 py-0.5 rounded font-bold shrink-0">/<span className="text-zinc-500 font-semibold">handle</span></span>
                                    </div>
                                ) : (
                                    // For SP: edit /<thispart>
                                    <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 focus-within:bg-white focus-within:border-zinc-950 focus-within:ring-2 focus-within:ring-zinc-950/10 transition-all font-mono text-[12.5px]">
                                        <span className="text-zinc-400 select-none">/</span>
                                        <input
                                            type="text"
                                            required
                                            placeholder="about-us"
                                            value={newPathPrefix}
                                            onChange={(e) => setNewPathPrefix(e.target.value.replace(/^\//, ""))}
                                            className="flex-1 min-w-0 bg-transparent text-zinc-800 placeholder:text-zinc-400 outline-none font-semibold"
                                        />
                                    </div>
                                )}
                                
                                {/* URL Preview */}
                                <div className="flex items-center gap-1.5 px-0.5 pt-0.5 text-[11px] text-zinc-400 font-medium">
                                    <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                    <span>Path:</span>
                                    <span className="font-mono text-zinc-600 bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-100 font-semibold truncate select-all">{fullCreatedPath}</span>
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex gap-2.5 justify-end pt-3.5 border-t border-zinc-100">
                                <Dialog.Close asChild>
                                    <button type="button" className="text-[12px] font-bold text-zinc-500 hover:text-zinc-800 px-4 py-2.5 rounded-lg hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors cursor-pointer active:scale-[0.98]">
                                        Cancel
                                    </button>
                                </Dialog.Close>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-zinc-950 text-white hover:bg-zinc-900 text-[12px] font-bold px-5 py-2.5 rounded-lg border border-zinc-950 transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.05)] active:scale-[0.98]"
                                >
                                    {submitting ? "Creating…" : "Create template"}
                                </button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Confirmation Dialog for Initializing Predefined Page */}
            <Dialog.Root open={confirmCreateOpen} onOpenChange={setConfirmCreateOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-zinc-900/10 backdrop-blur-[2px] z-[100] transition-all" />
                    <Dialog.Content className="fixed p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] bg-white rounded-2xl border border-zinc-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[100] outline-none overflow-hidden transition-all font-sans p-5.5 space-y-4">
                        <Dialog.Title className="text-[13.5px] font-bold text-zinc-900 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-zinc-500 shrink-0" />
                            Initialize Page Route?
                        </Dialog.Title>
                        <p className="text-[12.5px] text-zinc-500 leading-relaxed font-medium">
                            The page <span className="font-bold text-zinc-800">"{pendingCreateRoute?.name}"</span> has not been registered in your store! Would you like to create?
                        </p>
                        <div className="flex gap-2.5 justify-end pt-3 border-t border-zinc-100">
                            <Dialog.Close asChild>
                                <button type="button" className="text-[12px] font-bold text-zinc-500 hover:text-zinc-800 px-4 py-2.5 rounded-lg hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors cursor-pointer active:scale-[0.98]">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={handleConfirmCreate}
                                disabled={submitting}
                                className="bg-zinc-950 text-white hover:bg-zinc-900 text-[12px] font-bold px-5 py-2.5 rounded-lg border border-zinc-950 transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.05)] active:scale-[0.98]"
                            >
                                {submitting ? "Initializing…" : "Initialize Page"}
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}
