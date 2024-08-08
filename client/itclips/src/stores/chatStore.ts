import { create } from 'zustand';
import { getChatRooms, getChatRoomMessages, getChatRoomInfo, leaveChatRoom, updateMessageStatusToRead } from "../api/messageApi";

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string | null;
  lastModified: string | null;
  messageCnt: number;
}

interface Message {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  createdAt: string;
}

interface ChatRoomInfo {
  roomId: number;
  roomName: string;
  userTitles: {
    id: number;
    nickName: string;
  }[];
}

interface ChatStore {
  rooms: ChatRoom[];
  currentRoomMessages: Message[];
  currentRoomInfo: ChatRoomInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchRooms: (userId: number) => Promise<void>;
  fetchMessages: (roomId: number) => Promise<void>;
  fetchRoomInfo: (roomId: number) => Promise<void>;
  leaveRoom: (roomId: number, userId: number) => Promise<void>;
  updateMessageStatus: (roomId: number, userId: number) => Promise<void>;
  updateRoom: (roomId: number, updates: Partial<ChatRoom>) => void;
  resetMessageCount: (roomId: number) => void;
  addMessage: (message: Message) => void;
}

export const chatStore = create<ChatStore>((set, get) => ({
  rooms: [],
  currentRoomMessages: [],
  currentRoomInfo: null,
  isLoading: false,
  error: null,

  fetchRooms: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getChatRooms(userId);
      set({ rooms: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch chat rooms", isLoading: false });
    }
  },

  fetchMessages: async (roomId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getChatRoomMessages(roomId);
      const sortedMessages = response.data.sort((a: Message, b: Message) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      set({ currentRoomMessages: sortedMessages, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch messages", isLoading: false });
    }
  },

  fetchRoomInfo: async (roomId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getChatRoomInfo(roomId);
      set({ currentRoomInfo: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch room info", isLoading: false });
    }
  },

  leaveRoom: async (roomId: number, userId: number) => {
    set({ isLoading: true, error: null });
    try {
      await leaveChatRoom(roomId, userId);
      set(state => ({
        rooms: state.rooms.filter(room => room.id !== roomId),
        isLoading: false
      }));
    } catch (error) {
      set({ error: "Failed to leave room", isLoading: false });
    }
  },

  updateMessageStatus: async (roomId: number, userId: number) => {
    try {
      await updateMessageStatusToRead(roomId, userId);
      set(state => ({
        rooms: state.rooms.map(room =>
          room.id === roomId ? { ...room, messageCnt: 0 } : room
        )
      }));
    } catch (error) {
      set({ error: "Failed to update message status" });
    }
  },

  updateRoom: (roomId, updates) =>
    set(state => ({
      rooms: state.rooms.map(room =>
        room.id === roomId ? { ...room, ...updates } : room
      )
    })),

  resetMessageCount: (roomId) =>
    set(state => ({
      rooms: state.rooms.map(room =>
        room.id === roomId ? { ...room, messageCnt: 0 } : room
      )
    })),

  addMessage: (message: Message) =>
    set(state => {
      const existingMessage = state.currentRoomMessages.find(m => m.id === message.id);
      if (existingMessage) {
        return state; // 이미 존재하는 메시지라면 상태를 변경하지 않음
      }

      const updatedMessages = [...state.currentRoomMessages, message].sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      
      const updatedRooms = state.rooms.map(room =>
        room.id === message.roomId
          ? {
              ...room,
              lastMessage: message.message,
              lastModified: message.createdAt,
              messageCnt: room.id === get().currentRoomInfo?.roomId ? 0 : room.messageCnt + 1
            }
          : room
      );

      return {
        currentRoomMessages: updatedMessages,
        rooms: updatedRooms
      };
    }),

}));