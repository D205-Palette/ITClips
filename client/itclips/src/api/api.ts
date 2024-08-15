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

// 응답 인터셉터를 사용해 401 에러 처리 및 토큰 갱신
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // authStore에서 리프레시 토큰 가져오기
        const refreshToken = authStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // 리프레시 토큰으로 새로운 액세스 토큰 요청
        const { data } = await axios.post(`${API_BASE_URL}/api/user/refresh`, null, {
          headers: {
            "Authorization-Refresh": refreshToken,
          },
        });

        // 새로운 액세스 토큰을 authStore에 저장
        authStore.getState().fetchUserToken(data.accessToken);

        // 원래 요청에 새로운 액세스 토큰 설정 후 재시도
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        // 리프레시 토큰이 만료되었거나 유효하지 않으면 로그아웃 처리 등 추가 로직 수행 가능
        authStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
