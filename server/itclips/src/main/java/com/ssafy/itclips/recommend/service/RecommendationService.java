package com.ssafy.itclips.recommend.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;

import java.util.List;

public interface RecommendationService {

    List<BookmarkListResponseDTO> getPythonRecommendBookmarks(Long userId) throws RuntimeException;
}
