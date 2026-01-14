"use client";

import React, { useState } from 'react';
import { useAppStore } from "@/store";

export default function ProjectPage() {
    const { activeSpace } = useAppStore();
    const [subView, setSubView] = useState('tasks');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const tabs = [
        { id: 'tasks', label: 'タスク一覧' },
        { id: 'files', label: 'ファイル共有' },
        { id: 'members', label: 'メンバー' },
        { id: 'settings', label: '設定' },
        { id: 'docs', label: 'ドキュメント' },
        { id: 'logs', label: 'ログ' },
    ];

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* --- メインコンテンツ --- */}
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">

                    {/* プロジェクト上部バー */}
                    <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px] shadow-sm">
                        <div className="flex items-center gap-3">
                            <button className="btn btn-ghost btn-circle btn-xs text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3" /></svg>
                            </button>
                            <div className="flex flex-col min-w-0 min-h-[40px] justify-center">
                                <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest leading-none mb-1">{activeSpace.name}</span>
                                <h2 className="text-sm font-black truncate text-gray-900 max-w-[150px] sm:max-w-xs">Unimoaアプリケーション/デザイン作成</h2>
                            </div>
                        </div>

                        {/* 検索バー */}
                        <div className={`flex items-center rounded-full transition-all duration-300 px-1 ${isSearchOpen ? 'w-48 sm:w-64 bg-white border border-gray-200' : 'w-10 bg-transparent'}`}>
                            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="btn btn-ghost btn-circle btn-sm shrink-0 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                            {isSearchOpen && (
                                <input autoFocus type="text" placeholder="検索..." className="bg-transparent border-none outline-none text-sm w-full px-1 h-8 text-gray-800" />
                            )}
                        </div>
                    </div>

                    {/* タブナビゲーション */}
                    <nav className="flex px-4 bg-white overflow-x-auto no-scrollbar shrink-0 shadow-sm flex-nowrap whitespace-nowrap">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSubView(tab.id)}
                                className={`px-6 py-4 text-xs font-black tracking-widest border-b-2 transition-all shrink-0 ${subView === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {/* メインエリア */}
                    <main className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10">
                        <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-300 font-black uppercase tracking-widest">
                            <span>{subView} View Content</span>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}
