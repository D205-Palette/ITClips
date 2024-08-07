// 로드맵 상세보기 데이터
type RoadmapDetailType = {
  id: number;
  userId: number;
  origin: any;
  userName: string;
  title: string;
  description: string;
  createdAt: string;
  image: string;
  isPublic: number;
  stepList: StepListType[];
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
  isLiked: boolean;
};

type StepListType = {
  id: number;
  roadmapId: number;
  bookmarkListRoadmapDTO: {
    id: number;
    title: string;
    description: string;
    bookmarkCount: number;
    likeCount: number;
    image: string;
    tags: { title: string }[];
    users: { id: number; nickName: string }[];
  };
  check: boolean;
  order: number;
};

// 로드맵 간략 보기 데이터
type RoadmapSumType = {
  id: number;
  userId: number;
  userName: string;
  title: string;
  description: string;
  image: string;
  isPublic: number;
  createdAt: string;
  stepCnt: number;
  checkCnt: number;
  likeCnt: number;
  steps: StepType[];
  isLiked: boolean;
};

type StepType = {
  id: number;
  listId: number;
  listTitle: string;
  order: number;
  check: boolean;
};
export type { RoadmapDetailType, RoadmapSumType, StepListType, StepType };
