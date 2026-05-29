import React from 'react';
import Link from 'next/link';
import {
    ComponentSchemaSettings,
    valdiateComponentSetting
} from "./core";
import { BaseProps } from "./type";

export const ComponentLinkSchemaSettingsMap = {
    "link-href": {
        as: "href",
        tp: "prop",
        rgx: "^(\\/|https?:\\/\\/).+$"
    },
    "link-target": {
        as: "target",
        tp: "prop",
        opt: ["_self", "_blank"]
    },
    "link-title": {
        as: "title",
        tp: "prop",
        rgx: "^.+$"
    },
    "link-display": {
        as: "display",
        tp: "prop",
        opt: ["inline", "block", "flex-row", "flex-col"]
    },
    "link-padding": {
        as: "padding",
        tp: "style",
        rgx: "^\\d+px(\\s+\\d+px){0,3}$"
    },
    "link-hover-bg": {
        as: "hoverBg",
        tp: "prop",
        opt: ["transparent", "bg-ghost", "bg-accent"]
    },
    "link-hover-color": {
        as: "hoverColor",
        tp: "style",
        rgx: "^#[0-9a-fA-F]{3,8}$"
    },
    "link-decoration": {
        as: "textDecoration",
        tp: "style",
        opt: ["none", "underline"]
    },
    "link-smooth-transition": {
        as: "smoothTransition",
        tp: "prop",
        opt: ["true", "false"]
    },
    "link-analytics-id": {
        as: "analyticsId",
        tp: "prop",
        rgx: "^[a-zA-Z0-9_-]+$"
    }
};

export interface ParsedLinkProps extends BaseProps {
    href?: string;
    target?: string;
    title?: string;
    display?: "inline" | "block" | "flex-row" | "flex-col";
    hoverBg?: "transparent" | "bg-ghost" | "bg-accent";
    hoverColor?: string;
    smoothTransition?: "true" | "false";
    analyticsId?: string;
    label?: string;
    content?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export function parseLinkComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let newSettings = { ...settings };
    let finalStyles: React.CSSProperties = { ...(newSettings.style as React.CSSProperties || {}) };

    for (let setting in settings) {
        let settingName = setting;
        let settingValue = settings[setting];
        let settingConfig = (ComponentLinkSchemaSettingsMap as any)?.[settingName];

        const config = Array.isArray(settingConfig) ? settingConfig[0] : settingConfig;

        if (!config || !valdiateComponentSetting(config, settingValue)) {
            continue;
        }

        delete newSettings[setting];

        if (config?.tp === "style") {
            const styleKey = config.as === "hoverColor" ? "--hover-color" : config.as;
            finalStyles = {
                ...finalStyles,
                [styleKey]: settingValue
            };
        } else if (config?.tp === "prop") {
            newSettings[config.as] = settingValue;
        }
    }

    newSettings.style = finalStyles;
    return newSettings;
}

export default function ALink({
    href = "/",
    target = "_self",
    title,
    display = "inline",
    hoverBg = "transparent",
    smoothTransition = "false",
    analyticsId,
    label,
    content,
    children,
    style,
    id,
    className = "",
    ...props
}: ParsedLinkProps) {
    const resolvedChildren = children ?? content ?? label;

    const displayClasses: Record<string, string> = {
        "inline": "inline-block",
        "block": "block",
        "flex-row": "flex flex-row items-center",
        "flex-col": "flex flex-col"
    };

    const hoverBgClasses: Record<string, string> = {
        "transparent": "",
        "bg-ghost": "hover:bg-gray-100 dark:hover:bg-neutral-800",
        "bg-accent": "hover:bg-primary/10"
    };

    const transitionClass = smoothTransition === "true" ? "transition-all duration-200 ease-in-out" : "";

    const computedClassName = [
        displayClasses[display] || "inline-block",
        hoverBgClasses[hoverBg] || "",
        transitionClass,
        className
    ].filter(Boolean).join(" ");

    const isExternal = target === "_blank" || href.startsWith("http");

    const customStyles = {
        ...style,
        ...(props as any).hoverColor ? { "--hover-color": (props as any).hoverColor } : {}
    };

    if (isExternal) {
        return (
            <a
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={title}
                className={computedClassName}
                style={customStyles}
                data-analytics-id={analyticsId}
                {...(props as any)}
            >
                {resolvedChildren}
            </a>
        );
    }

    return (
        <Link
            id={id}
            href={href}
            target={target}
            title={title}
            className={computedClassName}
            style={customStyles}
            data-analytics-id={analyticsId}
            {...(props as any)}
        >
            {resolvedChildren}
        </Link>
    );
}

export interface ComponentTextSchemaSettings {
    as?: string;
}