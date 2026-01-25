'use server'
// Supabase
import { supabaseServer } from '@/lib/supabase/server'
import { getPersonalSpaceByUserId } from '@/lib/supabase/spaceData'
// ServerUtils
import { setAppCookie, deleteAppCookie } from '@/lib/server-utils/cookie'
// Schema
import { loginSchema } from "@/lib/schema/auth";
// Constants
import { selectedSpaceIdCookieKey } from "@/components/constants";

/**
 * ログイン処理 (Server Action)
 * @args 
 *   - formData: ログインフォームデータ
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function loginAction(formData: FormData) {
    // ----------------------------------------------------
    // 1. 入力値バリデーション(Zod)
    // ----------------------------------------------------
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    // バリデーション失敗（フロントを突き抜けてきた場合）
    if (!result.success) {
        return { error: "メールアドレスまたはパスワードが正しくありません。" };
    }
    const { email, password } = result.data;
    // ----------------------------------------------------
    // 2. Supabaseクライアントの初期化
    // ----------------------------------------------------
    const supabase = await supabaseServer()
    // ----------------------------------------------------
    // 3. ログイン処理
    // ----------------------------------------------------
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    // ログイン失敗
    if (error) {
        return { error: 'メールアドレスまたはパスワードが正しくありません。' }
    }
    // ユーザー情報の取得失敗
    if (!data.user) {
        return { error: 'ユーザー情報の取得に失敗しました。' }
    }
    // ----------------------------------------------------
    // 4. ユーザIDを基に個人スペースIDの取得
    // ----------------------------------------------------
    const { data: spacesData, error: fetchError } = await getPersonalSpaceByUserId(supabase, data.user.id)
    // 個人スペースの取得失敗
    if (fetchError) {
        // 整合性のためサインアウト
        await supabase.auth.signOut()
        // Cookieの削除
        deleteAppCookie(selectedSpaceIdCookieKey)
        return { error: 'ログイン後の初期設定に失敗しました。' }
    }
    // 個人スペースの取得失敗（個人スペースが存在しない）
    if (!spacesData || spacesData.length === 0) {
        // 整合性のためサインアウト
        await supabase.auth.signOut()
        // Cookieの削除
        deleteAppCookie(selectedSpaceIdCookieKey)
        return { error: '個人スペースが見つかりませんでした。' }
    }
    // ----------------------------------------------------
    // 5. 個人スペースIDをCookieに設定
    // ----------------------------------------------------
    const personalSpaceId = spacesData[0].id
    // Cookieの設定
    setAppCookie(selectedSpaceIdCookieKey, personalSpaceId)
    // ----------------------------------------------------
    // 6. ログイン成功
    // ----------------------------------------------------
    return { success: true }
}
