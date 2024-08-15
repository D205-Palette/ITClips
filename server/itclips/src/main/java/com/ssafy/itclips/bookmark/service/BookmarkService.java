package com.ssafy.itclips.bookmark.service;

import com.ssafy.itclips.bookmark.dto.BookmarkRequestDTO;
import com.ssafy.itclips.global.gpt.GPTResponseDTO;

public interface BookmarkService {
    void createBookmark(Long userId, Long listId, Long categoryId, BookmarkRequestDTO bookmarkRequestDTO) throws RuntimeException;

    void updateBookmark(Long userId, Long bookmarkId, BookmarkRequestDTO bookmarkRequestDTO) throws RuntimeException;

    void deleteBookmark(Long userId, Long bookmarkId) throws RuntimeException;

    void likeBookmark(Long userId, Long bookmarkId) throws RuntimeException;

    void removeLikeBookmark(Long userId, Long bookmarkId) throws RuntimeException;

    GPTResponseDTO getUrlSummary(Long bookmarkId) throws RuntimeException;
}
