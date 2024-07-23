package com.ssafy.itclips.comment.dto;

import com.ssafy.itclips.user.dto.UserTitleDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponseDTO {
    private Long commentId;
    private UserTitleDTO commentUser;
    private String comment;
    private LocalDateTime commentTime;

    @Builder
    public CommentResponseDTO(Long commentId, UserTitleDTO commentUser, String comment, LocalDateTime commentTime) {
        this.commentId = commentId;
        this.commentUser = commentUser;
        this.comment = comment;
        this.commentTime = commentTime;
    }
}
