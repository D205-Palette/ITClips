package com.ssafy.itclips.bookmarklist.controller;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.service.BookmarkListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/list")
@RequiredArgsConstructor
@Slf4j
public class BookmarkListController {

    private final BookmarkListService bookmarkListService;


    @PostMapping("/add/{userId}")
    @Operation(summary = "북마크리스트 추가", description = "북마크리스트를 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "태그가 성공적으로 추가되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> createBookmarkList(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId,
                                                @RequestBody @Parameter(description = "추가 할 리스트 정보", required = true) BookmarkListDTO bookmarkListDTO) {

        bookmarkListService.createBookmarkList(userId,bookmarkListDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/update/{userId}/{listId}")
    public ResponseEntity<?> updateBookmarkList(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId,
                                                @PathVariable Long listId,
                                                @RequestBody BookmarkListDTO bookmarkListDTO) {

        bookmarkListService.updateBookmarkList(userId,listId,bookmarkListDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
