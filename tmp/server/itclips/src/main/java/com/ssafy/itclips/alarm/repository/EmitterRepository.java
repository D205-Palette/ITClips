package com.ssafy.itclips.alarm.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {

    SseEmitter save(String emitterId, SseEmitter sseEmitter);

    void saveEventCache(String emitterId, Object event);

    Map<String, SseEmitter> findAllEmitterStartWithByUserId(String userId);

    Map<String, Object> findAllEventCacheStartWithByUserId(String userId);

    //삭제
    void deleteById(String emitterId);

    void deleteAllEmitterStartWithId(String userId);

    void deleteAllEventCacheStartWithId(String userId);
}
