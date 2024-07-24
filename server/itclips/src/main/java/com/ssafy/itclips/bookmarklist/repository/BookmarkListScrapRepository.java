package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkListScrap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkListScrapRepository extends JpaRepository<BookmarkListScrap, Long> {
    BookmarkListScrap findByUserIdAndBookmarkListId(Long userId, Long bookmarkListId);
}
