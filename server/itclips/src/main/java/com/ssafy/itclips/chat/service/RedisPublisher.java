package com.ssafy.itclips.chat.service;

import com.ssafy.itclips.chat.dto.MessageDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private static final Logger log = LoggerFactory.getLogger(RedisPublisher.class);
    private final RedisTemplate<String, Object> redisTemplate;


    public void publish(ChannelTopic topic, MessageDTO message) {
        //TODO : 메세지 보낼 채팅 topic 없으면 db에 방찾고 없으면 에러 있으면 topic redis 에 넣고 메세지 보내기
        log.info("Publishing message to {}", topic.getTopic());
        log.info("Publishing message to {}", topic);
        log.info("Message content: {}", message.getMessage());
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
}