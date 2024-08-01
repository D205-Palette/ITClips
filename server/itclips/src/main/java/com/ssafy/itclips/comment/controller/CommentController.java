package com.ssafy.itclips.comment.controller;

import com.ssafy.itclips.comment.dto.CommentDTO;
import com.ssafy.itclips.comment.dto.CommentResponseDTO;
import com.ssafy.itclips.comment.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin("*")
@RequiredArgsConstructor
@Tag(name = "Comment Controller", description = "댓글 관련 API")
public class CommentController {

    private final CommentService commentService;


    @GetMapping("/{listId}")
    @Operation(summary = "댓글 가져오기", description = "북마크리스트 댓글을 조회합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글을 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "404", description = "리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getComments(@PathVariable @Parameter(description = "리스트 정보", required = true) Long listId) {
        List<CommentResponseDTO> results = commentService.getComments(listId);
        return new ResponseEntity< List<CommentResponseDTO>>(results, HttpStatus.OK);
    }

    @PostMapping("/add/{userId}/{listId}")
    @Operation(summary = "댓글 달기", description = "북마크리스트 댓글을 추가합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "댓글을 성공적으로 생성했습니다."),
            @ApiResponse(responseCode = "404", description = "사용자,리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> addComment(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId,
                                        @PathVariable @Parameter(description = "리스트 정보", required = true) Long listId,
                                        @RequestBody @Parameter(description = "댓글 정보", required = true) CommentDTO commentDTO) {

        commentService.createComment(userId,listId,commentDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{userId}/{commentId}")
    @Operation(summary = "댓글 삭제", description = "북마크리스트 댓글을 삭제합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글을 성공적으로 삭제했습니다."),
            @ApiResponse(responseCode = "404", description = "사용자, 댓글을 찾을 수 없습니다."),
            @ApiResponse(responseCode = "401", description = "댓글에 접근 할 권한이 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> removeComment(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId,
                                           @PathVariable @Parameter(description = "댓글 정보", required = true) Long commentId) {

        commentService.deleteComment(userId,commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{userId}/{commentId}")
    @Operation(summary = "댓글 수정", description = "북마크리스트 댓글을 수정합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글을 성공적으로 수정했습니다."),
            @ApiResponse(responseCode = "404", description = "사용자, 댓글을 찾을 수 없습니다."),
            @ApiResponse(responseCode = "401", description = "댓글에 접근 할 권한이 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> updateComment(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId,
                                           @PathVariable @Parameter(description = "댓글 정보", required = true) Long commentId,
                                           @RequestBody @Parameter(description = "수정 정보", required = true) CommentDTO commentDTO) {
        commentService.updateComment(userId,commentId,commentDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
