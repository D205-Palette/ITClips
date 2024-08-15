package com.ssafy.itclips.comment.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommentDTO {
    private String contents;

    @Builder
    public CommentDTO(String contents) {
        this.contents = contents;
    }
}
