import { authenticatedRequest } from "./apiUtils";

// 회원 정보 수정(닉네임, 소개글, 생년월일, 직업, 성별)
export const updateUserInfo = (userId: number, newInfo: object) => {
  return authenticatedRequest("put", `/user/${userId}/profile`, { newInfo }, { userId });
};

// 비밀번호 변경
export const changePassword = (email: string, oldPassword: string, newPassword: string) => {
  return authenticatedRequest("put", "/user/pw/update", undefined, { email, oldPassword, newPassword });
};

// 회원 탈퇴
export const deleteUserAccount = (userId: number) => {
  return authenticatedRequest("delete", `/user/${userId}/profile/img`, undefined, { userId });
};

// 프로필 이미지 변경
// 주의 : 동작안하면 headers에 'Content-Type': 'multipart/form-data' 붙여서 보내기
export const updateProfileImage = (email: string, profileImage: string) => {
  return authenticatedRequest("post", "/user/profile/img", { profileImage }, { email });
};