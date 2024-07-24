package com.ssafy.itclips.report.service;

import com.ssafy.itclips.report.dto.ReportDTO;

public interface ReportService {
    void createReportBookmark(Long userId, Long bookmarkId, ReportDTO reportDTO) throws RuntimeException;
}
