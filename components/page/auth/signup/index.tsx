"use client";

import React, { useState } from "react";

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
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
                <h1 className="text-base font-black text-gray-900 mb-8 border-b border-gray-200 pb-4">
                    新規登録
                </h1>

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

                    <div>
                        <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                            パスワード
                        </label>
                        <input
                            type="password"
                            placeholder="8文字以上の英数字"
                            className="w-full input-minimal text-gray-700 placeholder:text-gray-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                            パスワード（確認）
                        </label>
                        <input
                            type="password"
                            placeholder="もう一度入力してください"
                            className="w-full input-minimal text-gray-700 placeholder:text-gray-300"
                            required
                        />
                    </div>

                    <button
                        className={`btn btn-primary w-full rounded-xl font-black text-white shadow-md shadow-primary/10 normal-case mt-2 text-[13px] border-none ${isLoading ? "loading" : ""
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "" : "新規登録"}
                    </button>
                </form>

                {/* 区切り線 */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[12px] font-black text-gray-400 uppercase tracking-widest">
                        <span className="bg-white px-4">または</span>
                    </div>
                </div>

                {/* ソーシャルボタン */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="btn btn-outline border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 rounded-xl normal-case h-11 min-h-[44px] font-bold text-gray-600 transition-all border-[1.5px]">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                        </svg>
                        Google
                    </button>
                    <button className="btn btn-outline border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 rounded-xl normal-case h-11 min-h-[44px] font-bold text-gray-600 transition-all border-[1.5px]">
                        <svg
                            className="w-4 h-4 mr-2 fill-current text-gray-900"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        GitHub
                    </button>
                </div>
            </div>

            {/* 下部リンク */}
            <div className="mt-8 text-center">
                <p className="text-[12px] font-bold text-gray-500">
                    既にアカウントをお持ちですか？
                    <a href="/login" className="text-primary hover:underline ml-2">
                        ログイン
                    </a>
                </p>
            </div>

            <p className="mt-8 text-[12px] text-center text-gray-500 leading-relaxed px-6">
                登録することで、Unimoaの<a href="#" className="underline">利用規約</a>および<a href="#"
                    className="underline">プライバシーポリシー</a>に同意したものとみなされます。
            </p>
        </div>
    );
}
