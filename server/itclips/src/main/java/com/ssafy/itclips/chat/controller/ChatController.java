package com.ssafy.itclips.chat.controller;

import com.ssafy.itclips.chat.dto.ChatMessage;
import com.ssafy.itclips.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;


@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChannelTopic channelTopic;
    private final RedisTemplate<String, Object> redisTemplate;
    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {

        if (ChatMessage.MessageType.ENTER.equals(message.getMessageType())) {
            message.setSender("[알림]");
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisTemplate.convertAndSend(channelTopic.getTopic(),message);
    }
}