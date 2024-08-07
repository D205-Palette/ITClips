package com.ssafy.itclips.recommend.service;

import com.ssafy.itclips.recommend.dto.SimilarBookmarkResponse;

import java.util.List;
import java.util.Map;

public interface RecommendationService {

    List<SimilarBookmarkResponse> getPythonRecommendBookmarks(Long userId);
}
