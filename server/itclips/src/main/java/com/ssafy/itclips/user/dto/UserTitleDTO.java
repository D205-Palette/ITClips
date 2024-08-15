package com.ssafy.itclips.user.dto;

import com.ssafy.itclips.user.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserTitleDTO {
    private Long id;
    private String email;
    private String nickName;
    private String userImage;


    @Builder
    public UserTitleDTO(Long id, String email, String nickName, String userImage) {
        this.id = id;
        this.email = email;
        this.nickName = nickName;
        this.userImage = userImage;
    }

    public static UserTitleDTO toDTO(User user) {
        return UserTitleDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickName(user.getNickname())
                .build();
    }

    public void addUserImage(String userImage) {
        this.userImage = userImage;
    }
}
