import React from "react";
import {
    Plus,
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

export const LUCIDE_ICONS_MAP: Record<string, React.ComponentType<any>> = {
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
export function getComponentIcon(type: string, id: string) {
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

export function getDynamicComponentIcon(type: string, id: string, componentSettingsMap: any) {
    const entry = componentSettingsMap?.[type];
    const iconName = entry?.icon;
    if (iconName && LUCIDE_ICONS_MAP[iconName]) {
        const IconComp = LUCIDE_ICONS_MAP[iconName];
        return <IconComp className="w-3.5 h-3.5 text-zinc-500 shrink-0" />;
    }
    return getComponentIcon(type, id);
}
