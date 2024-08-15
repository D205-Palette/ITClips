package com.ssafy.itclips.feed.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;

import java.util.List;

public interface FeedService {
    // 로드맵 피드 출력
    List<RoadmapInfoDTO> getRoadmapFeed(Long userId);

    // 피드 레디스 저장
    void saveRoadmapFeed(Long userId, Long roadmapId);

    //북마크 피드 출력
    List<BookmarkListResponseDTO> getListFeed(Long userId);

}
