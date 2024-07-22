package com.ssafy.itclips.bookmarklist.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkList is a Querydsl query type for BookmarkList
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkList extends EntityPathBase<BookmarkList> {

    private static final long serialVersionUID = 1247173026L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkList bookmarkList = new QBookmarkList("bookmarkList");

    public final SetPath<com.ssafy.itclips.tag.entity.BookmarkListTag, com.ssafy.itclips.tag.entity.QBookmarkListTag> bookmarkListTags = this.<com.ssafy.itclips.tag.entity.BookmarkListTag, com.ssafy.itclips.tag.entity.QBookmarkListTag>createSet("bookmarkListTags", com.ssafy.itclips.tag.entity.BookmarkListTag.class, com.ssafy.itclips.tag.entity.QBookmarkListTag.class, PathInits.DIRECT2);

    public final SetPath<com.ssafy.itclips.bookmark.entity.Bookmark, com.ssafy.itclips.bookmark.entity.QBookmark> bookmarks = this.<com.ssafy.itclips.bookmark.entity.Bookmark, com.ssafy.itclips.bookmark.entity.QBookmark>createSet("bookmarks", com.ssafy.itclips.bookmark.entity.Bookmark.class, com.ssafy.itclips.bookmark.entity.QBookmark.class, PathInits.DIRECT2);

    public final ListPath<com.ssafy.itclips.category.entity.Category, com.ssafy.itclips.category.entity.QCategory> categories = this.<com.ssafy.itclips.category.entity.Category, com.ssafy.itclips.category.entity.QCategory>createList("categories", com.ssafy.itclips.category.entity.Category.class, com.ssafy.itclips.category.entity.QCategory.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final ListPath<com.ssafy.itclips.group.entity.UserGroup, com.ssafy.itclips.group.entity.QUserGroup> groups = this.<com.ssafy.itclips.group.entity.UserGroup, com.ssafy.itclips.group.entity.QUserGroup>createList("groups", com.ssafy.itclips.group.entity.UserGroup.class, com.ssafy.itclips.group.entity.QUserGroup.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final BooleanPath isPublic = createBoolean("isPublic");

    public final ListPath<com.ssafy.itclips.tag.entity.BookmarkListTag, com.ssafy.itclips.tag.entity.QBookmarkListTag> tags = this.<com.ssafy.itclips.tag.entity.BookmarkListTag, com.ssafy.itclips.tag.entity.QBookmarkListTag>createList("tags", com.ssafy.itclips.tag.entity.BookmarkListTag.class, com.ssafy.itclips.tag.entity.QBookmarkListTag.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QBookmarkList(String variable) {
        this(BookmarkList.class, forVariable(variable), INITS);
    }

    public QBookmarkList(Path<? extends BookmarkList> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkList(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkList(PathMetadata metadata, PathInits inits) {
        this(BookmarkList.class, metadata, inits);
    }

    public QBookmarkList(Class<? extends BookmarkList> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

