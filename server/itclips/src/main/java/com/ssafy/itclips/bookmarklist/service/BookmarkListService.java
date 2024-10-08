package com.ssafy.itclips.bookmarklist.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListDetailDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListRoadmapDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.global.file.DataResponseDto;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.tag.dto.TagSearchDTO;

import java.util.List;

public interface BookmarkListService {
    DataResponseDto createBookmarkList(Long userId, BookmarkListDTO bookmarkListDTO) throws RuntimeException;

    DataResponseDto updateBookmarkList(Long userId, Long listId, BookmarkListDTO bookmarkListDTO) throws RuntimeException;

    void deleteBookmarkList(Long userId, Long listId) throws RuntimeException;

    List<BookmarkListResponseDTO> getLists(Long userId, Long viewerId, Boolean target) throws RuntimeException;

    void createBookmarkListLike(Long userId, Long listId) throws RuntimeException;

    void deleteBookmarkListLike(Long userId, Long listId) throws RuntimeException;

    void scrapBookmarkList(Long userId, Long listId) throws RuntimeException;

    void removeScrapBookmarkList(Long userId, Long listId) throws RuntimeException;

    List<BookmarkListResponseDTO> getScrapedLists(Long userId, Long viewerId) throws RuntimeException;

    BookmarkListDetailDTO getListDetail(Long userId, Long listId) throws RuntimeException;

    BookmarkListResponseDTO convertToBookmarkListResponseDTO(BookmarkList bookmarkList, Long viewerId);

    BookmarkListRoadmapDTO getBookmarkListResponseDTO(Long listId) throws RuntimeException;

    List<RankDTO> getListsRankingByLikes() throws RuntimeException;

    List<RankDTO> getListsRankingByHit() throws RuntimeException;

    List<RankDTO> getListsRankingByScrap() throws RuntimeException;

    List<BookmarkListResponseDTO> searchLists(Integer page, String searchType, Long userId, String title) throws RuntimeException;

    List<BookmarkListResponseDTO> searchListsByTags(Integer page, Long userId, TagSearchDTO tagSearchDTO) throws RuntimeException;
}
