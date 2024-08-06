import { create } from 'zustand';
import { API_BASE_URL } from '../config';

// socket
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebSocketStore {
  stompClient: Client | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  subscribe: (destination: string, callback: (message: any) => void) => () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  stompClient: null,
  isConnected: false,
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