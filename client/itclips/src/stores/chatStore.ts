import { create } from 'zustand';

//apis
import { getChatRooms, getChatRoomMessages, getChatRoomInfo, leaveChatRoom, updateMessageStatusToRead } from "../api/messageApi";

// stores
import { webSocketStore } from './webSocketStore';

// 채팅방 목록을 호출했을 때 들어오는 정보(getChatRooms)
interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string | null;
  lastModified: string | null;
  messageCnt: number;
}

// 메세지
interface Message {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  createdAt: string;
}

// 단일 채팅방 정보를 호출했을 때 들어오는 정보(getChatRoomInfo)
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
  totalUnreadCount: number;
  currentRoomId: number | null;
  setCurrentRoomId: (roomId: number | null) => void;
  updateTotalUnreadCount: () => void;
  fetchRooms: (userId: number) => Promise<void>;
  fetchMessages: (roomId: number) => Promise<void>;
  fetchRoomInfo: (roomId: number) => Promise<void>;
  leaveRoom: (roomId: number, userId: number) => Promise<void>;
  updateMessageStatus: (roomId: number, userId: number) => Promise<void>;
  updateRoom: (roomId: number, updates: Partial<ChatRoom>) => void;
  resetMessageCount: (roomId: number) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const chatStore = create<ChatStore>((set, get) => ({

  rooms: [],
  currentRoomMessages: [],
  currentRoomInfo: null,
  isLoading: false,
  error: null,
  totalUnreadCount: 0,
  currentRoomId: null,

  setCurrentRoomId: (roomId) => set({ currentRoomId: roomId }),

  clearMessages: () => set({ currentRoomMessages: [] }),

  // 채팅방 조회
  fetchRooms: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getChatRooms(userId);
      const totalUnread = response.data.reduce((sum: number, room: ChatRoom) => sum + room.messageCnt, 0);
      set({ rooms: response.data, totalUnreadCount: totalUnread, isLoading: false });
      
      // WebSocket 구독 설정은 webSocketStore에서 처리하도록 변경
      webSocketStore.getState().subscribeToAllRooms();
    } catch (error) {
      set({ error: "Failed to fetch chat rooms", isLoading: false });
    }
  },

  // 메세지 내역 조회
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

  // 단일 채팅방 정보 조회
  fetchRoomInfo: async (roomId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getChatRoomInfo(roomId);
      set({ currentRoomInfo: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch room info", isLoading: false });
    }
  },

  // 채팅방 나가기
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

  // 읽음 처리
  updateMessageStatus: async (roomId: number, userId: number) => {
    try {
      await updateMessageStatusToRead(roomId, userId);
      set(state => {
        const updatedRooms = state.rooms.map(room =>
          room.id === roomId ? { ...room, messageCnt: 0 } : room
        );
        return {
          rooms: updatedRooms,
          totalUnreadCount: updatedRooms.reduce((sum, room) => sum + room.messageCnt, 0)
        };
      });
    } catch (error) {
      set({ error: "Failed to update message status" });
    }
  },

  // 채팅방 목록 실시간 업데이트를 위한 메서드
  updateRoom: (roomId, updates) =>
    set(state => {
      const updatedRooms = state.rooms.map(room =>
        room.id === roomId ? { ...room, ...updates } : room
      );

      // 최신 메시지 순으로 정렬
      const sortedRooms = updatedRooms.sort((a, b) => {
        if (!a.lastModified || !b.lastModified) return 0;
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      });

      return {
        rooms: sortedRooms,
        totalUnreadCount: updatedRooms.reduce((sum, room) => sum + room.messageCnt, 0)
      };
    }),

  // 메세지 읽음 처리후 프론트 단 초기화
  resetMessageCount: (roomId) =>
    set(state => {
      const updatedRooms = state.rooms.map(room =>
        room.id === roomId ? { ...room, messageCnt: 0 } : room
      );
      return {
        rooms: updatedRooms,
        totalUnreadCount: updatedRooms.reduce((sum, room) => sum + room.messageCnt, 0)
      };
    }),

  // 안읽은 채팅방 수 계산
  updateTotalUnreadCount: () => {
    const rooms = get().rooms;
    const totalUnread = rooms.reduce((sum, room) => sum + room.messageCnt, 0);
    set({ totalUnreadCount: totalUnread });
  },

  // 새 메세지 프론트 단 추가
  addMessage: (message: Message) =>
    set(state => {
      const { currentRoomId } = state;
      if (message.roomId !== currentRoomId) {
        // 현재 보고 있는 방이 아니면 unread count만 증가
        return {
          rooms: state.rooms.map(room =>
            room.id === message.roomId
              ? { ...room, messageCnt: room.messageCnt + 1, lastMessage: message.message, lastModified: message.createdAt }
              : room
          ),
          totalUnreadCount: state.totalUnreadCount + 1
        };
      }

      const existingMessageIndex = state.currentRoomMessages.findIndex(m => m.id === message.id);
      if (existingMessageIndex !== -1) {
        // 이미 존재하는 메시지면 업데이트
        const updatedMessages = [...state.currentRoomMessages];
        updatedMessages[existingMessageIndex] = message;
        return { currentRoomMessages: updatedMessages };
      }

      // 새 메시지 추가 및 정렬
      const updatedMessages = [...state.currentRoomMessages, message].sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      return {
        currentRoomMessages: updatedMessages,
        rooms: state.rooms.map(room =>
          room.id === message.roomId
            ? { ...room, lastMessage: message.message, lastModified: message.createdAt }
            : room
        )
      };
    }),

}));