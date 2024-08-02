package com.ssafy.itclips.feed.repository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Slf4j
@RequiredArgsConstructor
@Repository
public class FeedRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    HashOperations<String, String, String> hashOps;

    @PostConstruct
    private void init() {
        hashOps = redisTemplate.opsForHash();
    }

}
