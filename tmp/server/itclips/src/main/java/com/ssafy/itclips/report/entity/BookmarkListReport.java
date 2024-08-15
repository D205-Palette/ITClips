package com.ssafy.itclips.report.entity;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "bookmark_list_report", schema = "itclips")
public class BookmarkListReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "bookmark_list_id", nullable = false)
    private BookmarkList bookmarkList;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ReportCategory category;

    @NotNull
    @Lob
    @Column(name = "reason", nullable = false)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ReportStatus status;

    @Builder
    public BookmarkListReport(ReportCategory category, String reason, ReportStatus status) {
        this.category = category;
        this.reason = reason;
        this.status = status != null ? status : ReportStatus.PENDING;
    }

    public void addUserAndBookmarkList(User user, BookmarkList bookmarkList) {
        this.user = user;
        this.bookmarkList = bookmarkList;
        user.getBookmarkListReports().add(this);
        bookmarkList.getBookmarkListReports().add(this);
    }
}