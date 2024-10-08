package com.ssafy.itclips.bookmarklist.entity;

import com.ssafy.itclips.bookmark.dto.BookmarkDetailDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListDetailDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.category.dto.CategoryParamDTO;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.report.entity.BookmarkListReport;
import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListDTO;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.comment.entity.BookmarkListComment;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.entity.BookmarkListTag;
import com.ssafy.itclips.user.dto.UserTitleDTO;
import com.ssafy.itclips.user.entity.User;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "bookmark_list", schema = "itclips")
public class BookmarkList {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 전략 설정
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Size(max = 511)
    @Column(name = "description")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime  updatedAt;

    @Size(max = 511)
    @Column(name = "image")
    private String image;

    @Column(name = "hit")
    private Long hit;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = false;

    @OneToMany(mappedBy = "bookmarklist")
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "bookmarkList")
    private List<BookmarkListTag> bookmarkListTags = new ArrayList<>();

    @OneToMany(mappedBy = "bookmarklist")
    private List<Category> categories = new ArrayList<>();

    @OneToMany(mappedBy = "bookmarkList")
    private Set<UserGroup> groups = new HashSet<>();

    @OneToMany(mappedBy = "bookmarkList")
    private List<BookmarkListTag> tags = new ArrayList<>();

    @OneToMany(mappedBy = "bookmarkList")
    private List<BookmarkListComment> bookmarkListComments = new ArrayList<>();

    @OneToMany(mappedBy = "bookmarkList")
    private List<BookmarkListLike> bookmarkListLikes = new ArrayList<>();

    @OneToMany(mappedBy = "bookmarkList")
    private List<BookmarkListScrap> bookmarkListScraps = new ArrayList<>();

    @OneToMany(mappedBy = "bookmarkList")
    private List<BookmarkListReport> bookmarkListReports = new ArrayList<>();

    @Builder
    private BookmarkList(User user, String title, String description, String image, Boolean isPublic) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.image = image;
        this.isPublic = isPublic;
        this.hit = 0L;
    }

    public void addCategory(Category category) {
        categories.add(category);
        category.setBookmarklist(this);
    }

    public void updateBookmarkList(BookmarkListDTO bookmarkListDto) {
        this.title = bookmarkListDto.getTitle();
        this.description = bookmarkListDto.getDescription();
        this.isPublic = bookmarkListDto.getIsPublic();
    }

    public void updateBookmarkListImage(String image) {
        this.image = image;
    }


    public BookmarkListResponseDTO makeBookmarkListResponseDTO(Integer bookmarkCount, Integer likeCount, Boolean isLiked,String imageUrl,
                                                               Set<TagDTO> tags, List<UserTitleDTO> users) {
        return BookmarkListResponseDTO.builder()
                .id(this.id)
                .userId(this.user.getId())
                .title(this.title)
                .image(imageUrl)
                .description(this.description)
                .bookmarkCount(bookmarkCount)
                .users(users)
                .tags(tags)
                .isLiked(isLiked)
                .likeCount(likeCount)
                .createdAt(this.createdAt)
                .isPublic(this.isPublic)
                .build();
    }

    public BookmarkListDetailDTO makeBookmarkListDetailDTO(Integer likeCount, Integer scrapCount, Boolean isLiked, Boolean isScraped, String imageUrl,
                                                           List<CategoryParamDTO> categories, Set<TagDTO> tags, List<UserTitleDTO> users, List<BookmarkDetailDTO> bookmarks) {
        return BookmarkListDetailDTO.builder()
                .id(this.id)
                .userId(this.user.getId())
                .title(this.title)
                .description(this.description)
                .likeCount(likeCount)
                .scrapCount(scrapCount)
                .image(imageUrl)
                .isLiked(isLiked)
                .isScraped(isScraped)
                .categories(categories)
                .tags(tags)
                .users(users)
                .bookmarks(bookmarks)
                .hit(this.hit)
                .isPublic(this.isPublic)
                .build();
    }

    public RankDTO toRankDTO() {
        return RankDTO.builder()
                .id(this.id)
                .title(this.title)
                .count(this.hit)
                .build();
    }

    public void upHit() {
        this.hit++;
    }
}