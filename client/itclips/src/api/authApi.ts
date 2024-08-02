// apiServices.ts
import { authenticatedRequest, request } from "./apiUtils";

// 로그인 API 호출
export const emailLogin = (email: string, password: string) => {
  return request("post", "/user/login", { email, password });
};

// 로그아웃 API 호출
export const logoutApi = () => {
  return authenticatedRequest("post", "/user/logout");
};

// 비밀번호 찾기 인증번호 발송
export const sendVerificationPassword = (nickname: string, email: string) => {
  return request("post", "/user/pw/sendVerification", undefined, { email, nickname });
};

// 비밀번호 찾기 인증번호 확인
export const checkCodePassword = (email: string, code: string) => {
  return request("post", "/user/pw/verifyCode", undefined, { email, code });
};

// 회원 정보 조회
export const checkUserInfo = (userId: number) => {
  return request("get", `/user/${userId}/profile`, undefined, { userId });
};

// 이메일 중복 체크
export const checkEmail = (email: string) => {
  return request("get", "/user/emailCheck", undefined, { email });
};

// 이메일 인증번호 발송
export const sendVerificationCode = (email: string) => {
  return request("post", "/user/mail/sendVerification", undefined, { email });
};

// 이메일 인증번호 확인
export const verifyVerificationCode = (email: string, code: string) => {
  return request("post", "/user/mail/verifyCode", undefined, { email, code });
};

// 닉네임 중복 확인
export const checkNickname = (nickname: string) => {
  return request("get", "/user/nicknameCheck", undefined, { nickname });
};

// 회원 가입
export const signup = (userData: any) => {
  return request("post", "/user/signup", userData);
};

// 소셜 회원 가입
export const socialSignup = (userId: number, userData: any) => {
  return request("put", `/user/${userId}/oauthSignup`, userData, { userId });
};



// 전체 회원 정보 수정
export const editUserInfo = (userData: any) => {
  return authenticatedRequest("put", "/user/profile", userData);
};

// 프로필 사진 변경하기


// 비밀번호 변경
export const changePassword = (email: string, oldPassword: string, newPassword: string) => {
  return authenticatedRequest("put", "/user/pw/update", undefined, { email, oldPassword, newPassword });
};

// 회원 탈퇴
export const deleteId = (email: string) => {
  return authenticatedRequest("delete", "/user/profile", undefined, { email });
};

// 나의 관심사 태그 목록 보기
export const getMytag = (userId: number) => {
  return authenticatedRequest("get", `/user/${userId}/tags`);
};

