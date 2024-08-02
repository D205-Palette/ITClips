import { create } from 'zustand';

interface FeedStore {  
  axiosResult: { lists: any[], roadmaps: any[] } | null;
  setAxiosResult: (result: { lists: any[], roadmaps: any[] }) => void;
}

export const feedStore = create<FeedStore>((set) => ({
  axiosResult: null,  
  setAxiosResult: (result) => set({ axiosResult: result }),
}));
