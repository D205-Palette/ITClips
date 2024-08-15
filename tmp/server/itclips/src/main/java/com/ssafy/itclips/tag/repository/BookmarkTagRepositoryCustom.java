package com.ssafy.itclips.tag.repository;

import com.ssafy.itclips.bookmark.entity.Bookmark;

public interface BookmarkTagRepositoryCustom {
    void deleteAllByBookmark(Bookmark bookmark);
}
