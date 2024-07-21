package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.tag.entity.BookmarkListTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkListTagRepository extends JpaRepository<BookmarkListTag, Long> {

    List<BookmarkListTag> findByBookmarkListId(Long bookmarkListId);
}
