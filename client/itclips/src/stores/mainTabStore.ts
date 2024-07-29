import { create } from "zustand";


interface Tab {
  whatMainTab:string
  changeMainTab: (page:string) => void

  whatCategory:string
  changeCategory: (category:string) => void

  isFollow:string
  changeIsFollow: (mainOrFollow:string)  => void

  // isFollower:boolean
  // changeIsFollower: (isFollower:boolean) => void
}

const Tab = create<Tab>((set) => ({
    whatMainTab:'bookmarklist',
    changeMainTab: (page) => set((state) => ({whatMainTab :  page})),

    whatCategory:'',
    changeCategory: (category) => set((state) => ({whatCategory :  (state.whatCategory == category ? '' : category)})),

    isFollow: 'main',
    changeIsFollow: (mainOrFollow) => set((state)=> ({isFollow : mainOrFollow})),
    
    // isFollower:true,
    // changeIsFollower: (isFollower) => set((state)=>({isFollower : isFollower}) )
}));

export default Tab