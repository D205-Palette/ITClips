import { create } from "zustand";

interface TabState {
  // 선택한 카테고리
  whatCategory: { categoryId: number; categoryName: string };
  changeCategory: (category: {
    categoryId: number;
    categoryName: string;
  }) => void;
  //
  isDeleteCategoryModalOpen: boolean;
  setIsDeleteCategoryModalOpen: (setting: boolean) => void;
  // 카테고리 삭제 모달로 보내줄 삭제한 카테고리 id
  deleteCategory: number;
  setDeleteCategory: (index: number) => void;
  // 프로필 수정 모달 오픈 여부
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (setting: boolean) => void;
}

const mainTabStore = create<TabState>()((set) => ({
  whatCategory: { categoryId: 0, categoryName: "" },
  changeCategory: (category) =>
    set((state) => ({
      whatCategory:
        state.whatCategory.categoryName === category.categoryName &&
        state.whatCategory.categoryId === category.categoryId
          ? { categoryId: 0, categoryName: "" }
          : category,
    })),
  isDeleteCategoryModalOpen: false,
  setIsDeleteCategoryModalOpen: (setting) =>
    set(() => ({ isDeleteCategoryModalOpen: setting })),
  deleteCategory: 0,
  setDeleteCategory: (index) => set(() => ({ deleteCategory: index })),

  isProfileModalOpen: false,
  setIsProfileModalOpen: (setting) =>
    set(() => ({ isProfileModalOpen: setting })),
}));

export default mainTabStore;
