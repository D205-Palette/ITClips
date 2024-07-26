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

    private Long id; // 아이디
    private String title; // 제목
    private String description; // 설명
    private String image; // 사진
    private Byte isPublic; // 공개 여부
    private List<Long> stepList; // 단계 리스트 간략 정보

    @Builder
    public RoadmapRequestDTO(String title, String description, String image, Byte isPublic, List<Long> stepList) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.isPublic = isPublic;
        this.stepList = stepList;
    }

    public Roadmap toEntity(User user){
        return Roadmap.builder()
                .user(user)
                .title(title)
                .description(description)
                .image(image)
                .isPublic(isPublic)
                .build();
    }
    // TODO: toDto 만들기
}
