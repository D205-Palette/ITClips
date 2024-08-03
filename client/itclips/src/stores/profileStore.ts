import { create } from 'zustand';

interface User {
  id?: number;
  nickname?: string;
  job?: string;
  bio?: string;
  gender?: boolean;
  email?: string;
  darkMode?: boolean;
  birth?: string;
  bookmarkListCount?: number;
  roadmapCount?: number;
}

interface userInfoStore {
  urlUserInfo?: User;
  setUrlUserInfo: (userInfo: User) => void;
}

export const profileStore = create<userInfoStore>(set => ({
  urlUserInfo: undefined,
  setUrlUserInfo: (userInfo) => set({ urlUserInfo: userInfo }),
}));
