import { create } from "zustand";
import type { CategoryType } from "../types/BookmarkListType";
import { devtools, persist } from "zustand/middleware";

interface TabState {
  whatCategory: { categoryId: number; categoryName: string };
  changeCategory: (category: {
    categoryId: number;
    categoryName: string;
  }) => void;

}

const Tab = create<TabState>()(
  devtools(
    persist(
      (set) => ({
        whatCategory: { categoryId: 0, categoryName: "" },
        changeCategory: (category) =>set((state) => ({ whatCategory: state.whatCategory.categoryName === category.categoryName && state.whatCategory.categoryId === category.categoryId ? { categoryId: 0, categoryName: "" }
                : category,
          })),
  
      }),
      { name: "TabState" }
    )
  )
);

export default Tab;
