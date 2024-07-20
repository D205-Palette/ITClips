package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;

public interface BookmarkListService {
    void createBookmarkList(Long userId, BookmarkListDTO bookmarkListDTO) throws RuntimeException;
}
