"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "social";
    size?: "xs" | "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center transition-all duration-200 font-black outline-none disabled:opacity-50 disabled:pointer-events-none uppercase tracking-tight";

    const variants = {
        primary: "bg-[oklch(0.73_0.11_162)] text-white hover:bg-[oklch(0.68_0.11_162)] shadow-md shadow-[oklch(0.73_0.11_162)]/10 border-none",
        secondary: "bg-[oklch(0.73_0.11_162)]/10 text-[oklch(0.73_0.11_162)] hover:bg-[oklch(0.73_0.11_162)]/20 border-none",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-900 border-none",
        outline: "bg-white border-[1.5px] border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50",
        danger: "bg-red-500 text-white hover:bg-red-600 border-none",
        social: "bg-white border-[1.5px] border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-gray-600 font-bold normal-case",
    };

    const sizes = {
        xs: "h-7 px-2 text-[10px] rounded-md",
        sm: "h-8 px-3 text-xs rounded-lg",
        md: "h-11 px-5 text-[13px] rounded-xl", // Auth 基準
        lg: "h-12 px-6 text-base rounded-2xl",
        icon: "h-9 w-9 rounded-xl", // Dropdown 基準
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${isLoading ? "relative text-transparent" : ""} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
            )}
            {children}
        </button>
    );
}
