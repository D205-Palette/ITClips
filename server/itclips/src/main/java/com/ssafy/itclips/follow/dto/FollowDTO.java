package com.ssafy.itclips.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowDTO {
    private Long id;
    private Long fromUserId;
    private Long toUserId;
}
