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
    public List<Long> getUserFeed(Long userId, String key) {
        return hashOps.get(key,userId);
    }

    //로드맵 저장
    public void saveFeed(Long userId, Long roadmapId, String key) {
        List<Long> ids = hashOps.get(key,userId);

        if(ids==null){
            ids = new ArrayList<>();
        }
        ids.add(roadmapId);
        hashOps.put(key,userId,ids);

        redisTemplate.expire(key, 7, TimeUnit.DAYS);
    }
}
