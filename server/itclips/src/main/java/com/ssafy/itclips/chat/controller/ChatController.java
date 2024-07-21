package com.ssafy.itclips.chat.controller;

import com.ssafy.itclips.chat.dto.ChatMessage;
import com.ssafy.itclips.chat.dto.ChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@Controller
@Slf4j
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (message.getMessageType().equals(ChatMessage.MessageType.ENTER)) {
            message.setMessage(message.getSender() + "님이 입장하셨습니다. 👋🏼");
        }
        log.info(message.toString());
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}