"use client";

import React, { useState } from "react";
import AuthCard from "@/components/page/auth/authCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator, AuthFooter } from "@/components/ui/auth-parts";

export default function Login() {
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
                    ログイン
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <Label>
                            メールアドレス
                        </Label>
                        <Input
                            type="email"
                            placeholder="tanaka@example.com"
                            className="w-full input-minimal text-gray-700 placeholder:text-gray-300"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 px-1">
                            <Label>
                                パスワード
                            </Label>
                            <a
                                href="/password_reset_request"
                                className="text-[12px] font-bold text-primary hover:underline transition-all tracking-tight"
                            >
                                パスワードを忘れた場合
                            </a>
                        </div>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="w-full input-minimal text-gray-700 placeholder:text-gray-300"
                            required
                        />
                    </div>

                    <Button
                        className={`btn btn-primary w-full rounded-xl font-black text-white shadow-md shadow-primary/10 normal-case mt-2 text-[13px] border-none ${isLoading ? "loading" : ""
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "" : "ログイン"}
                    </Button>
                </form>

                {/* 区切り線 */}
                <Separator>
                    または
                </Separator>

                {/* ソーシャルボタン */}
                <div className="grid grid-cols-2 gap-3">
                    {/* <Button
                        variant="outline"
                        size="md"
                        className="normal-case"
                    className="btn btn-outline border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 rounded-xl normal-case h-11 min-h-[44px] font-bold text-gray-600 transition-all border-[1.5px]"
                    >
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
                    </Button> */}
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
            </AuthCard>

            {/* 下部リンク */}
            <div className="mt-8 text-center">
                <p className="text-[12px] font-bold text-gray-500">
                    アカウントをお持ちでないですか？
                    <a href="/signup" className="text-primary hover:underline ml-2">
                        新規登録
                    </a>
                </p>
            </div>

            <AuthFooter />
        </>
    );
}

