'use server'
// Modules
import { redirect } from 'next/navigation'
// Supabase
import { supabaseServer } from '@/lib/supabase/server'
// ServerUtils
import { deleteAppCookie } from '@/lib/server-utils/cookie'
// Constants
import { selectedSpaceIdCookieKey, pageRoutes } from "@/components/constants";

/**
 * ログアウト処理 (Server Action)
 * @args 
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function logout() {
    // ----------------------------------------------------
    // 1. Supabaseクライアントの初期化
    // ----------------------------------------------------
    const supabase = await supabaseServer()
    // ----------------------------------------------------
    // 2. Supabaseのセッションを破棄
    // ----------------------------------------------------
    const { error } = await supabase.auth.signOut()
    // ログアウト失敗
    if (error) {
        console.error('Supabase sign out failed:', error)
        // 失敗しても、Cookieクリアとリダイレクトは続行し、セキュリティを優先
    }
    // ----------------------------------------------------
    // 3. 選択スペースIDのCookieを破棄
    // ----------------------------------------------------
    await deleteAppCookie(selectedSpaceIdCookieKey)
    // ----------------------------------------------------
    // 4. ログインページへリダイレクト
    // ----------------------------------------------------
    redirect(pageRoutes.AUTH.LOGIN)
}