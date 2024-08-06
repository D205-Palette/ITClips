// stores/asideStore.ts

import { create } from 'zustand';

interface DeleteState {
  deletedBookmarkList:number[];
  setDeletedBookmarkList: (id:number) => void;

  deletedBookmark:number[];
  setDeletedBookmark: (id:number) => void;

  deletedRoadmap:number[];
  setDeletedRoadmap: (id:number) => void;
}

export const deleteStore = create<DeleteState>((set) => ({
    deletedBookmarkList:[],
    setDeletedBookmarkList: (id) => set((state) => ({deletedBookmarkList : [...state.deletedBookmarkList, id]})),
                             
    deletedBookmark:[],
    setDeletedBookmark: (id) => set((state) => ({deletedBookmark : [...state.deletedBookmark, id]})),

    deletedRoadmap:[],
    setDeletedRoadmap: (id) => set((state) => ({deletedRoadmap : [...state.deletedRoadmap, id]})),

}));