package com.ssafy.itclips.report.controller;

import com.ssafy.itclips.report.dto.ReportDTO;
import com.ssafy.itclips.report.service.ReportService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@Tag(name = "Report Controller", description = "신고 관련 API") // 표시명 및 설명 설정
public class ReportController {
    private final ReportService reportService;

    @PostMapping("/bookmark/{userId}/{bookmarkId}")
    public ResponseEntity<?> reportBookmark(@PathVariable Long userId,
                                            @PathVariable Long bookmarkId,
                                            @RequestBody ReportDTO reportDTO) {
        reportService.createReportBookmark(userId,bookmarkId,reportDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/list/{userId}/{listId}")
    public ResponseEntity<?> reportBookmarkList(@PathVariable Long userId,
                                            @PathVariable Long listId,
                                            @RequestBody ReportDTO reportDTO) {
        reportService.createReportList(userId,listId,reportDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
