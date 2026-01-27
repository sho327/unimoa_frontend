"use client";
// Modules
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Actions
import { signupAction } from "@/actions/auth/signup";
// Components
import { FormInput } from "@/components/ui/formInput";
import AuthCard from "@/components/page/auth/authCard";
import { SocialLoginButtons } from "@/components/page/auth/socialLoginButtons";
import { AuthButton } from "@/components/page/auth/authButton";
// Store
import { useAppStore } from "@/store";
// Constants
import { pageRoutes } from "@/components/constants";
// Schema
import { signupSchema, SignupFormValues } from "@/lib/schema/auth";

/**
 * 新規登録ページ
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export default function Signup() {
    // ============================================================================
    // 変数（Constant）
    // ============================================================================
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    // React Hook Form の設定
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
    });

    // ============================================================================
    // ローカル状態（LocalState）
    // ============================================================================
    const [error, setError] = useState<string | null>(null)

    // ============================================================================
    // グローバル状態（GlobalState）
    // ============================================================================
    const { setIsLoading: setGlobalLoading } = useAppStore();

    // ============================================================================
    // アクション処理（Action）
    // ============================================================================
    // 新規登録処理
    const onSubmit = async (inputData: SignupFormValues) => {
        setError(null);
        setGlobalLoading(true);

        // === Server Action 新規登録 ===
        const result = await signupAction(inputData)

        if (!result.success) {
            setError(result.error || 'ユーザー登録中にエラーが発生しました。')
            setGlobalLoading(false)
            return
        }

        // 登録成功後の処理
        if (!result.requireEmailConfirmation) {
            // メール認証が無効（即ログイン）の場合
            // トランジション発火（ページ遷移）
            startTransition(() => {
                router.push(pageRoutes.MAIN.DASHBOARD)
            })
            setGlobalLoading(false)
        } else {
            // メール認証が必要な場合（デフォルト設定）
            // 完了画面にリダイレクト
            startTransition(() => {
                // メール認証完了画面へのパスを指定
                router.push(pageRoutes.AUTH.USER_ACTIVATE_REQUEST)
            })
            // ローディングはトランジションとは独立して解除
            setGlobalLoading(false)
        }
    };

    return (
        <>
            <AuthCard>
                <h1 className="text-base font-black text-neutral mb-8 border-b border-gray-200 pb-4">
                    新規登録
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* メールアドレス入力 */}
                    <FormInput
                        label="メールアドレス"
                        placeholder="tanaka@example.com"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    {/* パスワード入力 */}
                    <FormInput
                        label="パスワード"
                        type="password"
                        placeholder="8文字以上の英数字"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    {/* パスワード確認入力 */}
                    <FormInput
                        label="パスワード（確認）"
                        type="password"
                        placeholder="もう一度入力してください"
                        error={errors.passwordConfirm?.message}
                        {...register("passwordConfirm")}
                    />

                    <AuthButton
                        type="submit"
                        variant="primary"
                        disabled={isPending}
                        isLoading={isPending}
                    >
                        新規登録
                    </AuthButton>
                </form>

                {/* 区切り線 */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[12px] font-black text-secondary uppercase tracking-widest">
                        <span className="bg-white px-4">または</span>
                    </div>
                </div>

                {/* ソーシャルボタン */}
                <SocialLoginButtons />
            </AuthCard>

            {/* 下部リンク */}
            <div className="mt-8 text-center">
                <p className="text-[12px] font-bold text-gray-500">
                    既にアカウントをお持ちですか？
                    <Link href="/login" className="text-primary hover:underline ml-2">
                        ログイン
                    </Link>
                </p>
            </div>

            <p className="mt-8 text-[12px] text-center text-gray-500 leading-relaxed px-6">
                登録することで、Unimoaの<a href="#" className="underline">利用規約</a>および<a href="#"
                    className="underline">プライバシーポリシー</a>に同意したものとみなされます。
            </p>
        </>
    );
}
