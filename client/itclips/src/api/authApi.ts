import axios from "axios";
import { API_BASE_URL } from "../config";
import { authStore } from "../stores/authStore";

// 로그인 api 호출
export const emailLogin = (email: string, password: string) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/login`,
    data: {
      email,
      password,
    },
  });
};

// 로그아웃 api 호출
export const logoutApi = (token: string) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/logout`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 비밀번호 찾기 인증번호 발송
export const sendVerificationPassword = (nickname: string, email: string) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/pw/sendVerification`,
    params: {
      email,
      nickname,
    },
  });
};

// 비밀번호 찾기 인증번호 확인
export const checkCodePassword = (email: string, code: string) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/pw/verifyCode/`,
    params: { email, code },
  });
};

// 회원 정보 조회
export const checkUserInfo = (email: string) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/user/profile`,
    params: { email },
  });
};

// 이메일 중복 체크
export const checkEmail = (email: string) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/user/emailCheck`,
    params: { email },
  });
};

// 이메일 인증번호 발송
export const sendVerificationCode = (email: string) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/mail/sendVerification`,
    params: { email },
  });
};

// 이메일 인증번호 확인
export const verifyVerificationCode = (email: string, code: string) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/mail/verifyCode`,
    params: { email, code },
  });
};

// 닉네임 중복 확인
export const checkNickname = (nickname: string) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/user/nicknameCheck`,
    params: { nickname },
  });
};

// 회원 가입
export const signup = (userData: any) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/signup`,
    data: userData,
  });
};

// 소셜 회원 가입
export const socialSignup = (userData: any) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/oauthSignup`,
    data: userData,
  });
};

// 회원 정보 수정 API(액세스 토큰 필요)

// 전체 회원 정보 수정 (수정 필요)
export const editUserInfo = (token: string, userData: any) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/user/oauthSignup`,
    data: userData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 비밀번호 변경
export const changePassword = (
  token: string,
  email: string,
  oldPasswrod: string,
  newPassword: string
) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/api/user/pw/update`,
    params: {
      email,
      oldPasswrod,
      newPassword,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 회원 탈퇴
export const deleteId = (token: string, email: string) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/api/user/profile`,
    params: {
      email,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 나의 관심사 태그 목록 보기
export const getMytag = (token: string, userId: number) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/user/${userId}/tags`,
    params: {
      userId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 태그 조회

// 프로필 이미지 업데이트
