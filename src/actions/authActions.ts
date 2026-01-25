'use server'
// Modules
import { redirect } from 'next/navigation'
// Supabase
import { supabaseServer } from '@/lib/supabase/server'
// Actions
import { setSelectedSpaceCookie } from '@/actions/spaceActions'

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
    const { data: userData, error: fetchError } = await supabase
        .from('t_profile')
        .select(
            `
				*,
                spaces: r_space (
                    ...t_space (*)
                )
			`
        )
        .eq('id', userId)
        .single()

    if (fetchError) {
        console.error('Failed to fetch user data for personal teamId:', fetchError.message)
        // DBアクセスが失敗したため、より具体的なエラーをログに出力
        console.error('Supabase error detail:', fetchError)
        throw new Error('Failed to find default team.')
    }

    // 2. 個人スペースIDを特定
    let personalSpaceId: string | null = null
    if (userData && userData.spaces.length > 0) {
        const personalSpace = userData.spaces.find((m: any) => m.is_personal)
        if (personalSpace) {
            personalSpaceId = personalSpace.id
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