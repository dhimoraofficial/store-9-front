"use client"

import React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    error?: string;
    inputSize?: 'sm' | 'md' | 'lg';
    onChange?: (value: string) => void;
}

export default function AInput({
    label,
    error,
    inputSize = 'md',
    id,
    required,
    disabled,
    className = '',
    onChange,
    ...props
}: InputProps) {

    const sizeVariants = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-3 py-1.5 text-base',
        lg: 'px-4 py-2 text-lg',
    };

    const baseClasses = "w-full border rounded-md transition-shadow bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1";
    const statusClasses = error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
    const disabledClasses = disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200" : "";

    const computedClasses = [
        baseClasses,
        sizeVariants[inputSize],
        statusClasses,
        disabledClasses,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="w-full flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
                </label>
            )}

            <input
                id={id}
                disabled={disabled}
                required={required}
                className={computedClasses}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                onChange={(e) => onChange?.(e.target.value)}
                {...props}
            />

            {error && (
                <p id={`${id}-error`} className="text-xs text-red-500 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
}