package com.ssafy.itclips.bookmarklist.entity;

import com.ssafy.itclips.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "bookmark_list_scrap", schema = "itclips")
public class BookmarkListScrap {
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
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public void addUserAndBookmarkList(User user, BookmarkList bookmarkList) {
        this.user = user;
        this.bookmarkList = bookmarkList;
        user.getBookmarkListScraps().add(this);
        bookmarkList.getBookmarkListScraps().add(this);
    }

}