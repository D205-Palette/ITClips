import { create } from "zustand";
import { getNotificationList, deleteNotification, updateNotificationStatusToRead, deleteAllNotification } from "../api/notificationApi";

interface Notification {
  id: number;
  userId: number;
  senderId: number;
  type: string;
  typeId: number;
  contents: string;
  read: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  fetchNotifications: (userId: number) => Promise<void>;
  markAllAsRead: (userId: number) => Promise<void>;
  deleteNotification: (notificationId: number) => Promise<void>;
  deleteAllNotifications: (userId: number) => Promise<void>;
  addNotification: (notification: Notification) => void;
}

const notificationStore = create<NotificationStore>((set) => ({

  notifications: [],

  // 알림 목록 조회
  fetchNotifications: async (userId: number) => {
    try {
      const response = await getNotificationList(userId);
      set({ notifications: response.data });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  },

  // 알림 전부 읽음 처리
  markAllAsRead: async (userId: number) => {
    try {
      await updateNotificationStatusToRead(userId);
      set((state) => ({
        notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
      }));
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  },

  // 알림 삭제
  deleteNotification: async (notificationId: number) => {
    try {
      await deleteNotification(notificationId);
      set((state) => ({
        notifications: state.notifications.filter((notification) => notification.id !== notificationId),
      }));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  },

  // 모든 알림 삭제
  deleteAllNotifications: async (userId: number) => {
    try {
      await deleteAllNotification(userId);
      set({ notifications: [] });
    } catch (error) {
      console.error("Failed to delete all notifications:", error);
    }
  },

  // 새로운 알림 추가
  addNotification: (notification: Notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
  },
}));

export default notificationStore;