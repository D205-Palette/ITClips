// apiUtils.ts
import api from "./api";
import { authStore } from "../stores/authStore";

const getToken = () => authStore.getState().token;

// 인증된 요청을 위한 유틸리티 함수
export const authenticatedRequest = (method: string, url: string, data?: any, params?: any) => {

  const token = getToken();

  return api({
    method,
    url,
    data,
    params,
    // headers,
    headers: {
      Authorization: `Bearer ${token}`
    }
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
