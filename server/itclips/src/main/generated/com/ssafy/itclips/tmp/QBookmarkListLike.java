package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkListLike is a Querydsl query type for BookmarkListLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkListLike extends EntityPathBase<BookmarkListLike> {

    private static final long serialVersionUID = 337112255L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkListLike bookmarkListLike = new QBookmarkListLike("bookmarkListLike");

    public final com.ssafy.itclips.bookmarklist.entity.QBookmarkList bookmarkList;

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QBookmarkListLike(String variable) {
        this(BookmarkListLike.class, forVariable(variable), INITS);
    }

    public QBookmarkListLike(Path<? extends BookmarkListLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkListLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkListLike(PathMetadata metadata, PathInits inits) {
        this(BookmarkListLike.class, metadata, inits);
    }

    public QBookmarkListLike(Class<? extends BookmarkListLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmarkList = inits.isInitialized("bookmarkList") ? new com.ssafy.itclips.bookmarklist.entity.QBookmarkList(forProperty("bookmarkList"), inits.get("bookmarkList")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

