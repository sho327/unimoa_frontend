"use client";

import React from "react";

interface AvatarProps {
    src?: string | null;
    alt?: string;
    fallback: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Avatar({
    src,
    alt = "",
    fallback,
    size = "md",
    className = "",
}: AvatarProps) {
    const sizes = {
        sm: "h-7 w-7 text-[10px]",
        md: "h-8 w-8 text-xs",
        lg: "h-10 w-10 text-sm",
    };

    return (
        <div className={`relative overflow-hidden rounded-full border border-gray-100 shadow-sm flex items-center justify-center shrink-0 bg-gray-50 ${sizes[size]} ${className}`}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span className="font-black text-[oklch(0.73_0.11_162)] uppercase">
                    {fallback.charAt(0)}
                </span>
            )}
        </div>
    );
}
