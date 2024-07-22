package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;

public interface BookmarkListService {
    void createBookmarkList(Long userId, BookmarkListDTO bookmarkListDTO) throws RuntimeException;

    void updateBookmarkList(Long userId, Long listId, BookmarkListDTO bookmarkListDTO);

    void deleteBookmarkList(Long userId, Long listId);
}
