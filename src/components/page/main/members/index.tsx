"use client";

import { useState } from "react";
import { useAppStore } from "@/components/store"

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

type MemberStatus = "pending" | "active" | "declined";
type MemberRole = "admin" | "member" | "viewer";

type Member = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    joinedAt: string;
    status: MemberStatus;
    role: MemberRole;
    isRegistered: boolean;
};

export default function Members() {
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

    const [activeTab, setActiveTab] = useState<"registered" | "unregistered">("registered");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showEmailInviteModal, setShowEmailInviteModal] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");
    const [emailInput, setEmailInput] = useState("");

    // ダミーデータ
    const registeredMembers: Member[] = [
        {
            id: "1",
            name: "田中 太郎",
            email: "tanaka@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka",
            joinedAt: "2024-01-15",
            status: "active",
            role: "admin",
            isRegistered: true,
        },
        {
            id: "2",
            name: "佐藤 花子",
            email: "sato@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sato",
            joinedAt: "2024-01-20",
            status: "active",
            role: "member",
            isRegistered: true,
        },
        {
            id: "3",
            name: "鈴木 一郎",
            email: "suzuki@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki",
            joinedAt: "2024-02-01",
            status: "pending",
            role: "member",
            isRegistered: true,
        },
    ];

    const unregisteredMembers: Member[] = [
        {
            id: "4",
            name: "",
            email: "yamada@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yamada",
            joinedAt: "2024-02-10",
            status: "pending",
            role: "member",
            isRegistered: false,
        },
    ];

    const currentMembers = activeTab === "registered" ? registeredMembers : unregisteredMembers;

    const getStatusBadge = (status: MemberStatus) => {
        const styles = {
            pending: "badge-warning text-gray-600 px-2 py-2",
            active: "badge-success text-white px-2 py-2",
            declined: "badge-error text-white px-2 py-2",
        };
        const labels = {
            pending: "招待中",
            active: "参加",
            declined: "辞退",
        };
        return <span className={`badge ${styles[status]} badge-sm font-bold`}>{labels[status]}</span>;
    };

    const handleInvite = () => {
        console.log("Inviting user:", searchQuery);
        setShowInviteModal(false);
        setSearchQuery("");
    };

    const handleEmailInvite = () => {
        console.log("Sending invite to:", emailInput);
        setShowEmailInviteModal(false);
        setEmailInput("");
    };

    const currentLocalSpace = localSpaces.find(s => s.id === activeSpace.id) || localSpaces[0];

    return (
        <div className="flex flex-1 overflow-hidden relative h-full">
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
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">メンバー管理</h1>
                            <p className="hidden sm:block text-xs text-gray-500 mt-1 font-bold">メンバー一覧</p>
                        </div>
                        {/* 招待ボタン */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowEmailInviteModal(true)}
                                className="btn btn-outline btn-sm border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 rounded-lg normal-case font-bold text-gray-600 text-xs"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                メール招待
                            </button>
                            <button
                                onClick={() => setShowInviteModal(true)}
                                className="btn btn-primary btn-sm rounded-lg normal-case font-bold text-white text-xs border-none shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                ユーザー招待
                            </button>
                        </div>
                    </div>

                    {/* タブ */}
                    <div className="tabs tabs-boxed bg-white mb-6 inline-flex p-1 rounded-xl">
                        <button
                            className={`tab font-bold text-xs ${activeTab === "registered" ? "tab-active bg-white shadow-sm" : ""}`}
                            style={activeTab === "registered" ? { color: "white" } : {}}
                            onClick={() => setActiveTab("registered")}
                        >
                            Unimoaユーザー ({registeredMembers.length})
                        </button>
                        <button
                            className={`tab font-bold text-xs ${activeTab === "unregistered" ? "tab-active bg-white shadow-sm" : ""}`}
                            style={activeTab === "unregistered" ? { color: "white" } : {}}
                            onClick={() => setActiveTab("unregistered")}
                        >
                            未登録ユーザー ({unregisteredMembers.length})
                        </button>
                    </div>

                    {/* メンバー一覧テーブル */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">メンバー</th>
                                        <th className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">メールアドレス</th>
                                        <th className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">参加日</th>
                                        <th className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">ステータス</th>
                                        <th className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">権限</th>
                                        <th className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentMembers.map((member) => (
                                        <tr key={member.id} className="hover">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="w-10 h-10 rounded-full">
                                                            <img src={member.avatar} alt={member.name || member.email} />
                                                        </div>
                                                    </div>
                                                    <div className="font-bold text-sm text-gray-900 whitespace-nowrap">
                                                        {member.name || "未登録"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm text-gray-600 whitespace-nowrap">{member.email}</td>
                                            <td className="text-sm text-gray-600 whitespace-nowrap">{member.joinedAt}</td>
                                            <td>{getStatusBadge(member.status)}</td>
                                            <td>
                                                <select
                                                    className="select select-sm select-bordered font-bold text-xs"
                                                    defaultValue={member.role}
                                                    disabled={member.status !== "active"}
                                                >
                                                    <option value="admin">管理者</option>
                                                    <option value="member">メンバー</option>
                                                    <option value="viewer">閲覧者</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="flex">
                                                    {member.status === "pending" && (
                                                        <button className="btn btn-ghost btn-xs text-primary hover:bg-primary/10 font-bold gap-1 px-2 rounded-lg transition-all">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                                <path d="M3 3v5h5" />
                                                                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                                                <path d="M16 16h5v5" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    <button className="btn btn-ghost btn-xs text-error hover:bg-error/10 font-bold gap-1 px-2 rounded-lg transition-all">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M3 6h18" />
                                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                            <line x1="10" x2="10" y1="11" y2="17" />
                                                            <line x1="14" x2="14" y1="11" y2="17" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Unimoaユーザー招待モーダル */}
            {showInviteModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-black text-lg mb-4">Unimoaユーザーを招待</h3>
                        <p className="text-sm text-gray-600 mb-4">ユーザーIDまたはメールアドレスで検索してください</p>
                        <input
                            type="text"
                            placeholder="例：tanaka@example.com"
                            className="input input-bordered w-full mb-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowInviteModal(false)}>
                                キャンセル
                            </button>
                            <button className="btn btn-primary" onClick={handleInvite}>
                                招待する
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowInviteModal(false)}></div>
                </div>
            )}

            {/* 未登録ユーザー招待モーダル */}
            {showEmailInviteModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-black text-lg mb-4">メールで招待</h3>
                        <p className="text-sm text-gray-600 mb-4">招待メールを送信するメールアドレスを入力してください</p>
                        <input
                            type="email"
                            placeholder="例：yamada@example.com"
                            className="input input-bordered w-full mb-4"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowEmailInviteModal(false)}>
                                キャンセル
                            </button>
                            <button className="btn btn-primary" onClick={handleEmailInvite}>
                                招待メールを送信
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowEmailInviteModal(false)}></div>
                </div>
            )}
        </div>
    );
}
