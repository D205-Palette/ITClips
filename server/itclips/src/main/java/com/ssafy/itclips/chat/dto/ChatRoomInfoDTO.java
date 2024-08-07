package com.ssafy.itclips.chat.dto;

import com.ssafy.itclips.chat.entity.Chat;
import com.ssafy.itclips.chat.entity.ChatRoom;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomInfoDTO {
    private Long roomId;
    private String roomName;
    private List<UserTitleDTO> userTitles;

    @Builder
    public ChatRoomInfoDTO(Long roomId, String roomName, List<UserTitleDTO> userTitles) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.userTitles = userTitles;
    }

    public static ChatRoomInfoDTO toDTO(Chat chat, List<UserTitleDTO> userTitles) {
        return ChatRoomInfoDTO.builder()
                .roomId(chat.getRoom().getId())
                .roomName(chat.getRoom().getName())
                .userTitles(userTitles)
                .build();
    }
}
