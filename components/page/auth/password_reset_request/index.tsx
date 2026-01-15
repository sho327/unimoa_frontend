"use client";

import React, { useState } from "react";

export default function PasswordResetRequest() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
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
            <div className="auth-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200">
                {!sent ? (
                    <>
                        <h1 className="text-base font-black text-gray-900 mb-8 border-b border-gray-200 pb-4">
                            パスワード再設定
                        </h1>

                        <p className="text-[12px] font-bold text-gray-500 leading-relaxed mb-6">
                            登録済みのメールアドレスを入力してください。<br />パスワード再設定用のリンクを送信します。
                        </p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                                    メールアドレス
                                </label>
                                <input
                                    type="email"
                                    placeholder="tanaka@example.com"
                                    className="w-full input-minimal text-gray-700 placeholder:text-gray-300"
                                    required
                                />
                            </div>

                            <button
                                className="btn btn-primary w-full rounded-xl font-black text-white shadow-md shadow-primary/10 normal-case mt-2 text-[13px] border-none"
                            >
                                送信する
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-base font-black text-gray-900 mb-2">メールを送信しました</h2>
                        <p className="text-[12px] font-bold text-gray-500 leading-relaxed mb-8 px-2">
                            メール内のリンクをクリックして、<br />新しいパスワードを設定してください。
                        </p>
                        <button
                            onClick={() => setSent(false)}
                            className="text-[12px] font-black text-primary uppercase tracking-widest hover:underline"
                        >
                            メールが届かない場合
                        </button>
                    </div>
                )}
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
