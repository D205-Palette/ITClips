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
    private String userImage;

    @Builder
    public UserTitleDTO(Long id, String nickName) {
        this.id = id;
        this.nickName = nickName;
    }

    @Builder
    public UserTitleDTO(Long id, String nickName, String userImage) {
        this.id = id;
        this.nickName = nickName;
        this.userImage = userImage;
    }

    public static UserTitleDTO toDTO(User user) {
        return UserTitleDTO.builder()
                .id(user.getId())
                .nickName(user.getNickname())
                .build();
    }

    public void addUserImage(String userImage) {
        this.userImage = userImage;
    }
}
