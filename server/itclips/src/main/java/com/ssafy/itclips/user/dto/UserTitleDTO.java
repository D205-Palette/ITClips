package com.ssafy.itclips.user.dto;

import com.ssafy.itclips.user.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserTitleDTO {
    private Long id;
    private String nickName;

    @Builder
    public UserTitleDTO(Long id, String nickName) {
        this.id = id;
        this.nickName = nickName;
    }

    public static UserTitleDTO toDTO(User user) {
        return UserTitleDTO.builder()
                .id(user.getId())
                .nickName(user.getNickname())
                .build();
    }
}
