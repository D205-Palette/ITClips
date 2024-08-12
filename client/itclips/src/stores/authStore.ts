import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserInfo } from "./type";

interface AuthStore {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  token: string;
  refreshToken: string; // 리프레시 토큰 추가
  fetchUserToken: (inputUserToken: string) => void;
  fetchRefreshToken: (inputRefreshToken: string) => void; // 리프레시 토큰 저장 함수 추가
  userInfo: UserInfo;
  fetchUserInfo: (inputUserInfo: UserInfo) => void;
  userId: number;
  fetchUserId: (inputUserId: number) => void;
}

// AuthStore를 localStorage에 저장
export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({ isLoggedIn: false, token: "", refreshToken: "", userInfo: {} as UserInfo, userId: 0 }), // 로그아웃 시 리프레시 토큰 초기화
      token: "",
      refreshToken: "", // 리프레시 토큰 초기값
      fetchUserToken: (inputUserToken: string) => set({ token: inputUserToken }),
      fetchRefreshToken: (inputRefreshToken: string) => set({ refreshToken: inputRefreshToken }), // 리프레시 토큰 저장 함수
      userInfo: {} as UserInfo,
      fetchUserInfo: (inputUserInfo: UserInfo) => set({ userInfo: inputUserInfo }),
      userId: 0,
      fetchUserId: (inputUserId: number) => set({ userId: inputUserId }),
    }),
    {
      name: "authStore", // 로컬 스토리지에 저장할 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        refreshToken: state.refreshToken, // 리프레시 토큰도 저장
        userInfo: state.userInfo,
        userId: state.userId,
      }),
    }
  )
);
