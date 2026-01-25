// Types
import { T_ProfileRow } from '@/types/supabase/profile'
import { T_SpaceRow } from '@/types/supabase/space'

// プロフィールの Row に、関連する Space のリスト（spaces）をネストして追加
export type ProfileWithSpaces = T_ProfileRow & {
    spaces: T_SpaceRow[]
}

export const getUserProfile = () => {

}