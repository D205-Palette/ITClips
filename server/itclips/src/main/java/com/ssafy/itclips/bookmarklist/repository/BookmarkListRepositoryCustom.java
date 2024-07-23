package com.ssafy.itclips.bookmarklist.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;

import java.util.List;

public interface BookmarkListRepositoryCustom {
    List<BookmarkList> findDetailedByUserId(Long userId);
}
