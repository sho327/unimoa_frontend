"use client"

import { useState } from "react"
import { useLayoutContext } from "@/components/layout/clientMainLayout"

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
        sidebarExpanded,
        mobileMenuOpen,
        setMobileMenuOpen,
        activeSpace,
        setActiveSpace,
        spaces: globalSpaces
    } = useLayoutContext();

    const [subView, setSubView] = useState<"projects" | "calendar" | "members">("projects")
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

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
            {/* モバイルメニューオーバーレイ */}
            {mobileMenuOpen && (
                <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[110] md:hidden" />
            )}

            {/* サイドメニュー */}
            <aside
                className={`bg-white border-r border-gray-100 flex-col overflow-y-auto shadow-sm transition-all duration-300 z-[110] fixed left-0 h-full md:relative md:translate-x-0 md:shadow-none ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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

                            {/* プロジェクト */}
                            <button
                                onClick={() => {
                                    setSubView("projects")
                                    setMobileMenuOpen(false)
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${subView === "projects"
                                    ? "bg-[oklch(0.73_0.11_162)] text-white shadow-md shadow-[oklch(0.73_0.11_162)]/30"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                {(sidebarExpanded || mobileMenuOpen) && (
                                    <span className="font-bold text-sm whitespace-nowrap">プロジェクト</span>
                                )}
                            </button>

                            {/* カレンダー */}
                            <button
                                onClick={() => {
                                    setSubView("calendar")
                                    setMobileMenuOpen(false)
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${subView === "calendar"
                                    ? "bg-[oklch(0.73_0.11_162)] text-white shadow-md shadow-[oklch(0.73_0.11_162)]/30"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                {(sidebarExpanded || mobileMenuOpen) && (
                                    <span className="font-bold text-sm whitespace-nowrap">カレンダー</span>
                                )}
                            </button>

                            {/* メンバー */}
                            <button
                                onClick={() => {
                                    setSubView("members")
                                    setMobileMenuOpen(false)
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${subView === "members"
                                    ? "bg-[oklch(0.73_0.11_162)] text-white shadow-md shadow-[oklch(0.73_0.11_162)]/30"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                {(sidebarExpanded || mobileMenuOpen) && (
                                    <span className="font-bold text-sm whitespace-nowrap">メンバー</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

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

                {/* メインコンテンツ */}
                <main
                    className="flex-1 overflow-y-auto p-6 sm:p-10"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {subView === "projects" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentLocalSpace.projects.map((project) => (
                                <div key={project.id} className="card bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                    <div className="card-body p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="badge badge-primary badge-outline text-xs font-bold">{project.category}</span>
                                            <button className="btn btn-ghost btn-circle btn-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <h3 className="card-title text-base font-black text-gray-800 mb-2">{project.title}</h3>
                                        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                                                <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <span>{project.tasks.length} タスク</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* 新規作成カード */}
                            <div className="card bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[oklch(0.73_0.11_162)] hover:bg-[oklch(0.73_0.11_162)]/5 transition-all cursor-pointer flex items-center justify-center min-h-[180px]">
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-bold">新規プロジェクト</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {subView !== "projects" && (
                        <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-300 font-black uppercase tracking-widest">
                            {subView}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}