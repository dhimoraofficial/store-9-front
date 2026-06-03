import React from "react";
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
    Images
} from "lucide-react";

export const LUCIDE_ICONS_MAP: Record<string, React.ComponentType<any>> = {
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
    Image: ImageIcon,
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

export function getDialogComponentIcon(type: string) {
    const lType = type?.toLowerCase() || "";
    // Containers
    if (["box", "flex_box", "grid_box", "card_box", "carousel_box", "modal_box", "drawer_box", "accordion_box", "tabs_box", "sticky_box", "split_hero_box", "stack_box", "masonry_box"].includes(lType)) return Code2;
    // Buttons
    if (lType === "button" || lType === "button_block") return Square;
    // Texts
    if (lType === "text" || lType === "text_block") return AlignLeft;
    // Images & Videos
    if (lType === "image" || lType === "image_block" || lType === "video_block") return ImageIcon;
    // Icons
    if (lType === "icon" || lType === "svg_icon") return Layers;
    // Inputs & Forms
    if (["input", "input_block", "input_field", "textarea_field", "checkbox_field", "radio_field", "select_field", "quantity_selector"].includes(lType)) return Square;
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

export function ComponentMockupPreview({ type, componentSettingsMap }: { type: string; componentSettingsMap?: any }) {
    const displayName = componentSettingsMap?.[type]?.name || type.replace(/_/g, " ");

    // Layout containers
    if (["box", "flex_box", "grid_box", "card_box", "stack_box", "split_hero_box", "masonry_box", "sticky_box", "container", "flex_row", "flex_col", "grid", "card", "stack", "accordion", "tabs"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-2">
                <div className="border border-zinc-200 rounded-md bg-white p-3 flex flex-col gap-2">
                    <div className="h-2.5 bg-zinc-100 rounded w-2/3" />
                    <div className="grid grid-cols-3 gap-1.5">
                        {[1, 2, 3].map(i => <div key={i} className="h-12 bg-zinc-50 border border-zinc-100 rounded" />)}
                    </div>
                </div>
                <div className="h-2 bg-zinc-100 rounded w-1/2 mx-auto" />
            </div>
        );
    }

    if (["carousel_box", "scroll_area"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-2">
                <div className="border border-zinc-200 rounded-md bg-white p-3 flex gap-2 overflow-hidden">
                    <div className="h-20 w-[80px] bg-zinc-50 border border-zinc-100 rounded shrink-0" />
                    <div className="h-20 w-[80px] bg-zinc-50 border border-zinc-100 rounded shrink-0 opacity-60" />
                    <div className="h-20 w-[80px] bg-zinc-50 border border-zinc-100 rounded shrink-0 opacity-30" />
                </div>
                <div className="flex justify-center gap-1">
                    <div className="w-3 h-1 bg-zinc-700 rounded-full" />
                    {[1, 2].map(i => <div key={i} className="w-1 h-1 bg-zinc-200 rounded-full" />)}
                </div>
            </div>
        );
    }

    if (["accordion_box", "accordion_item"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-1">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`border rounded-md px-3 py-2.5 flex items-center justify-between ${i === 1 ? "border-zinc-300 bg-white" : "border-zinc-100 bg-zinc-50"}`}>
                        <div className={`h-2 rounded ${i === 1 ? "bg-zinc-700 w-1/2" : "bg-zinc-200 w-2/5"}`} />
                        <div className={`w-3 h-3 border rounded ${i === 1 ? "border-zinc-400 rotate-180" : "border-zinc-200"}`} />
                    </div>
                ))}
            </div>
        );
    }

    if (["tabs_box", "tab_content"].includes(type)) {
        return (
            <div className="w-[200px] flex flex-col gap-0">
                <div className="flex border-b border-zinc-200">
                    {["Tab 1", "Tab 2", "Tab 3"].map((t, i) => (
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
                <div className="border border-zinc-100 rounded-md bg-zinc-50 h-28 opacity-40" />
                <div className="absolute inset-4 bg-white border border-zinc-200 rounded-md shadow-md p-3 flex flex-col gap-2">
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
            <div className="w-[200px] flex flex-col gap-2 bg-white border border-zinc-200 rounded-md p-4">
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
            <div className="w-[200px] bg-white border border-zinc-200 rounded-md p-4 flex flex-col items-center gap-3">
                <div className="h-2.5 bg-zinc-100 rounded w-1/2" />
                <div className="w-full h-8 bg-zinc-900 rounded-md flex items-center justify-center">
                    <div className="h-2 bg-white/60 rounded w-1/3" />
                </div>
            </div>
        );
    }

    if (["image", "image_block"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-md p-3 flex flex-col gap-2">
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
            <div className="w-14 h-14 bg-white border border-zinc-200 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-7 h-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        );
    }

    if (["spacer_block", "spacer"].includes(type)) {
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

    if (["divider_block", "divider"].includes(type)) {
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
            <div className="w-[200px] bg-zinc-900 rounded-md aspect-video flex items-center justify-center">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-0.5" />
                </div>
            </div>
        );
    }

    if (["badge_block", "badge", "rating_block", "price_block"].includes(type)) {
        return (
            <div className="flex flex-col items-center gap-3">
                {(type === "badge_block" || type === "badge") && <div className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">SALE</div>}
                {type === "rating_block" && <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-4 h-4 rounded-sm ${i <= 4 ? "bg-amber-400" : "bg-zinc-200"}`} />)}</div>}
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
                {["12", "H", "34", "M", "56", "S"].map((v, i) => (
                    i % 2 === 0
                        ? <div key={i} className="w-10 h-10 bg-white border border-zinc-200 rounded-md flex items-center justify-center text-[14px] font-bold text-zinc-800">{v}</div>
                        : <div key={i} className="flex items-center text-zinc-300 font-bold text-lg">{v}</div>
                ))}
            </div>
        );
    }

    // Form elements
    if (["input", "input_field", "textarea_field", "search_query"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-md p-4 flex flex-col gap-2">
                <div className="h-2 bg-zinc-300 rounded w-1/4" />
                <div className={`border border-zinc-200 rounded-md bg-zinc-50 w-full ${type === "textarea_field" ? "h-16" : "h-8"}`} />
            </div>
        );
    }

    if (["checkbox_field"].includes(type)) {
        return (
            <div className="w-[200px] bg-white border border-zinc-200 rounded-md p-4 flex flex-col gap-2.5">
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
            <div className="w-[200px] bg-white border border-zinc-200 rounded-md p-4 flex flex-col gap-2.5">
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
            <div className="w-[200px] bg-white border border-zinc-200 rounded-md p-4 flex flex-col gap-2">
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
            <div className="flex items-center gap-0 border border-zinc-200 rounded-md overflow-hidden bg-white">
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
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white border border-zinc-100 rounded-md p-2 flex flex-col gap-1.5">
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
                {[1, 2].map(i => (
                    <div key={i} className="bg-white border border-zinc-100 rounded-md p-2.5 flex gap-2.5 items-center">
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
                    {["S", "M", "L", "XL"].map((s, i) => (
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
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-10 h-10 rounded border ${i === 0 ? "border-zinc-400 bg-zinc-100" : "border-zinc-100 bg-zinc-50"}`} />
                    ))}
                </div>
                <div className="w-28 h-[134px] bg-zinc-50 border border-zinc-100 rounded-md" />
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
            <div className="w-[200px] bg-white border border-zinc-200 rounded-md p-5 flex flex-col items-center gap-3">
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
    const TemplateComp = registryEntry?.component;
    if (TemplateComp) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 overflow-hidden">
                <div className="w-[1200px] shrink-0 origin-center scale-[0.25] pointer-events-none select-none">
                    <TemplateComp />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-zinc-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            </div>
            <span className="text-[11px] text-zinc-400 text-center">{displayName}</span>
        </div>
    );
}
