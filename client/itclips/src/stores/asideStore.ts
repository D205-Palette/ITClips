// stores/asideStore.ts

import create from 'zustand';

interface AsideState {
  isMessageOpen: boolean;
  selectedChat: number | null;
  toggleMessage: () => void;
  startNewChat: (userId: number) => void;
  setSelectedChat: (chatId: number | null) => void;
}

export const asideStore = create<AsideState>((set) => ({
  isMessageOpen: false,
  selectedChat: null,
  toggleMessage: () => set((state) => ({ isMessageOpen: !state.isMessageOpen })),
  setSelectedChat: (chatId) => set({ selectedChat: chatId }),
  startNewChat: (userId: number) => {
    set({ selectedChat: userId, isMessageOpen: true });
  },
}));