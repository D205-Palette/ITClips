package com.ssafy.itclips.roadmap.dto;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RoadmapRequestDTO {

    private Long origin; // 원본 로드맵
    private String title; // 제목
    private String description; // 설명
    private String image; // 사진
    private Byte isPublic; // 공개 여부
    private List<Long> stepList; // step 에 넣을 bookmarklist id

    @Builder
    public RoadmapRequestDTO(String title,Long origin,  String description, String image, Byte isPublic, List<Long> stepList) {
        this.title = title;
        this.origin = origin;
        this.description = description;
        this.image = image;
        this.isPublic = isPublic;
        this.stepList = stepList;
    }

    public Roadmap toEntity(User user){
        return Roadmap.builder()
                .user(user)
                .origin(origin)
                .title(title)
                .description(description)
                .image(image)
                .isPublic(isPublic)
                .build();
    }
    // TODO: toDto 만들기
    public static RoadmapRequestDTO toDTO(Roadmap roadmap){
        return RoadmapRequestDTO.builder()
                .origin(roadmap.getOrigin())
                .title(roadmap.getTitle())
                .description(roadmap.getDescription())
                .image(roadmap.getImage())
                .isPublic(roadmap.getIsPublic())
                .build();
    }

    public void setImageToS3FileName(String image) {
        this.image = image;
    }
}
