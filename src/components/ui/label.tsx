"use client";

import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
}

/**
 * 共通 Label コンポーネント
 * 
 * デフォルトで Auth 画面のスタイル（太字、大文字、広めの字間）を適用します。
 */
export function Label({
    children,
    className = "",
    ...props
}: LabelProps) {
    return (
        <label
            className={`block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1 ${className}`}
            {...props}
        >
            {children}
        </label>
    );
}
