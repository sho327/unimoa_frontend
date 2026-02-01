// Types
import { T_ProfileRow } from "@/types/supabase/profile";
import { T_ProjectRow, M_SpaceProjectTagRow } from "@/types/supabase/project";

/**
 * カテゴリ名を含んだプロジェクトの型
 */
export type T_ProjectWithDetail = T_ProjectRow & {
    category_name: string | null,
    members: {
        role: string,
        profile: T_ProfileRow,
    }[] | null,
    tags: M_SpaceProjectTagRow[] | null,
}