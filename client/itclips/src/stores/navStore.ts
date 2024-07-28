import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NavStore {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;

  isEmailLoginOpen: boolean;
  isPasswordResetOpen: boolean;
  toggleEmailLogin: () => void;
  togglePasswordReset: () => void;
}

export const navStore = create<NavStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      isEmailLoginOpen: false,
      isPasswordResetOpen: false,
      toggleEmailLogin: () => set((state) => ({ isEmailLoginOpen: !state.isEmailLoginOpen })),
      togglePasswordReset: () => set((state) => ({ isPasswordResetOpen: !state.isPasswordResetOpen })),
    }),
    {
      name: "nav-store", // 로컬 스토리지에 저장할 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }), // isLoggedIn만 저장
    }
  )
);
