package com.ssafy.itclips.report.controller;

import com.ssafy.itclips.report.dto.ReportDTO;
import com.ssafy.itclips.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "Report Controller", description = "신고 관련 API") // 표시명 및 설명 설정
public class ReportController {
    private final ReportService reportService;

    @PostMapping("/bookmark/{userId}/{bookmarkId}")
    @Operation(summary = "북마크 신고", description = "북마크를 신고합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "북마크 신고가 성공적으로 진행되었습니다."),
            @ApiResponse(responseCode = "400", description = "이미 신고 한 북마크입니다."),
            @ApiResponse(responseCode = "404", description = "유저, 북마크를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> reportBookmark(@PathVariable Long userId,
                                            @PathVariable Long bookmarkId,
                                            @RequestBody ReportDTO reportDTO) {
        reportService.createReportBookmark(userId,bookmarkId,reportDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/list/{userId}/{listId}")
    @Operation(summary = "북마크 리스트 신고", description = "북마크 리스트를 신고합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "북마크 리스트 신고가 성공적으로 진행되었습니다."),
            @ApiResponse(responseCode = "400", description = "이미 신고 한 북마크 리스트입니다."),
            @ApiResponse(responseCode = "404", description = "유저, 북마크리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> reportBookmarkList(@PathVariable Long userId,
                                            @PathVariable Long listId,
                                            @RequestBody ReportDTO reportDTO) {
        reportService.createReportList(userId,listId,reportDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
