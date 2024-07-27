package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.user.entity.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTagRepository extends JpaRepository<UserTag,Long> {
    List<UserTag> findByUserId(Long userId);
}
