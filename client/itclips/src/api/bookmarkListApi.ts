import { authenticatedRequest } from "./apiUtils";

interface Tag {
  title: string;
}

interface User {
  id: number;
  nickName: string;
}

interface BookmarkListItem {
  id: number;
  title: string;
  description: string;
  bookmarkCount: number;
  likeCount: number;
  image: string;
  isLiked: boolean;
  tags: Tag[];
  users: User[];
}

// 북마크리스트 댓글 조회
export const getBookmarkListComments = (listId: number) => {
  return authenticatedRequest("get", `/comment/${listId}`, undefined, { listId });
};

// 북마크리스트 댓글 작성
export const writeBookmarkListComment = (userId: number, listId: number, contents: string) => {
  return authenticatedRequest("post", `/comment/add/${userId}/${listId}`, { contents }, { userId, listId });
};

// 북마크리스트 댓글 수정
export const editBookmarkListComment = (userId: number, commentId: number, contents: string) => {
  return authenticatedRequest("put", `/comment/update/${userId}/${commentId}`, { contents }, { userId, commentId });
};

// 북마크리스트 댓글 삭제
export const deleteBookmarkListComment = (userId: number, commentId: number) => {
  return authenticatedRequest("delete", `/comment/delete/${userId}/${commentId}`, undefined, { userId, commentId });
};

// 북마크리스트 좋아요
export const likeBookmarkList = (userId: number, bookmarkId: number) => {
  return authenticatedRequest("post", `/list/like/${userId}/${bookmarkId}`, undefined, { userId, bookmarkId });
};

// 북마크리스트 좋아요 취소
export const unlikeBookmarkList = (userId: number, bookmarkId: number) => {
  return authenticatedRequest("delete", `/list/like/${userId}/${bookmarkId}`, undefined, { userId, bookmarkId });
};

// 북마크리스트 수정
export const editBookmarkList = (userId: number, listId: number, data: BookmarkListItem) => {
  return authenticatedRequest("put", `/list/update/${userId}/${listId}`, { data }, { userId, listId });
};