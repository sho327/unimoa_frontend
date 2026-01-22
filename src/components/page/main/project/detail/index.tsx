"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { pageRoutes } from "@/components/constants";
import { Button } from "@/components/ui/button";

type ProjectDetailProps = {
    project: {
        id: string;
        title: string;
        category: string;
        description: string;
        leader: {
            id: string;
            name: string;
            university?: string;
            avatar?: string;
        };
        requirements: string[];
        tags: string[];
    };
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="w-full">
                {/* 戻るナビゲーション */}
                {/* <Link
                    href={pageRoutes.MAIN.PROJECTS}
                    className="btn btn-ghost btn-sm gap-2 px-0 mb-6 hover:bg-transparent text-gray-400 hover:text-primary transition-colors inline-flex items-center"
                >
                    <ChevronLeft className="w-5 h-5" strokeWidth={3} />
                    <span className="font-black text-sm tracking-widest">一覧に戻る</span>
                </Link> */}

                {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"> */}
                <>
                    {/* メインコンテンツ */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
                                    {project.category}
                                </span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                                {project.title}
                            </h2>

                            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                    <img
                                        src={project.leader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.leader.id}`}
                                        alt={project.leader.name}
                                    />
                                </div>
                                <div>
                                    <p className="text-[11px] text-gray-400 font-black uppercase tracking-wider leading-none mb-1">
                                        プロジェクトリーダー
                                    </p>
                                    <p className="text-sm font-bold text-gray-800">
                                        {project.leader.name}
                                        {project.leader.university && ` (${project.leader.university})`}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <section>
                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        プロジェクトについて
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {project.description}
                                    </p>
                                </section>

                                {project.requirements && project.requirements.length > 0 && (
                                    <section>
                                        <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                            募集要項・条件
                                        </h4>
                                        <ul className="space-y-3">
                                            {project.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                                    <Check className="w-5 h-5 text-[oklch(0.73_0.11_162)] shrink-0 mt-0.5" strokeWidth={3} />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {project.tags && project.tags.length > 0 && (
                                    <section>
                                        <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                            使用ツール・タグ
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="bg-gray-50 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-100"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                            <div className="mt-6 text-center gap-3">
                                <Link
                                    href={pageRoutes.MAIN.NOTIFICATIONS}
                                    className="flex-1 sm:flex-none"
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full sm:w-auto h-12"
                                    >
                                        <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                                        一覧に戻る
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* サイドバー（将来の応募機能用のプレースホルダー） */}
                    {/* <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                            <div className="text-center py-10 space-y-4">
                                <div className="w-16 h-16 bg-[oklch(0.73_0.11_162)]/10 text-[oklch(0.73_0.11_162)] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-black text-gray-900">プロジェクト詳細</h3>
                                <p className="text-sm text-gray-500 leading-relaxed px-4">
                                    このプロジェクトの詳細情報を確認できます。
                                </p>
                            </div>
                        </div>
                    </div> */}
                </>
            </div>
        </main>
    );
}
