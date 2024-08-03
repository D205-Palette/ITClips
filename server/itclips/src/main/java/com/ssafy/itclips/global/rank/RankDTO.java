package com.ssafy.itclips.global.rank;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RankDTO {

    private Long id;
    private String title;

    @Builder
    public RankDTO(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
