package com.ssafy.itclips.roadmap.dto;

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
}
