"use client";

import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "outline";
    showPulse?: boolean;
    className?: string;
}

export function Badge({
    children,
    variant = "primary",
    showPulse = false,
    className = "",
}: BadgeProps) {
    const baseStyles = "inline-flex items-center justify-center font-black rounded-full shrink-0";

    const variants = {
        primary: "bg-[oklch(0.73_0.11_162)] text-white shadow-sm",
        secondary: "bg-[oklch(0.73_0.11_162)]/10 text-[oklch(0.73_0.11_162)]",
        danger: "bg-red-500 text-white shadow-sm",
        outline: "border border-gray-200 bg-white text-gray-600",
    };

    return (
        <div className="relative inline-flex">
            {showPulse && (
                <span className={`absolute inset-0 rounded-full animate-ping opacity-40 ${variants[variant]}`} />
            )}
            <span className={`${baseStyles} ${variants[variant]} ${className}`}>
                {children}
            </span>
        </div>
    );
}
