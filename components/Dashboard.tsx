"use client";

import React, { useState, useEffect } from "react";

export default function Dashboard() {
    const [subView, setSubView] = useState("projects");
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const spaces = [
        { id: "s1", name: "田中AIデザインゼミ" },
        { id: "s2", name: "写真部 公式" },
    ];
    const [activeSpace, setActiveSpace] = useState(spaces[0]);

    // ドロップダウンを閉じるためのヘルパー
    const closeDropdown = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* --- ヘッダー --- */}
            <header className="navbar bg-white border-b border-gray-100 h-14 px-5 shrink-0 z-[110]">
                <div className="flex-1 items-center gap-2">
                    <button
                        onClick={() => setSidebarExpanded(!sidebarExpanded)}
                        className="btn btn-ghost btn-square btn-sm hidden md:inline-flex text-gray-500 mr-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="btn btn-ghost btn-square btn-sm md:hidden text-gray-500 mr-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div className="bg-primary text-white w-7 h-7 flex items-center justify-center rounded-md text-sm">
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
                            <circle cx="9" cy="7" r="4" />
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        </svg>
                    </div>
                    <span className="font-black text-xl tracking-tighter text-gray-900">
                        Unimoa
                    </span>
                </div>

                <div className="flex-none gap-3">
                    {/* 通知 */}
                    <div className="dropdown dropdown-end">
                        <button
                            tabIndex={0}
                            className="btn btn-ghost btn-circle btn-sm relative"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2.2"
                            >
                                <path
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="badge badge-primary badge-xs absolute top-1 right-1 border-2 border-white"></span>
                        </button>
                        <div
                            tabIndex={0}
                            className="dropdown-content z-[1] card card-compact w-72 p-2 shadow-2xl bg-white border border-gray-100 mt-2"
                        >
                            <div className="card-body">
                                <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest mb-2">
                                    Notifications
                                </h3>
                                <div className="text-xs text-gray-600">
                                    <span className="font-bold text-gray-900">田中さん</span>
                                    が「卒業研究」にコメントしました。
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* プロフィール */}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="avatar w-8 h-8 rounded-full border-2 border-primary/10 overflow-hidden cursor-pointer hover:border-primary/40 transition-all"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta" alt="User avatar" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white border border-gray-100 rounded-2xl w-56 mt-2 font-bold text-sm"
                        >
                            <li className="menu-title text-[10px] text-gray-400 uppercase tracking-widest">
                                Kenta Tanaka
                            </li>
                            <li>
                                <a onClick={closeDropdown}>プロフィール設定</a>
                            </li>
                            <div className="divider my-0 opacity-50"></div>
                            <li>
                                <a onClick={closeDropdown} className="text-error">
                                    ログアウト
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* --- メインコンテンツ --- */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* スマホ用オーバーレイ */}
                {mobileMenuOpen && (
                    <div
                        onClick={() => setMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/40 z-[120] md:hidden mt-14"
                    />
                )}

                {/* サイドバー */}
                <aside
                    className={`bg-white border-r border-gray-100 flex-col overflow-y-auto shadow-sm transition-all duration-300 z-[130] fixed left-0 w-64 transform top-14 h-[calc(100vh-3.5rem)] md:top-0 md:h-full md:relative md:translate-x-0 md:shadow-none ${!mobileMenuOpen ? "-translate-x-full" : "translate-x-0"
                        } ${sidebarExpanded || mobileMenuOpen
                            ? "md:w-64 md:px-4"
                            : "md:w-[72px] md:items-center md:px-0"
                        }`}
                >
                    <div className="flex flex-col h-full py-6">
                        {/* チーム選択 (ドロップダウン) */}
                        <div
                            className={`mb-6 px-3 ${!sidebarExpanded && !mobileMenuOpen ? "md:px-2" : ""
                                }`}
                        >
                            <div className="dropdown dropdown-bottom w-full">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className={`flex items-center gap-3 w-full group transition-all rounded-xl p-1 hover:bg-gray-50 ${!sidebarExpanded && !mobileMenuOpen
                                            ? "md:justify-center md:p-0 md:rounded-2xl"
                                            : ""
                                        }`}
                                >
                                    <div className="shrink-0 flex items-center justify-center rounded-2xl font-black text-xs w-10 h-10 bg-primary text-white shadow-md shadow-primary/20 transition-all">
                                        {activeSpace.name.substring(0, 2)}
                                    </div>
                                    {(sidebarExpanded || mobileMenuOpen) && (
                                        <div className="flex-1 text-left overflow-hidden">
                                            <span className="block text-[10px] text-gray-400 font-bold leading-none mb-0.5 uppercase">
                                                Team
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <span className="font-black text-sm truncate text-gray-800">
                                                    {activeSpace.name}
                                                </span>
                                                <svg
                                                    className="w-3 h-3 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M19 9l-7 7-7-7"
                                                        strokeWidth="2.5"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[999] menu p-2 shadow-xl bg-white border border-gray-100 rounded-xl w-60 mt-2"
                                >
                                    <li className="menu-title text-[10px] text-gray-400 px-4 py-2 uppercase tracking-widest">
                                        チーム切替
                                    </li>
                                    {spaces.map((space) => (
                                        <li key={space.id}>
                                            <a
                                                onClick={() => {
                                                    setActiveSpace(space);
                                                    setMobileMenuOpen(false);
                                                    closeDropdown();
                                                }}
                                                className={`py-2 px-4 rounded-lg ${activeSpace.id === space.id
                                                        ? "bg-primary/5 text-primary font-bold"
                                                        : "text-gray-600"
                                                    }`}
                                            >
                                                {space.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* メニュー選択 */}
                        <div
                            className={`flex-1 flex flex-col gap-1 w-full ${!sidebarExpanded && !mobileMenuOpen ? "md:items-center" : ""
                                }`}
                        >
                            <div
                                className={`w-full space-y-1 px-3 ${!sidebarExpanded && !mobileMenuOpen ? "md:px-2" : ""
                                    }`}
                            >
                                {[
                                    {
                                        id: "projects",
                                        label: "プロジェクト",
                                        path: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
                                    },
                                    {
                                        id: "calendar",
                                        label: "カレンダー",
                                        path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                                    },
                                    {
                                        id: "members",
                                        label: "メンバー",
                                        path: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                                    },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setSubView(item.id);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${subView === item.id
                                                ? "bg-primary text-white shadow-md shadow-primary/30"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            } ${!sidebarExpanded && !mobileMenuOpen
                                                ? "md:justify-center md:px-0"
                                                : ""
                                            }`}
                                    >
                                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    d={item.path}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        {(sidebarExpanded || mobileMenuOpen) && (
                                            <span className="font-bold text-sm whitespace-nowrap">
                                                {item.label}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* メインエリア */}
                <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
                    <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px] shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col min-w-0 min-h-[40px] justify-center">
                                <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest leading-none mb-1">
                                    チーム
                                </span>
                                <h2 className="text-sm font-black truncate text-gray-900 max-w-[150px] sm:max-w-xs">
                                    {activeSpace.name}
                                </h2>
                            </div>
                        </div>

                        {/* 検索バー */}
                        <div
                            className={`flex items-center rounded-full transition-all duration-300 px-1 ${isSearchOpen
                                    ? "w-48 sm:w-64 bg-white border border-gray-200"
                                    : "w-10 bg-transparent"
                                }`}
                        >
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="btn btn-ghost btn-circle btn-sm shrink-0 flex items-center justify-center text-gray-500 hover:text-primary"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {isSearchOpen && (
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="検索..."
                                    className="bg-transparent border-none outline-none text-sm w-full px-1 h-8 text-gray-800"
                                />
                            )}
                        </div>
                    </div>

                    <main className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10">
                        <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-300 font-black uppercase tracking-widest">
                            <span>{subView}</span>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
