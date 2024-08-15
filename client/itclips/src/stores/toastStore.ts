import { create } from "zustand";

interface ToastStore {
  globalNotification: {
    message: string;
    type: "success" | "error";
  } | null;
  setGlobalNotification: (setting: any) => void;
}

// 토스트 알람창 내용
const toastStore = create<ToastStore>((set) => ({
  globalNotification: null,
  setGlobalNotification: (setting) => {
    set({ globalNotification: setting });
  },
}));

export default toastStore;
