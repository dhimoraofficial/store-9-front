import React from 'react';
import * as Lucide from 'lucide-react';
import { BaseProps } from '../type';

export interface ParsedIconProps extends BaseProps {
    iconName?: string;
    animation?: "none" | "spin" | "pulse" | "bounce";
    viewBox?: string;
    hoverColor?: "none" | "turn-primary" | "turn-white";
    ariaHidden?: "true" | "false";
    label?: string; // fallback matching previous code
    size?: number | string; // fallback matching previous code
    color?: string; // fallback matching previous code
    style?: React.CSSProperties;
}

function kebabToPascal(str: string): string {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

export default function AIcon({
    iconName,
    animation = "none",
    viewBox,
    hoverColor = "none",
    ariaHidden = "false",
    label,
    size,
    color,
    style,
    id,
    className = "",
}: ParsedIconProps) {
    const resolvedName = iconName || label || "heart";
    const pascalName = kebabToPascal(resolvedName);
    const ICO = (Lucide as any)?.[pascalName];

    if (!ICO) return null;

    const animClasses: Record<string, string> = {
        none: "",
        spin: "animate-spin",
        pulse: "animate-pulse",
        bounce: "animate-bounce"
    };

    const hoverClasses: Record<string, string> = {
        none: "",
        "turn-primary": "hover:text-primary transition-colors",
        "turn-white": "hover:text-white transition-colors"
    };

    const computedClassName = [
        animClasses[animation] || "",
        hoverClasses[hoverColor] || "",
        className
    ].filter(Boolean).join(" ");

    // Compatibility support for old props
    let resolvedSize = style?.width || size || 16;
    if (typeof resolvedSize === "string" && resolvedSize.endsWith("px")) {
        resolvedSize = parseInt(resolvedSize, 10);
    }
    const resolvedColor = style?.stroke || color || "currentColor";

    return <ICO
        size={resolvedSize}
        color={resolvedColor}
        className={computedClassName}
        style={style}
        viewBox={viewBox}
        ariaHidden={ariaHidden === "true"}
    />
}

export interface IconProps {
    label: string;
    size?: number | string;
    color?: string;
}
