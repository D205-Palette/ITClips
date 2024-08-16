package com.ssafy.itclips.comment.entity;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.user.entity.User;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "bookmark_list_comment", schema = "itclips")
@NoArgsConstructor
public class BookmarkListComment {
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
    @JoinColumn(name = "bookmark_id", nullable = false)
    private BookmarkList bookmarkList;

    @NotNull
    @Lob
    @Column(name = "contents", nullable = false)
    private String contents;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Builder
    public BookmarkListComment(String contents) {
        this.contents = contents;
    }

    public void addUserAndList(User user, BookmarkList bookmarkList) {
        this.user = user;
        this.bookmarkList = bookmarkList;
        user.getBookmarkListComments().add(this);
        bookmarkList.getBookmarkListComments().add(this);
    }
}