import { create } from "zustand";


interface Tab {

  whatCategory:string
  changeCategory: (category:string) => void


  // isFollower:boolean
  // changeIsFollower: (isFollower:boolean) => void
}

const Tab = create<Tab>((set) => ({

    whatCategory:'',
    changeCategory: (category) => set((state) => ({whatCategory :  (state.whatCategory === category ? '' : category)})),


    
    // isFollower:true,
    // changeIsFollower: (isFollower) => set((state)=>({isFollower : isFollower}) )
}));

export default Tab