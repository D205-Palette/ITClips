package com.ssafy.itclips.chat.dto;

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

    @Builder
    public ChatRoomDTO(Long roomId, String name) {
        this.id = roomId;
        this.name = name;
    }
}