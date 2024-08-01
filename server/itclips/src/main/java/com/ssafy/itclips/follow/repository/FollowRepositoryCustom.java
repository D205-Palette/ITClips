package com.ssafy.itclips.follow.repository;

import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface FollowRepositoryCustom {

    List<Follow> findByFrom(User fromUser);

    List<Follow> findByTo(User toUser);

    Optional<Follow> findByFromAndTo(User fromUser, User toUser);

    long countByTo(User user);

    long countByFrom(User user);

    List<Follow> findByFromId(Long userId);

    List<Follow> findByToId(Long userId);
}
