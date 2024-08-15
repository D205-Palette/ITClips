package com.ssafy.itclips.roadmap.dto;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.entity.RoadmapComment;
import com.ssafy.itclips.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoadmapCommentRequestDTO {
    private String comment;

    @Builder
    public RoadmapCommentRequestDTO(String comment) {
        this.comment = comment;
    }

    public static RoadmapComment toEntity(Roadmap roadmap, User user, RoadmapCommentRequestDTO roadmapCommentRequestDTO){
        return RoadmapComment.builder()
                .contents(roadmapCommentRequestDTO.getComment())
                .roadmap(roadmap)
                .user(user)
                .build();
    }
}
