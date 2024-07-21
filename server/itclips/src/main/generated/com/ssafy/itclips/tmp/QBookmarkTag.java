package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkTag is a Querydsl query type for BookmarkTag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkTag extends EntityPathBase<BookmarkTag> {

    private static final long serialVersionUID = -1627345424L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkTag bookmarkTag = new QBookmarkTag("bookmarkTag");

    public final com.ssafy.itclips.bookmark.entity.QBookmark bookmark;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.itclips.tag.entity.QTag tag;

    public QBookmarkTag(String variable) {
        this(BookmarkTag.class, forVariable(variable), INITS);
    }

    public QBookmarkTag(Path<? extends BookmarkTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkTag(PathMetadata metadata, PathInits inits) {
        this(BookmarkTag.class, metadata, inits);
    }

    public QBookmarkTag(Class<? extends BookmarkTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmark = inits.isInitialized("bookmark") ? new com.ssafy.itclips.bookmark.entity.QBookmark(forProperty("bookmark"), inits.get("bookmark")) : null;
        this.tag = inits.isInitialized("tag") ? new com.ssafy.itclips.tag.entity.QTag(forProperty("tag")) : null;
    }

}

