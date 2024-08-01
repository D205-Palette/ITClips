package com.ssafy.itclips.chat.dto;

import com.ssafy.itclips.chat.entity.Chat;
import com.ssafy.itclips.chat.entity.Message;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageDTO {
// 메시지 DTO
    public MessageDTO() {
    }

    @Builder
    public MessageDTO(Long roomId, Long senderId, String senderName, String message, String createdAt) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.message = message;
        this.roomId = roomId;
        this.createdAt = createdAt;
    }

    private Long roomId; // 방번호
    private Long senderId; // 메시지 보낸사람
    private String senderName;//   보낸사람 이름
    private String message; // 메시지
    private String createdAt;

    public Message toEntity(Chat chat){
        return Message.builder()
                .chat(chat)
                .read(false)
                .message(message)
                .build();
    }
    public static MessageDTO toDTO(Message message, Chat chat){
        return MessageDTO.builder()
                .message(message.getMessage())
                .senderId(chat.getUser().getId())
                .roomId(chat.getRoom().getId())
                .senderName(chat.getUser().getNickname())
                .createdAt(message.getCreatedAt().toString())
                .build();
    }
}