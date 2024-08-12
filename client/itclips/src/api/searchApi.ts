import { authenticatedRequest } from "./apiUtils";

interface Tag {
  title: string;
}

// 북마크 리스트 검색
export const bookmarkSearch = (userId: number, page: number, searchType: string, title: string) => {
  return authenticatedRequest("get", `/list/search/${page}/${searchType}/${title}`, undefined, { page, searchType, title, userId });
};

// 유저 검색
export const userSearch = (userId: number, page: number, title: string) => {
  return authenticatedRequest("get", `/user/search/${page}/${title}`, undefined, { page, title, userId });
};

// 로드맵 검색
export const roadmapSearch = (userId: number, page: number, searchType: string, title: string) => {
  return authenticatedRequest("get", `/roadmap/search/${page}/${searchType}/${title}`, undefined, { page, searchType, title, userId });
};

// 태그 검색
export const tagSearch = (userId: number, page: number, tags: Tag[]) => {
  return authenticatedRequest("post", `/list/search/tag/${page}`, { tags }, { page, userId });
};

// 북마크 리스트 추천 목록
export const getRecommendedBookmarks = (userId: number) => {
  return authenticatedRequest("put", `/recommendations/user/${userId}`, undefined, { userId });
};