// Modules
import { SupabaseClient } from '@supabase/supabase-js';
// Types
import { T_ProjectRow } from '@/types/supabase/project'
import { T_ProjectWithDetail } from '@/types/repository/project'

// ==========================================
// 規約（Naming & Structure Conventions）
// ==========================================
// 1. ファイル名: エンティティ名（単数形）とする。
// 2. メソッド命名:
// • getById: 主キーによる単一取得。
// • listBy[Entity]Id: 関連IDによる配列取得。
// • create / update / delete: 基本的なCRUD。
// 3. 論理削除: deleted_at カラムが存在するテーブルでは、取得時に必ず .is('deleted_at', null) を含める。
// 4. 中間テーブル: 呼び出し側に中間テーブルを意識させない。メソッド名に r_ 等を入れず、ビジネス的な目的（listJoinedProjects 等）で命名する。
// 5. 戻り値: PostgrestResponse を直接返さず、データの生値（T[] または T | null）を返す。

export const projectRepository = {
    /**
     * IDでプロジェクトを取得（論理削除済みは除外）
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/29
     */
    async getById(supabase: SupabaseClient, id: string): Promise<T_ProjectRow | null> {
        const { data, error } = await supabase
            .from('t_project')
            .select('*')
            .eq('id', id)
            .is('deleted_at', null)
            .single()

        if (error) return null
        return data as T_ProjectRow
    },

    /**
     * スペースIDに紐づくプロジェクト一覧を取得
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/29
     */
    async listBySpaceId(supabase: SupabaseClient, spaceId: string): Promise<T_ProjectRow[]> {
        const { data, error } = await supabase
            .from('t_project')
            .select('*')
            .eq('space_id', spaceId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })

        if (error) return []
        return data as T_ProjectRow[]
    },

    /**
     * ユーザーが参加しているプロジェクト一覧を取得（中間テーブル r_project_member を経由）
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/29
     */
    async listJoinedByProfileId(supabase: SupabaseClient, profileId: string): Promise<T_ProjectWithDetail[]> {
        // r_project_member から t_profile への外部キーが複数あるため !profile_id を明示
        // t_project への結合も名示的に !project_id を指定
        const { data, error } = await supabase
            .from('r_project_member')
            .select(`
                ...t_project!project_id (
                    *,
                    category_name: m_space_project_category!category_id (name)
                )
            `)
            .eq('profile_id', profileId)
            .is('deleted_at', null)
            .is('t_project.deleted_at', null)

        if (error) {
            console.error('Error in listJoinedByProfileId:', error.message)
            return []
        }

        return data as unknown as T_ProjectWithDetail[]
    },

    /**
     * プロジェクトを論理削除
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/29
     */
    async softDelete(supabase: SupabaseClient, id: string): Promise<boolean> {
        const { error } = await supabase
            .from('t_project')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id)
            .is('deleted_at', null)

        return !error
    }
}
