import { authenticatedRequest } from "./apiUtils";

// 팔로잉 목록 조회
export const getFollowingList = (userId: number) => {
  return authenticatedRequest("get", "/follow/following", undefined, { userId });
};

// 팔로워 목록 조회
export const getFollowerList = (userId: number) => {
  return authenticatedRequest("get", "/follow/followers", undefined, { userId });
};

// 팔로워 및 팔로잉 수 조회
export const getFollowCounts = (userId: number) => {
  return authenticatedRequest("get", "/follow/count", undefined, { userId })
}

// 팔로우 (팔로잉 추가)
export const follow = (fromUserId: number, toUserId: number) => {
  return authenticatedRequest("post", "/follow/follow", undefined, { fromUserId, toUserId })
}


// 팔로잉 취소 (팔로잉 삭제)
export const unfollow = (fromUserId: number, toUserId: number) => {
  return authenticatedRequest("post", "/follow/unfollow", undefined, { fromUserId, toUserId })
}

// 팔로워 삭제 - 수정필요
export const removeFollower = (fromUserId: number, toUserId: number) => {
  return authenticatedRequest("delete", "/follow/unfollow", undefined, { fromUserId, toUserId })
}