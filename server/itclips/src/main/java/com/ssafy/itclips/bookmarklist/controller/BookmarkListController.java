package com.ssafy.itclips.bookmarklist.controller;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.service.BookmarkListService;
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

import java.util.List;

@RestController
@RequestMapping("/list")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "BookmarkList Controller", description = "북마크리스트 관련 API") // 표시명 및 설명 설정
public class BookmarkListController {

    private final BookmarkListService bookmarkListService;

    @GetMapping("/personal/{userId}")
    @Operation(summary = "개인 북마크리스트 찾기", description = "개인 북마크리스트를 찾습니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크리스트를 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getPersonalLists(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId) {
        List<BookmarkListResponseDTO> lists = bookmarkListService.getLists(userId,false);
        return new ResponseEntity<List<BookmarkListResponseDTO>>(lists,HttpStatus.OK);
    }

    @GetMapping("/group/{userId}")
    @Operation(summary = "그룹 북마크리스트 찾기", description = "그룹 북마크리스트를 찾습니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크리스트를 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getGroupLists(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId) {
        List<BookmarkListResponseDTO> lists = bookmarkListService.getLists(userId,true);
        return new ResponseEntity<List<BookmarkListResponseDTO>>(lists,HttpStatus.OK);
    }

    @PostMapping("/add/{userId}")
    @Operation(summary = "북마크리스트 추가", description = "북마크리스트를 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "북마크리스트가 성공적으로 추가되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> createBookmarkList(@PathVariable @Parameter(description = "유저 정보", required = true) Long userId,
                                                @RequestBody @Parameter(description = "추가 할 리스트 정보", required = true) BookmarkListDTO bookmarkListDTO) {

        bookmarkListService.createBookmarkList(userId,bookmarkListDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{userId}/{listId}")
    @Operation(summary = "북마크 리스트 업데이트", description = "주어진 유저 ID와 리스트 ID로 북마크 리스트를 업데이트합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크 리스트가 성공적으로 업데이트되었습니다."),
            @ApiResponse(responseCode = "404", description = "리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> updateBookmarkList(@PathVariable @Parameter(description = "유저 ID", required = true) Long userId,
                                                @PathVariable @Parameter(description = "리스트 ID", required = true) Long listId,
                                                @RequestBody @Parameter(description = "업데이트할 리스트 정보", required = true) BookmarkListDTO bookmarkListDTO) {
        bookmarkListService.updateBookmarkList(userId, listId, bookmarkListDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userId}/{listId}")
    @Operation(summary = "북마크 리스트 삭제", description = "주어진 유저 ID와 리스트 ID로 북마크 리스트를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "북마크 리스트가 성공적으로 삭제되었습니다."),
            @ApiResponse(responseCode = "404", description = "리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> deleteBookmarkList(@PathVariable @Parameter(description = "유저 ID", required = true) Long userId,
                                                @PathVariable @Parameter(description = "리스트 ID", required = true) Long listId) {
        bookmarkListService.deleteBookmarkList(userId, listId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
