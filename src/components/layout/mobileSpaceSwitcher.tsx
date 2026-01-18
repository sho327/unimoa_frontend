"use client";

import React, { useState, useRef } from "react";
import { useAppStore } from "@/components/store";
import { useClickOutside } from "@/components/hooks/useClickOutside";

export default function MobileSpaceSwitcher() {
    const { activeSpace, setActiveSpace, spaces } = useAppStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setMobileMenuOpen(false), mobileMenuOpen);

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-[150]" ref={containerRef}>
            <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-2.5 flex items-center justify-between gap-3 overflow-hidden">
                <div className="flex items-center gap-3 px-2 py-1 flex-1 min-w-0">
                    <div className="w-9 h-9 bg-[oklch(0.73_0.11_162)] text-white rounded-xl flex items-center justify-center font-black text-[11px] shrink-0 shadow-sm border border-white/20">
                        {activeSpace.name.substring(0, 2)}
                    </div>
                    <span className="font-bold text-sm text-gray-800 truncate tracking-tight">{activeSpace.name}</span>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`px-4 py-2 text-[11px] font-black rounded-xl transition-all ${mobileMenuOpen ? "bg-[oklch(0.73_0.11_162)] text-white" : "text-[oklch(0.73_0.11_162)] bg-[oklch(0.73_0.11_162)]/10"
                            }`}
                    >
                        切替
                    </button>

                    {mobileMenuOpen && (
                        <div className="absolute bottom-full right-0 mb-4 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[210] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">スペースを選択</span>
                            </div>
                            <ul className="py-1 max-h-[40vh] overflow-y-auto no-scrollbar">
                                {spaces.map((space) => (
                                    <li key={space.id}>
                                        <button
                                            onClick={() => {
                                                setActiveSpace(space);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between transition-colors ${space.id === activeSpace.id ? "text-[oklch(0.73_0.11_162)] bg-[oklch(0.73_0.11_162)]/5 font-bold" : "text-gray-600 font-bold"
                                                }`}
                                        >
                                            <span className="text-sm">{space.name}</span>
                                            {space.id === activeSpace.id && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                                </svg>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-100 p-2">
                                <button className="w-full text-left px-3 py-2.5 hover:bg-[oklch(0.73_0.11_162)]/5 text-[oklch(0.73_0.11_162)] rounded-xl text-xs font-black transition-colors flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>新しいスペースを作成</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
