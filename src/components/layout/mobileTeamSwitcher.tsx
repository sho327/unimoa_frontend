"use client";

import React, { useState } from "react";
import { useAppStore } from "@/components/store";

export default function MobileTeamSwitcher() {
    const { activeSpace, setActiveSpace, spaces } = useAppStore();
    const [mobileTeamMenuOpen, setMobileTeamMenuOpen] = useState(false);

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[150]">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 px-3 py-1 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-[oklch(0.73_0.11_162)] text-white rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 shadow-sm">
                        {activeSpace.name.substring(0, 2)}
                    </div>
                    <span className="font-black text-xs text-gray-700 truncate">{activeSpace.name}</span>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setMobileTeamMenuOpen(!mobileTeamMenuOpen)}
                        className="px-3 py-1.5 text-[10px] font-black text-[oklch(0.73_0.11_162)] bg-[oklch(0.73_0.11_162)]/5 rounded-xl hover:bg-[oklch(0.73_0.11_162)]/10"
                    >
                        チーム切替
                    </button>

                    {mobileTeamMenuOpen && (
                        <div className="absolute bottom-full right-0 mb-4 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl z-[210]">
                            <ul className="py-2">
                                {spaces.map((space) => (
                                    <li key={space.id}>
                                        <button
                                            onClick={() => {
                                                setActiveSpace(space);
                                                setMobileTeamMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 font-bold ${space.id === activeSpace.id ? "text-[oklch(0.73_0.11_162)]" : ""
                                                }`}
                                        >
                                            {space.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
