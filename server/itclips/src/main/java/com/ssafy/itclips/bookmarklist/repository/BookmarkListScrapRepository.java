package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.entity.BookmarkListScrap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkListScrapRepository extends JpaRepository<BookmarkListScrap, Long> {
    BookmarkListScrap findByUserIdAndBookmarkListId(Long userId, Long bookmarkListId);
    List<BookmarkListScrap> findByUserId(Long userId);
}
