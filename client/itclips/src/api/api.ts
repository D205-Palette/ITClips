// api.ts
import axios from "axios";
import { API_BASE_URL } from "../config";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // 기본 URL
});

export default api;
