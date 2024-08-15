package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.tag.entity.BookmarkListTag;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface BookmarkListTagRepository extends JpaRepository<BookmarkListTag, Long>, BookmarkListTagRepositoryCustom {

    List<BookmarkListTag> findByBookmarkListId(Long bookmarkListId);

}

