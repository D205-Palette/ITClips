import axios from "axios";
import { API_BASE_URL } from "../config";

// 로그인 api 호출
export const emailLogin = (email: string, password: string) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/login`,
    params: { email, password }      
  });
};

// 이메일 인증번호 발송
export const sendVerificationCode = (email: string) => {
    return axios({
      method: "post",
      url: `${API_BASE_URL}/api/user/mail/sendVerification`,
      params: { email }
    });
  };
  
  // 이메일 인증번호 확인
  export const verifyVerificationCode = (email: string, code: string) => {
    return axios({
      method: "post",
      url: `${API_BASE_URL}/api/user/mail/verifyCode`,
      params: { email, code }
    });
  };
  
  // 닉네임 중복 확인
  export const checkNickname = (nickname: string) => {
    return axios({
      method: "get",
      url: `${API_BASE_URL}/api/user/nicknameCheck`,
      params: { nickname }
    });
  };
  
  // 회원 가입
  export const signup = (userData: any) => {
    return axios({
      method: "post",
      url: `${API_BASE_URL}/api/user/signup`,
      params: userData
    });
  };