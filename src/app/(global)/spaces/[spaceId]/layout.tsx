'use server'
// Modules
import { redirect } from 'next/navigation'
// Layout/Components
import ClientMainLayout from "@/components/layout/clientMainLayout";
// Libs/ServerUtils
import { supabaseServerAdmin } from '@/lib/supabase/serverAdmin'
// Repository
import { commonRepository } from '@/lib/supabase/repository/common'
// Constants
import { pageRoutes } from '@/components/constants'

/**
 * メインレイアウト
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export default async function MainLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ spaceId: string }>
}>) {
    // ----------------------------------------------------
    // 1. URLパラメータの取得
    // ----------------------------------------------------
    const { spaceId: activeSpaceId } = await params
    // ----------------------------------------------------
    // 2. セッションより認証済ユーザ情報の取得
    // ----------------------------------------------------
    const sessionUser = await commonRepository.getSessionUser();
    // セッション取得失敗
    if (!sessionUser) {
        // ログイン画面へ遷移
        console.log('セッションが見つかりませんでした。')
        redirect(pageRoutes.AUTH.LOGIN)
    }
    // ----------------------------------------------------
    // 3. 現在のユーザ情報の取得(選択中スペース情報の取得)
    // ----------------------------------------------------
    const adminClient = await supabaseServerAdmin()
    const currentUser = await commonRepository.getCurrentUserById(adminClient, sessionUser.id)
    const activeSpace = currentUser?.spaces.find((space) => space.id === activeSpaceId)
    if (!activeSpace) {
        // ログイン画面へ遷移
        console.log('スペースが見つかりませんでした。')
        redirect(pageRoutes.AUTH.LOGIN)
    }
    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return (
        <ClientMainLayout
            currentUser={currentUser}
            activeSpace={activeSpace}
            activeProject={null}
        >
            {children}
        </ClientMainLayout>
    )
}
