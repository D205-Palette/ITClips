package com.ssafy.itclips.bookmarklist.entity;

import com.ssafy.itclips.bookmark.entity.Bookmark;
import com.ssafy.itclips.category.entity.Category;
import com.ssafy.itclips.group.entity.UserGroup;
import com.ssafy.itclips.tmp.BookmarkListTag;
import com.ssafy.itclips.tmp.user.User;
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
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

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

    @Lob
    @Column(name = "description")
    private String description;

    @NotNull
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime  updatedAt;

    @Size(max = 255)
    @Column(name = "image")
    private String image;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = false;

    @OneToMany(mappedBy = "bookmarklist")
    private Set<Bookmark> bookmarks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "bookmarkList")
    private Set<BookmarkListTag> bookmarkListTags = new LinkedHashSet<>();

    @OneToMany(mappedBy = "bookmarklist")
    private List<Category> categories = new ArrayList<>();

    @OneToMany(mappedBy = "bookmarkList")
    private List<UserGroup> groups = new ArrayList<>();

    @Builder
    private BookmarkList(User user, String title, String description, String image, Boolean isPublic) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.image = image;
        this.isPublic = isPublic;
    }

    public void addCategory(Category category) {
        categories.add(category);
        category.setBookmarklist(this);
    }
}