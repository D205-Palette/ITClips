// stores/followStore.ts
import { create } from 'zustand';

interface FollowState {
  followerCount: number;
  followingCount: number;
  setFollowerCount: (count: number) => void;
  setFollowingCount: (count: number) => void;
  decrementFollowerCount: () => void;
  decrementFollowingCount: () => void;
  incrementFollowerCount: () => void;
  incrementFollowingCount: () => void;
}

export const useFollowStore = create<FollowState>((set) => ({
  followerCount: 0,
  followingCount: 0,
  setFollowerCount: (count) => set({ followerCount: count }),
  setFollowingCount: (count) => set({ followingCount: count }),
  decrementFollowerCount: () => set((state) => ({ followerCount: state.followerCount - 1 })),
  decrementFollowingCount: () => set((state) => ({ followingCount: state.followingCount - 1 })),
  incrementFollowerCount: () => set((state) => ({ followerCount: state.followerCount + 1 })),
  incrementFollowingCount: () => set((state) => ({ followingCount: state.followingCount + 1 })),
}));