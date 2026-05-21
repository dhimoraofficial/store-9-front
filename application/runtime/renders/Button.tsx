import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Layout visual style variants */
    variant?: 'primary' | 'secondary' | 'plain';
    /** Density sizing scale tokens */
    buttonSize?: 'sm' | 'md' | 'lg';
    /** Active dynamic spinner indicator state */
    loading?: boolean;
    label?: string;
    content?: string;
}

export default function AButton({
    variant = 'primary',
    buttonSize = 'md',
    loading = false,
    disabled,
    className = '',
    children,
    label,
    content,
    ...props
}: ButtonProps) {

    const variantVariants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400",
        secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300",
        plain: "bg-transparent text-blue-600 hover:underline p-0 disabled:text-gray-300 disabled:no-underline",
    };

    const sizeVariants = {
        sm: "px-3 py-1.5 text-xs font-medium",
        md: "px-4 py-2 text-sm font-medium",
        lg: "px-5 py-2.5 text-base font-medium",
    };

    const computedClasses = [
        "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed font-medium",
        variantVariants[variant],
        variant === 'plain' ? '' : sizeVariants[buttonSize],
        className
    ].filter(Boolean).join(' ');

    const resolvedChildren = children ?? content ?? label;

    return (
        <button
            disabled={disabled || loading}
            className={computedClasses}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : resolvedChildren}
        </button>
    );
}