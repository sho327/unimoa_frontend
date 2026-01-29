import { Database } from './database.types'

/**
 * t_project テーブルの単一行のデータ型
 */
export type T_ProjectRow = Database['public']['Tables']['t_project']['Row']

/**
 * r_project_member テーブルの単一行のデータ型
 */
export type R_ProjectMemberRow = Database['public']['Tables']['r_project_member']['Row']

/**
 * m_space_project_tag テーブルの単一行のデータ型
 */
export type M_SpaceProjectTagRow = Database['public']['Tables']['m_space_project_tag']['Row']

/**
 * r_space_project_tag テーブルの単一行のデータ型
 */
export type R_SpaceProjectTagRow = Database['public']['Tables']['r_space_project_tag']['Row']

/**
 * t_project_requirement テーブルの単一行のデータ型
 */
export type T_ProjectRequirementRow = Database['public']['Tables']['t_project_requirement']['Row']

