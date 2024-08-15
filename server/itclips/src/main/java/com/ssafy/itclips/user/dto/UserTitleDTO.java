package com.ssafy.itclips.user.dto;

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
}
