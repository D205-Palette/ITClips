package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkListScrap is a Querydsl query type for BookmarkListScrap
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkListScrap extends EntityPathBase<BookmarkListScrap> {

    private static final long serialVersionUID = 1866837929L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkListScrap bookmarkListScrap = new QBookmarkListScrap("bookmarkListScrap");

    public final com.ssafy.itclips.bookmarklist.entity.QBookmarkList bookmarkList;

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QBookmarkListScrap(String variable) {
        this(BookmarkListScrap.class, forVariable(variable), INITS);
    }

    public QBookmarkListScrap(Path<? extends BookmarkListScrap> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkListScrap(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkListScrap(PathMetadata metadata, PathInits inits) {
        this(BookmarkListScrap.class, metadata, inits);
    }

    public QBookmarkListScrap(Class<? extends BookmarkListScrap> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmarkList = inits.isInitialized("bookmarkList") ? new com.ssafy.itclips.bookmarklist.entity.QBookmarkList(forProperty("bookmarkList"), inits.get("bookmarkList")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

