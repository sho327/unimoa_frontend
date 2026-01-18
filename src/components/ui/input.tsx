"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

/**
 * 共通 Input コンポーネント
 * 
 * プロジェクト共通の input-minimal スタイルを適用します。
 */
export function Input({
    className = "",
    error = false,
    ...props
}: InputProps) {
    const errorStyles = error
        ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,1)]"
        : "border-gray-200 focus:border-[oklch(0.73_0.11_162)] focus:shadow-[0_0_0_1px_oklch(0.73_0.11_162)]";

    return (
        <input
            className={`w-full bg-white border-[1.5px] rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 placeholder:text-gray-300 transition-all outline-none ${errorStyles} ${className}`}
            {...props}
        />
    );
}
