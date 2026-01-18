"use client";

import Sidebar from "@/components/layout/sidebar";
import { useMobile } from "@/components/hooks/useMobile";
import AppHeader from "./appHeader";
import SearchBar from "./searchBar";
import MobileSpaceSwitcher from "./mobileSpaceSwitcher";
import { useAppStore } from "@/components/store";

export default function ClientMainLayout({
    children,
    withSidebar = true,
}: {
    children: React.ReactNode;
    withSidebar?: boolean;
}) {
    const isMobile = useMobile();
    const { activeSpace } = useAppStore();

    return (
        <div className="h-screen flex flex-col text-gray-800 relative">
            <AppHeader withSidebar={withSidebar} />

            {/* コンテンツエリア (Sidebar と Children) */}
            <div className="flex flex-1 overflow-hidden relative">
                {withSidebar && <Sidebar />}

                <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
                    {/* メインエリアの上部バー (各ページ共通) */}
                    {withSidebar && (
                        <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px] shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col min-w-0 min-h-[40px] justify-center px-1">
                                    <span className="text-[10px] font-black text-[oklch(0.73_0.11_162)]/70 uppercase tracking-widest leading-none mb-1">
                                        スペース
                                    </span>
                                    <h2 className="text-sm font-black truncate text-gray-900 max-w-[150px] sm:max-w-xs">
                                        {activeSpace.name}
                                    </h2>
                                </div>
                            </div>

                            {/* 検索バー */}
                            <SearchBar />
                        </div>
                    )}

                    {/* children は Dashboard や Members 等のコンテンツ */}
                    {children}
                </div>
            </div>

            <MobileSpaceSwitcher />
        </div>
    );
}
