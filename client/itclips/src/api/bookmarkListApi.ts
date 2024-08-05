import { authenticatedRequest } from "./apiUtils";

// 북마크리스트 댓글 조회
export const getBookmarkListComments = (userId: number) => {
  return authenticatedRequest("get", "/follow/following", undefined, { userId });
};