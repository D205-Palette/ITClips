package com.ssafy.itclips.bookmark.repository;

import com.ssafy.itclips.bookmark.entity.BookmarkLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkLikeRepository extends JpaRepository<BookmarkLike, Long> {
}
