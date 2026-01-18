import { create } from 'zustand';

export type Space = {
    id: string;
    name: string;
    projects?: any[]; // 必要に応じて詳細化
};

const DEFAULT_SPACES: Space[] = [
    { id: "s1", name: "田中AIデザインゼミ", projects: [] },
    { id: "s2", name: "写真部 公式", projects: [] },
];

type AppState = {
    // UI State
    sidebarExpanded: boolean;
    mobileMenuOpen: boolean;

    // Data State
    activeSpace: Space;
    spaces: Space[];

    // Actions
    setSidebarExpanded: (expanded: boolean) => void;
    setMobileMenuOpen: (open: boolean) => void;
    setActiveSpace: (space: Space) => void;
};

export const useAppStore = create<AppState>((set) => ({
    // Initial State
    sidebarExpanded: true,
    mobileMenuOpen: false,
    activeSpace: DEFAULT_SPACES[0],
    spaces: DEFAULT_SPACES,

    // Actions
    setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    setActiveSpace: (space) => set({ activeSpace: space }),
}));
