package com.ssafy.itclips.roadmap.dto;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class RoadmapInfoDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String userImage;
    private String title;
    private String description;
    private String image;
    private Byte isPublic;
    private LocalDateTime createdAt;
    private Integer stepCnt;
    private Long checkCnt;
    private Long likeCnt;
    private List<StepInfoDTO> steps;
    private Boolean isLiked;

    @Builder
    public RoadmapInfoDTO(Long id, Long userId, String userName,String userImage, String title, String description, String image, Byte isPublic, LocalDateTime createdAt,Integer stepCnt, Long checkCnt , Long likeCnt,List<StepInfoDTO> steps,Boolean isLiked) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.title = title;
        this.description = description;
        this.image = image;
        this.isPublic = isPublic;
        this.createdAt = createdAt;
        this.likeCnt = likeCnt;
        this.checkCnt = checkCnt;
        this.stepCnt = stepCnt;
        this.steps = steps;
        this.isLiked = isLiked;
        this.userImage = userImage;
    }

    // 로드맵 단계 수 진행수 좋아요수 단계리스트
    public static RoadmapInfoDTO toDto(Roadmap roadmap,Integer stepCnt,Long checkCnt,
                                       Long likeCnt, List<StepInfoDTO> steps,Boolean isLiked, String imageUrl, String userImage){

        return RoadmapInfoDTO.builder()
                .id(roadmap.getId())
                .userId(roadmap.getUser().getId())
                .userName(roadmap.getUser().getNickname())
                .userImage(userImage)
                .title(roadmap.getTitle())
                .description(roadmap.getDescription())
                .image(imageUrl)
                .isPublic(roadmap.getIsPublic())
                .createdAt(roadmap.getCreatedAt())
                .stepCnt(stepCnt)
                .checkCnt(checkCnt)
                .likeCnt(likeCnt)
                .steps(steps)
                .isLiked(isLiked)
                .build();
    }
}
