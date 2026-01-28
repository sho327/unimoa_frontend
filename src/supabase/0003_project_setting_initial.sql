-- =========================================
-- 1. テーブル作成 (スペース系)
-- =========================================

-- スペースプロジェクトカテゴリ (m_space_project_category)
CREATE TABLE public.m_space_project_category (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    space_id uuid NOT NULL REFERENCES public.t_space(id) ON DELETE CASCADE,
    name varchar NOT NULL,
    sort_order integer DEFAULT 0,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- =========================================
-- 2. 自動更新トリガーの適用
-- =========================================
CREATE TRIGGER trg_m_space_project_category_updated_at 
    BEFORE UPDATE ON public.m_space_project_category 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =========================================
-- 3. ビューの構築 (論理削除フィルタリング済)
-- =========================================
-- CREATE VIEW public.v_space_project_category AS 
--     SELECT * FROM public.m_space_project_category WHERE deleted_at IS NULL;
