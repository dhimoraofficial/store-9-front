"use client";

import { cn } from "@/application/utility";
import { Heart, ShoppingCart, User } from "lucide-react";
import React from "react";

interface NavUtilitiesBlockProps {
    wishlistShow?: boolean;
    cartShow?: boolean;
    accountShow?: boolean;
    iconSize?: "small" | "medium" | "large";
    style?: React.CSSProperties;
}

export default function ClientComponent({
    wishlistShow = true,
    cartShow = true,
    accountShow = true,
    iconSize = "medium",
    style
}: NavUtilitiesBlockProps) {
    const sizeClasses = {
        small: "w-4 h-4",
        medium: "w-5 h-5",
        large: "w-6 h-6"
    };

    const iconSizeClass = sizeClasses[iconSize] || sizeClasses.medium;

    return (
        <div className="flex items-center gap-2" style={style}>
            {wishlistShow && (
                <a 
                    href="/wishlist" 
                    className="p-2 text-foreground/80 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition-all" 
                    title="Wishlist"
                >
                    <Heart className={iconSizeClass} />
                </a>
            )}
            {accountShow && (
                <a 
                    href="/account" 
                    className="p-2 text-foreground/80 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition-all" 
                    title="My Account"
                >
                    <User className={iconSizeClass} />
                </a>
            )}
            {cartShow && (
                <a 
                    href="/cart" 
                    className="p-2 text-foreground/80 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition-all relative" 
                    title="Shopping Cart"
                >
                    <ShoppingCart className={iconSizeClass} />
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center">0</span>
                </a>
            )}
        </div>
    );
}
