"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";

interface ComponentActionsProps {
    selectedNode: ComponentSchema;
    onUpdateAction?: (id: string, action: any | null) => void;
}

const ACTION_OPTIONS = [
    { value: "navigateTo", label: "Navigate to Page" },
    { value: "addToCart", label: "Add to Cart" },
    { value: "checkoutCart", label: "Checkout Cart" },
    { value: "openSearch", label: "Open Search Bar" },
    { value: "toggleCart", label: "Toggle Cart Sidebar" },
    { value: "toggleMenu", label: "Toggle Mobile Menu" },
    { value: "signIn", label: "Sign In Page" },
    { value: "signOut", label: "Sign Out" },
    { value: "subscribeEmail", label: "Subscribe Newsletter" },
];

export default function ComponentActions({
    selectedNode,
    onUpdateAction,
}: ComponentActionsProps) {
    const act = selectedNode.action;
    const actionObj = Array.isArray(act) ? act[0] : act;
    const currentType = actionObj?.type || "";

    return (
        <div className="space-y-5">
            <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide pb-2 border-b border-zinc-100">
                    Interactions
                </p>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed mt-2.5">
                    Define what happens when users click or interact with this component.
                </p>
            </div>

            {/* Action Selector */}
            <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Action On Click</label>
                <Select.Root
                    value={currentType || "__none__"}
                    onValueChange={(v) => {
                        const newType = v === "__none__" ? "" : v;
                        if (!newType) {
                            onUpdateAction?.(selectedNode.id, null);
                        } else {
                            onUpdateAction?.(selectedNode.id, { type: newType as any, prop: {} });
                        }
                    }}
                >
                    <Select.Trigger className="w-full flex items-center justify-between border border-zinc-200 rounded-md px-3 py-2.5 text-[12px] font-sans font-semibold text-zinc-700 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-950/10 bg-white cursor-pointer hover:border-zinc-300 transition-colors data-[placeholder]:text-zinc-400">
                        <Select.Value placeholder="Select action…" />
                        <Select.Icon>
                            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                        </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                        <Select.Content
                            position="popper"
                            sideOffset={4}
                            className="z-[200] w-[var(--radix-select-trigger-width)] bg-white border border-zinc-200 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden outline-none font-sans"
                        >
                            <Select.Viewport className="p-1">
                                <Select.Item
                                    value="__none__"
                                    className="flex items-center justify-between px-3 py-2 text-[12px] text-zinc-400 font-sans font-medium rounded-md cursor-pointer outline-none data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none"
                                >
                                    <Select.ItemText>(None)</Select.ItemText>
                                    <Select.ItemIndicator><Check className="w-3 h-3 text-zinc-500" /></Select.ItemIndicator>
                                </Select.Item>

                                <div className="h-px bg-zinc-100 my-1 mx-1" />

                                {ACTION_OPTIONS.map((opt) => (
                                    <Select.Item
                                        key={opt.value}
                                        value={opt.value}
                                        className="flex items-center justify-between px-3 py-2 text-[12px] font-sans font-semibold text-zinc-700 rounded-md cursor-pointer outline-none data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none"
                                    >
                                        <Select.ItemText>{opt.label}</Select.ItemText>
                                        <Select.ItemIndicator><Check className="w-3 h-3 text-zinc-500" /></Select.ItemIndicator>
                                    </Select.Item>
                                ))}
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>

            {/* Conditional Props depending on Action */}
            {actionObj?.type === "navigateTo" && (
                <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Destination URL / Route</label>
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
                        className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-950/10 bg-white text-zinc-800 font-mono font-semibold transition-colors"
                    />
                    <p className="text-[10px] text-zinc-400 leading-normal">
                        Enter a relative path (e.g., /cart) or full external URL.
                    </p>
                </div>
            )}

            {actionObj?.type === "addToCart" && (
                <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Product ID / Variant ID</label>
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
                        className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-950/10 bg-white text-zinc-800 font-mono font-semibold transition-colors"
                    />
                </div>
            )}

            {actionObj?.type && actionObj.type !== "navigateTo" && actionObj.type !== "addToCart" && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <p className="text-[11.5px] text-zinc-600 leading-normal">
                        Action <span className="font-mono font-bold text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded text-[10.5px]">{actionObj.type}</span> will be triggered automatically. No extra parameters needed.
                    </p>
                </div>
            )}
        </div>
    );
}
