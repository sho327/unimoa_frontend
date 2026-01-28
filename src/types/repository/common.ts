// Types
import { T_ProfileRow } from "@/types/supabase/profile";
import { T_SpaceRow } from "@/types/supabase/space";
import { T_NotificationRow } from "@/types/supabase/notification";

export type currentUser = T_ProfileRow & {
    spaces: T_SpaceRow[]
    notifications: T_NotificationRow[]
}