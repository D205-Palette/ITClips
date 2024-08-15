package com.ssafy.itclips.tag.dto;

import com.ssafy.itclips.tag.entity.Tag;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagDTO {
    private Long id;
    private String title;

    @Builder
    public TagDTO(String title) {
        this.title = title;
    }

    @Builder
    public TagDTO(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public static TagDTO toDTO(Tag tag) {
        return TagDTO.builder()
                .title(tag.getTitle())
                .build();
    }
}
