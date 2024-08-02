package com.ssafy.itclips.chat.controller;

import com.ssafy.itclips.chat.dto.MessageDTO;
import com.ssafy.itclips.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

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
    public void message(MessageDTO message) {
        chatRoomService.publish(message);
    }
}