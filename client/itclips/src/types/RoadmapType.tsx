// 로드맵 상세보기 데이터
type RoadmapDetailType = {
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
// 로드맵 간략 보기 데이터
type RoadmapSumType = 
  {
    id: number
    userId : number
    userName: string
    title: string
    description: string
    image: string
    isPublic: number
    createdAt: string
    stepCnt: number
    checkCnt: number
    likeCnt:number
  }

export type { RoadmapDetailType,RoadmapSumType };
