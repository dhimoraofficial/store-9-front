import React from "react";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    truncate?: boolean;
    label?: string;
    content?: string;
}

export default function AText({
    as: Tag = 'p',
    size = 'md',
    weight = 'normal',
    truncate = false,
    className = '',
    children,
    label,
    content,
    ...props
}: TextProps) {

    const sizeVariants = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
    };

    const weightVariants = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const computedClasses = [
        sizeVariants[size],
        weightVariants[weight],
        truncate ? 'truncate' : '',
        className
    ].filter(Boolean).join(' ');

    const resolvedChildren = children ?? content ?? label;

    return (
        <Tag className={computedClasses} {...props}>
            {resolvedChildren}
        </Tag>
    );
}

export interface ComponentTextSchemaSettings {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label"
}

export const ComponentTextSchemaSettingsMap = {
    as: {
        as: "tag",
        opt: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label"],

    }
}