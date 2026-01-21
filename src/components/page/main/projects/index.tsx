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

export default function Projects() {
    const { activeSpace, spaces } = useAppStore();

    // 本来は activeSpace に基づいて取得するが、モック用に spaces から検索
    const currentLocalSpace = spaces.find(s => s.id === activeSpace.id) || spaces[0];

    // ダミーのプロジェクトリスト（activeSpaceに紐づくものが無い場合のフォールバック）
    const displayProjects = (currentLocalSpace && currentLocalSpace.projects && currentLocalSpace.projects.length > 0)
        ? currentLocalSpace.projects
        : [
            { id: "p1", title: "卒業研究中間発表の準備", category: "リサーチ", tasks: [1, 2, 3] },
            { id: "p2", title: "ゼミ合宿の計画", category: "イベント", tasks: [1] },
        ];

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">プロジェクト</h1>
                    <p className="hidden sm:block text-xs text-gray-500 mt-1 font-bold">現在進行中のプロジェクト一覧</p>
                </div>
                <button className="btn btn-primary btn-sm rounded-lg px-4 text-xs shadow-md text-white border-none">+ 新規作成</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProjects.map((project) => (
                    <div key={project.id} className="card bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className="card-body p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">{project.category}</span>
                                <button className="btn btn-ghost btn-circle btn-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>
                            <h3 className="card-title text-base font-black text-gray-800 mb-2">{project.title}</h3>
                            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200">
                                <div className="flex -space-x-2">
                                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                                        <img src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + project.id} />
                                    </div>
                                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                                        <img src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + (project.id + "alt")} />
                                    </div>
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
        </main>
    )
}