"use client";

import React from "react";

/**
 * 共通セパレーターコンポーネント
 * 
 * 「または」などのテキストを挟む区切り線です。
 */
export function Separator({ children }: { children?: React.ReactNode }) {
    return (
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            {children && (
                <div className="relative flex justify-center text-[12px] font-black text-gray-400 uppercase tracking-widest">
                    <span className="bg-white px-4">{children}</span>
                </div>
            )}
        </div>
    );
}

/**
 * 共通ページフッターリンク（認証画面下部など）
 */
export function AuthFooter() {
    return (
        <div className="flex justify-center gap-6 mt-12 text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] opacity-80">
            <a href="#" className="hover:text-[oklch(0.73_0.11_162)] transition-colors">サポート</a>
            <a href="#" className="hover:text-[oklch(0.73_0.11_162)] transition-colors">プライバシー</a>
            <a href="#" className="hover:text-[oklch(0.73_0.11_162)] transition-colors">利用規約</a>
        </div>
    );
}
