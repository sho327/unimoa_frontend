"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/authCard";

export default function QuickSetup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <>
            <AuthCard>
                {/* 招待情報 */}
                <div className="mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
                    <div className="avatar online">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Space" alt="Space avatar" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-[13px] font-black text-gray-900 leading-tight">
                            「情報デザイン佐藤ゼミ」<br />
                            <span className="text-primary font-bold">への招待を承諾しました</span>
                        </h2>
                    </div>
                </div>

                <h1 className="text-base font-black text-gray-900 mb-2 uppercase tracking-tighter">
                    アカウント作成
                </h1>
                <p className="text-[11px] text-gray-500 mb-8 font-bold">
                    参加を完了するために詳細を設定してください
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* アバター選択 */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="avatar">
                            <div className="w-16 rounded-full bg-gray-100">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=NewUser" alt="User avatar" />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                        >
                            画像を選択
                        </button>
                    </div>

                    {/* ニックネーム */}
                    <div>
                        <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                            ニックネーム (表示名)
                        </label>
                        <input
                            type="text"
                            placeholder="例：たなか"
                            className="w-full input-minimal text-gray-700 placeholder:text-gray-300"
                            required
                        />
                    </div>

                    {/* パスワード */}
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

                    {/* パスワード確認 */}
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

                    {/* 送信ボタン */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className={`btn btn-primary w-full rounded-xl font-black text-white shadow-md shadow-primary/10 normal-case text-[13px] border-none ${isLoading ? "loading" : ""
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "" : "登録を完了して参加する"}
                        </button>
                    </div>
                </form>
            </AuthCard>

            {/* 下部説明 */}
            <div className="mt-8 text-center px-4">
                <p className="text-[10px] font-bold text-gray-400 leading-relaxed">
                    この登録を完了すると、自動的に「マイ・スペース」と「招待されたスペース」の2つが作成されます。
                </p>
            </div>
        </>
    );
}
