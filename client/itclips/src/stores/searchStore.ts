import { create } from 'zustand';

interface Tag {
  title: string;
}

interface User {
  id: number;
  nickName: string;
}

interface BookmarkListItem {
  id: number;
  title: string;
  description: string;
  bookmarkCount: number;
  likeCount: number;
  image: string;
  isLiked: boolean;
  tags: Tag[];
  users: User[];
}

interface Step {
  id: number;
  listId: number;
  listTitle: string;
  order: string;
  check: boolean;
}

interface RoadmapItem {
  id: number;
  userId: number;
  userName: string;
  title: string;
  description: string;
  image: string;
  isPublic: number;
  createdAt: string;
  stepCnt: number;
  checkCnt: number;
  likeCnt: number;
  steps: Step[];
  isLiked: boolean;
}

interface BookmarkListStore {
  bookmarkListItems: BookmarkListItem[];
  roadmapItems: RoadmapItem[];
  setBookmarkListItems: (items: BookmarkListItem[]) => void;
  setRoadmapItems: (items: RoadmapItem[]) => void;
  updateBookmarkItem: (id: number, updates: Partial<BookmarkListItem>) => void;
  updateRoadmapItem: (id: number, updates: Partial<RoadmapItem>) => void;
}

export const searchStore = create<BookmarkListStore>((set) => ({
  bookmarkListItems: [],
  roadmapItems: [],
  setBookmarkListItems: (items) => set({ bookmarkListItems: items }),
  setRoadmapItems: (items) => set({ roadmapItems: items }),
  updateBookmarkItem: (id, updates) =>
    set((state) => ({
      bookmarkListItems: state.bookmarkListItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
  updateRoadmapItem: (id, updates) =>
    set((state) => ({
      roadmapItems: state.roadmapItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
}));