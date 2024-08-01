// 로드맵 상세보기 데이터
type RoadmapType = {
  id: number;
  userId: number;
  userName: string;
  title: string;
  description: string;
  createdAt: string;
  image: string;
  isPublic: number;
  stepList: {
    id: number;
    roadmapId: number;
    bookmarkListResponseDTO: {
      id: number;
      title: string;
      description: string;
      bookmarkCount: number;
      likeCount: number;
      image: string;
      tags: [];
      users: [];
    };
    check: number;
    order: number;
  }[];
  commentList: {
    id: number;
    comment: string;
    userId: number;
    userName: string;
    createdAt: string;
    roadmapId: number;
  }[];

  likeCnt: number;
  scrapCnt: number;
};

export type { RoadmapType };
