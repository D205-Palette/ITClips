package com.ssafy.itclips.roadmap.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RoadmapInfoDTO {
    private Long id;
    private String userName;
    private String title;
    private String description;
    private String image;
    private Byte isPublic;
    private LocalDateTime createdAt;

    @Builder
    public RoadmapInfoDTO(Long id, String userName, String title, String description, String image, Byte isPublic, LocalDateTime createdAt) {
        this.id = id;
        this.userName = userName;
        this.title = title;
        this.description = description;
        this.image = image;
        this.isPublic = isPublic;
        this.createdAt = createdAt;
    }
}
