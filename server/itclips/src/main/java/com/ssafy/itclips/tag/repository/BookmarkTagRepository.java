package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.tag.entity.BookmarkTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkTagRepository extends JpaRepository<BookmarkTag, Long>, BookmarkTagRepositoryCustom {

    List<BookmarkTag> findByBookmarkId(Long bookmarkId);
}
