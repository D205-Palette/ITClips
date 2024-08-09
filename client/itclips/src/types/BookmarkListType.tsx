import type { BookmarkType } from "./BookmarkType";

// 북마크 리스트 상세보기 에서 나오는 가진 카테고리들
type CategoryType = {
    categoryId : number;
    categoryName : string;
}

// 북마크 리스트 상세보기 데이터
type BookmarkListDetailType = {
  id: number;
  title: string;
  description: string;
  likeCount: number;
  scrapCount: number;
  image: string;
  isLiked: boolean;
  isScraped: boolean;
  categories: CategoryType[]
  tags: [
    {
      title: string;
    }
  ];
  users: [
    {
      id: number;
      nickName: string;
    }
  ];
  bookmarks: BookmarkType[];
};

// 나의&그룹&즐겨찾기 페이지에 보이는 리스트들 요약
type BookmarkListSumType = {
  id: number;
  title: string;
  description: string;
  bookmarkCount: number;
  likeCount: number;
  image: string;
  isLiked: boolean;
  tags: 
    {
      id:number;
      title: string;
    }[]
  users: 
    {
      id: number;
      nickName: string;
      userImage: string;
    }[]
};

export type { CategoryType, BookmarkListDetailType, BookmarkListSumType };
