/**
 * スペース選択状態の同期 (Server Action) レスポンス型
 */
export type SyncSpaceResponse =
    | { success: true; spaceId: string }
    | { error: string };
