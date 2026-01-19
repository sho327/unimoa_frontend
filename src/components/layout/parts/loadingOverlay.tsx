"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useAppStore } from "@/components/store";

/**
 * ページローディング表示コンポーネント
 * 
 * グローバル状態の isLoading が true の場合に表示されます。
 * ガラスモーフィズム（backdrop-blur）と Unimoa プライマリカラーのスピナーを使用します。
 */
export default function LoadingOverlay() {
    const { isLoading } = useAppStore();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/40 backdrop-blur-[6px] animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white/20 shadow-2xl border border-white/30">
                <div className="relative">
                    {/* 背景の光輪 */}
                    <div className="absolute inset-0 bg-[oklch(0.73_0.11_162)] opacity-20 blur-xl rounded-full animate-pulse" />

                    {/* メインスピナー */}
                    <Loader2 className="h-10 w-10 text-[oklch(0.73_0.11_162)] animate-spin relative z-10" />
                </div>

                <div className="text-center relative z-10">
                    <p className="text-sm font-black text-gray-800 tracking-wider">
                        読み込み中
                    </p>
                    <div className="flex justify-center gap-1 mt-1">
                        <span className="w-1 h-1 bg-[oklch(0.73_0.11_162)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1 h-1 bg-[oklch(0.73_0.11_162)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1 h-1 bg-[oklch(0.73_0.11_162)] rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </div>
    );
}
