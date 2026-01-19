"use client";

import React from "react";
import { useAppStore } from "@/components/store";
import { Loader2 } from "lucide-react";

/**
 * ページローディング表示コンポーネント
 * 
 * 指定されたテンプレートに基づき、背景のぼかし、
 * animate-sway アニメーション、Unimoa アイコンを適用しています。
 */
export default function LoadingOverlay() {
    const { isLoading } = useAppStore();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="text-center">
                {/* Unimoa ロゴアイコン + Sway アニメーション */}
                {/* <div className="mb-2">
                    <div className="animate-sway bg-[oklch(0.73_0.11_162)] text-white w-12 h-12 flex items-center justify-center rounded-xl mx-auto shadow-lg shadow-[oklch(0.73_0.11_162)]/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="scale-75"
                        >
                            <g transform="translate(3.5, 4) scale(0.7)">
                                <circle cx="9" cy="7" r="4" />
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M17 3.13a4 4 0 0 1 0 7.75" />
                            </g>
                        </svg>
                    </div>
                </div> */}
                <div className="relative">
                    {/* 背景の光輪 */}
                    <div className="absolute inset-0 bg-[oklch(0.73_0.11_162)] opacity-20 blur-xl rounded-full animate-pulse" />

                    {/* メインスピナー */}
                    <Loader2 className="h-10 w-10 text-[oklch(0.73_0.11_162)] animate-spin relative z-10" />
                </div>

                {/* 読み込みテキスト */}
                <p className="text-lg font-medium text-gray-600 tracking-tight">
                    読み込み中です...
                </p>

                {/* 装飾用のドットアニメーション */}
                <div className="flex justify-center gap-1 mt-2">
                    <span className="w-1.5 h-1.5 bg-[oklch(0.73_0.11_162)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[oklch(0.73_0.11_162)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[oklch(0.73_0.11_162)] rounded-full animate-bounce" />
                </div>
            </div>
        </div>
    );
}
