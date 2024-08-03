package com.ssafy.itclips.global.rank;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RankDTO {

    private Long id;
    private String title;
    private Long count;

    @Builder
    public RankDTO(Long id, String title,Long count) {
        this.id = id;
        this.title = title;
        this.count = count;
    }
}
