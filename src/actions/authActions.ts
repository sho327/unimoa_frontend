'use server'
// Modules
import { redirect } from 'next/navigation'
// Supabase
import { supabaseServer } from '@/lib/supabase/server'
// Actions
import { setSelectedSpaceCookie } from '@/actions/spaceActions'
// Schema
import { LoginFormValues, SignupFormValues } from "@/lib/schema/auth";

/**
 * ログイン処理 (Server Action)
 * @param formData ログインフォームデータ
 */
export async function loginAction(formData: LoginFormValues) {
    const supabase = await supabaseServer()

    // 1. メールアドレスとパスワードでサインイン
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    })

    if (error) {
        return { success: false, errorMessage: 'メールアドレスまたはパスワードが正しくありません。' }
    }

    if (!data.user) {
        return { success: false, errorMessage: 'ユーザー情報の取得に失敗しました。' }
    }

    // 2. 個人スペースIDを取得してCookieに設定
    try {
        await getAndSetDefaultSpaceId(data.user.id)
    } catch (e) {
        // スペース設定に失敗しても、ログイン自体は成功扱いにするか、エラーにするか
        // ここではエラーとして返す
        await supabase.auth.signOut() // 整合性のためサインアウト
        return { success: false, errorMessage: 'ログイン後の初期設定に失敗しました。' }
    }

    return { success: true }
}

/**
 * 新規登録処理 (Server Action)
 * @param formData 新規登録フォームデータ
 */
export async function signupAction(formData: SignupFormValues) {
    const supabase = await supabaseServer()

    // 1. 新規登録実行
    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    })

    if (error) {
        if (error.message.includes('already registered')) {
            return { success: false, errorMessage: 'このメールアドレスは既に登録されています。' }
        }
        return { success: false, errorMessage: 'ユーザー登録中にエラーが発生しました。' }
    }

    // 2. 結果の返却
    // メール認証が必要な場合、data.session は null になる
    if (data.user && !data.session) {
        return { success: true, requireEmailConfirmation: true }
    }

    // メール認証不要設定の場合、そのままログイン状態になる可能性があるが
    // 通常は自動ログインしないフローが多い。必要であればここで getAndSetDefaultSpaceId を呼ぶ。
    // 今回はログイン済みとして扱う
    if (data.session) {
        return { success: true, requireEmailConfirmation: false }
    }

    return { success: false, errorMessage: '予期せぬエラーが発生しました。' }
}

/**
 * ログインユーザーの個人スペースIDを取得し、Cookieに設定する
 * @param userId ログインユーザーのID
 */
export async function getAndSetDefaultSpaceId(userId: string) {
    if (!userId) {
        throw new Error('User ID is required.')
    }
    const supabase = await supabaseServer()
    // 1. サーバー側で安全に個人スペースIDを取得
    // 1. サーバー側で安全に個人スペースIDを取得
    // t_profile 経由ではなく、r_space (メンバーシップ) テーブルを直接参照して
    // profile_id でフィルタリングし、結合された t_space の情報を取得する形に変更
    const { data: spacesData, error: fetchError } = await supabase
        .from('r_space')
        .select(`
            space_id,
            t_space!inner (
                id,
                is_personal
            )
        `)
        .eq('profile_id', userId)

    if (fetchError) {
        console.error('Failed to fetch user spaces:', fetchError.message)
        console.error('Supabase error detail:', fetchError)
        throw new Error('Failed to find default team.')
    }

    // 2. 個人スペースIDを特定
    let personalSpaceId: string | null = null
    if (spacesData && spacesData.length > 0) {
        // t_space!inner により t_space は必ず存在するはずだが、配列フィルタリングで探す
        const personalSpaceRow = spacesData.find((r: any) => r.t_space?.is_personal)
        if (personalSpaceRow && personalSpaceRow.t_space) {
            personalSpaceId = personalSpaceRow.t_space.id
        }
    }

    if (personalSpaceId) {
        // 3. 取得したIDをCookieに設定(処理を分割: Cookie設定は teamActions に任せる)
        await setSelectedSpaceCookie(personalSpaceId)
    } else {
        // 個人スペースが見つからない場合は、Cookieをクリア
        await setSelectedSpaceCookie('')
        throw new Error('No personal space found for the user.')
    }
}

/**
 * ユーザーのログアウト処理
 * 1. Supabaseセッションを破棄
 * 2. 選択スペースIDのCookieを破棄
 * 3. ログインページへリダイレクト
 */
export async function logout() {
    const supabase = await supabaseServer()

    // 1. Supabaseのセッションを破棄
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Supabase sign out failed:', error)
        // 失敗しても、Cookieクリアとリダイレクトは続行し、セキュリティを優先
    }

    // 2. 選択スペースIDのCookieを破棄 (spaceActionsを再利用)
    // スペースIDを空文字列で渡すことで、Cookieを削除させる
    await setSelectedSpaceCookie('')

    // 3. ログインページへリダイレクト (Server Action の機能)
    redirect('/login')
}