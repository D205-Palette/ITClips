// apiUtils.ts
import api from "./api";

// 인증된 요청을 위한 유틸리티 함수
export const authenticatedRequest = (method: string, url: string, data?: any, params?: any) => {
  return api({
    method,
    url,
    data,
    params,
  });
};

// 인증된 요청과 프로필 수정을 위한 유틸리티 함수
export const authenticatedUserSettingRequest = (method: string, url: string, data?: any, params?: any) => {
  return api({
    method,
    url,
    data,
    params,
    headers: {
      'Content-Type': 'application/json',
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
