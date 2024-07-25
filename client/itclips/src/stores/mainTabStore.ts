import { create } from "zustand";


interface Tab {
  whatMainTab:string
  changeMainTab: (page:string) => void

  whatCategory:string
  changeCategory: (category:string) => void
}

const Tab = create<Tab>((set) => ({
    whatMainTab:'bookmarklist',
    changeMainTab: (page) => set((state) => ({whatMainTab :  page})),

    whatCategory:'',
    changeCategory: (category) => set((state) => ({whatCategory :  (state.whatCategory == category ? '' : category)})),
}));

export default Tab