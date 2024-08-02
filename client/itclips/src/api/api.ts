import axios from "axios";
import { API_BASE_URL } from "../config";
import { authStore } from "../stores/authStore";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // 기본 URL
});

// 요청 인터셉터를 사용해 Authorization 헤더 추가
api.interceptors.request.use(
  (config) => {
    try {
      // 로컬 스토리지에서 토큰 가져오기
      const token = authStore.getState().token;      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to get token from localStorage", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
