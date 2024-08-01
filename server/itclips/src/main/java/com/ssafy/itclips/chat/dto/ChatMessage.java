package com.ssafy.itclips.chat.dto;

import com.ssafy.itclips.chat.entity.Chat;
import com.ssafy.itclips.chat.entity.Message;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
// 메시지 DTO
    public ChatMessage() {
    }

    @Builder
    public ChatMessage( Long roomId,Long senderId, String senderName, String message) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.message = message;
        this.roomId = roomId;
    }

    private Long roomId; // 방번호
    private Long senderId; // 메시지 보낸사람
    private String senderName;//   보낸사람 이름
    private String message; // 메시지

    public Message toEntity(Chat chat){
        return Message.builder()
                .chat(chat)
                .read(false)
                .message(message)
                .build();
    }
}