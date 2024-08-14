import { create } from "zustand";
import type { CategoryType } from "../types/BookmarkListType";
import { devtools, persist } from "zustand/middleware";

type UserInfo = {
  id?: number;
  email?: string;
  nickname?: string;
  birth?: string;
  job?: string;
  image: string;
  gender?: boolean;
  darkMode?: boolean;
  bio?: string;
  bookmarkListCount?: number;
  roadmapCount?: number;
  followerCount?: number;
  followingCount?: number;
}

interface TabState {
  whatCategory: { categoryId: number; categoryName: string };
  changeCategory: (category: {
    categoryId: number;
    categoryName: string;
  }) => void;
isOpen : boolean;
setIsOpen : (setting:boolean) => void
deleteCategory:number
setDeleteCategory: (index:number) => void

isProfileModalOpen:boolean;
setIsProfileModalOpen:(setting:boolean) => void;

}

const mainTabStore = create<TabState>()(
      (set) => ({
        whatCategory: { categoryId: 0, categoryName: "" },
        changeCategory: (category) =>
          set((state) => ({
            whatCategory:
              state.whatCategory.categoryName === category.categoryName &&
              state.whatCategory.categoryId === category.categoryId
                ? { categoryId: 0, categoryName: "" }
                : category,
          })),
          isOpen:false,
          setIsOpen: (setting) => set(()=> ({isOpen : setting})),
          deleteCategory: 0,
          setDeleteCategory: (index) => set(()=> ({deleteCategory : index})),
          
          isProfileModalOpen:false,
          setIsProfileModalOpen:(setting) => set(()=> ({isProfileModalOpen : setting})),

      }),
     
    )

export default mainTabStore;
