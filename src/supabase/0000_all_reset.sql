-- =========================================
-- 1. トリガーの削除
-- =========================================
-- システムロジック系
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS trg_prevent_personal_space_deletion ON public.t_space;

-- 自動更新系 (updated_at)
-- ※テーブルに紐づくトリガーはテーブル削除時のCASCADEで自動削除してくれるのでコメントアウト※
-- DROP TRIGGER IF EXISTS trg_t_profile_updated_at ON public.t_profile;
-- DROP TRIGGER IF EXISTS trg_m_profile_skill_tag_updated_at ON public.m_profile_skill_tag;
-- DROP TRIGGER IF EXISTS trg_r_profile_skill_tag_updated_at ON public.r_profile_skill_tag;
-- DROP TRIGGER IF EXISTS trg_t_space_updated_at ON public.t_space;
-- DROP TRIGGER IF EXISTS trg_r_space_updated_at ON public.r_space;
-- DROP TRIGGER IF EXISTS trg_m_project_category_updated_at ON public.m_project_category;
-- DROP TRIGGER IF EXISTS trg_t_project_updated_at ON public.t_project;
-- DROP TRIGGER IF EXISTS trg_r_project_member_updated_at ON public.r_project_member;
-- DROP TRIGGER IF EXISTS trg_t_project_requirement_updated_at ON public.t_project_requirement;
-- DROP TRIGGER IF EXISTS trg_r_project_requirement_updated_at ON public.r_project_requirement;
-- DROP TRIGGER IF EXISTS trg_m_project_tool_updated_at ON public.m_project_tool;
-- DROP TRIGGER IF EXISTS trg_r_project_tool_updated_at ON public.r_project_tool;
-- DROP TRIGGER IF EXISTS trg_m_project_task_category_updated_at ON public.m_project_task_category;
-- DROP TRIGGER IF EXISTS trg_r_project_task_category_updated_at ON public.r_project_task_category;
-- DROP TRIGGER IF EXISTS trg_m_project_task_status_updated_at ON public.m_project_task_status;
-- DROP TRIGGER IF EXISTS trg_r_project_task_status_updated_at ON public.r_project_task_status;
-- DROP TRIGGER IF EXISTS trg_t_task_updated_at ON public.t_task;
-- DROP TRIGGER IF EXISTS trg_r_task_assignee_updated_at ON public.r_task_assignee;
-- DROP TRIGGER IF EXISTS trg_t_task_attachment_updated_at ON public.t_task_attachment;
-- DROP TRIGGER IF EXISTS trg_r_task_attachment_updated_at ON public.r_task_attachment;
-- DROP TRIGGER IF EXISTS trg_t_notification_updated_at ON public.t_notification;
-- DROP TRIGGER IF EXISTS trg_t_notification_read_updated_at ON public.t_notification_read;
-- ※テーブルに紐づくトリガーはテーブル削除時のCASCADEで自動削除してくれるのでコメントアウト※

-- =========================================
-- 2. 関数の削除
-- =========================================
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.prevent_personal_space_deletion();
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- =========================================
-- 3. ビューの削除
-- =========================================
DROP VIEW IF EXISTS public.v_notification_read;
DROP VIEW IF EXISTS public.v_notification;
DROP VIEW IF EXISTS public.v_task_attachment_relation;
DROP VIEW IF EXISTS public.v_task_attachment;
DROP VIEW IF EXISTS public.v_task_assignee;
DROP VIEW IF EXISTS public.v_task;
DROP VIEW IF EXISTS public.v_project_task_status_relation;
DROP VIEW IF EXISTS public.v_project_task_status;
DROP VIEW IF EXISTS public.v_project_task_category_relation;
DROP VIEW IF EXISTS public.v_project_task_category;
DROP VIEW IF EXISTS public.v_project_tool_relation;
DROP VIEW IF EXISTS public.v_project_tool;
DROP VIEW IF EXISTS public.v_project_requirement_relation;
DROP VIEW IF EXISTS public.v_project_requirement;
DROP VIEW IF EXISTS public.v_project_member;
DROP VIEW IF EXISTS public.v_project;
DROP VIEW IF EXISTS public.v_project_category;
DROP VIEW IF EXISTS public.v_space_relation;
DROP VIEW IF EXISTS public.v_space;
DROP VIEW IF EXISTS public.v_profile_skill_relation;
DROP VIEW IF EXISTS public.v_profile_skill_tag;
DROP VIEW IF EXISTS public.v_profile;

-- =========================================
-- 4. テーブルの削除 (依存関係の深い順)
-- =========================================
-- CASCADEを付けているので、関連する制約も一緒に削除されます
DROP TABLE IF EXISTS public.t_notification_read CASCADE;
DROP TABLE IF EXISTS public.t_notification CASCADE;
DROP TABLE IF EXISTS public.r_task_attachment CASCADE;
DROP TABLE IF EXISTS public.t_task_attachment CASCADE;
DROP TABLE IF EXISTS public.r_task_assignee CASCADE;
DROP TABLE IF EXISTS public.t_task CASCADE;
DROP TABLE IF EXISTS public.r_project_task_status CASCADE;
DROP TABLE IF EXISTS public.m_project_task_status CASCADE;
DROP TABLE IF EXISTS public.r_project_task_category CASCADE;
DROP TABLE IF EXISTS public.m_project_task_category CASCADE;
DROP TABLE IF EXISTS public.r_project_tool CASCADE;
DROP TABLE IF EXISTS public.m_project_tool CASCADE;
DROP TABLE IF EXISTS public.r_project_requirement CASCADE;
DROP TABLE IF EXISTS public.t_project_requirement CASCADE;
DROP TABLE IF EXISTS public.r_project_member CASCADE;
DROP TABLE IF EXISTS public.t_project CASCADE;
DROP TABLE IF EXISTS public.m_project_category CASCADE;
DROP TABLE IF EXISTS public.r_space CASCADE;
DROP TABLE IF EXISTS public.t_space CASCADE;
DROP TABLE IF EXISTS public.r_profile_skill_tag CASCADE;
DROP TABLE IF EXISTS public.m_profile_skill_tag CASCADE;
DROP TABLE IF EXISTS public.t_profile CASCADE;

-- =========================================
-- 初期化完了
-- =========================================
