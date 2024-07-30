package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListDetailDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListRoadmapDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;

import java.util.List;

public interface BookmarkListService {
    void createBookmarkList(Long userId, BookmarkListDTO bookmarkListDTO) throws RuntimeException;

    void updateBookmarkList(Long userId, Long listId, BookmarkListDTO bookmarkListDTO) throws RuntimeException;

    void deleteBookmarkList(Long userId, Long listId) throws RuntimeException;

    List<BookmarkListResponseDTO> getLists(Long userId,Boolean target) throws RuntimeException;

    void createBookmarkListLike(Long userId, Long listId) throws RuntimeException;

    void deleteBookmarkListLike(Long userId, Long listId) throws RuntimeException;

    void scrapBookmarkList(Long userId, Long listId) throws RuntimeException;

    void removeScrapBookmarkList(Long scrapId) throws RuntimeException;

    List<BookmarkListResponseDTO> getScrapedLists(Long userId) throws RuntimeException;

    BookmarkListDetailDTO getListDetail(Long userId, Long listId) throws RuntimeException;

    BookmarkListRoadmapDTO getBookmarkListResponseDTO(Long listId) throws RuntimeException;
}
