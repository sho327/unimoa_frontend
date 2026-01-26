"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "@/components/page/auth/authCard";
import { FormInput } from "@/components/ui/formInput";
import { AuthButton } from "@/components/page/auth/authButton";
import { useAppStore } from "@/store";
import { initialSetupSchema, InitialSetupFormValues } from "@/lib/schema/auth";

type SpaceMode = "personal" | "shared";

export default function InitialSetup() {
    const router = useRouter();
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<InitialSetupFormValues>({
        resolver: zodResolver(initialSetupSchema as any),
        defaultValues: {
            userId: "",
            displayName: "",
            affiliation: "",
            tags: [],
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Unimoa",
            spaceMode: "personal",
            workspaceName: "",
            workspaceIcon: "https://api.dicebear.com/7.x/identicon/svg?seed=Workspace",
        },
        mode: "onBlur",
    });

    // ============================================================================
    // 状態（State / Watch）
    // ============================================================================
    const selectedSpaceMode = watch("spaceMode");
    const selectedTags = watch("tags") || [];
    const [tagSearch, setTagSearch] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    // ============================================================================
    // 定数（Constant）
    // ============================================================================
    const RECOMMENDED_TAGS = [
        "Python", "JavaScript", "TypeScript", "React", "Next.js",
        "デザイン", "UI/UX", "マーケティング", "英会話", "経営情報学",
        "統計学", "データ分析", "プロジェクト管理", "ライティング"
    ];

    // ============================================================================
    // ハンドラ（Handler）
    // ============================================================================
    const handleAddTag = (tag: string) => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !selectedTags.includes(trimmedTag)) {
            setValue("tags", [...selectedTags, trimmedTag]);
        }
        setTagSearch("");
        setShowSuggestions(false);
    };

    const handleRemoveTag = (tag: string) => {
        setValue("tags", selectedTags.filter(t => t !== tag));
    };

    const handleNextStep = async (step: number) => {
        let isValid = false;
        if (currentStep === 1) {
            isValid = await trigger(["userId", "displayName", "affiliation"]);
        } else if (currentStep === 2) {
            isValid = await trigger("spaceMode");
            if (selectedSpaceMode === 'shared') {
                const isWorkspaceNameValid = await trigger("workspaceName");
                isValid = isValid && isWorkspaceNameValid;
            }
        } else {
            isValid = true;
        }

        if (isValid) {
            setCurrentStep(step);
        }
    };

    const handleSelectSpaceMode = (mode: SpaceMode) => {
        setValue("spaceMode", mode);
        trigger("spaceMode");
    };

    const onSubmit = (data: InitialSetupFormValues) => {
        setIsLoading(true);
        setGlobalLoading(true);

        console.log("--- 初期セットアップ完了試行 ---");
        console.log("Data:", data);

        // 完了処理をシミュレート
        setTimeout(() => {
            setIsLoading(false);
            setGlobalLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    // 検索語句に一致するサジェストタグ
    const filteredSuggestions = RECOMMENDED_TAGS.filter(
        tag => tag.toLowerCase().includes(tagSearch.toLowerCase()) && !selectedTags.includes(tag)
    );

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

                <form onSubmit={handleSubmit(onSubmit)} className="fade-in">
                    {currentStep === 1 && (
                        <div>
                            <h1 className="text-base font-black text-neutral mb-2">プロフィール設定</h1>
                            <p className="text-[12px] text-gray-500 mb-8 font-bold">Unimoaで表示されるあなたの情報です</p>
                            <div className="space-y-6">
                                <div className="flex flex-col items-center gap-4 pt-2">
                                    <div className="avatar relative">
                                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={watch("avatarUrl")} alt="Avatar" />
                                        </div>
                                        <button type="button" className="absolute bottom-0 right-0 bg-white border border-secondary p-2 rounded-full shadow-sm hover:bg-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                                        </button>
                                    </div>
                                    <button type="button" className="text-[12px] font-black text-primary hover:underline">
                                        画像を変更する
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        label="ユーザーID"
                                        placeholder="taro_sato"
                                        error={errors.userId?.message}
                                        {...register("userId")}
                                    />
                                    <FormInput
                                        label="表示名"
                                        placeholder="佐藤 太郎"
                                        error={errors.displayName?.message}
                                        {...register("displayName")}
                                    />
                                </div>

                                <FormInput
                                    label="所属 / 専門"
                                    placeholder="例：〇〇大学 3年 / 経営情報学"
                                    error={errors.affiliation?.message}
                                    {...register("affiliation")}
                                />

                                <div className="relative">
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">スキル・興味のあるタグ</label>

                                    {/* 選択されたタグの表示 */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {selectedTags.length > 0 ? (
                                            selectedTags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="tag-chip active px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                                                    onClick={() => handleRemoveTag(tag)}
                                                >
                                                    {tag}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-[11px] text-gray-400 font-bold py-1">タグを選択または入力してください</p>
                                        )}
                                    </div>

                                    {/* 検索・追加エリア */}
                                    <div className="flex gap-2 relative">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder="タグを検索または追加"
                                                className="w-full input-minimal text-xs"
                                                value={tagSearch}
                                                onChange={(e) => {
                                                    setTagSearch(e.target.value);
                                                    setShowSuggestions(true);
                                                }}
                                                onFocus={() => setShowSuggestions(true)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddTag(tagSearch);
                                                    }
                                                }}
                                            />

                                            {/* サジェストドロップダウン */}
                                            {showSuggestions && tagSearch.length > 0 && (
                                                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-[200] max-h-48 overflow-y-auto">
                                                    {filteredSuggestions.length > 0 ? (
                                                        filteredSuggestions.map(tag => (
                                                            <button
                                                                key={tag}
                                                                type="button"
                                                                className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                                                onClick={() => handleAddTag(tag)}
                                                            >
                                                                {tag}
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-4 py-2.5 text-xs font-bold text-gray-400">一致するタグが見つかりません</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm border-gray-200 rounded-lg text-xs font-bold h-[38px] px-3"
                                            onClick={() => handleAddTag(tagSearch)}
                                        >
                                            追加
                                        </button>
                                    </div>

                                    {/* おすすめタグ */}
                                    <div className="mt-4">
                                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">おすすめのタグ</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {RECOMMENDED_TAGS.slice(0, 8).map(tag => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    disabled={selectedTags.includes(tag)}
                                                    className={`px-2.5 py-1 rounded-md text-[10px] font-black border transition-all ${selectedTags.includes(tag)
                                                        ? "bg-gray-100 text-gray-300 border-gray-100"
                                                        : "bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
                                                        }`}
                                                    onClick={() => handleAddTag(tag)}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* クリック以外でサジェストを閉じるためのオーバーレイ */}
                                    {showSuggestions && (
                                        <div
                                            className="fixed inset-0 z-[190]"
                                            onClick={() => setShowSuggestions(false)}
                                        />
                                    )}
                                </div>

                                <AuthButton
                                    type="button"
                                    onClick={() => handleNextStep(2)}
                                    variant="primary"
                                >
                                    次へ進む
                                </AuthButton>
                            </div>
                        </div>
                    )}

                    {/* Step 2: スペース選択 */}
                    {currentStep === 2 && (
                        <div>
                            <h1 className="font-black text-neutral mb-2">スペースの準備</h1>
                            <p className="text-xs text-gray-500 mb-6 font-bold">活動の拠点となる場所を選びましょう</p>

                            <div className="space-y-3">
                                {/* 個人スペース */}
                                <div
                                    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${selectedSpaceMode === "personal"
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02]"
                                        }`}
                                    onClick={() => handleSelectSpaceMode("personal")}
                                >
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-neutral">個人スペースのみ作成</div>
                                        <div className="text-xs text-gray-500 font-bold mt-1">まずは自分だけでタスクや学習を管理したい場合に。</div>
                                    </div>
                                </div>

                                <div
                                    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${selectedSpaceMode === "shared"
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02]"
                                        }`}
                                    onClick={() => handleSelectSpaceMode("shared")}
                                >
                                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M12 21v-2a4 4 0 0 0-3-3.87" />
                                            <circle cx="12" cy="7" r="4" />
                                            <circle cx="6" cy="11" r="4" />
                                            <circle cx="18" cy="11" r="4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-neutral">共有スペースも作成</div>
                                        <div className="text-xs text-gray-500 font-bold mt-1">ゼミや研究室、プロジェクトメンバーを招待したい場合に。</div>
                                    </div>
                                </div>

                                {selectedSpaceMode === 'shared' && (
                                    <div className="pt-1 fade-in">
                                        <FormInput
                                            label="共有スペースの名前"
                                            placeholder="例：佐藤ゼミ / Web開発プロジェクト"
                                            error={errors.workspaceName?.message}
                                            {...register("workspaceName")}
                                        />
                                    </div>
                                )}

                                <div className="flex gap-2 mt-10">
                                    <AuthButton
                                        type="button"
                                        onClick={() => handleNextStep(1)}
                                        variant="outline"
                                        className="flex-1 normal-case"
                                    >
                                        戻る
                                    </AuthButton>
                                    <AuthButton
                                        type="button"
                                        onClick={() => handleNextStep(3)}
                                        variant="primary"
                                        className="flex-[1.5] normal-case"
                                    >
                                        内容を確認する
                                    </AuthButton>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: 最終確認 */}
                    {currentStep === 3 && (
                        <div>
                            <h1 className="font-black text-neutral mb-2">これでよろしいですか？</h1>
                            <p className="text-xs text-gray-500 mb-6 font-bold">入力内容に間違いがないかご確認ください</p>

                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src={watch("avatarUrl")} className="w-14 h-14 rounded-full bg-white ring-2 ring-white shadow-sm" alt="Avatar Preview" />
                                        <div>
                                            <div className="font-black text-neutral">{watch("displayName") || "未設定"}</div>
                                            <div className="text-xs text-secondary font-bold">@{watch("userId") || "id"}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-left border-t border-gray-200 pt-4">
                                        <div>
                                            <span className="text-xs font-black text-secondary uppercase tracking-widest block mb-1">所属</span>
                                            <div className="text-sm font-bold text-neutral">{watch("affiliation") || "未設定"}</div>
                                        </div>
                                        {selectedTags.length > 0 && (
                                            <div>
                                                <span className="text-xs font-black text-secondary uppercase tracking-widest block mb-1">スキル・タグ</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {selectedTags.map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px] font-black border border-gray-200">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <span className="text-xs font-black text-secondary uppercase tracking-widest block mb-1">開始するスペース</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[13.5px] badge badge-primary badge-outline font-black py-2.5 px-3">個人用</span>
                                                {selectedSpaceMode === 'shared' && (
                                                    <span className="text-[13.5px] badge badge-info badge-outline font-black py-2.5 px-3">共有: {watch("workspaceName") || "名称未定"}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-primary/5 rounded-xl text-center">
                                    <p className="text-xs font-bold text-primary leading-relaxed">
                                        「はじめる」ボタンを押すと、あなただけの<br />素晴らしいワークスペースが用意されます！
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <AuthButton
                                        type="button"
                                        onClick={() => handleNextStep(2)}
                                        variant="outline"
                                        className="flex-1 normal-case"
                                    >
                                        修正する
                                    </AuthButton>
                                    <AuthButton
                                        type="submit"
                                        variant="primary"
                                        className="flex-[1.5] normal-case"
                                        isLoading={isLoading}
                                        disabled={isLoading}
                                    >
                                        Unimoa をはじめる！
                                    </AuthButton>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </AuthCard>
        </>
    );
}

