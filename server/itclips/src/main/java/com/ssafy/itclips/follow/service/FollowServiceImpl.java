package com.ssafy.itclips.follow.service;

import com.ssafy.itclips.alarm.entity.NotificationType;
import com.ssafy.itclips.alarm.service.NotificationService;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.follow.dto.FollowDetailDTO;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.repository.FollowRepository;
import com.ssafy.itclips.global.file.FileService;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.UserTagRepository;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.entity.UserTag;
import com.ssafy.itclips.user.repository.UserRepository;
import com.ssafy.itclips.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {

    private final UserService userService;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final FileService fileService;
    private final UserTagRepository userTagRepository;

    @Transactional
    @Override
    public Follow followUser(Long fromUserId, Long toUserId) throws RuntimeException {
        if (fromUserId == null || toUserId == null) {
            throw new CustomException(ErrorCode.INVALID_FOLLOW_REQUEST);
        }

        User fromUser = userService.getUserById(fromUserId);
        User toUser = userService.getUserById(toUserId);

        // 이미 팔로우 중인지
        Optional<Follow> existingFollow = followRepository.findByFromAndTo(fromUser, toUser);
        if (existingFollow.isPresent()) {
            throw new CustomException(ErrorCode.FOLLOW_ALREADY_EXISTS);
        }

        Follow follow = new Follow();
        follow.setFrom(fromUser);
        follow.setTo(toUser);

        Follow savedFollw = followRepository.save(follow);

        //알림 전송
        notificationService.sendNotification(fromUserId, toUserId, fromUserId, fromUser.getNickname(), NotificationType.FOLLOW);

        return savedFollw;
    }

    @Transactional(readOnly = true)
    @Override
    public List<FollowDetailDTO> getFollowing(Long userId) throws RuntimeException {
        List<Follow> followingList = followRepository.findByFromId(userId);

        return followingList.stream().map(follow -> {
            User followedUser = userRepository.findById(follow.getTo().getId()).orElse(null);

            List<String> tagNames = followedUser != null
                    ? userTagRepository.findByUserId(followedUser.getId()).stream()
                    .map(userTag -> userTag.getTag().getTitle())
                    .collect(Collectors.toList())
                    : List.of();

            return new FollowDetailDTO(
                    follow.getId(),
                    follow.getFrom().getId(),
                    follow.getTo().getId(),
                    followedUser != null ? followedUser.getNickname() : null,
                    followedUser != null ? getImageUrl(followedUser.getProfileImage()) : null,
                    followedUser != null ? followedUser.getEmail() : null,
                    tagNames
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void unfollowUser(Long fromUserId, Long toUserId) throws RuntimeException {
        Follow follow = followRepository.findByFromAndTo(
                        userService.getUserById(fromUserId),
                        userService.getUserById(toUserId))
                .orElseThrow(() -> new CustomException(ErrorCode.UNFOLLOW_NOT_FOUND));

        // 알림 전송 삭제
        notificationService.deleteNotification(fromUserId, toUserId, fromUserId , NotificationType.FOLLOW);

        followRepository.delete(follow);
    }

    @Transactional(readOnly = true)
    @Override
    public List<FollowDetailDTO> getFollowers(Long userId) throws RuntimeException {
        List<Follow> followersList = followRepository.findByToId(userId);

        return followersList.stream().map(follow -> {
            User followerUser = userRepository.findById(follow.getFrom().getId()).orElse(null);

            List<String> tagNames = followerUser != null
                    ? userTagRepository.findByUserId(followerUser.getId()).stream()
                    .map(userTag -> userTag.getTag().getTitle())
                    .collect(Collectors.toList())
                    : List.of();

            return new FollowDetailDTO(
                    follow.getId(),
                    follow.getFrom().getId(),
                    follow.getTo().getId(),
                    followerUser != null ? followerUser.getNickname() : null,
                    followerUser != null ? getImageUrl(followerUser.getProfileImage()) : null,
                    followerUser != null ? followerUser.getEmail() : null,
                    tagNames
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteFollower(Long fromUserId, Long toUserId) throws RuntimeException {
        Follow follow = followRepository.findByFromAndTo(
                        userService.getUserById(fromUserId),
                        userService.getUserById(toUserId))
                .orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_FOUND));

        followRepository.delete(follow);
    }

    @Transactional(readOnly = true)
    @Override
    public long getFollowerCount(User user) throws RuntimeException {
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return followRepository.countByTo(user);
    }

    @Transactional(readOnly = true)
    @Override
    public long getFollowingCount(User user) throws RuntimeException {
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return followRepository.countByFrom(user);
    }

    @Override
    public boolean isFollowing(User currentUser, User targetUser) {
        return followRepository.existsByFromUserAndToUser(currentUser, targetUser);
    }

    @Override
    public boolean isFollowedBy(User targetUser, User currentUser) {
        return followRepository.existsByFromUserAndToUser(targetUser, currentUser);
    }

    private String getImageUrl(String imageUrl) {
        if(!"default".equals(imageUrl)) {
            imageUrl = fileService.getPresignedUrl("images", imageUrl, false).get("url");
        }
        return imageUrl;
    }
}
