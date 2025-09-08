import { create } from 'zustand';

interface PageStore {
  currentPageTitle: string;
  isScrolled: boolean;
  showTitleInHeader: boolean;
  
  // Actions
  setCurrentPageTitle: (title: string) => void;
  setIsScrolled: (scrolled: boolean) => void;
  setShowTitleInHeader: (show: boolean) => void;
}

export const usePageStore = create<PageStore>((set) => ({
  currentPageTitle: '',
  isScrolled: false,
  showTitleInHeader: false,

  setCurrentPageTitle: (currentPageTitle) => set({ currentPageTitle }),
  setIsScrolled: (isScrolled) => set({ isScrolled }),
  setShowTitleInHeader: (showTitleInHeader) => set({ showTitleInHeader }),
}));
