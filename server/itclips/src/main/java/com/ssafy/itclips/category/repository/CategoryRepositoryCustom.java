package com.ssafy.itclips.category.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;

public interface CategoryRepositoryCustom {

    void deleteAllByBookmarklList(BookmarkList bookmarkList);
}
