"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useMobile } from "@/hooks/useMobile";

interface UserMenuDropdownProps {
    displayUserName: string;
    userIconSrc?: string | null;
}

/**
 * ユーザーメニュードロップダウンコンポーネント
 * 
 * プロフィール管理、設定、ログアウト機能を提供します。
 */
export function UserMenuDropdown({
    displayUserName,
    userIconSrc,
}: UserMenuDropdownProps) {
    const isMobile = useMobile();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setIsOpen(false), isOpen);

    const onClickLogout = () => {
        console.log("Logout clicked");
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* トリガーボタン */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-9 w-9 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden shadow-sm outline-none ${isOpen
                    ? "border-[oklch(0.73_0.11_162)] shadow-md text-[oklch(0.73_0.11_162)]"
                    : "border-white bg-gray-200 hover:opacity-80"
                    }`}
            >
                {userIconSrc ? (
                    <img src={userIconSrc} alt={displayUserName} className="w-full h-full object-cover" />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center font-black text-[10px] uppercase ${isOpen ? "bg-[oklch(0.73_0.11_162)]/10" : "bg-[oklch(0.73_0.11_162)] text-white"
                        }`}>
                        {displayUserName.charAt(0)}
                    </div>
                )}
            </button>

            {/* ドロップダウンコンテンツ */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {/* ユーザー名ヘッダー */}
                    <div className="px-4 pt-4 pb-3 border-b border-gray-50 bg-gray-50/30">
                        <p className="text-base font-black text-gray-900 truncate leading-none mb-1">{displayUserName}</p>
                        <p className="text-xs mt-2 font-bold text-gray-400 uppercase tracking-widest leading-none">管理者</p>
                    </div>

                    <div className="py-1.5 px-1.5">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-[14.5px] font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all group"
                        >
                            <User className="h-4 w-4 text-gray-400 group-hover:text-[oklch(0.73_0.11_162)] transition-colors" />
                            <span>プロフィール</span>
                        </Link>
                        <Link
                            href="/setting"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-[14.5px] font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all group"
                        >
                            <Settings className="h-4 w-4 text-gray-400 group-hover:text-[oklch(0.73_0.11_162)] transition-colors" />
                            <span>アプリ設定</span>
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 py-1.5 px-1.5">
                        <button
                            onClick={onClickLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[14.5px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>ログアウト</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
