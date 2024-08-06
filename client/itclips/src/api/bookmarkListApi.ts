import { authenticatedRequest, authenticatedRawJsonRequest } from "./apiUtils";

// 북마크리스트 댓글 조회
export const getBookmarkListComments = (userId: number) => {
  return authenticatedRequest("get", "/follow/following", undefined, { userId });
};

// 북마크리스트 댓글 작성
export const writeBookmarkListComment = (userId: number, listId: number, contents: string) => {
  return authenticatedRawJsonRequest("post", `/comment/add/${userId}/${listId}`, { contents }, { userId, listId });
};

// 북마크리스트 댓글 수정
export const editBookmarkListComment = (userId: number, commentId: number, contents: string) => {
  return authenticatedRawJsonRequest("post", `/comment/update/${userId}/${commentId}`, { contents }, { userId, commentId });
};

// 북마크리스트 댓글 삭제
export const deleteBookmarkListComment = (userId: number, commentId: number) => {
  return authenticatedRequest("post", `/comment/delete/${userId}/${commentId}`, undefined, { userId, commentId });
};