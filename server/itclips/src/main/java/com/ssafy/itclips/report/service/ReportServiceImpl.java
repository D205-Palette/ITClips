package com.ssafy.itclips.report.service;

import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.bookmark.repository.BookmarkRepository;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.report.dto.ReportDTO;
import com.ssafy.itclips.report.entity.BookmarkReport;
import com.ssafy.itclips.report.entity.ReportStatus;
import com.ssafy.itclips.report.repository.BookmarkReportRepository;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.print.Book;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final BookmarkReportRepository BookmarkReportRepository;
    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;

    private static final ReportStatus DEFAULT_STATUS = ReportStatus.PENDING;

    @Override
    public void createReportBookmark(Long userId, Long bookmarkId, ReportDTO reportDTO) throws RuntimeException {
        User user = userRepository.findById(userId).
                orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_NOT_FOUND));
        BookmarkReport existedBookmarkReport = BookmarkReportRepository.findByUserIdAndBookmarkId(userId, bookmarkId);
        if(existedBookmarkReport != null) {
            throw new CustomException(ErrorCode.REPORT_ALREADY_EXIST);
        }
        BookmarkReport bookmarkReport = BookmarkReport.builder()
                .category(reportDTO.getCategory())
                .reason(reportDTO.getReason())
                .status(DEFAULT_STATUS)
                .build();
        bookmarkReport.addUserAndBookmark(user,bookmark);
        BookmarkReportRepository.save(bookmarkReport);

    }
}
