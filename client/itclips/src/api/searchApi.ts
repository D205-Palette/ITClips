import { authenticatedRequest, authenticatedRawJsonRequest } from "./apiUtils";

interface Tag {
  title: string;
}

// 북마크 리스트 검색
export const bookmarkSearch = (userId: number, page: number, searchType: string, title: string) => {
  return authenticatedRequest("get", `/list/search/${page}/${searchType}/${title}`, undefined, { page, searchType, title, userId });
};

// 유저 검색 (아직 api 구현 안됨)
export const userSearch = () => {
};

// 로드맵 검색
export const roadmapSearch = (userId: number, page: number, searchType: string, title: string) => {
  return authenticatedRequest("get", `/roadmap/search/${page}/${searchType}/${title}`, undefined, { page, searchType, title, userId });
};

// 태그 검색
export const tagSearch = (userId: number, page: number, tags: Tag[]) => {
  return authenticatedRawJsonRequest("post", `/list/search/tag/${page}`, { tags }, { page, userId });
};