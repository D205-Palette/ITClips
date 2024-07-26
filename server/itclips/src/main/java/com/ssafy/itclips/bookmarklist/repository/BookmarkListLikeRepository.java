package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkListLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkListLikeRepository extends JpaRepository<BookmarkListLike, Long> {
    BookmarkListLike findByBookmarkListIdAndUserId(Long bookmarkListId, Long userId);

    Boolean existsByBookmarkListIdAndUserId(Long id, Long userId);
}
