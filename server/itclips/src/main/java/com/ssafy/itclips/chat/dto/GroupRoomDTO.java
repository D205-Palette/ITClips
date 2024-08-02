package com.ssafy.itclips.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GroupRoomDTO {
    // 그룹 채팅방 생성할때 쓰는 DTO입니다.

    private Long id;
    private String name;
    private List<Long> userIds;

    @Builder
    public GroupRoomDTO(Long id, String name, List<Long> userIds) {
        this.id = id;
        this.name = name;
        this.userIds = userIds;
    }
}
