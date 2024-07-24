package com.ssafy.itclips.bookmark.entity;

import com.ssafy.itclips.bookmark.dto.BookmarkRequestDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.category.entity.BookmarkCategory;
import com.ssafy.itclips.report.entity.BookmarkReport;
import com.ssafy.itclips.tag.entity.BookmarkTag;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "bookmark", schema = "itclips")
public class Bookmark {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 전략 설정
    private Long id;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @Size(max = 255)
    @NotNull
    @Column(name = "url", nullable = false)
    private String url;

    @NotNull
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "is_reported", nullable = false)
    private Boolean isReported = false;

    @NotNull
    @Column(name = "`order`", nullable = false)
    private Integer order;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bookmarklist_id", nullable = false)
    private BookmarkList bookmarklist;

    @OneToMany(mappedBy = "bookmark")
    private List<BookmarkCategory> bookmarkCategories = new ArrayList<>();

    @OneToMany(mappedBy = "bookmark")
    private List<BookmarkTag> bookmarkTags = new ArrayList<>();

    @OneToMany(mappedBy = "bookmark")
    private List<BookmarkLike> bookmarkLikes = new ArrayList<>();

    @OneToMany(mappedBy = "bookmark")
    private List<BookmarkReport> bookmarkReports = new ArrayList<>();


    @Builder
    public Bookmark(String title, String description, String url, Boolean isReported, Integer order) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.isReported = isReported;
        this.order = order;
    }

    public void updateBookmark(BookmarkRequestDTO bookmarkRequestDTO) {
        this.title = bookmarkRequestDTO.getTitle();
        this.description = bookmarkRequestDTO.getContent();
    }

    public void addBookmarkList(BookmarkList bookmarkList) {
        this.bookmarklist = bookmarkList;
        bookmarkList.getBookmarks().add(this);
    }
}