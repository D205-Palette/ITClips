package com.ssafy.itclips.category.entity;

import com.ssafy.itclips.bookmark.entity.Bookmark;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "bookmark_category", schema = "itclips")
public class BookmarkCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "bookmark_id", nullable = false)
    private Bookmark bookmark;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public void addBookmarkCategory(Bookmark bookmark, Category category) {
        this.bookmark = bookmark;
        this.category = category;
        bookmark.getBookmarkCategories().add(this);
        category.getBookmarkCategories().add(this);
    }

}