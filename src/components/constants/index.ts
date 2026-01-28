/**
 * 共通定数の設定
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/18
 */

// ============================================================================
// 定数
// ============================================================================
// アプリ名
export const appInfo = {
    APP_NAME: 'Unimoa',
    APP_DESCRIPTION: 'Unimoa',
    GENERATOR: 'React/Next.js',
}
/** ページルート一覧 */
export const pageRoutes = {
    TOP: `/`,
    // auth系はそのまま静的パス
    AUTH: {
        LOGIN: `/login`,
        SIGNUP: `/signup`,
        INITIAL_SETUP: `/initial_setup`,
        QUICK_SETUP: `/quick_setup`,
        PASSWORD_RESET_REQUEST: `/password_reset_request`,
        PASSWORD_RESET: `/password_reset`,
        USER_ACTIVATE_REQUEST: `/user_activate_request`,
        USER_ACTIVATE: `/user_activate`,
    },
    // space系は引数を受け取ってパスを返す関数にする
    SPACES: {
        DEFAULT: {
            DASHBOARD: (spaceId: string) => `/spaces/${spaceId}/dashboard`,
            PROJECTS: (spaceId: string) => `/spaces/${spaceId}/projects`,
        },
        PROJECT_DETAIL: (spaceId: string) => `/project/detail`,
        PROJECT_SAVE: (spaceId: string) => `/project/save`,
        PROJECT_MEMBER_LIST: (spaceId: string) => `/project/member/list`,
        // project系は引数を受け取ってパスを返す関数にする
        PROJECT: {
            DASHBOARD: (projectId: string) => `/project/${projectId}/dashboard`,
            TASK: {
                LIST: (projectId: string) => `/project/${projectId}/task/list`,
                DETAIL: (projectId: string) => `/project/${projectId}/task/detail`,
                SAVE: (projectId: string) => `/project/${projectId}/task/save`,
            },
            MEMBER: {
                LIST: (projectId: string) => `/project/${projectId}/member/list`,
            }
        }
    },
    // main系はそのまま静的パス
    MAIN: {
        DASHBOARD: `/dashboard`,
        PROJECT_LIST: `/project/list`,
        PROJECT_DETAIL: `/project/detail`,
        PROJECT_SAVE: `/project/save`,
        PROJECT_MEMBER_LIST: `/project/member/list`,
        MEMBER_LIST: `/member/list`,
        NOTIFICATION_LIST: `/notification/list`,
        NOTIFICATION_DETAIL: `/notification/detail`,
    },
    PROJECT: {
        DASHBOARD: `/project/xxx/dashboard`,
        TASK: {
            LIST: `/project/xxx/task/list`,
            DETAIL: `/project/xxx/task/detail`,
            SAVE: `/project/xxx/task/save`,
        },
        MEMBER: {
            LIST: `/project/xxx/member/list`,
        }
    }
}
export const selectedSpaceIdCookieKey = 'selected-space-id'
