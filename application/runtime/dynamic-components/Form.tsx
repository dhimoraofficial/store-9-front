"use client"

import React, { ReactNode } from "react";
import {
    ComponentSchemaSettings,
    valdiateComponentSetting
} from "./core";
import { BaseProps } from "./type";

export const ComponentFormSchemaSettingsMap = {
    "form-action": {
        as: "action",
        tp: "prop",
        rgx: "^\\/.+$"
    },
    "form-method": {
        as: "method",
        tp: "prop",
        opt: ["GET", "POST"]
    },
    "form-layout": {
        as: "layout",
        tp: "prop",
        opt: ["block", "flex-row", "flex-col"]
    },
    "form-gap": {
        as: "gap",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "form-autocomplete": {
        as: "autoComplete",
        tp: "prop",
        opt: ["on", "off"]
    },
    "form-novalidate": {
        as: "noValidate",
        tp: "prop",
        opt: ["true", "false"]
    },
    "form-padding": {
        as: "padding",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "form-bg": {
        as: "background",
        tp: "style",
        rgx: "^#[0-9a-fA-F]{6}$"
    },
    "form-radius": {
        as: "borderRadius",
        tp: "style",
        rgx: "^\\d+px$"
    },
    "form-id-hook": {
        as: "idHook",
        tp: "prop",
        rgx: "^[a-zA-Z0-9_-]+$"
    }
};

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

export function parseFormComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let newSettings = { ...settings };
    let finalStyles: React.CSSProperties = { ...(newSettings.style as React.CSSProperties || {}) };

    for (let setting in settings) {
        let settingName = setting;
        let settingValue = settings[setting];
        let settingConfig = (ComponentFormSchemaSettingsMap as any)?.[settingName];

        const config = Array.isArray(settingConfig) ? settingConfig[0] : settingConfig;

        if (!config || !valdiateComponentSetting(config, settingValue)) {
            continue;
        }

        delete newSettings[setting];

        if (config?.tp === "style") {
            finalStyles = {
                ...finalStyles,
                [config.as]: settingValue
            };
        } else if (config?.tp === "prop") {
            newSettings[config.as] = settingValue;
        }
    }

    newSettings.style = finalStyles;
    return newSettings;
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
