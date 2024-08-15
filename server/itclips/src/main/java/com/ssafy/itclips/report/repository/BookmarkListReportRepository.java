package com.ssafy.itclips.report.repository;

import com.ssafy.itclips.report.entity.BookmarkListReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkListReportRepository extends JpaRepository<BookmarkListReport, Long> {
    BookmarkListReport findByBookmarkListIdAndUserId(Long bookmarkListId, Long userId);
}
