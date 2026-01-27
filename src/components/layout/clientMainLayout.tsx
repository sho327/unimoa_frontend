"use client";

import Sidebar from "@/components/layout/sidebar";
import { useMobile } from "@/hooks/useMobile";
import AppHeader from "./appHeader";
import SearchBar from "./searchBar";
import { useAppStore } from "@/store";
// import { ProfileWithSpaces } from '@/lib/supabase/userData'
import { T_SpaceRow } from "@/types/supabase/space";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
// Actions
// import { setSelectedSpaceCookie } from '@/actions/spaceActions'

/**
 * メインレイアウトコンポーネント(クライアントコンポーネント)
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export default function ClientMainLayout({
    children,
    // profileWithSpaces,
    // selectedSpaceId,
    // needsCookieUpdate
}: {
    children: React.ReactNode;
    // profileWithSpaces: ProfileWithSpaces | null
    // selectedSpaceId: string | null
    // needsCookieUpdate?: boolean // Cookie更新が必要かどうか
}) {
    // ============================================================================
    // 変数（Constant）
    // ============================================================================
    const isMobile = useMobile();
    const { activeSpace, isLoading, setIsLoading } = useAppStore();
    const router = useRouter()
    // 最初に表示すべきスペースオブジェクトを計算するヘルパー関数 (純粋関数)
    // const getInitialSpace = (
    //     id: string | null,
    //     // profileData: ProfileWithSpaces | null
    // ): T_SpaceRow | null => {
    //     // const spaces = profileData?.spaces || []
    //     // if (spaces.length === 0) return null

    //     // // 1. Props で渡された ID に対応するスペースオブジェクトを探す
    //     // const selectedSpace = spaces.find((m) => m.id === id)
    //     // if (selectedSpace) return selectedSpace

    //     // // 2. IDが無効または未設定の場合、個人スペースを探す
    //     // return spaces.find((m) => m.is_personal) || null
    // }

    // ============================================================================
    // ローカル状態（State）
    // ============================================================================
    // const [currentSpace, setCurrentSpace] = useState<T_SpaceRow | null>(() => {
    //     return getInitialSpace(selectedSpaceId, profileWithSpaces)
    // })

    // ============================================================================
    // Effect(Watch)処理（Effect(Watch)）
    // ============================================================================
    // useEffect(() => {
    //     // 1. 選択中スペースの表示設定
    //     // 既に setCurrentSpace が実行済みの場合、Props が変わったときだけ更新
    //     const newSpace = getInitialSpace(selectedSpaceId, profileWithSpaces)
    //     if (newSpace?.id !== currentSpace?.id) {
    //         setCurrentSpace(newSpace)
    //     }

    //     // 2. Cookie更新が必要な場合、クライアント側からServer Actionを呼び出してCookieを更新
    //     if (needsCookieUpdate) {
    //         if (selectedSpaceId) {
    //             setSelectedSpaceCookie(selectedSpaceId)
    //         } else {
    //             setSelectedSpaceCookie('')
    //         }
    //         // Cookie更新後、Server Componentを再レンダリングして新しいCookieの値を読み込む
    //         router.refresh()
    //     }

    //     // 4. ローディング終了処理
    //     if (isLoading) {
    //         // Propsが更新された = サーバーからの応答が完了した
    //         setIsLoading(false)
    //         console.log('Loading reset complete via ClientMainLayout.')
    //     }
    // }, [profileWithSpaces, selectedSpaceId, needsCookieUpdate, currentSpace?.id, router])

    // ============================================================================
    // Define(Computed)処理(状態等による変数定義)
    // ============================================================================
    // currentSpace が null でない、かつ ID がある場合に true
    // const isSpaceSelected = !!currentSpace?.id

    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return (
        <div className="h-screen flex flex-col relative">
            <AppHeader />

            {/* コンテンツエリア (Sidebar と Children) */}
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />

                <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
                    {/* メインエリアの上部バー (各ページ共通) */}
                    <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px] shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col min-w-0 min-h-[40px] justify-center px-1">
                                <span className="text-[12px] font-black uppercase tracking-widest leading-none mb-1">
                                    スペース
                                </span>
                                <h2 className="text-[15px] font-black truncate text-neutral max-w-[150px] sm:max-w-xs">
                                    {activeSpace.name}
                                </h2>
                            </div>
                        </div>

                        {/* 検索バー */}
                        <SearchBar />
                    </div>

                    {/* children は Dashboard や Members 等のコンテンツ */}
                    {children}
                </div>
            </div>
        </div>
    );
}
