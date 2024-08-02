package com.ssafy.itclips.report.dto;

import com.ssafy.itclips.report.entity.ReportCategory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReportDTO {
    private ReportCategory category;
    private String reason;

    @Builder
    public ReportDTO(ReportCategory category, String reason) {
        this.category = category;
        this.reason = reason;
    }
}
