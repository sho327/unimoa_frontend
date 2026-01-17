"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/authCard";

type PlanMode = "personal" | "shared-free" | "shared-pro" | "invite";

export default function InitialSetup() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedMode, setSelectedMode] = useState<PlanMode>("personal");
    const [inviteCode, setInviteCode] = useState("");

    const handleNextStep = (step: number) => {
        setCurrentStep(step);
    };

    const handleSelectPlan = (mode: PlanMode) => {
        setSelectedMode(mode);
        setInviteCode("");
    };

    const handleInviteInput = (value: string) => {
        setInviteCode(value);
        if (value.length > 0) {
            setSelectedMode("invite");
        } else {
            setSelectedMode("personal");
        }
    };

    const handleFinish = () => {
        router.push("/dashboard");
    };

    return (
        <>
            <AuthCard>
                {/* ステップインジケーター */}
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`w-2 h-2 rounded-full transition-colors ${step <= currentStep ? "bg-primary" : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>

                {/* Step 1: プロフィール設定 */}
                {currentStep === 1 && (
                    <div>
                        <h1 className="text-base font-black text-gray-900 mb-2">プロフィール設定</h1>
                        <p className="text-[12px] text-gray-500 mb-8 font-bold">メンバーに表示されるあなたの情報</p>
                        <div className="space-y-6">
                            <div className="flex flex-col items-center gap-4 py-2">
                                <div className="avatar">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Unimoa" alt="Avatar" />
                                    </div>
                                </div>
                                <button className="text-[12px] font-black text-primary hover:underline">
                                    画像を変更する
                                </button>
                            </div>
                            <div>
                                <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                                    表示名
                                </label>
                                <input
                                    type="text"
                                    placeholder="例：田中 太郎"
                                    className="w-full input-minimal text-gray-700 placeholder:text-gray-300"
                                />
                            </div>
                            <button
                                onClick={() => handleNextStep(2)}
                                className="btn btn-primary w-full rounded-xl font-black text-white shadow-md shadow-primary/10 normal-case text-[13px] border-none"
                            >
                                次へ進む
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: スペース選択 */}
                {currentStep === 2 && (
                    <div>
                        <h1 className="text-base font-black text-gray-900 mb-2">スペースの準備</h1>
                        <p className="text-[12px] text-gray-500 mb-6 font-bold">プランを選ぶか、招待コードを入力してください</p>

                        <div className="space-y-3">
                            {/* 個人スペース */}
                            <div
                                className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${selectedMode === "personal"
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02]"
                                    }`}
                                onClick={() => handleSelectPlan("personal")}
                            >
                                <div className="mt-1 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[13px] font-black text-gray-900">個人スペース</div>
                                    <div className="text-[11px] text-gray-500 font-bold">自分専用の無料ワークスペース</div>
                                </div>
                            </div>

                            {/* 無料共有スペース */}
                            <div
                                className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${selectedMode === "shared-free"
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02]"
                                    }`}
                                onClick={() => handleSelectPlan("shared-free")}
                            >
                                <div className="mt-1 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M12 21v-2a4 4 0 0 0-3-3.87" />
                                        <circle cx="12" cy="7" r="4" />
                                        <circle cx="6" cy="11" r="4" />
                                        <circle cx="18" cy="11" r="4" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[13px] font-black text-gray-900">無料共有スペース</div>
                                    <div className="text-[11px] text-gray-500 font-bold">ゼミ・サークル向け (最大10人)</div>
                                </div>
                            </div>

                            {/* 有料共有スペース */}
                            <div
                                className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${selectedMode === "shared-pro"
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02]"
                                    }`}
                                onClick={() => handleSelectPlan("shared-pro")}
                            >
                                <div className="mt-1 text-yellow-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[13px] font-black text-gray-900">有料共有スペース</div>
                                    <div className="text-[11px] text-gray-500 font-bold">高度な管理と無制限のメンバー (Pro)</div>
                                </div>
                            </div>

                            <div className="divider text-[10px] font-black text-gray-400 my-4 uppercase tracking-widest">または</div>

                            {/* 招待コード入力 */}
                            <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                                    招待コードを入力して合流
                                </label>
                                <input
                                    type="text"
                                    placeholder="例：ABC-123"
                                    className="w-full input-minimal text-[12px] uppercase text-gray-700 placeholder:text-gray-300"
                                    value={inviteCode}
                                    onChange={(e) => handleInviteInput(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => handleNextStep(1)}
                                    className="btn btn-outline flex-1 rounded-xl font-black text-gray-500 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 normal-case text-[13px]"
                                >
                                    戻る
                                </button>
                                <button
                                    onClick={() => handleNextStep(3)}
                                    className="btn btn-primary flex-[2] rounded-xl font-black text-white shadow-md shadow-primary/10 normal-case text-[13px] border-none"
                                >
                                    次へ進む
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: 最終確認 */}
                {currentStep === 3 && (
                    <div>
                        <h1 className="text-base font-black text-gray-900 mb-2">
                            {selectedMode === "shared-free" || selectedMode === "shared-pro"
                                ? "ワークスペースの作成"
                                : selectedMode === "invite"
                                    ? "招待の確認"
                                    : "セットアップの完了"}
                        </h1>
                        <p className="text-[12px] text-gray-500 mb-8 font-bold">
                            {selectedMode === "shared-free" || selectedMode === "shared-pro"
                                ? "チームの名前とURLを決めてください"
                                : selectedMode === "invite"
                                    ? "既存のゼミへの合流準備が整いました"
                                    : "自分だけのスペースを作成します"}
                        </p>

                        <div className="space-y-6">
                            {/* 共有スペース作成UI */}
                            {(selectedMode === "shared-free" || selectedMode === "shared-pro") && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                                            ワークスペース名
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="例：〇〇大学 佐藤ゼミ"
                                            className="w-full input-minimal text-gray-700 placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                                            スペースURL (識別ID)
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[12px] font-bold text-gray-400">unimoa.jp/</span>
                                            <input
                                                type="text"
                                                placeholder="sato-lab"
                                                className="w-full input-minimal text-[12px] text-gray-700 placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 招待コード確認UI */}
                            {selectedMode === "invite" && (
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-3">
                                    <div className="text-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-black text-green-800">招待コードを認識しました</div>
                                        <div className="text-[11px] font-bold text-green-600">登録完了後、自動的に参加します。</div>
                                    </div>
                                </div>
                            )}

                            {/* 個人スペースUI */}
                            {selectedMode === "personal" && (
                                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center text-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    </div>
                                    <div className="text-[12px] font-bold text-gray-500 leading-relaxed">
                                        あなた専用のプライベート空間を作成します。<br />
                                        後からいつでもゼミ用スペースを追加できます。
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleNextStep(2)}
                                    className="btn btn-outline flex-1 rounded-xl font-black text-gray-500 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 normal-case text-[13px]"
                                >
                                    戻る
                                </button>
                                <button
                                    onClick={handleFinish}
                                    className="btn btn-primary flex-[2] rounded-xl font-black text-white shadow-md shadow-primary/10 normal-case text-[13px] border-none"
                                >
                                    Unimoa をはじめる！
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AuthCard>

            <p className="mt-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Unimoa Setup Wizard
            </p>
        </>
    );
}
