"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store";
import { pageRoutes } from "@/components/constants";

export default function Sidebar() {
    const pathname = usePathname();
    const {
        sidebarExpanded,
        mobileMenuOpen,
        setMobileMenuOpen,
    } = useAppStore();

    const menuItems = [
        {
            label: "ダッシュボード",
            href: pageRoutes.MAIN.DASHBOARD,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "プロジェクト",
            href: pageRoutes.MAIN.PROJECTS,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "メンバー",
            href: pageRoutes.MAIN.MEMBERS,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* モバイルメニューオーバーレイ */}
            {mobileMenuOpen && (
                <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[200] md:z-[-1] md:hidden mt-16" />
            )}

            {/* サイドメニュー */}
            <aside
                className={`bg-white border-r border-gray-100 flex-col overflow-y-auto shadow-sm transition-all duration-300 z-[200] md:z-10 fixed left-0 transform top-16 h-[calc(100vh-4rem)] md:top-0 md:h-full md:relative md:translate-x-0 md:shadow-none ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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

                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${isActive
                                            ? "bg-[oklch(0.73_0.11_162)] text-white shadow-md shadow-[oklch(0.73_0.11_162)]/30"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                                    >
                                        <div className="w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                                            {item.icon}
                                        </div>
                                        {(sidebarExpanded || mobileMenuOpen) && (
                                            <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
