// api.ts
import axios from "axios";
import { API_BASE_URL } from "../config";
import { authStore } from "../stores/authStore";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // 기본 URL
});

// 요청 인터셉터를 사용해 Authorization 헤더 추가
api.interceptors.request.use((config) => {
  const token = authStore.getState().token; // 글로벌 상태에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
