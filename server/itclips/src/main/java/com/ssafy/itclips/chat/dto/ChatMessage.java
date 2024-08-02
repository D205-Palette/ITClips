package com.ssafy.itclips.chat.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatMessage {

    @Builder
    public ChatMessage(MessageType messageType, String roomId, String sender, String message,long userCount) {
        this.messageType = messageType;
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
        this.userCount = userCount;
    }

    // 입장 , 퇴장, 채팅
    public enum MessageType {
        ENTER, TALK , QUIT
    }

    private MessageType messageType; // 메시지 타입, 입장 퇴장, 채팅
    private String roomId; // 방번호
    private String sender; // 보낸 사람
    private String message; // 메시지
    private long userCount; // 채팅방 인원수
}
