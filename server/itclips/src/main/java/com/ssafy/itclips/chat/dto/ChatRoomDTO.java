package com.ssafy.itclips.chat.dto;

import com.ssafy.itclips.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDTO implements Serializable {

    private Long id;
    private String name;
    private String lastMessage;
    private LocalDateTime lastModified;
    private Long messageCnt;

    @Builder
    public ChatRoomDTO(Long roomId, String name,String lastMessage,LocalDateTime lastModified,Long messageCnt) {
        this.id = roomId;
        this.name = name;
        this.lastMessage = lastMessage;
        this.lastModified = lastModified;
        this.messageCnt = messageCnt;
    }

    public static ChatRoomDTO toDto(ChatRoom chatRoom) {
        return ChatRoomDTO.builder()
                .roomId(chatRoom.getId())
                .name(chatRoom.getName())
                .lastMessage(chatRoom.getLastMessage())
                .build();
    }
}