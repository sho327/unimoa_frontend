"use client";

import React, { useState } from "react";

type NotificationType = 'task' | 'info' | 'schedule' | 'file';

type Notification = {
    id: number;
    type: NotificationType;
    title: string;
    body: string;
    date: string;
    isUnread: boolean;
};

export default function NotificationList() {
    const [notifs, setNotifs] = useState<Notification[]>([
        { id: 1, type: 'task', title: 'タスクの期限が近づいています', body: '「卒業研究の資料提出」の期限があと2時間で終了します。至急内容を確認し、提出ボタンを押してください。', date: '2024/05/20 10:30', isUnread: true },
        { id: 2, type: 'info', title: 'システムメンテナンスのお知らせ', body: '今週末の深夜2:00〜5:00の間、サーバーメンテナンスのため全サービスを停止いたします。', date: '2024/05/19 15:00', isUnread: false },
        { id: 3, type: 'schedule', title: '予定が変更されました', body: '田中教授とのゼミ会議の場所が「第3会議室」から「オンライン（Zoom）」に変更されました。', date: '2024/05/18 09:00', isUnread: true },
        { id: 4, type: 'file', title: 'ファイルが共有されました', body: '佐藤さんが「プロジェクト要件定義書_v2.pdf」をアップロードしました。', date: '2024/05/17 18:20', isUnread: false },
        { id: 5, type: 'task', title: '新しいコメントがあります', body: 'あなたが投稿した「デザイン案」に対して、リーダーから3件のフィードバックが届いています。', date: '2024/05/17 14:00', isUnread: false },
    ]);

    const getBadgeClass = (type: NotificationType) => {
        switch (type) {
            case 'task': return 'bg-error';
            case 'info': return 'bg-info';
            case 'schedule': return 'bg-success';
            case 'file': return 'bg-warning';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="max-w-4xl mx-auto w-full p-6 sm:p-10">
            <div className="flex items-end justify-between mb-6 sm:mb-8 px-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">お知らせ一覧</h1>
                    <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Notification History</p>
                </div>
                <button className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/5">すべて既読</button>
            </div>

            <div className="space-y-3">
                {notifs.map((notif) => (
                    <div
                        key={notif.id}
                        className="group bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-3 sm:gap-4 active:scale-[0.98] md:active:scale-100 cursor-pointer"
                    >
                        <div className="w-1.5 shrink-0 flex items-center justify-center">
                            {notif.isUnread && <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--p),0.4)]"></div>}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${getBadgeClass(notif.type)}`}></span>
                                <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">{notif.date}</span>
                                {notif.isUnread && (
                                    <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black">NEW</span>
                                )}
                            </div>
                            <h3 className={`text-sm sm:text-base mb-1 truncate ${notif.isUnread ? 'font-black text-gray-900' : 'font-bold text-gray-500'}`}>
                                {notif.title}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                                {notif.body}
                            </p>
                        </div>

                        <div className="shrink-0">
                            <div className="bg-gray-50 p-2 rounded-xl text-primary md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
