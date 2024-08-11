import { authenticatedRequest } from "./apiUtils";

// 로드맵 댓글 갯수 조회
export const getRoadmapCommentsCount = (roadmapId: number) => {
  return authenticatedRequest("get", `/roadmap/comment/count/${roadmapId}`, undefined, { roadmapId });
};

// 로드맵 정보 조회
export const getRoadmapInfo = (roadmapId: number, viewId: number) => {
  return authenticatedRequest("get", `/roadmap/${roadmapId}`, undefined, { roadmapId, viewId });
};

// 로드맵 댓글 작성
export const writeRoadmapComment = (roadmapId: number, userId: number, comment: string) => {
  return authenticatedRequest("post", `/roadmap/comment/${roadmapId}/${userId}`, { comment }, { roadmapId, userId });
};

// 로드맵 댓글 삭제
export const deleteRoadmapComment = (commentId: number, userId: number) => {
  return authenticatedRequest("delete", `/roadmap/comment/${commentId}/${userId}`, undefined, { commentId, userId });
};

// 로드맵 댓글 수정
export const editRoadmapComment = (commentId: number, userId: number, comment: string) => {
  return authenticatedRequest("put", `/roadmap/comment/${commentId}/${userId}`, { comment }, { commentId, userId });
};

// 로드맵 좋아요
export const likeRoadmap = (roadmapId: number, userId: number) => {
  return authenticatedRequest("post", `/roadmap/like/${roadmapId}/${userId}`, undefined, { roadmapId, userId });
};

// 로드맵 좋아요 취소
export const unlikeRoadmap = (roadmapId: number, userId: number) => {
  return authenticatedRequest("delete", `/roadmap/like/${roadmapId}/${userId}`, undefined, { roadmapId, userId });
};
