package com.ssafy.itclips.feed.service;

import com.ssafy.itclips.feed.repository.FeedRepository;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.HashOperations;

import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class FeedServiceImpl implements FeedService{

    private final FeedRepository feedRepository;

    // 로드맵 피드 출력
    @Override
    public List<RoadmapInfoDTO> getRoadmapFeed(Long userId) {
        return List.of();
    }

    // 로드맵 피드 저장
    @Override
    public void saveRoadmapFeed(Long userId, Long roadmapId) {

    }
}
