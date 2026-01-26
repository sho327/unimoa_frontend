// Modules
import { SupabaseClient } from '@supabase/supabase-js';
// Types
import { T_ProfileRow, M_ProfileSkillTagRow } from '@/types/supabase/profile'

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

export const profileRepository = {
    /**
     * IDでプロフィールを取得
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/26
     */
    async getById(supabase: SupabaseClient, id: string): Promise<T_ProfileRow | null> {
        const { data: profileData, error } = await supabase
            .from('t_profile')
            .select('*')
            .eq('id', id)
            .is('deleted_at', null)
            .single()

        if (error) return null
        // `as unknown as ProfileWithSpaces` で型キャストを強制
        // (ランタイムのデータ構造は正しいため、パーサーエラーを回避するために使用)
        return profileData as unknown as T_ProfileRow
    },

    /**
     * ユーザーのスキルタグ一覧を取得（中間テーブル r_profile_skill_tag を経由）
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/26
     */
    async listSkillsByProfileId(supabase: SupabaseClient, profileId: string): Promise<M_ProfileSkillTagRow[]> {
        const { data, error } = await supabase
            .from('r_profile_skill_tag')
            .select(`
                ...m_profile_skill_tag!inner (
                    *
                )
            `)
            .eq('profile_id', profileId)
            .is('deleted_at', null)
            .is('m_profile_skill_tag.deleted_at', null)

        if (error) return []
        // データの整形（ネストを平坦化して spaces: M_ProfileSkillTagRow[] の形にする）
        const formattedData = data?.map((s: any) => s.m_profile_skill_tag) || []
        return formattedData as unknown as M_ProfileSkillTagRow[]
    },

    /**
     * プロフィールの基本情報を更新
     * @args
     * @createdBy KatoShogo
     * @createdAt 2026/01/26
     */
    async update(supabase: SupabaseClient, id: string, updates: Partial<T_ProfileRow>): Promise<T_ProfileRow | null> {
        const { data, error } = await supabase
            .from('t_profile')
            .update(updates)
            .eq('id', id)
            .is('deleted_at', null)
            .select()
            .single()

        if (error) return null
        return data
    }
}