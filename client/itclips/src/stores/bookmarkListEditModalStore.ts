import { create } from "zustand";

// 북마크리스트 수정 모달 띄우기 위한 변수들
interface TabState {
  // 모달 오픈 여부
  isEditModalOpen: boolean;
  setIsBookmarkListEditModalOpen: (setting: boolean) => void;
  // 수정할 리스트 id
  bookmarkListId: number;
  setBookmarkListId: (index: number) => void;
}

const bookmarkListModalStore = create<TabState>()((set) => ({
  isEditModalOpen: false,
  setIsBookmarkListEditModalOpen: (setting) =>
    set(() => ({ isEditModalOpen: setting })),
  bookmarkListId: 0,
  setBookmarkListId: (index) => set(() => ({ bookmarkListId: index })),
}));

export default bookmarkListModalStore;
