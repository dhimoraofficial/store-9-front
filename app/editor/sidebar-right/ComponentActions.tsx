"use client";

import React from "react";
import { ComponentSchema } from "@/application/runtime/builder/type";

interface ComponentActionsProps {
    selectedNode: ComponentSchema;
    onUpdateAction?: (id: string, action: any | null) => void;
}

export default function ComponentActions({
    selectedNode,
    onUpdateAction,
}: ComponentActionsProps) {
    return (
        <div className="space-y-4">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest pb-1 border-b border-zinc-50">
                Interactions
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                Define what happens when users click or interact with this component.
            </p>

            {/* Action Selector */}
            <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-zinc-700">Action On Click</label>
                <select
                    value={(() => {
                        const act = selectedNode.action;
                        if (!act) return "";
                        if (Array.isArray(act)) return act[0]?.type || "";
                        return act.type || "";
                    })()}
                    onChange={(e) => {
                        const newType = e.target.value;
                        if (!newType) {
                            onUpdateAction?.(selectedNode.id, null);
                        } else {
                            onUpdateAction?.(selectedNode.id, {
                                type: newType as any,
                                prop: {}
                            });
                        }
                    }}
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-zinc-700 outline-none focus:border-zinc-400 bg-white cursor-pointer"
                >
                    <option value="">(None)</option>
                    <option value="navigateTo">Navigate to Page</option>
                    <option value="addToCart">Add to Cart</option>
                    <option value="checkoutCart">Checkout Cart</option>
                    <option value="openSearch">Open Search Bar</option>
                    <option value="toggleCart">Toggle Cart Sidebar</option>
                    <option value="toggleMenu">Toggle Mobile Menu</option>
                    <option value="signIn">Sign In Page</option>
                    <option value="signOut">Sign Out</option>
                    <option value="subscribeEmail">Subscribe Newsletter</option>
                </select>
            </div>

            {/* Conditional Props depending on Action */}
            {(() => {
                const act = selectedNode.action;
                const actionObj = Array.isArray(act) ? act[0] : act;
                if (!actionObj || !actionObj.type) return null;

                if (actionObj.type === "navigateTo") {
                    return (
                        <div className="space-y-1.5 pt-1.5">
                            <label className="text-[12px] font-semibold text-zinc-700">Destination URL / Route</label>
                            <input
                                type="text"
                                placeholder="e.g. /about-us"
                                value={actionObj.prop?.to || ""}
                                onChange={(e) => {
                                    onUpdateAction?.(selectedNode.id, {
                                        type: "navigateTo",
                                        prop: { to: e.target.value }
                                    });
                                }}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-zinc-400 bg-white text-zinc-800 font-mono font-semibold"
                            />
                            <p className="text-[10px] text-zinc-400 leading-normal font-semibold">
                                Enter a relative path (e.g., /cart) or external URL.
                            </p>
                        </div>
                    );
                }

                if (actionObj.type === "addToCart") {
                    return (
                        <div className="space-y-1.5 pt-1.5">
                            <label className="text-[12px] font-semibold text-zinc-700">Product ID / Variant ID</label>
                            <input
                                type="text"
                                placeholder="e.g. prod_0123"
                                value={actionObj.prop?.productId || ""}
                                onChange={(e) => {
                                    onUpdateAction?.(selectedNode.id, {
                                        type: "addToCart",
                                        prop: { productId: e.target.value }
                                    });
                                }}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-zinc-400 bg-white text-zinc-800 font-mono font-semibold"
                            />
                        </div>
                    );
                }

                return (
                    <div className="bg-zinc-50 border border-zinc-150 rounded-lg p-3 text-[11px] text-zinc-500 leading-normal font-semibold">
                        Action of type <span className="font-mono font-bold text-zinc-700">{actionObj.type}</span> will be triggered. No extra parameters required.
                    </div>
                );
            })()}
        </div>
    );
}
