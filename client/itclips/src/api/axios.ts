import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { authStore } from "../stores/authStore"; // authStore의 경로를 맞게 설정해주세요.
import { API_BASE_URL } from "../config";

// Axios 기본 인스턴스에 인터셉터 설정
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data } = await axios.post(
          `${API_BASE_URL}/api/user/refresh`,
          null,
          {
            headers: {
              "Authorization-Refresh": refreshToken,
            },
          }
        );

        authStore.getState().fetchUserToken(data.accessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${data.accessToken}`,
        };

        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        authStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
