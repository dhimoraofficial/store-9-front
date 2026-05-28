"use client"

import React, { ReactNode } from "react";
import { BaseProps } from "../type";

export interface ParsedFormProps extends BaseProps {
    children?: ReactNode;
    action?: string;
    method?: "GET" | "POST";
    layout?: "block" | "flex-row" | "flex-col";
    autoComplete?: "on" | "off";
    noValidate?: "true" | "false";
    idHook?: string;
    style?: React.CSSProperties;
}

export default function AForm({
    children,
    id,
    action,
    method = "POST",
    layout = "block",
    autoComplete = "on",
    noValidate = "false",
    idHook,
    style,
    className = "",
}: ParsedFormProps) {
    const layoutClasses: Record<string, string> = {
        block: "block",
        "flex-row": "flex flex-row items-center",
        "flex-col": "flex flex-col"
    };

    const computedClassName = [
        layoutClasses[layout] || "block",
        className
    ].filter(Boolean).join(" ");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (layout === "block") {
            // Prevent default if it is just a container, or let it post if method/action are specified
            if (!action) {
                e.preventDefault();
            }
        }
    };

    return (
        <form
            id={idHook || id}
            action={action}
            method={method}
            autoComplete={autoComplete}
            noValidate={noValidate === "true"}
            className={computedClassName}
            style={style}
            onSubmit={handleSubmit}
        >
            {children}
        </form>
    );
}
