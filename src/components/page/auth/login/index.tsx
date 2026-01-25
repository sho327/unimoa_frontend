"use client";
// Modules
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// UI/Components
import { FormInput } from "@/components/ui/formInput";
// Components
import AuthCard from "@/components/page/auth/authCard";
import { AuthButton } from "@/components/page/auth/authButton";
import { SocialLoginButtons } from "@/components/page/auth/socialLoginButtons";
// Store
import { useAppStore } from "@/store";
// Actions
import { loginAction } from "@/actions/authActions";
// Constants
import { pageRoutes } from "@/components/constants";
// Schema
import { loginSchema, LoginFormValues } from "@/lib/schema/auth";

/**
 * ログインページ
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export default function Login() {
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
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur", // 入力欄からフォーカスが外れた時にバリデーション実行
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
    // ログイン時の処理
    const onSubmit = async (inputData: LoginFormValues) => {
        setError(null);
        setGlobalLoading(true);
        // === Server Action ログイン ===
        const result = await loginAction(inputData)

        if (!result.success) {
            setError(result.errorMessage || 'ログインに失敗しました。')
            setGlobalLoading(false)
            return
        }

        // === ログイン完了後 ===
        // トランジション発火（ページ遷移）
        startTransition(() => {
            router.push(pageRoutes.MAIN.DASHBOARD)
        })

        // トランジションとは独立してローディング解除
        setGlobalLoading(false);
    };

    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return (
        <>
            <AuthCard>
                <h1 className="text-base font-black text-neutral mb-8 border-b border-gray-200 pb-4">
                    ログイン
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
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register("password")}
                        rightLabel={
                            <Link
                                href={pageRoutes.AUTH.PASSWORD_RESET_REQUEST}
                                className="text-[12px] font-bold text-primary hover:underline transition-all"
                            >
                                パスワードを忘れた場合
                            </Link>
                        }
                    />

                    {error && <p className="text-error text-center text-sm">{error}</p>}

                    <AuthButton
                        type="submit"
                        variant="primary"
                        disabled={isPending}
                        isLoading={isPending}
                    >
                        ログイン
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
                    アカウントをお持ちでないですか？
                    <Link href={pageRoutes.AUTH.SIGNUP} className="text-primary hover:underline ml-2">
                        新規登録
                    </Link>
                </p>
            </div>

            <div className="flex justify-center gap-6 mt-12 text-[12px] font-black text-secondary uppercase tracking-[0.2em] opacity-80">
                <a href="#" className="hover:text-primary transition-colors">
                    サポート
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                    プライバシー
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                    利用規約
                </a>
            </div>
        </>
    );
}