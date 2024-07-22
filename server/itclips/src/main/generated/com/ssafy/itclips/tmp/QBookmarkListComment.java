package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkListComment is a Querydsl query type for BookmarkListComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkListComment extends EntityPathBase<BookmarkListComment> {

    private static final long serialVersionUID = 2054012983L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkListComment bookmarkListComment = new QBookmarkListComment("bookmarkListComment");

    public final com.ssafy.itclips.bookmarklist.entity.QBookmarkList bookmark;

    public final StringPath contents = createString("contents");

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.Instant> updatedAt = createDateTime("updatedAt", java.time.Instant.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QBookmarkListComment(String variable) {
        this(BookmarkListComment.class, forVariable(variable), INITS);
    }

    public QBookmarkListComment(Path<? extends BookmarkListComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkListComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkListComment(PathMetadata metadata, PathInits inits) {
        this(BookmarkListComment.class, metadata, inits);
    }

    public QBookmarkListComment(Class<? extends BookmarkListComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmark = inits.isInitialized("bookmark") ? new com.ssafy.itclips.bookmarklist.entity.QBookmarkList(forProperty("bookmark"), inits.get("bookmark")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

