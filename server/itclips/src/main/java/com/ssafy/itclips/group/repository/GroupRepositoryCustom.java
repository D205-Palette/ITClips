package com.ssafy.itclips.group.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;

public interface GroupRepositoryCustom {
    void deleteByBookmarkListAndUserIdNot(BookmarkList bookmarkList, Long userId);
}
