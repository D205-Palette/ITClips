import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserInfo } from "./type";

interface AuthStore {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  token: string;
  fetchUserToken: (inputUserToken: string) => void;
  userInfo: UserInfo;
  fetchUserInfo: (inputUserInfo: UserInfo) => void;
  userId: number;
  fetchUserId: (inputUserId: number) => void;
}

// interface AccessTokenStore {
//   accessToken: string;
//   fetchAccessToken: (inputUserToken: string) => void;
// }

// AuthStore를 localStorage에 저장
export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({ isLoggedIn: false, token: "", userInfo: {} as UserInfo, userId: 0 }),
      token: "",
      fetchUserToken: (inputUserToken: string) => set({ token: inputUserToken }),
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
        userInfo: state.userInfo,
        userId: state.userId,
      }),
    }
  )
);

// // AccessTokenStore를 sessionStorage에 저장
// export const tokenStore = create<AccessTokenStore>()(
//   persist(
//     (set) => ({
//       accessToken: "",
//       fetchAccessToken: (inputUserToken: string) =>
//         set({ accessToken: inputUserToken }),
//     }),
//     {
//       name: "accessToken",
//       storage: createJSONStorage(() => sessionStorage), // 세션 스토리지 사용
//       partialize: (state) => ({ accessToken: state.accessToken }),
//     }
//   )
// );
