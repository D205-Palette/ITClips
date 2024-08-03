import { create } from 'zustand';

interface profileInfo {
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

interface profileInfoStore {
  urlUserInfo?: profileInfo;
  setUrlUserInfo: (userInfo: profileInfo) => void;
}

export const profileStore = create<profileInfoStore>(set => ({
  urlUserInfo: undefined,
  setUrlUserInfo: (userInfo) => set({ urlUserInfo: userInfo }),
}));
