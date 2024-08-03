package com.ssafy.itclips.bookmarklist.controller;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListDetailDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.service.BookmarkListService;
import com.ssafy.itclips.global.file.DataResponseDto;
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
@RequestMapping("/api/list")
@RequiredArgsConstructor
@CrossOrigin("*")
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

    @GetMapping("/{listId}")
    @Operation(summary = "북마크리스트 상세 보기", description = "북마크 리스트 상세 정보를 확인합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크리스트 정보를 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "404", description = "사용자,리스트,북마크를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getListDetail(@PathVariable Long listId,
                                           @RequestParam Long userId) {
        BookmarkListDetailDTO bookmarkListDetailDTO = bookmarkListService.getListDetail(userId,listId);

        return new ResponseEntity<BookmarkListDetailDTO>(bookmarkListDetailDTO,HttpStatus.OK);

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

        DataResponseDto url = bookmarkListService.createBookmarkList(userId,bookmarkListDTO);
        return new ResponseEntity<DataResponseDto>(url,HttpStatus.CREATED);
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
        DataResponseDto url = bookmarkListService.updateBookmarkList(userId, listId, bookmarkListDTO);
        return new ResponseEntity<DataResponseDto>(url,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userId}/{listId}")
    @Operation(summary = "북마크 리스트 삭제", description = "주어진 유저 ID와 리스트 ID로 북마크 리스트를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크 리스트가 성공적으로 삭제되었습니다."),
            @ApiResponse(responseCode = "404", description = "리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> deleteBookmarkList(@PathVariable @Parameter(description = "유저 ID", required = true) Long userId,
                                                @PathVariable @Parameter(description = "리스트 ID", required = true) Long listId) {
        bookmarkListService.deleteBookmarkList(userId, listId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/like/{userId}/{listId}")
    @Operation(summary = "북마크 리스트 좋아요", description = "주어진 유저 ID가 리스트 ID의 북마크 리스트를 좋아요합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "북마크 리스트가 성공적으로 좋아요되었습니다."),
            @ApiResponse(responseCode = "400", description = "이미 좋아요 한 글 입니다."),
            @ApiResponse(responseCode = "404", description = "유저,리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> addBookmarkListLike(@PathVariable @Parameter(description = "유저 ID", required = true) Long userId,
                                              @PathVariable @Parameter(description = "리스트 ID", required = true) Long listId) {
        bookmarkListService.createBookmarkListLike(userId,listId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/like/{userId}/{listId}")
    @Operation(summary = "북마크 리스트 좋아요 취소", description = "주어진 유저 ID가 리스트 ID의 북마크 리스트를 좋아요를 취소합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "북마크 리스트 좋아요가 성공적으로 취소되었습니다."),
            @ApiResponse(responseCode = "400", description = "이미 취소 한 글 입니다."),
            @ApiResponse(responseCode = "404", description = "유저,리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> deleteBookmarkListLike(@PathVariable Long userId,
                                                    @PathVariable Long listId) {
        bookmarkListService.deleteBookmarkListLike(userId,listId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/scrap/{userId}/{listId}")
    @Operation(summary = "북마크 리스트 스크랩", description = "주어진 유저 ID가 리스트 ID의 북마크 리스트를 스크랩합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "북마크 리스트가 성공적으로 스크랩되었습니다."),
            @ApiResponse(responseCode = "400", description = "이미 스크랩 한 글 입니다."),
            @ApiResponse(responseCode = "404", description = "유저,리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> addBookmarkListScrap(@PathVariable @Parameter(description = "유저 ID", required = true) Long userId,
                                                 @PathVariable @Parameter(description = "리스트 ID", required = true) Long listId) {
        bookmarkListService.scrapBookmarkList(userId,listId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @DeleteMapping("/scrap/{scrapId}")
    @Operation(summary = "북마크 리스트 스크랩 취소", description = "스크랩을 취소합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 스크랩이 성공적으로 취소되었습니다."),
            @ApiResponse(responseCode = "400", description = "스크랩하지 않은 글 입니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> deleteBookmarkListScrap(@PathVariable @Parameter(description = "스크랩 ID", required = true) Long scrapId){
        bookmarkListService.removeScrapBookmarkList(scrapId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/scrap/{userId}")
    @Operation(summary = "스크랩 한 리스트 보기", description = "스크랩한 글을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스크랩한 리스트를 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "404", description = "스크랩한 글이 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getScrappedLists(@PathVariable @Parameter(description = "유저 ID", required = true) Long userId) {
        List<BookmarkListResponseDTO> lists = bookmarkListService.getScrapedLists(userId);
        return new ResponseEntity<List<BookmarkListResponseDTO>>(lists,HttpStatus.OK);
    }
}
