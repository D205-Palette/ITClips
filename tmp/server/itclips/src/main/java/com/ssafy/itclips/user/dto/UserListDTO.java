package com.ssafy.itclips.user.dto;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class UserListDTO {
    private Long id;
    private String email;
    private String nickname;
    private String profileImage;
    private List<TagDTO> tags;

    @Builder
    public UserListDTO(Long id, String email, String nickname, String profileImage, List<TagDTO> tags) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.tags = tags;
    }

    public static UserListDTO toDTO(User user, List<TagDTO> tags){
        return UserListDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .tags(tags)
                .build();
    }
}
