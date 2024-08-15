package com.ssafy.itclips.tag.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserTagDTO {
    private Long id;
    private String title;

    @Builder
    public UserTagDTO(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
