package com.ssafy.itclips.group.repository;

import com.ssafy.itclips.group.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<UserGroup, Long>, GroupRepositoryCustom {

    List<UserGroup> findByBookmarkListId(Long bookmarkListId);

}
