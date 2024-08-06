import { authenticatedRequest } from "./apiUtils";

// 북마크리스트 댓글 조회
export const getBookmarkListComments = (listId: number) => {
  return authenticatedRequest("get", `/comment/${listId}`, undefined, { listId });
};

// 북마크리스트 댓글 작성
export const writeBookmarkListComment = (userId: number, listId: number, contents: string) => {
  return authenticatedRequest("post", `/comment/add/${userId}/${listId}`, { contents }, { userId, listId });
};

// 북마크리스트 댓글 수정
export const editBookmarkListComment = (userId: number, commentId: number, content: string) => {
  return authenticatedRequest("post", `/comment/update/${userId}/${commentId}`, { content }, { userId, commentId });
};

// 북마크리스트 댓글 삭제
export const deleteBookmarkListComment = (userId: number, commentId: number) => {
  return authenticatedRequest("post", `/comment/delete/${userId}/${commentId}`, undefined, { userId, commentId });
};