package com.ssafy.itclips.tag.entity;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "bookmark_list_tag", schema = "itclips")
public class BookmarkListTag {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "bookmark_list_id", nullable = false)
    private BookmarkList bookmarkList;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    public void setBookmarkListTag(BookmarkList bookmarkList,Tag tag) {
        this.bookmarkList = bookmarkList;
        this.tag = tag;
        bookmarkList.getBookmarkListTags().add(this);
        tag.getBookmarkListTags().add(this);
    }

}