package com.ssafy.itclips.category.entity;

import com.ssafy.itclips.bookmark.entity.BookmarkCategory;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.category.dto.CategoryRequestDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "category", schema = "itclips")
public class Category {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 전략 설정
    private Long id;

    @Size(max = 20)
    @NotNull
    @ColumnDefault("'Undefined'")
    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "bookmarklist_id", nullable = false)
    private BookmarkList bookmarklist;

    @OneToMany(mappedBy = "category")
    private List<BookmarkCategory> bookmarkCategories = new ArrayList<>();

    @Builder
    public Category(String name) {
        this.name = name;
    }

    public void addBookmarkList(BookmarkList bookmarklist) {
        this.bookmarklist = bookmarklist;
        bookmarklist.getCategories().add(this);
    }

    public void updateCategory(CategoryRequestDTO categoryRequestDTO) {
        this.name = categoryRequestDTO.getCategoryName();
    }
}