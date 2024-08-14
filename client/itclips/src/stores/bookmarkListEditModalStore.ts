import { create } from "zustand";
import type { CategoryType } from "../types/BookmarkListType";
import { devtools, persist } from "zustand/middleware";

interface TabState {
 
isEditModalOpen : boolean;
setIsBookmarkListEditModalOpen : (setting:boolean) => void
bookmarkListId:number
setBookmarkListId: (index:number) => void

}

const bookmarkListModalStore = create<TabState>()(
      (set) => ({
        isEditModalOpen:false,
        setIsBookmarkListEditModalOpen: (setting) => set(()=> ({isEditModalOpen : setting})),
        bookmarkListId: 0,
        setBookmarkListId: (index) => set(()=> ({bookmarkListId : index})),
      }),

    )

export default bookmarkListModalStore;
