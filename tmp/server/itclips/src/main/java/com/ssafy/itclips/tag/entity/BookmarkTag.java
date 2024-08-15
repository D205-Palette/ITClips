package com.ssafy.itclips.tag.entity;

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
@Table(name = "bookmark_tag", schema = "itclips")
public class BookmarkTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "bookmark_id", nullable = false)
    private Bookmark bookmark;

    public void addBookmarkTag(Tag tag, Bookmark bookmark) {
        this.tag = tag;
        this.bookmark = bookmark;
        tag.getBookmarkTags().add(this);
        bookmark.getBookmarkTags().add(this);
    }

}