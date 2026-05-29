"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/application/runtime/store";
import { EditorStoreProvider } from "@/application/runtime/store/Provider";
import {
    setSchemas,
    selectNode,
    updateNodeSettings,
    updateNodeAction,
    updateNodeLabel,
    deleteNode,
    addNode,
    moveNode,
    setTheme,
    setStatus,
    setError,
} from "@/application/runtime/store/editorSlice";
import { APP_API } from "@/application/providers/api";
import EditorPreviewBuilder from "@/application/runtime/builder/EditorPreviewBuilder";
import ThemeBuilder from "@/application/runtime/builder/ThemeBuilder";
import { ComponentSchema } from "@/application/runtime/builder/type";
import CanvasViewport from "../CanvasViewport";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import {
    Plus,
    X,
    Layout,
    Search,
    Settings2,
    Sliders,
    Laptop,
    Code2,
    Link,
    AlignLeft,
    Layers,
    Image as ImageIcon,
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
    Images,
    Upload,
    Copy,
    Check
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import EditorHeader, { ViewportMode } from "../EditorHeader";

const LUCIDE_ICONS_MAP: Record<string, React.ComponentType<any>> = {
    Plus,
    X,
    Layout,
    Search,
    Settings2,
    Sliders,
    Laptop,
    Code2,
    Link,
    AlignLeft,
    Layers,
    ImageIcon,
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

function getDialogComponentIcon(type: string) {
    const lType = type?.toLowerCase() || "";
    // Containers
    if (lType === "box" || lType === "flex_box" || lType === "grid_box" || lType === "card_box" || lType === "carousel_box" || lType === "modal_box" || lType === "drawer_box" || lType === "accordion_box" || lType === "tabs_box" || lType === "sticky_box" || lType === "split_hero_box" || lType === "stack_box" || lType === "masonry_box") return Code2;
    // Buttons
    if (lType === "button" || lType === "button_block") return Square;
    // Texts
    if (lType === "text" || lType === "text_block") return AlignLeft;
    // Images & Videos
    if (lType === "image" || lType === "image_block" || lType === "video_block") return ImageIcon;
    // Icons
    if (lType === "icon" || lType === "svg_icon") return Layers;
    // Inputs & Forms
    if (lType === "input" || lType === "input_block" || lType === "input_field" || lType === "textarea_field" || lType === "checkbox_field" || lType === "radio_field" || lType === "select_field" || lType === "quantity_selector") return Square;
    // Links
    if (lType === "link" || lType === "link_block") return Link;
    // Search
    if (lType === "search_query") return Search;
    // Form wrappers
    if (lType === "form" || lType === "form_wrapper") return Layers;
    // WhatsApp Chat
    if (lType === "whatsappbutton" || lType.includes("whatsapp")) return MessageCircle;
    return Layers;
}
import SidebarLeft from "../SidebarLeft";
import SidebarRight from "../SidebarRight";

interface CompDef {
    type: string;
    label: string;
    desc: string;
    category: "section" | "app";
}

const CATEGORIES = [
    { value: "all", label: "All" },
    { value: "layout", label: "Layout" },
    { value: "content", label: "Content" },
    { value: "forms", label: "Forms" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "legacy", label: "Legacy" }
];

const AVAILABLE_COMPONENTS: CompDef[] = [
    // 1. Structural Layout Containers
    { type: "flex_box", label: "Flex Container", desc: "Linearly aligns child elements horizontally or vertically", category: "section" },
    { type: "grid_box", label: "Grid Container", desc: "Aligns child elements into customizable grid tracks", category: "section" },
    { type: "card_box", label: "Card/Surface Container", desc: "Visual card frame with shadows, padding, and background options", category: "section" },
    { type: "carousel_box", label: "Carousel/Scroll Window", desc: "Horizontal swipable item row with navigation indicators", category: "section" },
    { type: "modal_box", label: "Popup Modal Overlay", desc: "Break-out popup dialogue displaying urgent promotions", category: "section" },
    { type: "drawer_box", label: "Interactive Slide Drawer", desc: "Slide-out sidebar container for menus or mini carts", category: "section" },
    { type: "accordion_box", label: "Collapsible Accordion", desc: "Vertically collapsing information panels", category: "section" },
    { type: "tabs_box", label: "Tabbed Switcher Shell", desc: "Togglable tab sections sharing the same space", category: "section" },
    { type: "sticky_box", label: "Sticky Container", desc: "Keeps navigation or headers fixed to viewport edges", category: "section" },
    { type: "split_hero_box", label: "Split Aspect Hero Box", desc: "Responsive 2-column section (e.g. text left, image right)", category: "section" },
    { type: "stack_box", label: "Overlapping Stack", desc: "Layers elements on top of each other along depth axis", category: "section" },
    { type: "masonry_box", label: "Masonry Matrix", desc: "Varying-height card board without vertical gaps", category: "section" },

    // 2. Content Elements & Atoms
    { type: "text_block", label: "Typography Engine", desc: "Renders headings, body texts, and paragraphs", category: "section" },
    { type: "link_block", label: "Hyperlink tag", desc: "Clickable navigation anchor link", category: "section" },
    { type: "image_block", label: "Graphic Frame", desc: "Optimized image and graphic element loader", category: "section" },
    { type: "button_block", label: "Action Trigger Button", desc: "Trigger button for cart actions or navigation redirects", category: "section" },
    { type: "svg_icon", label: "Vector Icon", desc: "Lightweight scalable svg vector graphics", category: "section" },
    { type: "spacer_block", label: "Decorative Spacer", desc: "Empty vertical space divider between sections", category: "section" },
    { type: "divider_block", label: "Content Rule Divider", desc: "Renders solid or dashed line divider", category: "section" },
    { type: "video_block", label: "Video Media Player", desc: "Loops or streams responsive video tracks", category: "section" },
    { type: "rating_block", label: "Rating Stars Matrix", desc: "Displays product reviews star rating metrics", category: "section" },
    { type: "badge_block", label: "Metadata Status Badge", desc: "Compact labels like 'SALE' or 'NEW' over elements", category: "section" },
    { type: "html_block", label: "HTML Fragment Sandbox", desc: "Directly inserts custom code or embeds", category: "section" },
    { type: "progress_bar_block", label: "Animated Progress Bar", desc: "Urgency progress indicator for remaining stock", category: "section" },
    { type: "map_block", label: "Static Map Frame", desc: "Renders store coordinates contact maps", category: "section" },
    { type: "price_block", label: "Price Display Engine", desc: "Renders currency values with markdown support", category: "section" },
    { type: "countdown_block", label: "Countdown Timer", desc: "Renders promotional flash sale timer clocks", category: "section" },

    // 3. Stateful Form Elements & Intake
    { type: "form_wrapper", label: "Functional Form Wrapper", desc: "Enclosing form container context", category: "section" },
    { type: "input_field", label: "Text Input Field", desc: "Captures standard single-line form entries", category: "section" },
    { type: "textarea_field", label: "Long Text Area", desc: "Captures multi-line text input reviews or notes", category: "section" },
    { type: "checkbox_field", label: "Boolean Checkbox", desc: "Togglable confirmation checkbox", category: "section" },
    { type: "radio_field", label: "Radio Option Group", desc: "Single selection choice group", category: "section" },
    { type: "select_field", label: "Select Option Dropdown", desc: "Customizable option selection dropdown menu", category: "section" },
    { type: "quantity_selector", label: "Quantity Selector", desc: "Clickable number adjuster widget", category: "section" },

    // 4. E-Commerce Content Loops & Context Proxies
    { type: "product_loop_context", label: "Product Grid Iterator", desc: "Queries and loops product card models", category: "section" },
    { type: "category_loop_context", label: "Category Loop Iterator", desc: "Queries and loops category circle list models", category: "section" },
    { type: "cart_items_context", label: "Cart Items Context Loop", desc: "Renders active items in buyer cart list", category: "section" },
    { type: "product_variant_selector", label: "Variant Option Selector", desc: "Displays clickable variant sizes or colors", category: "section" },
    { type: "product_image_gallery", label: "Product Image Gallery", desc: "Interactive slideshow thumbnail gallery", category: "section" },

    // Legacy
    { type: "box", label: "Box Container (Legacy)", desc: "A generic div container for layout grouping", category: "section" },
    { type: "button", label: "Button Component (Legacy)", desc: "An interactive call-to-action button element", category: "section" },
    { type: "text", label: "Rich Text block (Legacy)", desc: "Typography blocks for headers and body copy", category: "section" },
    { type: "image", label: "Image element (Legacy)", desc: "A responsive standard graphic/image container", category: "section" },
    { type: "icon", label: "Icon Wrapper (Legacy)", desc: "A scalable vector icon by identity", category: "section" },
    { type: "input", label: "Input Form field (Legacy)", desc: "A text field container wrapper for user inputs", category: "section" },
    { type: "link", label: "Hyperlink tag (Legacy)", desc: "An anchor link element for site navigation", category: "section" },
    { type: "search_query", label: "Search Redirect bar", desc: "Form input search that redirects query parameters", category: "section" },
    { type: "whatsAppButton", label: "WhatsApp Chat Widget", desc: "A floating action contact widget for customer care", category: "app" },
];

const VIEWPORT_WIDTHS: Record<ViewportMode, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
};

/* ─── Mockup SVG Previews ─── */
function ComponentMockupPreview({ type, componentSettingsMap }: { type: string; componentSettingsMap?: any }) {
    const displayName = componentSettingsMap?.[type]?.name || type.replace(/_/g, " ");

    // Layout containers
    if (["box", "flex_box", "grid_box", "card_box", "stack_box", "split_hero_box", "masonry_box", "sticky_box"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-2">
                <div className="border border-zinc-200 rounded-lg bg-white p-3 flex flex-col gap-2">
                    <div className="h-2.5 bg-zinc-100 rounded w-2/3" />
                    <div className="grid grid-cols-3 gap-1.5">
                        {[1,2,3].map(i => <div key={i} className="h-12 bg-zinc-50 border border-zinc-100 rounded" />)}
                    </div>
                </div>
                <div className="h-2 bg-zinc-100 rounded w-1/2 mx-auto" />
            </div>
        );
    }

    if (["carousel_box"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-2">
                <div className="border border-zinc-200 rounded-lg bg-white p-3 flex gap-2 overflow-hidden">
                    <div className="h-20 w-[80px] bg-zinc-50 border border-zinc-100 rounded shrink-0" />
                    <div className="h-20 w-[80px] bg-zinc-50 border border-zinc-100 rounded shrink-0 opacity-60" />
                    <div className="h-20 w-[80px] bg-zinc-50 border border-zinc-100 rounded shrink-0 opacity-30" />
                </div>
                <div className="flex justify-center gap-1">
                    <div className="w-3 h-1 bg-zinc-700 rounded-full" />
                    {[1,2].map(i => <div key={i} className="w-1 h-1 bg-zinc-200 rounded-full" />)}
                </div>
            </div>
        );
    }

    if (["accordion_box"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-1">
                {[1,2,3].map(i => (
                    <div key={i} className={`border rounded-md px-3 py-2.5 flex items-center justify-between ${i === 1 ? "border-zinc-300 bg-white" : "border-zinc-100 bg-zinc-50"}`}>
                        <div className={`h-2 rounded ${i === 1 ? "bg-zinc-700 w-1/2" : "bg-zinc-200 w-2/5"}`} />
                        <div className={`w-3 h-3 border rounded ${i === 1 ? "border-zinc-400 rotate-180" : "border-zinc-200"}`} />
                    </div>
                ))}
            </div>
        );
    }

    if (["tabs_box"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-0">
                <div className="flex border-b border-zinc-200">
                    {["Tab 1","Tab 2","Tab 3"].map((t,i) => (
                        <div key={i} className={`px-3 py-2 text-[10px] font-medium border-b-2 -mb-px ${i === 0 ? "border-zinc-800 text-zinc-800" : "border-transparent text-zinc-400"}`}>{t}</div>
                    ))}
                </div>
                <div className="border border-t-0 border-zinc-200 rounded-b-lg bg-white p-3 flex flex-col gap-1.5">
                    <div className="h-2 bg-zinc-100 rounded w-3/4" />
                    <div className="h-2 bg-zinc-100 rounded w-full" />
                    <div className="h-2 bg-zinc-100 rounded w-1/2" />
                </div>
            </div>
        );
    }

    if (["modal_box", "drawer_box"].includes(type)) {
        return (
            <div className="w-[200px] relative">
                <div className="border border-zinc-100 rounded-lg bg-zinc-50 h-28 opacity-40" />
                <div className="absolute inset-4 bg-white border border-zinc-200 rounded-lg shadow-md p-3 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div className="h-2.5 bg-zinc-700 rounded w-1/3" />
                        <div className="w-3 h-3 bg-zinc-100 rounded" />
                    </div>
                    <div className="h-2 bg-zinc-100 rounded w-full" />
                    <div className="h-2 bg-zinc-100 rounded w-5/6" />
                </div>
            </div>
        );
    }

    // Content atoms
    if (["text", "text_block"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-2 bg-white border border-zinc-200 rounded-lg p-4">
                <div className="h-3.5 bg-zinc-800 rounded w-3/5" />
                <div className="flex flex-col gap-1.5 mt-1">
                    <div className="h-2 bg-zinc-100 rounded w-full" />
                    <div className="h-2 bg-zinc-100 rounded w-11/12" />
                    <div className="h-2 bg-zinc-100 rounded w-4/5" />
                </div>
            </div>
        );
    }

    if (["button", "button_block"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-lg p-4 flex flex-col items-center gap-3">
                <div className="h-2.5 bg-zinc-100 rounded w-1/2" />
                <div className="w-full h-8 bg-zinc-900 rounded-md flex items-center justify-center">
                    <div className="h-2 bg-white/60 rounded w-1/3" />
                </div>
            </div>
        );
    }

    if (["image", "image_block"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-lg p-3 flex flex-col gap-2">
                <div className="h-28 bg-zinc-50 border border-zinc-100 rounded-md flex items-center justify-center">
                    <svg className="w-8 h-8 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="h-2 bg-zinc-100 rounded w-2/5" />
            </div>
        );
    }

    if (["icon", "svg_icon"].includes(type)) {
        return (
            <div className="w-14 h-14 bg-white border border-zinc-200 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-7 h-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        );
    }

    if (["spacer_block"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-1 items-center">
                <div className="h-2 bg-zinc-100 rounded w-full" />
                <div className="flex items-center justify-center w-full py-3">
                    <div className="flex-1 h-px bg-zinc-200" />
                    <span className="text-[10px] text-zinc-300 px-2">space</span>
                    <div className="flex-1 h-px bg-zinc-200" />
                </div>
                <div className="h-2 bg-zinc-100 rounded w-full" />
            </div>
        );
    }

    if (["divider_block"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-2">
                <div className="h-2 bg-zinc-100 rounded w-3/4" />
                <div className="h-px bg-zinc-300 w-full" />
                <div className="h-2 bg-zinc-100 rounded w-1/2" />
            </div>
        );
    }

    if (["video_block"].includes(type)) {
        return (
            <div className="w-[200px] bg-zinc-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-0.5" />
                </div>
            </div>
        );
    }

    if (["badge_block", "rating_block", "price_block"].includes(type)) {
        return (
            <div className="flex flex-col items-center gap-3">
                {type === "badge_block" && <div className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">SALE</div>}
                {type === "rating_block" && <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <div key={i} className={`w-4 h-4 rounded-sm ${i <= 4 ? "bg-amber-400" : "bg-zinc-200"}`} />)}</div>}
                {type === "price_block" && (
                    <div className="flex items-baseline gap-2">
                        <span className="text-[18px] font-bold text-zinc-900">$49.00</span>
                        <span className="text-[12px] text-zinc-400 line-through">$79.00</span>
                    </div>
                )}
            </div>
        );
    }

    if (["countdown_block"].includes(type)) {
        return (
            <div className="flex gap-2">
                {["12","H", "34","M", "56","S"].map((v, i) => (
                    i % 2 === 0
                        ? <div key={i} className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-[14px] font-bold text-zinc-800">{v}</div>
                        : <div key={i} className="flex items-center text-zinc-300 font-bold text-lg">{v}</div>
                ))}
            </div>
        );
    }

    // Form elements
    if (["input", "input_field", "textarea_field", "search_query"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-lg p-4 flex flex-col gap-2">
                <div className="h-2 bg-zinc-300 rounded w-1/4" />
                <div className={`border border-zinc-200 rounded-md bg-zinc-50 w-full ${type === "textarea_field" ? "h-16" : "h-8"}`} />
            </div>
        );
    }

    if (["checkbox_field"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-lg p-4 flex flex-col gap-2.5">
                {[true, false, false].map((checked, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border ${checked ? "bg-zinc-900 border-zinc-900" : "border-zinc-300 bg-white"} flex items-center justify-center shrink-0`}>
                            {checked && <div className="w-2 h-1.5 border-l-2 border-b-2 border-white -rotate-45 -translate-y-px" />}
                        </div>
                        <div className="h-2 bg-zinc-100 rounded flex-1" />
                    </div>
                ))}
            </div>
        );
    }

    if (["radio_field"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-lg p-4 flex flex-col gap-2.5">
                {[true, false, false].map((checked, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border ${checked ? "border-zinc-900" : "border-zinc-300"} flex items-center justify-center shrink-0`}>
                            {checked && <div className="w-2 h-2 bg-zinc-900 rounded-full" />}
                        </div>
                        <div className="h-2 bg-zinc-100 rounded flex-1" />
                    </div>
                ))}
            </div>
        );
    }

    if (["select_field"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-lg p-4 flex flex-col gap-2">
                <div className="h-2 bg-zinc-300 rounded w-1/4" />
                <div className="h-8 border border-zinc-200 rounded-md bg-white flex items-center justify-between px-2.5">
                    <div className="h-2 bg-zinc-100 rounded w-1/3" />
                    <div className="w-3 h-3 border-r border-b border-zinc-300 rotate-45 -translate-y-0.5" />
                </div>
            </div>
        );
    }

    if (["quantity_selector"].includes(type)) {
        return (
            <div className="flex items-center gap-0 border border-zinc-200 rounded-lg overflow-hidden bg-white">
                <div className="w-9 h-9 flex items-center justify-center border-r border-zinc-100 text-zinc-400 text-lg font-light">−</div>
                <div className="w-12 h-9 flex items-center justify-center text-[13px] font-semibold text-zinc-800">1</div>
                <div className="w-9 h-9 flex items-center justify-center border-l border-zinc-100 text-zinc-400 text-lg font-light">+</div>
            </div>
        );
    }

    // E-commerce
    if (["product_loop_context", "category_loop_context"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-1.5">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="bg-white border border-zinc-100 rounded-lg p-2 flex flex-col gap-1.5">
                            <div className="h-12 bg-zinc-50 rounded" />
                            <div className="h-1.5 bg-zinc-100 rounded w-3/4" />
                            <div className="h-1.5 bg-zinc-200 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (["cart_items_context"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-1.5">
                {[1,2].map(i => (
                    <div key={i} className="bg-white border border-zinc-100 rounded-lg p-2.5 flex gap-2.5 items-center">
                        <div className="w-10 h-10 bg-zinc-50 rounded shrink-0" />
                        <div className="flex-1 flex flex-col gap-1.5">
                            <div className="h-2 bg-zinc-100 rounded w-3/4" />
                            <div className="h-2 bg-zinc-200 rounded w-1/3" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (["product_variant_selector"].includes(type)) {
        return (
            <div className="flex flex-col gap-2">
                <div className="h-1.5 bg-zinc-200 rounded w-16" />
                <div className="flex gap-1.5">
                    {["S","M","L","XL"].map((s,i) => (
                        <div key={i} className={`w-9 h-9 rounded-md border text-[11px] font-medium flex items-center justify-center ${i === 1 ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-500 bg-white"}`}>{s}</div>
                    ))}
                </div>
            </div>
        );
    }

    if (["product_image_gallery"].includes(type)) {
        return (
            <div className="flex gap-2">
                <div className="flex flex-col gap-1.5">
                    {[1,2,3].map(i => (
                        <div key={i} className={`w-10 h-10 rounded border ${i === 0 ? "border-zinc-400 bg-zinc-100" : "border-zinc-100 bg-zinc-50"}`} />
                    ))}
                </div>
                <div className="w-28 h-[134px] bg-zinc-50 border border-zinc-100 rounded-lg" />
            </div>
        );
    }

    if (["html_block", "progress_bar_block", "map_block"].includes(type)) {
        const iconMap: Record<string, string> = {
            html_block: "</>",
            progress_bar_block: "▓▓▓░",
            map_block: "📍",
        };
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-lg p-5 flex flex-col items-center gap-3">
                <span className="text-[22px] opacity-40">{iconMap[type]}</span>
                {type === "progress_bar_block" && (
                    <div className="w-full flex flex-col gap-1.5">
                        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-zinc-800 rounded-full" />
                        </div>
                        <div className="flex justify-between">
                            <div className="h-1.5 bg-zinc-100 rounded w-1/4" />
                            <div className="h-1.5 bg-zinc-200 rounded w-1/6" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Fallback
    const registryEntry = componentSettingsMap?.[type];
    const iconName = registryEntry?.icon;
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            </div>
            <span className="text-[11px] text-zinc-400 text-center">{displayName}</span>
        </div>
    );
}


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
    const [importJsonText, setImportJsonText] = useState("");
    const [importError, setImportError] = useState<string | null>(null);
    const [activeImportTab, setActiveImportTab] = useState<string>("import");
    const [copied, setCopied] = useState(false);

    const triggerImportPopup = (section: "announcement" | "navbar" | "footer" | "main") => {
        setImportSection(section);
        setImportJsonText("");
        setImportError(null);
        setActiveImportTab("import");
        setCopied(false);
        setShowImportPopup(true);
    };

    const handleImportSchema = () => {
        if (!importSection) return;
        try {
            const parsed = JSON.parse(importJsonText);
            if (!Array.isArray(parsed)) {
                setImportError("Schema must be a JSON array of ComponentSchema objects.");
                return;
            }
            // Basic validation check
            for (let i = 0; i < parsed.length; i++) {
                const item = parsed[i];
                if (!item.id || !item.type) {
                    setImportError(`Item at index ${i} is missing required 'id' or 'type' fields.`);
                    return;
                }
            }
            dispatch(setSchemas({ [importSection]: parsed } as any));
            const sectionDisplayName = importSection === "navbar" 
                ? "header/navbar" 
                : importSection === "main" 
                ? "template layout" 
                : importSection.replace("_", " ");
            toast.success(`Successfully imported schema for ${sectionDisplayName}!`);
            setShowImportPopup(false);
        } catch (e: any) {
            setImportError(`Malformed JSON: ${e.message}`);
        }
    };

    const handleCopyCurrentSchema = () => {
        if (!importSection) return;
        const currentSchema = schemas[importSection];
        navigator.clipboard.writeText(JSON.stringify(currentSchema, null, 4));
        setCopied(true);
        toast.success("Current schema copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    // States for Shopify search component panel
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredComp, setHoveredComp] = useState<string>("box");
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const [componentSettingsMap, setComponentSettingsMap] = useState<any>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
                // If route doesn't exist in DB and is not root, redirect to editor home
                if (routePath !== "/" && res.pageRoute && !res.pageRoute.exists) {
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

    const triggerAddPopup = (parentId: string | null, section: "header" | "main" | "footer" | "global") => {
        setAddingToParentId(parentId);
        setAddingToSection(section);
        setSearchQuery("");
        setActiveCategory("all");
        setHoveredComp("box");
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

    const handleUpdateSetting = (settingKey: string, val: string, settingConfig: any) => {
        if (!selectedNode) return;
        let isValid = true;
        if (settingConfig) {
            const { rgx, opt } = settingConfig;
            if (rgx) {
                isValid = new RegExp(rgx).test(val) || (opt?.includes(val)) || val === "";
            } else if (opt) {
                isValid = opt.includes(val) || val === "";
            }
        }
        const newErrors = { ...validationErrors };
        if (!isValid) newErrors[settingKey] = "Invalid";
        else delete newErrors[settingKey];
        setValidationErrors(newErrors);

        const settings = { ...(selectedNode.settings || {}) };
        if (val === "") delete settings[settingKey];
        else settings[settingKey] = val;
        dispatch(updateNodeSettings({ id: selectedNode.id, settings }));
    };

    // Count helper for category tabs
    const getCategoryCount = (catValue: string) => {
        return AVAILABLE_COMPONENTS.filter((comp) => {
            const matchesSearch = comp.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  comp.type.toLowerCase().includes(searchQuery.toLowerCase());
            if (!matchesSearch) return false;
            
            if (catValue === "all") return true;
            const registryEntry = componentSettingsMap?.[comp.type];
            const category = registryEntry?.category || "legacy";
            return category === catValue;
        }).length;
    };

    // Filter component options
    const filteredComponents = AVAILABLE_COMPONENTS.filter((comp) => {
        const matchesSearch = comp.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              comp.type.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;
        
        if (activeCategory === "all") return true;
        const registryEntry = componentSettingsMap?.[comp.type];
        const category = registryEntry?.category || "legacy";
        return category === activeCategory;
    });

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

                            {schemas.main && schemas.main.length > 0 ? (
                                <EditorPreviewBuilder schema={schemas.main} />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-32 text-zinc-300">
                                    <Layout className="w-10 h-10 mb-3" />
                                    <p className="text-[13px] text-zinc-400">Main body is empty.</p>
                                    <p className="text-[12px] text-zinc-400">Add elements in hierarchy.</p>
                                </div>
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
            <Dialog.Root open={showAddPopup} onOpenChange={setShowAddPopup}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[860px] h-[540px] rounded-xl shadow-xl flex border border-zinc-200 overflow-hidden z-50 outline-none">
                        <div className="sr-only">
                            <Dialog.Title>Insert Component</Dialog.Title>
                            <Dialog.Description>Choose a component to add</Dialog.Description>
                        </div>

                        {/* Left Pane */}
                        <div className="w-[420px] flex flex-col h-full bg-white shrink-0 border-r border-zinc-100">
                            {/* Header */}
                            <div className="px-4 pt-4 pb-3 shrink-0">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">Insert</p>
                                <div className="relative">
                                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search components..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-8.5 pr-3 py-2 text-[12.5px] outline-none text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-300 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            {/* Tabs */}
                            <Tabs.Root value={activeCategory} onValueChange={setActiveCategory} className="flex flex-col flex-1 min-h-0">
                                <Tabs.List className="flex border-b border-zinc-100 px-4 gap-0 shrink-0">
                                    {CATEGORIES.map((cat) => {
                                        const count = getCategoryCount(cat.value);
                                        const isActive = activeCategory === cat.value;
                                        return (
                                            <Tabs.Trigger
                                                key={cat.value}
                                                value={cat.value}
                                                className={`relative px-2 py-2 text-[11px] font-medium transition-colors cursor-pointer outline-none shrink-0 flex items-center gap-1 border-b-2 -mb-px ${
                                                    isActive
                                                        ? "text-zinc-900 border-zinc-800"
                                                        : "text-zinc-400 border-transparent hover:text-zinc-600"
                                                }`}
                                            >
                                                {cat.label}
                                                {count > 0 && (
                                                    <span className={`text-[10px] tabular-nums ${isActive ? "text-zinc-500" : "text-zinc-350"}`}>
                                                        {count}
                                                    </span>
                                                )}
                                            </Tabs.Trigger>
                                        );
                                    })}
                                </Tabs.List>

                                {/* List */}
                                <div className="flex-1 overflow-y-auto py-1.5">
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
                                                onClick={() => handleAddComponent(comp.type)}
                                                className={`w-full flex items-center text-left px-4 py-2 transition-colors cursor-pointer group ${
                                                    isSelected ? "bg-zinc-50" : "hover:bg-zinc-50"
                                                }`}
                                            >
                                                <div className={`w-7 h-7 rounded-md flex items-center justify-center mr-3 shrink-0 transition-colors ${
                                                    isSelected ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200"
                                                }`}>
                                                    <IconComponent className="w-3.5 h-3.5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[12.5px] font-semibold text-zinc-800 leading-snug truncate">{displayName}</div>
                                                    <div className="text-[11px] text-zinc-400 truncate">{comp.desc}</div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {filteredComponents.length === 0 && (
                                        <p className="text-[12px] text-zinc-400 text-center py-16">No components found</p>
                                    )}
                                </div>
                            </Tabs.Root>
                        </div>

                        {/* Right Pane */}
                        <div className="flex-1 bg-zinc-50 flex flex-col h-full relative">
                            {/* Close */}
                            <div className="absolute top-3 right-3 z-10">
                                <Dialog.Close asChild>
                                    <button className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-md hover:bg-zinc-200 transition-colors cursor-pointer">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </Dialog.Close>
                            </div>

                            {/* Preview canvas */}
                            <div className="flex-1 flex items-center justify-center p-8">
                                <ComponentMockupPreview type={hoveredComp} componentSettingsMap={componentSettingsMap} />
                            </div>

                            {/* Info strip */}
                            {(() => {
                                const hoveredCompDef = AVAILABLE_COMPONENTS.find(c => c.type === hoveredComp);
                                const registryEntry = componentSettingsMap?.[hoveredComp];
                                const categoryName = registryEntry?.category || "legacy";
                                const settingsCount = registryEntry?.settings ? Object.keys(registryEntry.settings).length : 0;
                                return hoveredCompDef ? (
                                    <div className="px-5 py-3.5 bg-white border-t border-zinc-100 shrink-0">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{categoryName}</span>
                                            <span className="w-0.5 h-0.5 rounded-full bg-zinc-300 inline-block" />
                                            <span className="text-[10px] text-zinc-400">{settingsCount} settings</span>
                                        </div>
                                        <h4 className="text-[13px] font-bold text-zinc-900">{registryEntry?.name || hoveredCompDef.label}</h4>
                                        <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{hoveredCompDef.desc}</p>
                                    </div>
                                ) : null;
                            })()}
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Import / Export JSON Schema Dialog */}
            <Dialog.Root open={showImportPopup} onOpenChange={setShowImportPopup}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-zinc-950/20 backdrop-blur-md z-50 transition-all duration-300" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[760px] h-[580px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col border border-zinc-100 overflow-hidden z-50 outline-none transition-all duration-300">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between shrink-0 bg-white">
                            <div>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-650 text-[9px] font-bold uppercase tracking-wider rounded-md">
                                        Developer Mode
                                    </span>
                                </div>
                                <Dialog.Title className="text-[16px] font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
                                    {importSection === "navbar" 
                                        ? "Header & Navbar" 
                                        : importSection === "main" 
                                        ? "Template Layout" 
                                        : importSection?.replace("_", " ")} Schema Manager
                                </Dialog.Title>
                            </div>
                            <Dialog.Close asChild>
                                <button className="text-zinc-400 hover:text-zinc-800 p-2 rounded-xl hover:bg-zinc-100 transition-all cursor-pointer outline-none active:scale-95">
                                    <X className="w-4 h-4" />
                                </button>
                            </Dialog.Close>
                        </div>

                        {/* Tabs Container */}
                        <Tabs.Root value={activeImportTab} onValueChange={setActiveImportTab} className="flex-1 flex flex-col min-h-0 bg-white px-6 pb-6">
                            
                            {/* Sliding apple-like pill tabs */}
                            <Tabs.List className="flex bg-zinc-100 p-1 rounded-2xl gap-1 shrink-0 max-w-[280px] mb-4 mt-2">
                                <Tabs.Trigger
                                    value="import"
                                    className={`px-4 py-1.5 text-[12px] font-bold rounded-xl transition-all cursor-pointer outline-none ${
                                        activeImportTab === "import"
                                            ? "bg-white text-zinc-900 shadow-sm"
                                            : "text-zinc-450 hover:text-zinc-650"
                                    }`}
                                >
                                    Import JSON
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="export"
                                    className={`px-4 py-1.5 text-[12px] font-bold rounded-xl transition-all cursor-pointer outline-none ${
                                        activeImportTab === "export"
                                            ? "bg-white text-zinc-900 shadow-sm"
                                            : "text-zinc-450 hover:text-zinc-650"
                                    }`}
                                >
                                    Export JSON
                                </Tabs.Trigger>
                            </Tabs.List>

                            {/* Import Tab Content */}
                            <Tabs.Content value="import" className="flex-1 min-h-0 flex flex-col outline-none">
                                <div className="mb-4 flex items-start gap-3 p-4 bg-indigo-50/45 border border-indigo-150 rounded-2xl text-indigo-950 text-[11px] leading-relaxed shadow-sm">
                                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="font-bold">Caution:</strong> Importing a custom JSON schema will completely overwrite the existing layout tree for this section. Ensure you copy the backup configuration first.
                                    </div>
                                </div>

                                <div className="flex-1 min-h-0 rounded-2xl border border-zinc-200/80 bg-[#0c0d12] overflow-hidden flex flex-col shadow-lg">
                                    <div className="flex items-center justify-between px-5 py-3 bg-[#11131a] border-b border-zinc-900/60 select-none">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${importJsonText ? (importError ? "bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]") : "bg-zinc-600"}`} />
                                            <span className="text-[11px] font-mono text-zinc-350 font-medium tracking-wide">layout_schema.json</span>
                                        </div>
                                        <span className="text-[9px] font-mono font-semibold tracking-wider text-zinc-600 bg-zinc-900/80 px-2 py-0.5 rounded-md">JSON EDITOR</span>
                                    </div>
                                    <textarea
                                        value={importJsonText}
                                        onChange={(e) => {
                                            setImportJsonText(e.target.value);
                                            setImportError(null);
                                        }}
                                        placeholder={`[\n  {\n    "id": "example_id",\n    "type": "box",\n    "settings": {},\n    "children": []\n  }\n]`}
                                        className="flex-1 w-full bg-transparent font-mono text-[11.5px] text-[#89ddff] p-5 resize-none outline-none leading-relaxed overflow-y-auto selection:bg-indigo-500/30 placeholder:text-zinc-700"
                                    />
                                    {importError && (
                                        <div className="mx-5 mb-5 p-3 bg-rose-950/60 border border-rose-900/70 rounded-xl text-rose-200 text-[11px] font-mono leading-normal shadow-sm">
                                            {importError}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 mt-5 shrink-0">
                                    <Dialog.Close asChild>
                                        <button className="px-5 py-2.5 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 rounded-2xl text-[12px] font-bold active:scale-[0.98] transition-all cursor-pointer">
                                            Cancel
                                        </button>
                                    </Dialog.Close>
                                    <button
                                        onClick={handleImportSchema}
                                        disabled={!importJsonText.trim()}
                                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl text-[12px] font-bold active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-600/15 disabled:opacity-40 disabled:pointer-events-none"
                                    >
                                        <Upload className="w-3.5 h-3.5" />
                                        Apply Schema
                                    </button>
                                </div>
                            </Tabs.Content>

                            {/* Export Tab Content */}
                            <Tabs.Content value="export" className="flex-1 min-h-0 flex flex-col outline-none">
                                <div className="mb-4 text-[11.5px] text-zinc-500 leading-normal">
                                    Copy this JSON schema code to back up your current layout configuration or move it to another template instance.
                                </div>

                                <div className="flex-1 min-h-0 rounded-2xl border border-zinc-200/80 bg-[#0c0d12] overflow-hidden flex flex-col shadow-lg">
                                    <div className="flex items-center justify-between px-5 py-3 bg-[#11131a] border-b border-zinc-900/60 select-none">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                            <span className="text-[11px] font-mono text-zinc-350 font-medium tracking-wide">layout_schema_backup.json</span>
                                        </div>
                                        <span className="text-[9px] font-mono font-semibold tracking-wider text-zinc-600 bg-zinc-900/80 px-2 py-0.5 rounded-md">READ ONLY</span>
                                    </div>
                                    <pre className="flex-1 w-full bg-transparent font-mono text-[11.5px] text-[#c3e88d] p-5 overflow-y-auto leading-relaxed shadow-inner select-all selection:bg-indigo-500/30">
                                        {importSection ? JSON.stringify(schemas[importSection], null, 4) : ""}
                                    </pre>
                                </div>

                                <div className="flex justify-end gap-3 mt-5 shrink-0">
                                    <button
                                        onClick={handleCopyCurrentSchema}
                                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl text-[12px] font-bold active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-600/15"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                        {copied ? "Copied!" : "Copy to Clipboard"}
                                    </button>
                                    <Dialog.Close asChild>
                                        <button className="px-5 py-2.5 border border-zinc-200 text-zinc-650 hover:bg-zinc-50 rounded-2xl text-[12px] font-bold active:scale-[0.98] transition-all cursor-pointer">
                                            Close
                                        </button>
                                    </Dialog.Close>
                                </div>
                            </Tabs.Content>
                        </Tabs.Root>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <Toaster position="bottom-right" toastOptions={{ style: { fontSize: "13px" } }} />
        </div>
    );
}

export default function Page() {
    return <ThemeEditorWorkspace />;
}
