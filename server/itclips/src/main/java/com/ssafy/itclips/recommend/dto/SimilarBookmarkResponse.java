package com.ssafy.itclips.recommend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SimilarBookmarkResponse {

    @JsonProperty("bookmark_list_id")
    private Integer bookmarkListId;

    @JsonProperty("similarity_score")
    private Double similarityScore;

}
