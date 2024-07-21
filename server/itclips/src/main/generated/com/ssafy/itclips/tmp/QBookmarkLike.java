package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkLike is a Querydsl query type for BookmarkLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkLike extends EntityPathBase<BookmarkLike> {

    private static final long serialVersionUID = 1091668993L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkLike bookmarkLike = new QBookmarkLike("bookmarkLike");

    public final com.ssafy.itclips.bookmark.entity.QBookmark bookmark;

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QBookmarkLike(String variable) {
        this(BookmarkLike.class, forVariable(variable), INITS);
    }

    public QBookmarkLike(Path<? extends BookmarkLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkLike(PathMetadata metadata, PathInits inits) {
        this(BookmarkLike.class, metadata, inits);
    }

    public QBookmarkLike(Class<? extends BookmarkLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmark = inits.isInitialized("bookmark") ? new com.ssafy.itclips.bookmark.entity.QBookmark(forProperty("bookmark"), inits.get("bookmark")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

