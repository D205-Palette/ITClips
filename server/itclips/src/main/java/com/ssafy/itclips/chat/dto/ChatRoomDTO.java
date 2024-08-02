package com.ssafy.itclips.chat.dto;

import com.ssafy.itclips.chat.entity.Chat;
import com.ssafy.itclips.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDTO implements Serializable {

    private Long id;
    private String name;
    private String lastMessage;

    @Builder
    public ChatRoomDTO(Long roomId, String name,String lastMessage) {
        this.id = roomId;
        this.name = name;
        this.lastMessage = lastMessage;
    }

    public static ChatRoomDTO toDto(ChatRoom chatRoom) {
        return ChatRoomDTO.builder()
                .roomId(chatRoom.getId())
                .name(chatRoom.getName())
                .lastMessage("마지막 메시지 메시지 전송할때 레디스에 넣기")
                .build();
    }
}