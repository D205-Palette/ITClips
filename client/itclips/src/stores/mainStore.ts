import { boolean } from "yup";
import { create } from "zustand";

interface Article {
  isBookmarkListChange : boolean
  setIsBookmarkListChange : (bool:boolean) => void

  isBookmarkChange : boolean
  setIsBookmarkChange : (bool:boolean) => void
  }

const mainStore = create<Article>((set) => ({
  isBookmarkListChange:false,
  setIsBookmarkListChange: (bool) => set(() => ({isBookmarkListChange : bool})),

  isBookmarkChange:false,
  setIsBookmarkChange: (bool) => set(() => ({isBookmarkChange : bool})),
  
}
));

export default mainStore;
