// Types
import { T_ProjectRow } from "@/types/supabase/project";

/**
 * カテゴリ名を含んだプロジェクトの型
 */
export type T_ProjectWithDetail = T_ProjectRow & {
    category_name: { name: string } | null
}