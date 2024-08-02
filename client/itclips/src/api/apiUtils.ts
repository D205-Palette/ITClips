// apiUtils.ts
import api from "./api";
// const { token } = authStore();

// 처음에 토큰 못가져오는거 임시로 수정 (작동안됨)
const authStoreJSON = localStorage.getItem("authStore");
const authStore = authStoreJSON ? JSON.parse(authStoreJSON) : {};
const token = authStore.token || null;

// 인증된 요청을 위한 유틸리티 함수
export const authenticatedRequest = (method: string, url: string, data?: any, params?: any) => {

  // 토큰 다시 가져오기(작동안됨)
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return api({
    method,
    url,
    data,
    params,
    headers,
    // headers: {
    //   Authorization: `Bearer ${token}`
    // }
  });
};

// 인증되지 않은 요청을 위한 유틸리티 함수
export const request = (method: string, url: string, data?: any, params?: any) => {
  return api({
    method,
    url,
    data,
    params,
  });
};
