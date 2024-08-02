import axios from "axios";
import { API_BASE_URL } from "../config";
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

// 팔로우 (팔로잉 추가) - 수정필요
export const follow = () => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/follow/follow`
  })
}


// 팔로잉 취소 (팔로잉 삭제) - 수정필요
export const unfollow = () => {
  return axios({
    method: "delete",
    url: `${API_BASE_URL}/follow/unfollow`
  })
}

// 팔로워 삭제 - 수정필요
export const removeFollower = () => {
  return axios({
    method: "delete",
    url: `${API_BASE_URL}/follow/follower`
  })
}