import { create } from "zustand";
import { API_BASE_URL } from "../config";

// socket
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// stores
import { chatStore } from "./chatStore";
import { authStore } from "./authStore";

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string | null;
  lastModified: string | null;
  messageCnt: number;
}

interface WebSocketStore {
  stompClient: Client | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  subscribe: (destination: string, callback: (message: any) => void) => () => void;
  subscribeToAllRooms: (rooms: ChatRoom[]) => void;
}

export const webSocketStore = create<WebSocketStore>((set, get) => ({

  stompClient: null,
  isConnected: false,
  subscribeToAllRooms: (rooms: ChatRoom[]) => {
    const { stompClient } = get();
    const addMessage = chatStore.getState().addMessage;

    if (stompClient && stompClient.connected) {
      rooms.forEach(room => {
        stompClient.subscribe(`/api/sub/chat/room/${room.id}`, (message) => {
          const newMessage = JSON.parse(message.body);
          addMessage(newMessage);
        });
      });
    }
  },

  connect: () => {
    if (!get().stompClient) {
      const socket = new SockJS(`${API_BASE_URL}/api/ws`);
      const client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('WebSocket Connected');
          set({ isConnected: true });
          const userId = authStore.getState().userId;
          if (userId) {
            chatStore.getState().fetchRooms(userId).then(() => {
              const rooms = chatStore.getState().rooms;
              get().subscribeToAllRooms(rooms);
            });
          }
        },
        onDisconnect: () => {
          console.log('WebSocket Disconnected');
          set({ isConnected: false });
        },
      });

      client.activate();
      set({ stompClient: client });
    }
  },

  disconnect: () => {
    const { stompClient } = get();
    if (stompClient) {
      stompClient.deactivate();
      set({ stompClient: null, isConnected: false });
    }
  },

  subscribe: (destination, callback) => {
    const { stompClient } = get();
    if (stompClient && stompClient.connected) {
      const subscription = stompClient.subscribe(destination, callback);
      return () => {
        if (subscription.id) {
          stompClient.unsubscribe(subscription.id);
        }
      };
    }
    return () => {};
  },
}));