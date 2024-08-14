package com.ssafy.itclips.follow.dto;

import com.ssafy.itclips.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowDetailDTO {
    private Long id;
    private Long fromUserId;
    private Long toUserId;
    private String nickname;
    private String profileImage;
    private String email;
    private List<Tag> tags;
}
