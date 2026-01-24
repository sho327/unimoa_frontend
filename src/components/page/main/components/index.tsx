"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/dataTable";

// デモ用のデータ型
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created: string;
}

// デモ用の列定義
const columns = [
    { key: 'name' as keyof User, label: '名前' },
    { key: 'email' as keyof User, label: 'メールアドレス' },
    { key: 'role' as keyof User, label: '役割' },
    { key: 'status' as keyof User, label: 'ステータス' },
    { key: 'created' as keyof User, label: '作成日' },
];

// デモデータ生成関数
const generateDummyData = (count: number): User[] => {
    const data: User[] = [];
    for (let i = 1; i <= count; i++) {
        const role = ['管理者', '編集者', '読者', 'ゲスト'][i % 4];
        const status = ['有効', '保留', '無効'][i % 3];
        const createdDate = `2024/${(i % 6) + 7}/${(i % 25) + 1}`;
        data.push({
            id: i,
            name: `ユーザー ${i}`,
            email: `user${i}@test.com`,
            role: role,
            status: status,
            created: createdDate
        });
    }
    return data;
};

export default function ComponentsDemo() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setUsers(generateDummyData(30));
    }, []);

    const handleDeleteSelected = (selectedIds: (number | string)[]) => {
        alert(`${selectedIds.length}件のアイテムを削除します。`);
        setUsers(prevUsers => prevUsers.filter(user => !selectedIds.includes(user.id)));
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <h1 className="text-2xl font-bold mb-6">DataTable デモ</h1>
            <DataTable
                data={users}
                columns={columns}
                onDeleteSelected={handleDeleteSelected}
            />
        </main>
    );
}
