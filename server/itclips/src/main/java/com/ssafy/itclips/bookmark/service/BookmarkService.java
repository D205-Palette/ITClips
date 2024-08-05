package com.ssafy.itclips.bookmark.service;

import com.ssafy.itclips.bookmark.dto.BookmarkRequestDTO;
import com.ssafy.itclips.bookmark.dto.BookmarkSummaryDTO;

public interface BookmarkService {
    void createBookmark(Long listId, Long categoryId, BookmarkRequestDTO bookmarkRequestDTO) throws RuntimeException;

    void updateBookmark(Long bookmarkId, BookmarkRequestDTO bookmarkRequestDTO) throws RuntimeException;

    void deleteBookmark(Long bookmarkId) throws RuntimeException;

    void likeBookmark(Long userId, Long bookmarkId) throws RuntimeException;

    void removeLikeBookmark(Long userId, Long bookmarkId) throws RuntimeException;

    BookmarkSummaryDTO getUrlSummary(Long bookmarkId) throws RuntimeException;
}
