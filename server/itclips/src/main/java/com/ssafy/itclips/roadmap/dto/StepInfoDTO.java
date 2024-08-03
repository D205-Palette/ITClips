package com.ssafy.itclips.roadmap.dto;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListRoadmapDTO;
import com.ssafy.itclips.roadmap.entity.RoadmapStep;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StepInfoDTO {

    private Long id; // 스탭 아이디
    private Long listId; // 북마크 리스트 아이디
    private String listTitle; //리스트 제목
    private Integer order; // 순서
    private Boolean check; // 진행 여부

    @Builder
    public StepInfoDTO(Long id, Integer order, String listTitle, Long listId, Boolean check) {
        this.id = id;
        this.order = order;
        this.listTitle = listTitle;
        this.listId = listId;
        this.check = check;
    }

    public static StepInfoDTO toDTO(RoadmapStep roadmapStep) {
        return StepInfoDTO.builder()
                .id(roadmapStep.getId())
                .order(roadmapStep.getOrder())
                .listTitle(roadmapStep.getBookmarkList().getTitle())
                .listId(roadmapStep.getBookmarkList().getId())
                .check(roadmapStep.getCheck())
                .build();

    }
}
