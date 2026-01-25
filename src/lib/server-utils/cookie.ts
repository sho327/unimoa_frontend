'use server'
// Modules
import { cookies } from 'next/headers'
/**
 * 汎用的なクッキー設定関数
 * @param key クッキーの名前
 * @param value 保存する値
 * @param maxAge 有効期限（秒）。デフォルトは30日
 */
export async function setAppCookie(key: string, value: string, maxAge = 60 * 60 * 24 * 30) {
    const cookieStore = await cookies()

    cookieStore.set(key, value, {
        path: '/',
        maxAge: maxAge,
        httpOnly: true, // JSから触らせない（セキュリティ）
        secure: process.env.NODE_ENV === 'production', // 本番環境ではHTTPSのみ
        sameSite: 'lax',
        priority: 'high',
    })
}

/**
 * クッキー削除関数
 */
export async function deleteAppCookie(key: string) {
    const cookieStore = await cookies()
    cookieStore.delete(key)
}