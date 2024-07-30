package com.ssafy.itclips.roadmap.dto;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RoadmapInfoDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String title;
    private String description;
    private String image;
    private Byte isPublic;
    private LocalDateTime createdAt;

    @Builder
    public RoadmapInfoDTO(Long id,Long userId,  String userName, String title, String description, String image, Byte isPublic, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.title = title;
        this.description = description;
        this.image = image;
        this.isPublic = isPublic;
        this.createdAt = createdAt;
    }

    public static RoadmapInfoDTO toDto(Roadmap roadmap){

        return RoadmapInfoDTO.builder()
                .id(roadmap.getId())
                .userId(roadmap.getUser().getId())
                .userName(roadmap.getUser().getNickname())
                .title(roadmap.getTitle())
                .description(roadmap.getDescription())
                .image(roadmap.getImage())
                .isPublic(roadmap.getIsPublic())
                .createdAt(roadmap.getCreatedAt())
                .build();
    }
}
