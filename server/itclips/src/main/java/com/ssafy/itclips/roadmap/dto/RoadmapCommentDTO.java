package com.ssafy.itclips.roadmap.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RoadmapCommentDTO {
    private Long id; // 댓글 아이디
    private String comment; // 댓글 내용
    private Long userId; // 댓글 쓴 유저
    private String userName; // 유저 닉네임
    private Long RoadmapId; // 로드맵 아이디
    private LocalDateTime createdAt; // 생성 시간

    @Builder
    public RoadmapCommentDTO(Long id, String comment, Long userId,String userName, Long RoadmapId, LocalDateTime createdAt) {
        this.id = id;
        this.comment = comment;
        this.userId = userId;
        this.userName = userName;
        this.RoadmapId = RoadmapId;
        this.createdAt = createdAt;
    }
}
