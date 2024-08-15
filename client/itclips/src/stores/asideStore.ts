// stores/asideStore.ts
import { create } from "zustand";

// apis
import { createPrivateChatRoom } from "../api/messageApi";

interface AsideState {
  isMessageOpen: boolean;
  selectedChat: number | null;
  toggleMessage: () => void;
  startNewChat: (user1Id: number, user2Id: number) => void;
  setSelectedChat: (chatId: number | null) => void;
}

export const asideStore = create<AsideState>((set) => ({
  isMessageOpen: false,
  selectedChat: null,
  toggleMessage: () => set((state) => ({ isMessageOpen: !state.isMessageOpen })),
  setSelectedChat: (chatId) => set({ selectedChat: chatId }),
  startNewChat: async (user1Id: number, user2Id: number) => {
    try {
      const response = await createPrivateChatRoom(user1Id, user2Id);
      set({ selectedChat: response.data.roomId, isMessageOpen: true });
    } catch (error) {
      console.error("Failed to create new chat room:", error);
    }
  },
}));