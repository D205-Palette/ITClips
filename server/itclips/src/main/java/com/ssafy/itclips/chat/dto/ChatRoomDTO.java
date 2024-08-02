package com.ssafy.itclips.chat.dto;

import com.ssafy.itclips.chat.entity.Chat;
import com.ssafy.itclips.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDTO implements Serializable {

    private Long id;
    private String name;
    private String lastMessage;
    private LocalDateTime lastModified;

    @Builder
    public ChatRoomDTO(Long roomId, String name,String lastMessage,LocalDateTime lastModified) {
        this.id = roomId;
        this.name = name;
        this.lastMessage = lastMessage;
        this.lastModified = lastModified;
    }

    public static ChatRoomDTO toDto(ChatRoom chatRoom) {
        return ChatRoomDTO.builder()
                .roomId(chatRoom.getId())
                .name(chatRoom.getName())
                .lastMessage(chatRoom.getLastMessage())
                .lastModified(chatRoom.getLastModified())
                .build();
    }
}