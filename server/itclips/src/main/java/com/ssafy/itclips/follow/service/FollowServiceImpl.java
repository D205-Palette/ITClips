package com.ssafy.itclips.follow.service;

import com.ssafy.itclips.follow.dto.FollowDetailDTO;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.repository.FollowRepository;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import com.ssafy.itclips.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {

    private final UserService userService;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

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
    public List<FollowDetailDTO> getFollowing(Long userId) {
        List<Follow> followingList = followRepository.findByFromId(userId);

        return followingList.stream().map(follow -> {
            User followedUser = userRepository.findById(follow.getTo().getId()).orElse(null);
            return new FollowDetailDTO(
                    follow.getId(),
                    follow.getFrom().getId(),
                    follow.getTo().getId(),
                    followedUser != null ? followedUser.getNickname() : null,
                    followedUser != null ? followedUser.getProfileImage() : null,
                    followedUser != null ? followedUser.getEmail() : null
            );
        }).collect(Collectors.toList());
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
    public List<FollowDetailDTO> getFollowers(Long userId) {
        List<Follow> followersList = followRepository.findByToId(userId);

        return followersList.stream().map(follow -> {
            User followerUser = userRepository.findById(follow.getFrom().getId()).orElse(null);
            return new FollowDetailDTO(
                    follow.getId(),
                    follow.getFrom().getId(),
                    follow.getTo().getId(),
                    followerUser != null ? followerUser.getNickname() : null,
                    followerUser != null ? followerUser.getProfileImage() : null,
                    followerUser != null ? followerUser.getEmail() : null
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    public void deleteFollower(Long fromUserId, Long toUserId) {
        Follow follow = followRepository.findByFromAndTo(
                        userService.getUserById(fromUserId),
                        userService.getUserById(toUserId))
                .orElseThrow(() -> new FollowNotFoundException("Follow not found"));

        followRepository.delete(follow);
    }

    @Transactional(readOnly = true)
    public long getFollowerCount(User user) {
        return followRepository.countByTo(user);
    }

    @Transactional(readOnly = true)
    public long getFollowingCount(User user) {
        return followRepository.countByFrom(user);
    }

    @Slf4j
    public static class FollowNotFoundException extends RuntimeException {
        public FollowNotFoundException(String message) {
            super(message);
        }
    }
}
