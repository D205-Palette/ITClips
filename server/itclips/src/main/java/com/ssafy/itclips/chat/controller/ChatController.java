package com.ssafy.itclips.chat.controller;

import com.ssafy.itclips.chat.dto.ChatMessage;
import com.ssafy.itclips.chat.repository.ChatRoomRepository;
import com.ssafy.itclips.chat.service.ChatRoomService;
import com.ssafy.itclips.chat.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@Controller
@Slf4j
public class ChatController {


    private final ChatRoomService chatRoomService;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    // 메세지 보내기
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        chatRoomService.publish(message);
    }
}