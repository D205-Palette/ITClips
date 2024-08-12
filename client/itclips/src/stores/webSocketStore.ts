import { create } from "zustand";
import { API_BASE_URL } from "../config";

// socket
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// stores
import { chatStore } from "./chatStore";

interface WebSocketStore {
  stompClient: Client | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  subscribe: (destination: string, callback: (message: any) => void) => () => void;
  subscribeToAllRooms: () => void;
}

export const webSocketStore = create<WebSocketStore>((set, get) => ({

  stompClient: null,
  isConnected: false,

  subscribeToAllRooms: () => {
    const { stompClient } = get();
    const { rooms, addMessage } = chatStore.getState();

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
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          
          set({ isConnected: true });
          get().subscribeToAllRooms();
        },
        onDisconnect: () => {
          
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