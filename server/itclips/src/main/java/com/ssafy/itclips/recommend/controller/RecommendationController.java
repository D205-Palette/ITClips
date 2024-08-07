package com.ssafy.itclips.recommend.controller;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.recommend.service.RecommendationServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin("*")
@RequiredArgsConstructor
@Slf4j
@io.swagger.v3.oas.annotations.tags.Tag(name = "Recommendation Controller", description = "추천 관련 API")
public class RecommendationController {

    private final RecommendationServiceImpl recommendationService;

    @GetMapping("/user/{userId}")
    @Operation(summary = "북마크 리스트 추천", description = "User ID 기반으로 북마크 리스트를 추천합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "추천 북마크 리스트가 성공적으로 반환되었습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getRecommendations(@PathVariable Long userId) {
        List<BookmarkListResponseDTO> lists =  recommendationService.getPythonRecommendBookmarks(userId);
        return new ResponseEntity<>(lists, HttpStatus.OK);
    }
}
