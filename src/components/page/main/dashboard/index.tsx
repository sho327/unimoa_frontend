"use client"

import { useAppStore } from "@/store"

type Space = {
    id: string
    name: string
    projects: Project[]
}

type Project = {
    id: string
    title: string
    category: string
    tasks: number[]
}

export default function Dashboard() {
    const {
        activeSpace,
        activeTab: subView, // Zustandにあわせるが、コード内ではsubView変数名で扱う
        searchOpen,
        searchQuery,
        setSearchOpen,
        setSearchQuery
    } = useAppStore();

    // サンプルデータ（本来はAPI等から取得するが、ここではactiveSpace.idに基づいてフィルタリング等する想定）
    const localSpaces: Space[] = [
        {
            id: "s1",
            name: "田中AIデザインゼミ",
            projects: [
                { id: "p1", title: "卒業研究中間発表の準備", category: "リサーチ", tasks: [1, 2, 3] },
                { id: "p2", title: "ゼミ合宿の計画", category: "イベント", tasks: [1] },
            ],
        },
        { id: "s2", name: "写真部 公式", projects: [] },
    ]

    const currentLocalSpace = localSpaces.find(s => s.id === activeSpace.id) || localSpaces[0];

    return (
        <div className="flex flex-1 overflow-hidden relative h-full">
            {/* サイドバーは Layout 側でレンダリングされるためここでは削除 */}

            {/* メインエリア */}
            <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
                {/* 上部バー */}
                <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px] shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col min-w-0 min-h-[40px] justify-center">
                            <span className="text-[10px] font-black text-[oklch(0.73_0.11_162)]/70 uppercase tracking-widest leading-none mb-1">
                                チーム
                            </span>
                            <h2 className="text-sm font-black truncate text-gray-900 max-w-[150px] sm:max-w-xs">
                                {currentLocalSpace.name}
                            </h2>
                        </div>
                    </div>

                    {/* 検索バー */}
                    <div className="flex items-center">
                        <div
                            className={`flex items-center rounded-full transition-all duration-300 px-1 ${searchOpen ? "w-48 sm:w-64 bg-white border border-gray-200" : "w-10 bg-transparent"}`}
                        >
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-[oklch(0.73_0.11_162)]"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {searchOpen && (
                                <input
                                    type="text"
                                    placeholder="検索..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") {
                                            setSearchOpen(false)
                                            setSearchQuery("")
                                        }
                                    }}
                                    className="bg-transparent border-none outline-none text-sm w-full px-1 h-8 text-gray-800"
                                    autoFocus
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* メインエリア */}
                <main className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10">
                    <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-300 font-black uppercase tracking-widest">
                        <span>{subView} View Content</span>
                    </div>
                </main>
            </div>
        </div>
    )
}