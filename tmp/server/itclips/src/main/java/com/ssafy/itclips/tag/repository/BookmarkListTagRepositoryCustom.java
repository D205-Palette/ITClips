package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;

public interface BookmarkListTagRepositoryCustom {

    void deleteAllByBookmarklList(BookmarkList bookmarkList);
}
