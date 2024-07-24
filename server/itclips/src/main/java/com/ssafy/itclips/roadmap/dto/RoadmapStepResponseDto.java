package com.ssafy.itclips.roadmap.dto;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoadmapStepResponseDto {
    // 스탭 출력용

    private Long id; // 스탭 아이디
    private Long roadmapId; // 로드맵 아이디
    private BookmarkListResponseDTO bookmarkListResponseDTO; // 리스트 출력용 dto
    private Byte check; // 진행 여부
    private Integer order; // 순서

    @Builder
    public RoadmapStepResponseDto(Long id, Long roadmapId, BookmarkListResponseDTO bookmarkListResponseDTO, Byte check, Integer order) {
        this.id = id;
        this.roadmapId = roadmapId;
        this.bookmarkListResponseDTO = bookmarkListResponseDTO;
        this.check = check;
        this.order = order;

    }

}
