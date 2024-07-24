// src/store/userStore.ts
import create from 'zustand';

interface User {
  id: string;
  username: string;
  // 추가적인 유저 정보가 필요하다면 여기에 추가
}

interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

interface FeedStore {
  user: User | null;
  feedPosts: Post[];
  setUser: (user: User) => void;
  setFeedPosts: (posts: Post[]) => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  user: null,
  feedPosts: [],
  setUser: (user) => set({ user }),
  setFeedPosts: (posts) => set({ feedPosts: posts }),
}));
