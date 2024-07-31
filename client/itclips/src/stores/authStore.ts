import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  token: string;
}
export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      token: "",
    }),
    {
      name: "authStore", // 로컬 스토리지에 저장할 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        token: state.token,
      }),
    }
  )
);
