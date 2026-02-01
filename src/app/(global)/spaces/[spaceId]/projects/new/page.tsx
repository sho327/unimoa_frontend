// Modules
import { redirect } from 'next/navigation'
// Components
import SpaceProjectSave from "@/components/page/global/space/project/save";
// Libs/ServerUtils
import { supabaseServerAdmin } from '@/lib/supabase/serverAdmin'
// Repository
import { commonRepository } from '@/lib/supabase/repository/common'
import { projectRepository } from '@/lib/supabase/repository/project'
// Constants
import { pageRoutes } from '@/components/constants'

export default async function SpaceProjectsPage({
  params
}: {
  params: {
    spaceId: string
  }
}) {
  // ----------------------------------------------------
  // 1. URLパラメータの取得
  // ----------------------------------------------------
  // layoutで検証済のSpaceId
  const { spaceId: activeSpaceId } = await params;
  // ----------------------------------------------------
  // 2. セッションより認証済ユーザ情報の取得
  // ----------------------------------------------------
  const sessionUser = await commonRepository.getSessionUser();
  // セッション取得失敗
  if (!sessionUser) {
    // ログイン画面へ遷移
    console.log('セッションが見つかりませんでした。')
    redirect(pageRoutes.AUTH.LOGIN)
  }

  // ============================================================================
  // テンプレート（Template）
  // ============================================================================
  return <SpaceProjectSave />;
} 
