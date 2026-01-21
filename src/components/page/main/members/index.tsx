"use client";

import { useState } from "react";
import { z } from "zod";
import { useAppStore } from "@/store";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/formInput";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ui/table";

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
    const { searchQuery, setSearchQuery } = useAppStore();

    const [activeTab, setActiveTab] = useState<"registered" | "unregistered">("registered");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showEmailInviteModal, setShowEmailInviteModal] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [inviteError, setInviteError] = useState("");
    const [emailError, setEmailError] = useState("");

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

    const inviteSchema = z.string().trim().min(1, "ユーザーIDまたはメールアドレスを入力してください");
    const emailSchema = z.string().trim().min(1, "メールアドレスを入力してください").email("有効なメールアドレスを入力してください");

    const closeInviteModal = () => {
        setShowInviteModal(false);
        setInviteError("");
        setSearchQuery("");
    };

    const closeEmailInviteModal = () => {
        setShowEmailInviteModal(false);
        setEmailError("");
        setEmailInput("");
    };

    const handleInvite = () => {
        const result = inviteSchema.safeParse(searchQuery);
        if (!result.success) {
            setInviteError(result.error.issues[0]?.message ?? "入力内容を確認してください");
            return;
        }
        setInviteError("");
        console.log("Inviting user:", result.data);
        closeInviteModal();
    };

    const handleEmailInvite = () => {
        const result = emailSchema.safeParse(emailInput);
        if (!result.success) {
            setEmailError(result.error.issues[0]?.message ?? "メールアドレスを確認してください");
            return;
        }
        setEmailError("");
        console.log("Sending invite to:", result.data);
        closeEmailInviteModal();
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">メンバー管理</h1>
                    <p className="hidden sm:block text-xs text-gray-500 mt-1 font-bold">登録時み/未登録メンバーの一覧</p>
                </div>
                {/* 招待ボタン */}
                <div className="flex items-center gap-2">
                    {/* <Button
                        variant="outline"
                        className="btn-sm text-xs"
                        onClick={() => setShowEmailInviteModal(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        メール招待
                    </Button> */}
                    <Button
                        variant="primary"
                        className="btn-sm text-xs gap-1"
                        onClick={() => setShowInviteModal(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg> */}
                        ユーザ招待
                    </Button>
                </div>
            </div>

            {/* タブ */}
            <div className="tabs tabs-boxed bg-white mb-6 inline-flex p-1 rounded-xl">
                <button
                    className={`tab font-bold text-xs ${activeTab === "registered" ? "tab-active bg-white shadow-sm" : ""}`}
                    style={activeTab === "registered" ? { color: "white" } : {}}
                    onClick={() => setActiveTab("registered")}
                >
                    登録済ユーザ ({registeredMembers.length})
                </button>
                <button
                    className={`tab font-bold text-xs ${activeTab === "unregistered" ? "tab-active bg-white shadow-sm" : ""}`}
                    style={activeTab === "unregistered" ? { color: "white" } : {}}
                    onClick={() => setActiveTab("unregistered")}
                >
                    外部(未登録)ユーザ ({unregisteredMembers.length})
                </button>
            </div>

            {/* メンバー一覧テーブル */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="table-zebra">
                        <TableHead className="bg-gray-50">
                            <TableRow>
                                <TableHeader className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">メンバー</TableHeader>
                                <TableHeader className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">メールアドレス</TableHeader>
                                <TableHeader className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">参加日</TableHeader>
                                <TableHeader className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">ステータス</TableHeader>
                                <TableHeader className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">権限</TableHeader>
                                <TableHeader className="font-black text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap"></TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentMembers.map((member) => (
                                <TableRow key={member.id} className="hover">
                                    <TableCell>
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
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600 whitespace-nowrap">{member.email}</TableCell>
                                    <TableCell className="text-sm text-gray-600 whitespace-nowrap">{member.joinedAt}</TableCell>
                                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                                    <TableCell>
                                        <select
                                            className="select select-sm select-bordered font-bold text-xs"
                                            defaultValue={member.role}
                                            disabled={member.status !== "active"}
                                        >
                                            <option value="admin">管理者</option>
                                            <option value="member">メンバー</option>
                                            <option value="viewer">閲覧者</option>
                                        </select>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex">
                                            {member.status === "pending" && (
                                                <Button
                                                    variant="ghost"
                                                    className="btn-xs text-primary hover:bg-primary/10 font-bold gap-1 px-2 rounded-lg transition-all"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                        <path d="M3 3v5h5" />
                                                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                                        <path d="M16 16h5v5" />
                                                    </svg>
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                className="btn-xs text-error hover:bg-error/10 font-bold gap-1 px-2 rounded-lg transition-all"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                    <line x1="10" x2="10" y1="11" y2="17" />
                                                    <line x1="14" x2="14" y1="11" y2="17" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Unimoaユーザー招待モーダル */}
            <Modal
                open={showInviteModal}
                onClose={closeInviteModal}
                title="ユーザ招待"
            >
                <p className="text-sm text-gray-600 mb-4">
                    ユーザID または メールアドレスで検索してください。<br/>
                    <span className="text-xs text-red-500">※未登録ユーザの場合は招待メールが送信されます。</span>
                </p>
                <FormInput
                    label="ユーザーID または メールアドレス"
                    type="text"
                    placeholder="例：tanaka@example.com"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    error={inviteError}
                />
                <div className="modal-action">
                    <Button 
                        variant="outline" 
                        onClick={closeInviteModal}
                        >
                        キャンセル
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleInvite}
                        >
                        招待する
                    </Button>
                </div>
            </Modal>

            {/* 未登録ユーザー招待モーダル */}
            {/* <Modal
                open={showEmailInviteModal}
                onClose={closeEmailInviteModal}
                title="メールで招待"
            >
                <p className="text-sm text-gray-600 mb-4">招待メールを送信するメールアドレスを入力してください</p>
                <FormInput
                    label="メールアドレス"
                    type="email"
                    placeholder="例：yamada@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    error={emailError}
                />
                <div className="modal-action">
                    <Button variant="ghost" onClick={closeEmailInviteModal}>
                        キャンセル
                    </Button>
                    <Button variant="primary" onClick={handleEmailInvite}>
                        招待メールを送信
                    </Button>
                </div>
            </Modal> */}
        </main>
    );
}
