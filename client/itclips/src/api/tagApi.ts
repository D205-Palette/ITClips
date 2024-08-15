import { authenticatedRequest } from "./apiUtils";

// 관심사 태그 불러오기
export const getInterestTag = () => {
  return authenticatedRequest("get", "/tags/origin", undefined, undefined);
};