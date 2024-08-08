import { create } from "zustand";
import type { CategoryType } from "../types/BookmarkListType";
import { devtools, persist } from "zustand/middleware";

interface TabState {
  whatCategory: { categoryId: number; categoryName: string };
  changeCategory: (category: {
    categoryId: number;
    categoryName: string;
  }) => void;
  tempCategories: CategoryType[];
  setTempCategories: (cats: CategoryType[]) => void;
  addTempCategories: (cat: CategoryType) => void;
  deleteTempCategories: (cat: string) => void;
}

const Tab = create<TabState>()(
  devtools(
    persist(
      (set) => ({
        whatCategory: { categoryId: 0, categoryName: "" },
        changeCategory: (category) =>set((state) => ({ whatCategory: state.whatCategory.categoryName === category.categoryName && state.whatCategory.categoryId === category.categoryId ? { categoryId: 0, categoryName: "" }
                : category,
          })),
        tempCategories: [],
        setTempCategories: (cats) => set((state) => ({ tempCategories: cats })),
        addTempCategories: (cat) =>
          set((state) => ({ tempCategories: [...state.tempCategories, cat] })),
        deleteTempCategories: (cat) =>
          set((state) => ({
            tempCategories: state.tempCategories.filter(
              (tempCat) => tempCat.categoryName !== cat
            ),
          })),
      }),
      { name: "TabState" }
    )
  )
);

export default Tab;
