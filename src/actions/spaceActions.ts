'use server'
// Modules
import { cookies } from 'next/headers'
// Constants
import { selectedSpaceIdCookie } from '@/components/constants'

/**
 * ユーザーが選択したスペースIDをCookieに保存するサーバーアクション
 * @param spaceId 選択されたスペースID
 */
export async function setSelectedSpaceCookie(spaceId: string) {
    // cookies() の戻り値を 'any' にキャストして型エラーを回避
    const cookieStore: any = await cookies()

    if (!spaceId) {
        // IDが空の場合はCookieを削除（maxAge: 0で期限切れにして削除）
        cookieStore.set(selectedSpaceIdCookie, '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0,
            path: '/',
        })
        return
    }

    // CookieにスペースIDを保存
    cookieStore.set(selectedSpaceIdCookie, spaceId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
    })
}