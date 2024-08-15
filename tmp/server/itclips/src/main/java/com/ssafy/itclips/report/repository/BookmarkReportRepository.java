package com.ssafy.itclips.report.repository;

import com.ssafy.itclips.report.entity.BookmarkReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkReportRepository extends JpaRepository<BookmarkReport, Long> {

    BookmarkReport findByUserIdAndBookmarkId(Long userId, Long bookmarkId);
}
