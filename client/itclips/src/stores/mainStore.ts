import { boolean } from "yup";
import { create } from "zustand";

interface Article {
  isBookmarkListChange : boolean
  setIsBookmarkListChange : (bool:boolean) => void

  isRoadmapChange : boolean
  setIsRoadmapChange : (bool:boolean) => void

  isProfileChange : boolean
  setIsProfileChange : (bool:boolean) => void
  }

const mainStore = create<Article>((set) => ({
  isBookmarkListChange:false,
  setIsBookmarkListChange: (bool) => set(() => ({isBookmarkListChange : bool})),

  isRoadmapChange:false,
  setIsRoadmapChange: (bool) => set(() => ({isRoadmapChange : bool})),
  
  isProfileChange:false,
  setIsProfileChange: (bool) => set(() => ({isProfileChange : bool})),
}
));

export default mainStore;
