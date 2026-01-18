"use client";

import React from "react";
import { useAppStore } from "@/components/store";

export default function Sidebar() {
    const {
        sidebarExpanded,
        mobileMenuOpen,
        setMobileMenuOpen,
        activeTab,
        setActiveTab
    } = useAppStore();

    return (
        <>
            {/* モバイルメニューオーバーレイ */}
            {mobileMenuOpen && (
                <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[110] md:hidden mt-16" />
            )}

            {/* サイドメニュー */}
            <aside
                className={`bg-white border-r border-gray-100 flex-col overflow-y-auto shadow-sm transition-all duration-300 z-[110] fixed left-0 transform top-16 h-[calc(100vh-4rem)] md:top-0 md:h-full md:relative md:translate-x-0 md:shadow-none ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } ${sidebarExpanded || mobileMenuOpen ? "w-64 px-3" : "md:w-[72px] md:items-center md:px-2"}`}
            >
                <div className="flex flex-col h-full py-6 md:py-5">
                    <div className="flex-1 flex flex-col gap-1 w-full">
                        <div className="w-full space-y-1 px-3 md:px-1">
                            {(sidebarExpanded || mobileMenuOpen) && (
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-4 md:mb-3">
                                    Menu
                                </div>
                            )}

                            {/* プロジェクト */}
                            <button
                                onClick={() => {
                                    setActiveTab("projects")
                                    setMobileMenuOpen(false)
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${activeTab === "projects"
                                    ? "bg-[oklch(0.73_0.11_162)] text-white shadow-md shadow-[oklch(0.73_0.11_162)]/30"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                {(sidebarExpanded || mobileMenuOpen) && (
                                    <span className="font-bold text-sm whitespace-nowrap">プロジェクト</span>
                                )}
                            </button>

                            {/* カレンダー */}
                            <button
                                onClick={() => {
                                    setActiveTab("calendar")
                                    setMobileMenuOpen(false)
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${activeTab === "calendar"
                                    ? "bg-[oklch(0.73_0.11_162)] text-white shadow-md shadow-[oklch(0.73_0.11_162)]/30"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                {(sidebarExpanded || mobileMenuOpen) && (
                                    <span className="font-bold text-sm whitespace-nowrap">カレンダー</span>
                                )}
                            </button>

                            {/* メンバー */}
                            <button
                                onClick={() => {
                                    setActiveTab("members")
                                    setMobileMenuOpen(false)
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${activeTab === "members"
                                    ? "bg-[oklch(0.73_0.11_162)] text-white shadow-md shadow-[oklch(0.73_0.11_162)]/30"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                {(sidebarExpanded || mobileMenuOpen) && (
                                    <span className="font-bold text-sm whitespace-nowrap">メンバー</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
