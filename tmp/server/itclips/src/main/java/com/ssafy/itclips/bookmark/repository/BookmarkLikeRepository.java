package com.ssafy.itclips.bookmark.repository;

import com.ssafy.itclips.bookmark.entity.BookmarkLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkLikeRepository extends JpaRepository<BookmarkLike, Long> {
    BookmarkLike findByBookmarkIdAndUserId(Long bookmarkId, Long userId);

    Boolean existsByBookmarkIdAndUserId(Long id, Long userId);
}
