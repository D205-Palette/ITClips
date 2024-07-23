package com.ssafy.itclips.tag.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagDTO {
    private String title;

    @Builder
    public TagDTO(String title) {
        this.title = title;
    }
}
