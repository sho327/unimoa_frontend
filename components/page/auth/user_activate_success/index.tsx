"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function UserActivateSuccess() {
    const router = useRouter();

    const handleNavigateToSpace = () => {
        router.push("/dashboard");
    };

    return (
        <div className="w-full max-w-[400px] animate-in fade-in duration-700">
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
            <div className="auth-card p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm shadow-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-lg font-black text-gray-900 mb-4">アカウントの有効化完了</h1>

                <p className="text-[12px] font-medium text-gray-500 leading-relaxed mb-10">
                    メールアドレスの確認が完了しました。<br />
                    全ての機能を利用する準備が整いました。
                </p>

                <div>
                    <button
                        onClick={handleNavigateToSpace}
                        className="btn btn-primary w-full rounded-xl font-black text-white h-12 shadow-md shadow-primary/20 normal-case text-base border-none"
                    >
                        Spaceへ移動する
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center text-[12px] font-black text-gray-400 uppercase tracking-widest opacity-60">
                <p>Welcome to Unimoa Space</p>
            </div>
        </div>
    );
}
