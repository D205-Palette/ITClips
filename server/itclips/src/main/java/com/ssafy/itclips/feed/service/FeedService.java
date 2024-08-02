package com.ssafy.itclips.feed.service;

import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;

import java.util.List;

public interface FeedService {
    // 로드맵 피드 출력
    List<RoadmapInfoDTO> getRoadmapFeed(Long userId);

    // 피드 레디스 저장
    void saveRoadmapFeed(Long userId, Long roadmapId);
}
