import { create } from "zustand";
// 각 항목들에 대해 변경이 있으면 true하고, api받아와서 갱신될때 false로 바꿔주는 변수들
interface Article {
  isBookmarkListChange : boolean
  setIsBookmarkListChange : (bool:boolean) => void

  isRoadmapChange : boolean
  setIsRoadmapChange : (bool:boolean) => void

  isProfileChange : boolean
  setIsProfileChange : (bool:boolean) => void

  isFavoriteChange : boolean
  setIsFavoriteChange : (bool:boolean) => void
  }

const mainStore = create<Article>((set) => ({
  isBookmarkListChange:false,
  setIsBookmarkListChange: (bool) => set(() => ({isBookmarkListChange : bool})),

  isRoadmapChange:false,
  setIsRoadmapChange: (bool) => set(() => ({isRoadmapChange : bool})),
  
  isProfileChange:false,
  setIsProfileChange: (bool) => set(() => ({isProfileChange : bool})),

  isFavoriteChange:false,
  setIsFavoriteChange: (bool) => set(() => ({isFavoriteChange : bool})),
}
));

export default mainStore;
