package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.tag.entity.BookmarkListTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkListTagRepository extends JpaRepository<BookmarkListTag, Long>, BookmarkListTagRepositoryCustom {

    List<BookmarkListTag> findByBookmarkListId(Long bookmarkListId);

}

