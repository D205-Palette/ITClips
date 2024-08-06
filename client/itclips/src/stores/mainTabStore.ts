import { create } from "zustand";
import type { CategoryType } from "../types/BookmarkListType";
interface Tab {
  whatCategory: { categoryId: number; categoryName: string };
  changeCategory: (category: {categoryId: number; categoryName: string;}) => void;
  tempCategories: CategoryType[];
  setTempCategories: (cats: CategoryType[]) => void;
  addTempCategories: (cat: CategoryType) => void;
  deleteTempCategories: (cat: CategoryType) => void;
}

const Tab = create<Tab>((set) => ({
  whatCategory: { categoryId: 0, categoryName: "" },
  changeCategory: (category) =>  set((state) => ({  whatCategory:
        state.whatCategory.categoryName === category.categoryName
          ? { categoryId: 0, categoryName: "" }
          : category,
    })),

  tempCategories: [],
  setTempCategories: (cats) => set((state) => ({ tempCategories: cats })),
  addTempCategories: (cat) =>  set((state) => ({ tempCategories: [...state.tempCategories, cat] })),
  deleteTempCategories: (cat) =>
    set((state) => ({
      tempCategories: state.tempCategories.filter(
        (tempCat) => tempCat.categoryName !== cat.categoryName
      ),
    })),
}));

export default Tab;
