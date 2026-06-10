"use client";

import { cn } from "@/application/utility";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

interface EcommerceNavbarProps {
    layoutVariant?: 
      | "single-row" 
      | "double-row" 
      | "glassmorphic-sticky";
    className?: string;
    backgroundColor?: string;
    enableGlassmorphism?: boolean;
    mobileTriggerAlign?: "left" | "right";
    mobileLogoAlign?: "left" | "center";
    mobileSearchPosition?: "header" | "drawer" | "hidden";
    mobileUtilitiesPosition?: "header" | "drawer" | "hidden";
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

// Helper to recursively find a specific component type or ID in the children tree
const findComponentInTree = (children: React.ReactNode, typeOrId: string): any => {
    let found: any = null;
    React.Children.forEach(children, (child: any) => {
        if (found) return;
        if (child?.props?.schema?.type === typeOrId || child?.props?.schema?.id === typeOrId) {
            found = child;
        } else if (child?.props?.children) {
            found = findComponentInTree(child.props.children, typeOrId);
        }
    });
    return found;
};

// Helper to find all links or nested elements for the mobile menu drawer
const findLinksInTree = (children: React.ReactNode): any[] => {
    let links: any[] = [];
    React.Children.forEach(children, (child: any) => {
        const type = child?.props?.schema?.type;
        if (type === "link_block" || type === "rich_text_block") {
            links.push(child);
        } else if (child?.props?.children) {
            links = [...links, ...findLinksInTree(child.props.children)];
        }
    });
    return links;
};

export default function ClientComponent({
    layoutVariant = "single-row",
    className = "",
    backgroundColor = "",
    enableGlassmorphism = false,
    mobileTriggerAlign = "right",
    mobileLogoAlign = "left",
    mobileSearchPosition = "drawer",
    mobileUtilitiesPosition = "header",
    children,
    style
}: EcommerceNavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Locate sub-components dynamically for mobile view
    const logoBlock = findComponentInTree(children, "logo_block");
    const searchBlock = findComponentInTree(children, "search_bar_block");
    const utilitiesBlock = findComponentInTree(children, "nav_utilities_block") || findComponentInTree(children, "navbar_utilities");
    const mobileLinks = findLinksInTree(children);

    const customBgStyle = backgroundColor ? { backgroundColor } : {};
    const baseContainerClass = cn(
        "w-full z-50 transition-all duration-300 border-b border-border shadow-sm",
        enableGlassmorphism ? "bg-background/80 backdrop-blur-md" : (backgroundColor ? "" : "bg-background"),
        layoutVariant === "glassmorphic-sticky" && "sticky top-4 mx-auto max-w-7xl rounded-2xl border border-white/20 shadow-lg my-2 px-2",
        className
    );

    return (
        <header className={baseContainerClass} style={{ ...customBgStyle, ...style }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                
                {/* Desktop View Header Bar (Sequential Children Rendering) */}
                <div className={cn(
                    "hidden lg:flex items-center gap-4 w-full",
                    layoutVariant === "double-row" 
                        ? "flex-col py-4" 
                        : "h-20 flex-row justify-between"
                )}>
                    {children}
                </div>

                {/* Mobile View Header Bar */}
                <div className="flex lg:hidden h-16 items-center justify-between gap-4 w-full relative">
                    {/* Left Section: Mobile Trigger or Logo */}
                    <div className="flex items-center gap-2">
                        {mobileTriggerAlign === "left" && (
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 text-foreground/80 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                                aria-label="Toggle Menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                        {mobileLogoAlign === "left" && logoBlock}
                    </div>

                    {/* Center Section: Centered Logo if configured */}
                    {mobileLogoAlign === "center" && (
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                            {logoBlock}
                        </div>
                    )}

                    {/* Right Section: Mobile Utilities and/or Hamburger Trigger */}
                    <div className="flex items-center gap-2">
                        {mobileUtilitiesPosition === "header" && utilitiesBlock}

                        {mobileTriggerAlign === "right" && (
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 text-foreground/80 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                                aria-label="Toggle Menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Search Row in Header */}
                {mobileSearchPosition === "header" && searchBlock && (
                    <div className="block lg:hidden pb-3 w-full">
                        {searchBlock}
                    </div>
                )}
            </div>

            {/* MOBILE DRAWER OVERLAY */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />

                    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background p-6 shadow-xl flex flex-col justify-between overflow-y-auto">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-foreground">Menu Options</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-foreground hover:bg-secondary rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Mobile Search in Drawer */}
                            {mobileSearchPosition === "drawer" && searchBlock && (
                                <div className="w-full">
                                    {searchBlock}
                                </div>
                            )}

                            {/* Mobile Links Navigation */}
                            <nav className="flex flex-col gap-2">
                                {mobileLinks.map((link, idx) => (
                                    <div key={idx} className="border-b border-border/50 pb-2" onClick={() => setMobileMenuOpen(false)}>
                                        {link}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        <div className="pt-6 border-t border-border mt-auto space-y-4">
                            {mobileUtilitiesPosition === "drawer" && utilitiesBlock && (
                                <div className="flex justify-center py-2 bg-secondary/35 rounded-xl">
                                    {utilitiesBlock}
                                </div>
                            )}
                            <div className="flex justify-center gap-4 text-xs text-muted-foreground pt-1">
                                <span>Press Esc to close</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
