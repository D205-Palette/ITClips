package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface BookmarkListRepository extends JpaRepository<BookmarkList, Long>, BookmarkListRepositoryCustom {

    Optional<BookmarkList> findByTitle(String title);
    Optional<List<BookmarkList>> findByUserId(Long userId);
    List<BookmarkList> findTop10ByIsPublicTrueOrderByHitDesc();
}

