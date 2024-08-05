// 북마크 리스트를 상세 조회 했을떄 bookmarks가 나와서 그땐 그냥 BookmarkType[]로 타입 쓰면 됨

type BookmarkType = {
  id: number;
  category: string;
  title: string;
  url: string;
  tags: {
    title: string;
  }[];
  content: string;
  isLiked: boolean;
  likeCount: number;
};

export type { BookmarkType };
