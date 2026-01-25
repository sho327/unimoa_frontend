'use server'
// Supabase
import { supabaseServer } from '@/lib/supabase/server'
import { getPersonalSpaceByUserId } from '@/lib/supabase/spaceData'
// ServerUtils
import { setAppCookie, deleteAppCookie } from '@/lib/server-utils/cookie'
// Schema
import { signupSchema } from "@/lib/schema/auth";
// Constants
import { selectedSpaceIdCookieKey } from "@/components/constants";

/**
 * 新規登録処理 (Server Action)
 * @args 
 *   - formData: 新規登録フォームデータ
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function signupAction(formData: FormData) {
    // ----------------------------------------------------
    // 1. 入力値バリデーション(Zod)
    // ----------------------------------------------------
    const result = signupSchema.safeParse(Object.fromEntries(formData));
    // バリデーション失敗（フロントを突き抜けてきた場合）
    if (!result.success) {
        return { error: "入力内容が正しくありません。" };
    }
    const { email, password } = result.data;
    // ----------------------------------------------------
    // 2. Supabaseクライアントの初期化
    // ----------------------------------------------------
    const supabase = await supabaseServer()
    // ----------------------------------------------------
    // 3. 新規登録処理(ユーザ新規登録/アクティベーション用メール送信)
    // ----------------------------------------------------
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    // 新規登録失敗
    if (error) {
        if (error.message.includes('already registered')) {
            return { error: 'このメールアドレスは既に登録されています。' }
        }
        return { error: 'ユーザー登録中にエラーが発生しました。' }
    }
    // ----------------------------------------------------
    // 4. 結果の返却
    // ----------------------------------------------------
    // メール認証がONの場合、data.session は null になる
    if (data.user && !data.session) {
        return { success: true, requireEmailConfirmation: true }
    }
    // メール認証がOFFの場合、ログイン済みとして扱う
    if (data.user && data.session) {
        // ----------------------------------------------------
        // 4-1. ユーザIDを基に個人スペースIDの取得
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
        // 4-2. 個人スペースIDをCookieに設定
        // ----------------------------------------------------
        const personalSpaceId = spacesData[0].id
        // Cookieの設定
        setAppCookie(selectedSpaceIdCookieKey, personalSpaceId)
        // ----------------------------------------------------
        // 5. ログイン成功
        // ----------------------------------------------------
        return { success: true, requireEmailConfirmation: false }
    }
    return { error: '予期せぬエラーが発生しました。' }
}
