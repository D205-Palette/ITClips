package com.ssafy.itclips.bookmark.service;

import com.ssafy.itclips.bookmark.dto.BookmarkRequestDTO;

public interface BookmarkService {
    void createBookmark(Long listId, Long categoryId, BookmarkRequestDTO bookmarkRequestDTO) throws RuntimeException;
}
