package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.entity.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTagRepository extends JpaRepository<UserTag,Long> {
    List<UserTag> findByUserId(Long userId);
    Optional<UserTag> findByUserAndTag(User userId, Tag tagId);
}
