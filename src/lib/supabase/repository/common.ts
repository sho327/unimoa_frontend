// Modules
import { cache } from 'react'
import { SupabaseClient } from '@supabase/supabase-js';
import { supabaseServer } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'
// Types
import { currentUser } from '@/types/repository/common'

// ==========================================
// 規約（Naming & Structure Conventions）
// ==========================================
// 1. ファイル名: エンティティ名（単数形）とする。
// 2. メソッド命名:
// • getById: 主キーによる単一取得。
// • listBy[Entity]Id: 関連IDによる配列取得。
// • create / update / delete: 基本的なCRUD。
// 3. 論理削除: deleted_at カラムが存在するテーブルでは、取得時に必ず .is('deleted_at', null) を含める。
// 4. 中間テーブル: 呼び出し側に中間テーブルを意識させない。メソッド名に r_ 等を入れず、ビジネス的な目的（listSkillsByProfileId 等）で命名する。
// 5. 戻り値: PostgrestResponse を直接返さず、データの生値（T[] または T | null）を返す。

export const commonRepository = {
    /**
     * 現在ログインしているユーザーセッション情報を取得
     * ※キャッシュする
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/26
     */
    getSessionUser: cache(async (): Promise<User | null> => {
        const supabase = await supabaseServer()
        const { data, error } = await supabase.auth.getUser()

        if (error || !data.user) return null
        return data.user
    }),

    /**
     * 現在のユーザー情報を取得(プロフィール、所属スペース、お知らせ件数)
     * ※共通レイアウトで使用される、セッション取得とセットになる関数なのでcommonで定義する
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/26
     */
    async getCurrentUserById(supabase: SupabaseClient, id: string): Promise<currentUser | null> {
        const { data: profileData, error } = await supabase
            .from('t_profile')
            .select(`
                *, 
                spaces: r_space!r_space_profile_id_fkey (
                    t_space!space_id (*)
                ),
                notifications: t_notification!t_notification_target_profile_id_fkey (*)
            `)
            .eq('id', id)
            .is('deleted_at', null)
            .is('r_space.deleted_at', null)         // 中間テーブルの削除チェック
            .is('r_space.t_space.deleted_at', null) // スペース本体の削除チェック
            .is('t_notification.deleted_at', null)  // お知らせの削除チェック
            .single()

        if (error) {
            console.error('Error fetching user data in server utils:', error.message)
            return null
        }
        // データの整形（ネストを平坦化して spaces: T_SpaceRow[] の形にする）
        const formattedData = {
            ...profileData,
            spaces: profileData.spaces?.map((s: any) => s.t_space) || [],
            notifications: profileData.notifications || []
        }
        return formattedData as unknown as currentUser

        // ==========================================
        // 例) 戻り値
        // ==========================================
        // {
        //     "id": "user-uuid",
        //     "display_name": "田中 太郎",
        //     "avatar_url": "https://...",
        //     "deleted_at": null,
        //     // spaces: r_space (...t_space (*)) の部分
        //     "spaces": [
        //         { "id": "space-1", "name": "個人スペース", "is_personal": true, ... },
        //         { "id": "space-2", "name": "チームA", "is_personal": false, ... }
        //     ],
        //     // 現状、クエリに含まれていないため undefined になる
        //     "notifications": [] 
        // }
    }
}