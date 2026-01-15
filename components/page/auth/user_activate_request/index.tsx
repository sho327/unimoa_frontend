"use client";

import React from "react";

export default function UserActivateRequest() {
    const handleResendEmail = () => {
        // メール再送処理
        console.log("Resending activation email...");
    };

    const handleChangeEmail = () => {
        // メールアドレス変更処理
        console.log("Changing email address...");
    };

    return (
        <div className="w-full max-w-[380px] animate-in fade-in duration-700">
            {/* ロゴセクション */}
            <div className="flex items-center justify-center gap-2.5 mb-8">
                <div className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g transform="translate(3.5, 4) scale(0.7)">
                            <circle cx="9" cy="7" r="4" />
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M17 3.13a4 4 0 0 1 0 7.75" />
                        </g>
                    </svg>
                </div>
                <span className="font-black text-2xl tracking-tighter text-gray-900">
                    Unimoa
                </span>
            </div>

            {/* メインカード */}
            <div className="auth-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm shadow-primary/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h1 className="text-lg font-black text-gray-900 mb-4">メールを確認してください</h1>

                <p className="text-[12px] font-medium text-gray-500 leading-relaxed mb-6">
                    本人確認用のメールを送信しました。<br />
                    メール内のリンクをクリックして、<br />
                    アカウントを有効化してください。
                </p>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">メールが届かない場合</p>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleResendEmail}
                            className="btn btn-ghost btn-sm normal-case font-bold text-primary hover:bg-primary/10 rounded-lg"
                        >
                            確認メールを再送する
                        </button>
                        <button
                            onClick={handleChangeEmail}
                            className="btn btn-ghost btn-sm normal-case font-bold text-gray-400 hover:bg-gray-100 rounded-lg"
                        >
                            メールアドレスを変更する
                        </button>
                    </div>
                </div>
            </div>

            {/* 下部リンク */}
            <div className="mt-8 text-center">
                <a
                    href="/login"
                    className="text-[12px] font-bold text-gray-400 hover:text-gray-900 flex items-center justify-center gap-2 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                    ログインに戻る
                </a>
            </div>
        </div>
    );
}
