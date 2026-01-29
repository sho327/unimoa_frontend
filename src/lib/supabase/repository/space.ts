// Modules
import { SupabaseClient } from '@supabase/supabase-js';
// Types
import { T_SpaceRow, R_SpaceRow } from '@/types/supabase/space'

// ==========================================
// 規約（Naming & Structure Conventions）
// ==========================================
// 1. ファイル名: エンティティ名（単数形）とする。
// 2. メソッド命名:
// • getById: 主キーによる単一取得。
// • listBy[Entity]Id: 関連IDによる配列取得。
// • create / update / delete: 基本的なCRUD。
// 3. 論理削除: deleted_at カラムが存在するテーブルでは、取得時に必ず .is('deleted_at', null) を含める。
// 4. 中間テーブル: 呼び出し側に中間テーブルを意識させない。メソッド名に r_ 等を入れず、ビジネス的な目的（listJoinedSpaces 等）で命名する。
// 5. 戻り値: PostgrestResponse を直接返さず、データの生値（T[] または T | null）を返す。

export const spaceRepository = {
    /**
     * IDでスペースを取得（論理削除済みは除外）
     */
    async getById(supabase: SupabaseClient, id: string): Promise<T_SpaceRow | null> {
        const { data, error } = await supabase
            .from('t_space')
            .select('*')
            .eq('id', id)
            .is('deleted_at', null)
            .single()

        if (error) return null
        return data
    },

    /**
     * ユーザーが「オーナー」である個人スペースを取得
     */
    async getPersonalSpaceByOwnerId(supabase: SupabaseClient, ownerId: string): Promise<T_SpaceRow | null> {
        const { data, error } = await supabase
            .from('r_space')
            .select(`
                ...t_space!space_id (
                    *
                )
            `)
            .eq('profile_id', ownerId)
            .eq('role', 'owner')
            .is('deleted_at', null)
            .eq('t_space.is_personal', true)
            .is('t_space.deleted_at', null)
            .single()

        if (error) return null
        return data
    },

    /**
     * ユーザーが所属している全スペースを取得（中間テーブル r_space を経由）
     */
    async listJoinedByProfileId(supabase: SupabaseClient, profileId: string): Promise<T_SpaceRow[]> {
        const { data, error } = await supabase
            .from('r_space')
            .select(`
                ...t_space!space_id (
                    *
                )
            `)
            .eq('profile_id', profileId)
            .is('deleted_at', null)
            .is('t_space.deleted_at', null)

        if (error) return []
        return data as unknown as T_SpaceRow[]
    },

    /**
     * スペースを論理削除
     */
    async softDelete(supabase: SupabaseClient, id: string): Promise<boolean> {
        const { error } = await supabase
            .from('t_space')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id)
            .is('deleted_at', null)
        return !error
    }
}