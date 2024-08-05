import { create } from "zustand";

interface Tab {
  whatCategory: { categoryId: number; categoryName: string };
  changeCategory: (category: {
    categoryId: number;
    categoryName: string;
  }) => void;


}

const Tab = create<Tab>((set) => ({
  whatCategory: { categoryId: 0, categoryName: "" },
  changeCategory: (category) =>
    set((state) => ({
      whatCategory: (state.whatCategory.categoryId === category.categoryId ? { categoryId: 0, categoryName: "" }: category)
    })),

}));

export default Tab;
