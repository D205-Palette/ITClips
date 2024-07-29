import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NavStore {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;

  isLoginListOpen: boolean;
  isEmailLoginOpen: boolean;
  isPasswordResetOpen: boolean;  
  setLoginListOpen: (open: boolean) => void;
  setEmailLoginOpen: (open: boolean) => void;
  setPasswordResetOpen: (open: boolean) => void;
}

export const navStore = create<NavStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      isLoginListOpen: true,
      isEmailLoginOpen: false,
      isPasswordResetOpen: false,      
      setLoginListOpen: (open) => set({ isLoginListOpen: open }),
      setEmailLoginOpen: (open) => set({ isEmailLoginOpen: open }),
      setPasswordResetOpen: (open) => set({ isPasswordResetOpen: open }),
    }),
    {
      name: "nav-store", // 로컬 스토리지에 저장할 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }), // isLoggedIn만 저장
    }
  )
);
