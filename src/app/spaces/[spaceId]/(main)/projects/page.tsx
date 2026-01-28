// Modules
import { redirect } from 'next/navigation'
// Components
import SpaceProjects from "@/components/page/spaces/default/projects";
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
  // ----------------------------------------------------
  // 3. 自身が所属するプロジェクト一覧を取得
  // ----------------------------------------------------
  const adminClient = await supabaseServerAdmin()
  const projects = await projectRepository.listJoinedByProfileId(adminClient, sessionUser.id)
  console.log(projects)
  // ============================================================================
  // テンプレート（Template）
  // ============================================================================
  // return <SpaceProjects projects={projects} />;
  return <p>test</p>
} 
