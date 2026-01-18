"use client";

import React, { useState, useRef } from "react";
import { useAppStore } from "@/components/store";
import { useClickOutside } from "@/components/hooks/useClickOutside";

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

    const [spaceDropdownOpen, setSpaceDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const spaceRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useClickOutside(spaceRef, () => setSpaceDropdownOpen(false), spaceDropdownOpen);
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

                {/* スペース切り替え (PC版) */}
                <div className="lg:block hidden relative" ref={spaceRef}>
                    <button
                        onClick={() => setSpaceDropdownOpen(!spaceDropdownOpen)}
                        className="flex items-center gap-1 h-10 w-[225px] min-w-[225px] px-3 border border-gray-200 hover:border-[oklch(0.73_0.11_162)]/50 rounded-lg bg-white text-gray-900/90 font-semibold transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[oklch(0.73_0.11_162)]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className="truncate flex-1 text-left text-sm">{activeSpace.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-auto transition-transform duration-200 ${spaceDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {spaceDropdownOpen && (
                        <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                            <ul className="py-2">
                                {spaces.map((space) => (
                                    <li key={space.id}>
                                        <button
                                            onClick={() => {
                                                setActiveSpace(space);
                                                setSpaceDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 hover:bg-[oklch(0.73_0.11_162)]/10 flex items-center justify-between transition-colors ${space.id === activeSpace.id ? "bg-[oklch(0.73_0.11_162)]/10 text-[oklch(0.73_0.11_162)] font-bold" : ""
                                                }`}
                                        >
                                            <span className="text-sm">{space.name}</span>
                                            {space.id === activeSpace.id && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                                </svg>
                                            )}
                                        </button>
                                    </li>
                                ))}
                                <div className="border-t border-gray-100 my-2" />
                                <li>
                                    <button className="w-full text-left px-4 py-2 hover:bg-[oklch(0.73_0.11_162)]/10 text-sm font-bold text-gray-600 transition-colors">新しいスペースを作成</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* 右側のアイコン */}
            <div className="flex items-center gap-3 flex-none">
                {/* お知らせ */}
                <div className="relative group">
                    <button className="relative h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-[oklch(0.73_0.11_162)] rounded-full border-2 border-white" />
                    </button>

                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute right-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-2xl p-4 z-50 transition-all duration-200">
                        <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest mb-2">Notifications</h3>
                        <div className="space-y-3">
                            <div className="text-xs border-b border-gray-50 pb-2 leading-relaxed text-gray-600">
                                <span className="font-bold text-gray-900">田中さん</span>が「卒業研究」にコメントしました。
                            </div>
                            <div className="text-xs text-gray-600">会議のリマインド: 本日 15:00</div>
                        </div>
                    </div>
                </div>

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
