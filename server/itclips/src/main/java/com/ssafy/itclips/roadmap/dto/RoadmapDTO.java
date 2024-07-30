package com.ssafy.itclips.roadmap.dto;

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


    @Builder
    public RoadmapDTO(Long id, Long origin,  Long userId,String userName,  String title, String description, LocalDateTime createdAt,
                      String image, Byte isPublic, List<RoadmapStepResponseDto> stepList, List<RoadmapCommentDTO> commentList,
                      Long likeCnt) {
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
    }
}
