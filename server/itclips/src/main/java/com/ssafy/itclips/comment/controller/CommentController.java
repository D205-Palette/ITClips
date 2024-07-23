package com.ssafy.itclips.comment.controller;

import com.ssafy.itclips.comment.dto.CommentDTO;
import com.ssafy.itclips.comment.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@Tag(name = "Comment Controller", description = "리뷰 관련 API")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/add/{userId}/{listId}")
    @Operation(summary = "댓글 달기", description = "북마크리스트 댓글을 추가합니다")
    public ResponseEntity<?> addComment(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId,
                                        @PathVariable @Parameter(description = "리스트 정보", required = true) Long listId,
                                        @RequestBody @Parameter(description = "댓글 정보", required = true) CommentDTO commentDTO) {

        commentService.createComment(userId,listId,commentDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{userId}/{commentId}")
    @Operation(summary = "댓글 삭제", description = "북마크리스트 댓글을 삭제합니다")
    public ResponseEntity<?> removeComment(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId,
                                           @PathVariable @Parameter(description = "댓글 정보", required = true) Long commentId) {

        commentService.deleteComment(userId,commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
