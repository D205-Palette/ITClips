import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ToastStore {
  globalNotification: {
    message: string;
    type: "success" | "error";
  } | null;
  setGlobalNotification: (setting: any) => void;
}

const toastStore = create<ToastStore>((set) => ({
  globalNotification: null,
  setGlobalNotification: (setting) => {
    set({ globalNotification: setting });
  },
}));

export default toastStore;
