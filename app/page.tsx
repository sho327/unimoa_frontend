"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

export default function UnimoaApp() {
  const [subView, setSubView] = useState<"projects" | "calendar" | "members">("projects")
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [spaceDropdownOpen, setSpaceDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const spaces: Space[] = [
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

  const [activeSpace, setActiveSpace] = useState<Space>(spaces[0])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-100 h-16 px-5 shrink-0 z-[120] flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {/* サイドバートグルボタン(PC) */}
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 text-gray-500 mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* サイドバートグルボタン(スマホ) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 text-gray-500 mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* ロゴ */}
          <div className="bg-[oklch(0.73_0.11_162)] text-white w-7 h-7 flex items-center justify-center rounded-md">
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
            >
              <g transform="translate(3.5, 4) scale(0.7)">
                <circle cx="9" cy="7" r="4" />
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M17 3.13a4 4 0 010 7.75" />
              </g>
            </svg>
          </div>

          {/* タイトル */}
          <span className="font-black font-semibold text-xl tracking-tighter text-gray-900">Unimoa</span>

          <div className="mx-2 hidden h-4 w-px bg-gray-300 md:block" />

          {/* チーム切り替え(PC版) */}
          <div className="lg:block hidden relative">
            <button
              onClick={() => setSpaceDropdownOpen(!spaceDropdownOpen)}
              className="flex items-center gap-1 h-10 w-[225px] min-w-[225px] px-3 border border-gray-200 hover:border-[oklch(0.73_0.11_162)]/50 focus:border-[oklch(0.73_0.11_162)]/50 rounded-lg bg-white text-gray-900/90 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[oklch(0.73_0.11_162)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="truncate flex-1 text-left text-sm">{activeSpace.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {spaceDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-2xl z-50">
                <ul className="py-2">
                  {spaces.map((space) => (
                    <li key={space.id}>
                      <button
                        onClick={() => {
                          setActiveSpace(space)
                          setSpaceDropdownOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-[oklch(0.73_0.11_162)]/10 flex items-center justify-between ${
                          space.id === activeSpace.id
                            ? "bg-[oklch(0.73_0.11_162)]/10 text-[oklch(0.73_0.11_162)] font-bold"
                            : ""
                        }`}
                      >
                        <span className="text-sm">{space.name}</span>
                        {space.id === activeSpace.id && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-auto"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                  <div className="border-t border-gray-100 my-2" />
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-[oklch(0.73_0.11_162)]/10 text-sm">
                      新しいチームを作成
                    </button>
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

            <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-2xl p-4 z-50">
              <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest mb-2">Notifications</h3>
              <div className="space-y-3">
                <div className="text-xs border-b border-gray-50 pb-2 leading-relaxed text-gray-600">
                  <span className="font-bold text-gray-900">田中さん</span>が「卒業研究」にコメントしました。
                </div>
                <div className="text-xs text-gray-600">会議のリマインド: 本日 15:00</div>
              </div>
            </div>
          </div>

          {/* ユーザープロフィール */}
          <div className="relative group">
            <Avatar className="w-8 h-8 border-2 border-[oklch(0.73_0.11_162)]/10 hover:border-[oklch(0.73_0.11_162)]/40 cursor-pointer transition-all">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta" />
              <AvatarFallback>KT</AvatarFallback>
            </Avatar>

            <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50">
              <div className="p-2">
                <div className="px-4 py-2 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  Kenta Tanaka
                </div>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 font-bold text-sm">
                  プロフィール設定
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 font-bold text-sm">
                  マイプロジェクト
                </button>
                <div className="border-t border-gray-100 my-2 opacity-50" />
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 font-bold text-sm text-red-500">
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* モバイルメニューオーバーレイ */}
        {mobileMenuOpen && (
          <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[110] md:hidden mt-14" />
        )}

        {/* サイドメニュー */}
        <aside
          className={`bg-white border-r border-gray-100 flex-col overflow-y-auto shadow-sm transition-all duration-300 z-[110] fixed left-0 transform top-14 h-[calc(100vh-3.5rem)] md:top-0 md:h-full md:relative md:translate-x-0 md:shadow-none ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
                  className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${
                    subView === "projects"
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
                  className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${
                    subView === "calendar"
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
                  className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${
                    subView === "members"
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

        <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
          {/* 上部バー */}
          <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex flex-col min-w-0 min-h-[40px] justify-center">
                <span className="text-[10px] font-black text-[oklch(0.73_0.11_162)]/70 uppercase tracking-widest leading-none mb-1">
                  チーム
                </span>
                <h2 className="text-sm font-black truncate text-gray-900 max-w-[150px] sm:max-w-xs">
                  {activeSpace.name}
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
          <main
            className="flex-1 overflow-y-auto p-6 sm:p-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-300 font-black uppercase tracking-widest">
              {subView}
            </div>
          </main>

          {/* チーム切替フォーム(モバイル) */}
          <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px]">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 px-3 py-1 flex-1 min-w-0">
                <div className="w-8 h-8 bg-[oklch(0.73_0.11_162)] text-white rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 shadow-sm">
                  {activeSpace.name.substring(0, 2)}
                </div>
                <span className="font-black text-xs text-gray-700 truncate">{activeSpace.name}</span>
              </div>

              <div className="relative group">
                <button className="px-3 py-1.5 text-[10px] font-black text-[oklch(0.73_0.11_162)] bg-[oklch(0.73_0.11_162)]/5 rounded-xl hover:bg-[oklch(0.73_0.11_162)]/10">
                  チーム切替
                </button>

                <div className="hidden group-hover:block absolute bottom-full right-0 mb-4 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl z-[210]">
                  <ul className="py-2">
                    {spaces.map((space) => (
                      <li key={space.id}>
                        <button
                          onClick={() => {
                            setActiveSpace(space)
                            setMobileMenuOpen(false)
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 font-bold"
                        >
                          {space.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
