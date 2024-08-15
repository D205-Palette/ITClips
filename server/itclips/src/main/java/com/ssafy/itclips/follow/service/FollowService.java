package com.ssafy.itclips.follow.service;

import com.ssafy.itclips.follow.dto.FollowDetailDTO;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.user.entity.User;

import java.util.List;

public interface FollowService {

    Follow followUser(Long fromUserId, Long toUserId) throws RuntimeException;

    List<FollowDetailDTO> getFollowing(Long userId) throws RuntimeException;

    void unfollowUser(Long fromUserId, Long toUserId) throws RuntimeException;

    List<FollowDetailDTO> getFollowers(Long userId) throws RuntimeException;

    void deleteFollower(Long fromUserId, Long toUserId) throws RuntimeException;

    long getFollowerCount(User user) throws RuntimeException;

    long getFollowingCount(User user) throws RuntimeException;

    boolean isFollowing(User currentUser, User targetUser);

    boolean isFollowedBy(User targetUser, User currentUser);

}
