package com.ssafy.itclips.roadmap.dto;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RoadmapDTO {
    // 로드맵 세부 출력용

    private Long id; // 로드맵 아이디
    private Long userId; // 생성자
    private Long origin; /// 원본 로드맵
    private String userName; // 생성자 이름
    private String title; // 제목
    private String description; // 설명
    private LocalDateTime createdAt; // 생성 날짜
    private String image; // 사진
    private Byte isPublic; // 공개 여부
    private List<RoadmapStepResponseDto> stepList; // 단계 리스트 간략 정보
    private List<RoadmapCommentDTO> commentList; // 댓글 리스트
    private Long likeCnt; // 좋아요 수
    private Long scrapCnt; // 스크랩 수
    private Boolean isLiked; // 좋아요 여부


    @Builder
    public RoadmapDTO(Long id, Long origin,  Long userId,String userName,  String title, String description, LocalDateTime createdAt,
                      String image, Byte isPublic, List<RoadmapStepResponseDto> stepList, List<RoadmapCommentDTO> commentList,
                      Long likeCnt, Long scrapCnt,Boolean isLiked) {
        this.id = id;
        this.origin = origin;
        this.userId = userId;
        this.userName = userName;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.image = image;
        this.isPublic = isPublic;
        this.stepList = stepList;
        this.commentList = commentList;
        this.likeCnt = likeCnt;
        this.scrapCnt = scrapCnt;
        this.isLiked = isLiked;
    }

    public static RoadmapDTO toDTO(Roadmap roadmap,List<RoadmapStepResponseDto> stepResponseDtoList,
                                   List<RoadmapCommentDTO>  roadmapCommentDTOList,Long likeCnt,Long scrapCnt, String imageUrl,Boolean isLiked ) {
        return RoadmapDTO.builder()
                .id(roadmap.getId())
                .userId(roadmap.getUser().getId())
                .userName(roadmap.getUser().getNickname())
                .title(roadmap.getTitle())
                .description(roadmap.getDescription())
                .createdAt(roadmap.getCreatedAt())
                .image(imageUrl)
                .isPublic(roadmap.getIsPublic())
                .stepList(stepResponseDtoList)
                .commentList(roadmapCommentDTOList)
                .likeCnt(likeCnt)
                .scrapCnt(scrapCnt)
                .isLiked(isLiked)
                .build();
    }
}
