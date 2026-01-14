"use client";

import React, { useState } from 'react';

export default function ProjectPage() {
    const [subView, setSubView] = useState('tasks');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const spaces = [
        { id: 's1', name: '田中AIデザインゼミ' },
        { id: 's2', name: '写真部 公式' }
    ];
    const [activeSpace, setActiveSpace] = useState(spaces[0]);

    // ドロップダウンを閉じるための共通処理
    const closeDropdown = () => {
        if (typeof document !== 'undefined') {
            const elem = document.activeElement as HTMLElement;
            if (elem) elem.blur();
        }
    };

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
            {/* --- ヘッダー --- */}
            <header className="navbar bg-white border-b border-gray-100 h-14 px-5 shrink-0 z-[110]">
                <div className="flex-1 items-center gap-2">
                    <div className="bg-primary text-white w-7 h-7 flex items-center justify-center rounded-md text-sm shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="scale-75">
                            <g transform="translate(3.5, 4) scale(0.7)">
                                <circle cx="9" cy="7" r="4" />
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M17 3.13a4 4 0 0 1 0 7.75" />
                            </g>
                        </svg>
                    </div>
                    <span className="font-black text-xl tracking-tighter text-gray-900">Unimoa</span>

                    <div className="mx-2 hidden h-4 w-px bg-gray-300 lg:block"></div>

                    {/* PC版チーム切り替えドロップダウン */}
                    <div className="hidden lg:block dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn btn-ghost w-[225px] justify-start flex items-center gap-1 normal-case font-semibold text-base-content/90 h-10 min-h-10 border border-base-200 hover:border-primary/50 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span className="truncate">{activeSpace.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-white border border-gray-100 rounded-lg w-[225px] z-[120] mt-1">
                            {spaces.map(s => (
                                <li key={s.id} className={s.id === activeSpace.id ? 'bg-primary/10 text-primary font-bold' : ''}>
                                    <a onClick={() => { setActiveSpace(s); closeDropdown(); }} className="flex justify-between items-center">
                                        {s.name}
                                        {s.id === activeSpace.id && <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>}
                                    </a>
                                </li>
                            ))}
                            <div className="divider my-0 opacity-50"></div>
                            <li><a onClick={closeDropdown}>新しいチームを作成</a></li>
                        </ul>
                    </div>
                </div>

                {/* お知らせ・プロフ */}
                <div className="flex-none gap-3">
                    <div className="dropdown dropdown-end">
                        <button tabIndex={0} className="btn btn-ghost btn-circle btn-sm relative text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="badge badge-primary badge-xs absolute top-1 right-1 border-2 border-white"></span>
                        </button>
                        <div tabIndex={0} className="dropdown-content z-[120] card card-compact w-72 p-2 shadow-2xl bg-white border border-gray-100 mt-2">
                            <div className="card-body">
                                <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest mb-2">Notifications</h3>
                                <div className="text-xs text-gray-600">
                                    <span className="font-bold text-gray-900">田中さん</span>がコメントしました。
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="avatar w-8 h-8 rounded-full border-2 border-primary/10 overflow-hidden cursor-pointer hover:border-primary/40 transition-all">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[120] menu p-2 shadow-2xl bg-white border border-gray-100 rounded-2xl w-56 mt-2 font-bold text-sm">
                            <li className="menu-title text-[10px] text-gray-400 uppercase tracking-widest">Kenta Tanaka</li>
                            <li><a onClick={closeDropdown}>プロフィール設定</a></li>
                            <div className="divider my-0 opacity-50"></div>
                            <li><a onClick={closeDropdown} className="text-error">ログアウト</a></li>
                        </ul>
                    </div>
                </div>
            </header>

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

                    {/* スマホ用チーム切替（下部フローティング） */}
                    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[110]">
                        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-xl shadow-xl p-2 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 px-3 py-1 flex-1 min-w-0">
                                <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-black text-[10px] shrink-0">
                                    {activeSpace.name.substring(0, 2)}
                                </div>
                                <span className="font-black text-xs text-gray-700 truncate">{activeSpace.name}</span>
                            </div>
                            <div className="dropdown dropdown-top dropdown-end">
                                <button tabIndex={0} className="btn btn-ghost btn-sm text-[10px] font-black text-primary bg-primary/5 rounded-xl">チーム切替</button>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-white border border-gray-100 rounded-xl w-56 mb-4 font-bold">
                                    {spaces.map(s => (
                                        <li key={s.id}><a onClick={() => { setActiveSpace(s); closeDropdown(); }}>{s.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
