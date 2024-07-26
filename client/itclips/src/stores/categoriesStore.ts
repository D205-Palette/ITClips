import { create } from "zustand";

interface Category {
  categories: string[];
  addCategory: (newCat: string) => void;
  deleteCategory: (name: string) => void;
}

const Category = create<Category>((set) => ({
  categories: ["카테고리1", "카테고리2", "카테고리3", "카테고리4", "카테고리5"],
  addCategory: (newCat) =>
    set((state) => ({ categories: [...state.categories, newCat] })),

  // 원래는 id나 pk넘버로 해야되는데 지금 데이터가 없어서 일단 이름으로 필터링 해둠
  deleteCategory: (name) =>
    set((state) => ({ categories: state.categories.filter((e) => e != name) })),
}));

export default Category;
