"use client";

import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * 共通 Card コンポーネント
 * 
 * AuthCard のスタイルを引き継ぎ、汎用的なコンテナとして使用可能です。
 */
export function Card({
    children,
    className = ""
}: CardProps) {
    return (
        <div className={`bg-white border-[1.5px] border-gray-200 rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${className}`}>
            {children}
        </div>
    );
}
