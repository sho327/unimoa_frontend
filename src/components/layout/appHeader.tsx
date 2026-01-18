"use client";

import React, { useState, useRef } from "react";
import { useAppStore } from "@/components/store";
import { useClickOutside } from "@/components/hooks/useClickOutside";
import { NotificationDropdown, Notification } from "./notificationDropdown";
import { SpaceSelectDropdown } from "./spaceSelectDropdown";

export default function AppHeader({ withSidebar = true }: { withSidebar?: boolean }) {
    const {
        sidebarExpanded,
        setSidebarExpanded,
        mobileMenuOpen,
        setMobileMenuOpen,
        activeSpace,
        setActiveSpace,
        spaces
    } = useAppStore();

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);

    useClickOutside(profileRef, () => setProfileDropdownOpen(false), profileDropdownOpen);

    return (
        <header className="bg-white border-b border-gray-100 h-16 px-5 shrink-0 z-[120] flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
                {/* サイドバートグルボタン (withSidebar が true の場合のみ表示) */}
                {withSidebar && (
                    <>
                        <button
                            onClick={() => setSidebarExpanded(!sidebarExpanded)}
                            className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 text-gray-500 mr-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 text-gray-500 mr-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </>
                )}

                {/* ロゴ */}
                <div className="bg-[oklch(0.73_0.11_162)] text-white w-7 h-7 flex items-center justify-center rounded-md shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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

                {/* タイトル */}
                <span className="font-black text-xl tracking-tighter text-gray-900">
                    Unimoa
                </span>

                <div className="mx-2 hidden h-4 w-px bg-gray-300 md:block" />

                {/* スペース切り替え */}
                <div className="lg:block hidden">
                    <SpaceSelectDropdown
                        activeSpace={activeSpace}
                        spaces={spaces}
                        onSelectSpace={setActiveSpace}
                    />
                </div>
            </div>

            {/* 右側のアイコン */}
            <div className="flex items-center gap-3 flex-none">
                {/* お知らせドロップダウン */}
                <NotificationDropdown
                    notifications={MOCK_NOTIFICATIONS}
                    unreadCount={MOCK_NOTIFICATIONS.filter(n => !n.isRead).length}
                />

                {/* プロフィール */}
                <div className="relative" ref={profileRef}>
                    <div
                        role="button"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className={`avatar h-8 w-8 rounded-full border-2 overflow-hidden cursor-pointer transition-all ${profileDropdownOpen ? "border-[oklch(0.73_0.11_162)]" : "border-gray-100 hover:border-[oklch(0.73_0.11_162)]/40"}`}
                    >
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta" alt="User" />
                    </div>
                    {profileDropdownOpen && (
                        <ul className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-[130] animate-in fade-in slide-in-from-top-2 duration-200">
                            <li className="px-4 py-2 text-[10px] text-gray-400 uppercase tracking-widest font-bold border-b border-gray-50 mb-1">Kenta Tanaka</li>
                            <li><button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-bold text-gray-600 transition-colors">プロフィール設定</button></li>
                            <div className="border-t border-gray-100 my-1 opacity-50" />
                            <li><button className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 rounded-lg text-sm font-bold transition-colors">ログアウト</button></li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        type: "task",
        title: "タスクの期限が近づいています",
        description: "「卒業研究中間発表の準備」の期限が明日までです。進捗を確認してください。",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30分前
        isRead: false,
    },
    {
        id: "2",
        type: "note",
        title: "新しいお知らせがあります",
        description: "来週のゼミ合宿に関する詳細がプロジェクト「ゼミ合宿の計画」にアップロードされました。",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2時間前
        isRead: false,
    },
    {
        id: "3",
        type: "calendar",
        title: "予定が変更されました",
        description: "明日 13:00 からのミーティングが 14:00 開始に変更されました。",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1日前
        isRead: true,
    },
    {
        id: "4",
        type: "fileManagement",
        title: "ファイルが共有されました",
        description: "佐藤さんが「研究資料.pdf」を共有しました。",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3日前
        isRead: true,
    },
];
