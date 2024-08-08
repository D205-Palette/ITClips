package com.ssafy.itclips.bookmark.controller;

import com.ssafy.itclips.bookmark.dto.BookmarkRequestDTO;
import com.ssafy.itclips.global.gpt.GPTResponseDTO;
import com.ssafy.itclips.bookmark.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookmark")
@RequiredArgsConstructor
@CrossOrigin("*")
@Slf4j
@Tag(name = "Bookmark Controller", description = "북마크 관련 API") // 표시명 및 설명 설정
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping(value={"/add/{listId}","/add/{listId}/{categoryId}"})
    @Operation(summary = "북마크 추가", description = "북마크를 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "북마크가 성공적으로 추가되었습니다."),
            @ApiResponse(responseCode = "404", description = "북마크리스트, 카테고리를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> createBookmark(@PathVariable @Parameter(description = "리스트 정보", required = true) Long listId,
                                            @PathVariable(required = false) @Parameter(description = "카테고리 정보") Long categoryId,
                                            @RequestBody @Parameter(description = "북마크 생성 정보", required = true) BookmarkRequestDTO bookmarkRequestDTO) {
        bookmarkService.createBookmark(listId,categoryId,bookmarkRequestDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{bookmarkId}")
    @Operation(summary = "북마크 수정", description = "북마크를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "404", description = "북마크를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> updateBookmark(@PathVariable @Parameter(description = "북마크 ID", required = true) Long bookmarkId,
                                            @RequestBody @Parameter(description = "북마크 수정 정보", required = true) BookmarkRequestDTO bookmarkRequestDTO) {
        log.info(bookmarkRequestDTO.toString());
        bookmarkService.updateBookmark(bookmarkId,bookmarkRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{bookmarkId}")
    @Operation(summary = "북마크 삭제", description = "북마크를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크가 성공적으로 삭제되었습니다."),
            @ApiResponse(responseCode = "404", description = "북마크를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> deleteBookmark(@PathVariable @Parameter(description = "북마크 ID", required = true) Long bookmarkId) {
        bookmarkService.deleteBookmark(bookmarkId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/like/{userId}/{bookmarkId}")
    @Operation(summary = "북마크 좋아요", description = "북마크를 좋아요합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "북마크 좋아요가 성공적으로 진행되었습니다."),
            @ApiResponse(responseCode = "400", description = "이미 좋아요 한 북마크입니다."),
            @ApiResponse(responseCode = "404", description = "유저, 북마크를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> likeBookmark(@PathVariable @Parameter(description = "유저 ID", required = true) Long userId,
                                          @PathVariable @Parameter(description = "북마크 ID", required = true) Long bookmarkId) {
        bookmarkService.likeBookmark(userId,bookmarkId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/like/{userId}/{bookmarkId}")
    @Operation(summary = "북마크 좋아요 취소", description = "북마크 좋아요를 취소합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크 좋아요가 취소되었습니다."),
            @ApiResponse(responseCode = "404", description = "유저, 북마크,북마크 좋아요 내역을 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> deleteLikeBookmark(@PathVariable @Parameter(description = "유저 ID", required = true) Long userId,
                                          @PathVariable @Parameter(description = "북마크 ID", required = true) Long bookmarkId) {
        bookmarkService.removeLikeBookmark(userId,bookmarkId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/summary/{bookmarkId}")
    @Operation(summary = "북마크 url 요약", description = "url 요약을 요청합니다.")
    public ResponseEntity<?> getUrlSummary(@PathVariable Long bookmarkId) {

        GPTResponseDTO summary = bookmarkService.getUrlSummary(bookmarkId);
        return new ResponseEntity<>(summary, HttpStatus.OK);
    }

}
