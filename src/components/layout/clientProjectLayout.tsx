"use client";

import React, { useState } from "react";
import AppHeader from "./appHeader";
import SearchBar from "./searchBar";
import MobileTeamSwitcher from "./mobileTeamSwitcher";
import { useAppStore } from "@/components/store";
import { useRouter } from "next/navigation";

export default function ClientProjectLayout({
    children,
    projectTitle = "Unimoaアプリケーション/デザイン作成",
}: {
    children: React.ReactNode;
    projectTitle?: string;
}) {
    const { activeSpace } = useAppStore();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("tasks");

    const tabs = [
        { id: "tasks", label: "タスク一覧" },
        { id: "files", label: "ファイル共有" },
        { id: "members", label: "メンバー" },
        { id: "settings", label: "設定" },
        { id: "docs", label: "ドキュメント" },
        { id: "logs", label: "ログ" },
    ];

    return (
        <div className="h-screen flex flex-col overflow-hidden text-gray-800 relative">
            <AppHeader withSidebar={false} />

            <div className="flex flex-1 overflow-hidden relative">
                <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
                    {/* プロジェクト上部バー */}
                    <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px]">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.back()}
                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="flex flex-col min-w-0 min-h-[40px] justify-center">
                                <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest leading-none mb-1">
                                    {activeSpace.name}
                                </span>
                                <h2 className="text-sm font-black truncate text-gray-900 max-w-[150px] sm:max-w-xs px-1">
                                    {projectTitle}
                                </h2>
                            </div>
                        </div>

                        {/* 検索バー */}
                        <SearchBar />
                    </div>

                    {/* タブナビゲーション */}
                    <nav className="flex px-4 bg-white overflow-x-auto no-scrollbar shrink-0 shadow-sm flex-nowrap whitespace-nowrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 text-xs font-black tracking-widest border-b-2 transition-all shrink-0 ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {/* メインエリア */}
                    <div className="flex-1 overflow-hidden relative">
                        {children}
                    </div>
                </div>
            </div>

            <MobileTeamSwitcher />
        </div>
    );
}
