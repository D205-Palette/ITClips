package com.ssafy.itclips.roadmap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoadmapDTO {

    private Long userId;
    private String title;
    private String description;
    private String image;
    private Byte isPublic;
    private List<Long> bookmarkList;

}
