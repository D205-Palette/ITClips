package com.ssafy.itclips.follow.service;

import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.repository.FollowRepository;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {

    private final UserService userService;
    private final FollowRepository followRepository;

    @Transactional
    public Follow followUser(Long fromUserId, Long toUserId) {
        User fromUser = userService.getUserById(fromUserId);
        User toUser = userService.getUserById(toUserId);

        Follow follow = new Follow();
        follow.setFrom(fromUser);
        follow.setTo(toUser);

        return followRepository.save(follow);
    }

    @Transactional(readOnly = true)
    public List<Follow> getFollowing(Long userId) {
        User user = userService.getUserById(userId);
        return followRepository.findByFrom(user);
    }

    @Transactional
    public void unfollowUser(Long fromUserId, Long toUserId) {
        Follow follow = followRepository.findByFromAndTo(
                        userService.getUserById(fromUserId),
                        userService.getUserById(toUserId))
                .orElseThrow(() -> new FollowNotFoundException("Follow not found"));

        followRepository.delete(follow);
    }

    @Transactional(readOnly = true)
    public List<Follow> getFollowers(Long userId) {
        User user = userService.getUserById(userId);
        return followRepository.findByTo(user);
    }

    @Transactional
    public void deleteFollower(Long fromUserId, Long toUserId) {
        Follow follow = followRepository.findByFromAndTo(
                        userService.getUserById(fromUserId),
                        userService.getUserById(toUserId))
                .orElseThrow(() -> new FollowNotFoundException("Follow not found"));

        followRepository.delete(follow);
    }

    @Slf4j
    public static class FollowNotFoundException extends RuntimeException {
        public FollowNotFoundException(String message) {
            super(message);
        }
    }
}
