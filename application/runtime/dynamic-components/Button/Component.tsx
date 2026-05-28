import React from 'react';
import { BaseProps } from '../type';
import Button from '@/application/widgets/button';

export interface ParsedButtonProps extends BaseProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon-only';
    buttonSize?: 'sm' | 'md' | 'lg';
    loading?: "true" | "false";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    label?: string;
    content?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function AButton({
    variant = 'primary',
    buttonSize = 'md',
    disabled = false,
    type = "button",
    className = '',
    children,
    label,
    content,
    style,
    id,
}: ParsedButtonProps) {
    const variantVariants = {
        primary: "bg-primary text-white hover:opacity-90 disabled:bg-gray-200 disabled:text-gray-400",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-muted disabled:bg-muted/50",
        outline: "bg-transparent border border-border text-foreground hover:bg-accent disabled:opacity-50",
        ghost: "bg-transparent text-foreground hover:bg-accent disabled:opacity-50",
        "icon-only": "bg-transparent p-1 text-foreground hover:bg-accent rounded-full disabled:opacity-50"
    };

    const sizeVariants = {
        sm: "px-3 py-1.5 text-xs font-medium",
        md: "px-4 py-2 text-sm font-medium",
        lg: "px-5 py-2.5 text-base font-medium",
    };

    const computedClasses = [
        "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed font-medium",
        variantVariants[variant],
        variant === 'icon-only' ? '' : sizeVariants[buttonSize],
        className
    ].filter(Boolean).join(' ');

    return (
        <Button
            id={id}
            type={type}
            disabled={disabled}
            className={computedClasses}
            style={style}
        >
            {children ?? content ?? label}
        </Button>
    );
}

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'plain';
    buttonSize?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    label?: string;
    content?: string;
}
