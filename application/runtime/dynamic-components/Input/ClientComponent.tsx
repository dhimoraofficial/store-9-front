"use client"

import React, { useState } from "react";
import { BaseProps } from "../type";

export interface ParsedInputProps extends BaseProps {
    inputType?: "text" | "search" | "email" | "tel" | "password" | "number";
    inputPlaceholder?: string;
    inputName?: string;
    inputValue?: string;
    inputFocusBorder?: "theme-primary" | "black" | "none";
    inputClearButton?: "true" | "false";
    label?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    onChange?: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function AInput({
    inputType = "text",
    inputPlaceholder = "",
    inputName,
    inputValue = "",
    inputFocusBorder = "theme-primary",
    inputClearButton = "false",
    label,
    error,
    id,
    required,
    disabled,
    className = "",
    onChange,
    onKeyDown,
    style,
    ...props
}: ParsedInputProps) {
    const [val, setVal] = useState(inputValue);

    const focusBorderClasses: Record<string, string> = {
        "theme-primary": "focus:ring-2 focus:ring-primary focus:border-primary",
        black: "focus:ring-2 focus:ring-black focus:border-black",
        none: "focus:ring-0 focus:border-transparent"
    };

    const baseClasses = "w-full border rounded-md transition-shadow bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-offset-1";
    const statusClasses = error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 " + (focusBorderClasses[inputFocusBorder] || focusBorderClasses["theme-primary"]);
    const disabledClasses = disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200" : "";

    const computedClasses = [
        baseClasses,
        statusClasses,
        disabledClasses,
        className
    ].filter(Boolean).join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setVal(newValue);
        onChange?.(newValue);
    };

    const handleClear = () => {
        setVal("");
        onChange?.("");
    };

    return (
        <div className="w-full flex flex-col gap-1.5 relative">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
                </label>
            )}

            <div className="relative w-full flex items-center">
                <input
                    id={id}
                    type={inputType}
                    name={inputName}
                    placeholder={inputPlaceholder}
                    value={val}
                    disabled={disabled}
                    required={required}
                    className={computedClasses}
                    style={style}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    {...(props as any)}
                />

                {inputClearButton === "true" && val && !disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        ✕
                    </button>
                )}
            </div>

            {error && (
                <p id={`${id}-error`} className="text-xs text-red-500 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
}

export interface InputProps {
    label?: string;
    error?: string;
    inputSize?: 'sm' | 'md' | 'lg';
}
