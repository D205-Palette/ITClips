package com.ssafy.itclips.feed.repository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Repository
public class FeedRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    // 피드 정보 담을 객체 "bookmarkFeed / roadmapFeed", userId, roadmapId
    HashOperations<String, Long, List<Long>> hashOps;

    @PostConstruct
    private void init() {
        hashOps= redisTemplate.opsForHash();

    }

    //유저 로드맵 피드
    public List<Long> getUserRoadmapFeed(Long userId) {
        return hashOps.get("roadmapFeed",userId);
    }

    //로드맵 저장
    public void saveRoadmapFeed(Long userId, Long roadmapId) {
        List<Long> ids = hashOps.get("roadmapFeed",userId);

        if(ids==null){
            ids = new ArrayList<>();
        }
        ids.add(roadmapId);
        hashOps.put("roadmapFeed",userId,ids);

        redisTemplate.expire("roadmapFeed", 7, TimeUnit.DAYS);
    }
}
