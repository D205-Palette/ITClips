import { authenticatedRequest } from "./apiUtils";

// 북마크리스트 즐겨찾기 순 랭킹 조회
export const getBookmarkListScrapRank = () => {
  return authenticatedRequest("get", "/list/rank/scrap", undefined, undefined);
};

// 북마크리스트 좋아요 순 랭킹 조회
export const getBookmarkListLinkRank = () => {
  return authenticatedRequest("get", "/list/rank/like", undefined, undefined);
};

// 북마크리스트 조회수 순 랭킹 조회
export const getBookmarkListHitRank = () => {
  return authenticatedRequest("get", "/list/rank/hit", undefined, undefined);
};

// 로드맵 스크랩 순 랭킹 조회
export const getRoadmapScrapRank = () => {
  return authenticatedRequest("get", "/roadmap/rank/scrap", undefined, undefined);
};

// 로드맵 좋아요 순 랭킹 조회
export const getRoadmapLikeRank = () => {
  return authenticatedRequest("get", "/roadmap/rank/like", undefined, undefined);
};

// 로드맵 조회수 순 랭킹 조회
export const getRoadmapHitRank = () => {
  return authenticatedRequest("get", "/roadmap/rank/hit", undefined, undefined);
};