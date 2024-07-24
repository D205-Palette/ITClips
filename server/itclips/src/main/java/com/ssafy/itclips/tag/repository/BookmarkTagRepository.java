package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.tag.entity.BookmarkTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkTagRepository extends JpaRepository<BookmarkTag, Long>, BookmarkTagRepositoryCustom {

    List<BookmarkTag> findByBookmarkId(Long bookmarkId);
}
