package com.ssafy.itclips.follow.service;

import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.user.entity.User;

import java.util.List;

public interface FollowService {

    Follow followUser(Long fromUserId, Long toUserId);

    List<Follow> getFollowing(Long userId);

    void unfollowUser(Long fromUserId, Long toUserId);

    List<Follow> getFollowers(Long userId);

    void deleteFollower(Long fromUserId, Long toUserId);

    long getFollowerCount(User user);

    long getFollowingCount(User user);

}
