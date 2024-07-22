package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkCategory is a Querydsl query type for BookmarkCategory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkCategory extends EntityPathBase<BookmarkCategory> {

    private static final long serialVersionUID = -957787032L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkCategory bookmarkCategory = new QBookmarkCategory("bookmarkCategory");

    public final com.ssafy.itclips.bookmark.entity.QBookmark bookmark;

    public final com.ssafy.itclips.category.entity.QCategory category;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QBookmarkCategory(String variable) {
        this(BookmarkCategory.class, forVariable(variable), INITS);
    }

    public QBookmarkCategory(Path<? extends BookmarkCategory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkCategory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkCategory(PathMetadata metadata, PathInits inits) {
        this(BookmarkCategory.class, metadata, inits);
    }

    public QBookmarkCategory(Class<? extends BookmarkCategory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmark = inits.isInitialized("bookmark") ? new com.ssafy.itclips.bookmark.entity.QBookmark(forProperty("bookmark"), inits.get("bookmark")) : null;
        this.category = inits.isInitialized("category") ? new com.ssafy.itclips.category.entity.QCategory(forProperty("category"), inits.get("category")) : null;
    }

}

