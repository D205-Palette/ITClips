package com.ssafy.itclips.tag.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkListTag is a Querydsl query type for BookmarkListTag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkListTag extends EntityPathBase<BookmarkListTag> {

    private static final long serialVersionUID = -357105940L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkListTag bookmarkListTag = new QBookmarkListTag("bookmarkListTag");

    public final com.ssafy.itclips.bookmarklist.entity.QBookmarkList bookmarkList;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QTag tag;

    public QBookmarkListTag(String variable) {
        this(BookmarkListTag.class, forVariable(variable), INITS);
    }

    public QBookmarkListTag(Path<? extends BookmarkListTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkListTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkListTag(PathMetadata metadata, PathInits inits) {
        this(BookmarkListTag.class, metadata, inits);
    }

    public QBookmarkListTag(Class<? extends BookmarkListTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmarkList = inits.isInitialized("bookmarkList") ? new com.ssafy.itclips.bookmarklist.entity.QBookmarkList(forProperty("bookmarkList"), inits.get("bookmarkList")) : null;
        this.tag = inits.isInitialized("tag") ? new QTag(forProperty("tag")) : null;
    }

}

