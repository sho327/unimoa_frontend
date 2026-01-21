"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { pageRoutes } from "@/components/constants";
import { Button } from "@/components/ui/button";

type NotificationType = 'task' | 'info' | 'schedule' | 'file';

type NotificationDetailProps = {
    notification: {
        id: number;
        type: NotificationType;
        title: string;
        body: string;
        date: string;
        isUnread: boolean;
    };
};

export default function NotificationDetail({ notification }: NotificationDetailProps) {
    const getBadgeInfo = (type: NotificationType) => {
        switch (type) {
            case 'task': return { class: 'bg-error', label: 'タスク', action: 'タスク詳細を見る' };
            case 'info': return { class: 'bg-info', label: 'お知らせ', action: 'リンクを開く' };
            case 'schedule': return { class: 'bg-success', label: '予定', action: 'カレンダーで確認' };
            case 'file': return { class: 'bg-warning', label: 'ファイル', action: 'ファイルを開く' };
            default: return { class: 'bg-gray-400', label: 'その他', action: '詳細を見る' };
        }
    };

    const info = getBadgeInfo(notification.type);

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="w-full">
                {/* 戻るナビゲーション */}
                <Link
                    href={pageRoutes.MAIN.NOTIFICATIONS}
                    className="btn btn-ghost btn-sm gap-2 px-0 mb-6 hover:bg-transparent text-gray-400 hover:text-primary transition-colors inline-flex items-center"
                >
                    <ChevronLeft className="w-5 h-5" strokeWidth={3} />
                    <span className="font-black text-sm uppercase tracking-widest">一覧に戻る</span>
                </Link>

                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest ${info.class}`}>
                            {info.label}
                        </span>
                        <span className="text-[12px] font-bold text-gray-400 tracking-wider font-mono">{notification.date}</span>
                    </div>

                    <h2 className="text-xl font-black text-gray-900 leading-tight tracking-tight">
                        {notification.title}
                    </h2>

                    <div className="divider opacity-50 my-2 sm:my-3"></div>

                    <div className="text-gray-600 leading-relaxed space-y-4 text-sm sm:text-base">
                        {notification.body.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="primary"
                            onClick={() => console.log("Action:", info.action, notification)}
                        >
                            {info.action}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => console.log("Mark as read:", notification.id)}
                        >
                            既読にする
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
