"use client";

import React, { useState } from "react";
import AuthCard from "@/components/auth/authCard";

export default function PasswordReset() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <>
            <AuthCard>
                <h1 className="text-base font-black text-gray-900 mb-8 border-b border-gray-200 pb-4">
                    パスワードの更新
                </h1>

                <p className="text-[12px] font-bold text-gray-500 leading-relaxed mb-6">
                    新しいパスワードを設定してください。<br />設定後、自動的にログインします。
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                            新しいパスワード
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

                    <div className="pt-2">
                        <button
                            className={`btn btn-primary w-full rounded-xl font-black text-white shadow-md shadow-primary/10 normal-case mt-2 text-[13px] border-none ${isLoading ? "loading" : ""
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "" : "パスワードを更新"}
                        </button>
                    </div>
                </form>
            </AuthCard>

            {/* 下部リンク */}
            <div className="mt-8 text-center">
                <a
                    href="/login"
                    className="text-[12px] font-bold text-gray-400 hover:text-gray-900 flex items-center justify-center gap-2 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                    ログイン画面へ戻る
                </a>
            </div>
        </>
    );
}
