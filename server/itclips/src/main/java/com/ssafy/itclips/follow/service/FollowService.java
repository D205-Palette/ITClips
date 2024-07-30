package com.ssafy.itclips.follow.service;

import com.ssafy.itclips.follow.entity.Follow;

import java.util.List;

public interface FollowService {

    Follow followUser(Long fromUserId, Long toUserId);

    List<Follow> getFollowing(Long userId);

    void unfollowUser(Long fromUserId, Long toUserId);

    List<Follow> getFollowers(Long userId);

    void deleteFollower(Long fromUserId, Long toUserId);

}
