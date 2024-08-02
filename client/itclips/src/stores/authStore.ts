import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserInfo } from "./type"

interface AuthStore {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  token: string;
  fetchUserToken: (inputUserToken: string) => void;
  userInfo: UserInfo;
  fetchUserInfo: (inputUserInfo: object) => void;
  userId: number;
  fetchUserId: (inputUserId: number) => void;
}
export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, token: "", userInfo: {}}),
      token: "",
      fetchUserToken: (inputUserToken: string) => set({ token : inputUserToken}),
      userInfo: {},      
      fetchUserInfo: (inputUserInfo: object) => set({ userInfo : inputUserInfo }),
      userId: 0,
      fetchUserId: (inputUserId: number) => set({ userId : inputUserId })
    }),
    {
      name: "authStore", // 로컬 스토리지에 저장할 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        userInfo: state.userInfo,
        userId: state.userId
      }),
    }
  )
);
