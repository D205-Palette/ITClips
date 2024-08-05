import { create } from 'zustand';

interface User {
  id?: number;
  email?: string;
  nickname?: string;
  birth?: string;
  job?: string;
  gender?: boolean;
  darkMode?: boolean;
  bio?: string;
  bookmarkListCount?: number;
  roadmapCount?: number;
  followerCount?: number;
  followingCount?: number;
};

interface UserInfoStore {
  urlUserInfo?: User;
  setUrlUserInfo: (userInfo: User) => void;
  updateFollowCount: (isFollowing: boolean) => void;
}

export const profileStore = create<UserInfoStore>((set) => ({
  urlUserInfo: undefined,
  setUrlUserInfo: (userInfo) => set({ urlUserInfo: userInfo }),
  updateFollowCount: (isFollowing) => set((state) => ({
    urlUserInfo: state.urlUserInfo
      ? {
          ...state.urlUserInfo,
          followerCount: (state.urlUserInfo.followerCount || 0) + (isFollowing ? 1 : -1),
        }
      : undefined,
  })),
}));
