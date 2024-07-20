package com.ssafy.itclips.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private  final SimpMessageSendingOperations simpMessageSendingOperations;


    @MessageMapping("/chat")
    public void message(){

    }
}
