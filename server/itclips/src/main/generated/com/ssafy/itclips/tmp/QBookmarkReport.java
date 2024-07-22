package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkReport is a Querydsl query type for BookmarkReport
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkReport extends EntityPathBase<BookmarkReport> {

    private static final long serialVersionUID = 1290125086L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkReport bookmarkReport = new QBookmarkReport("bookmarkReport");

    public final com.ssafy.itclips.bookmark.entity.QBookmark bookmark;

    public final StringPath category = createString("category");

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath reason = createString("reason");

    public final EnumPath<ReportStatus> status = createEnum("status", ReportStatus.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QBookmarkReport(String variable) {
        this(BookmarkReport.class, forVariable(variable), INITS);
    }

    public QBookmarkReport(Path<? extends BookmarkReport> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkReport(PathMetadata metadata, PathInits inits) {
        this(BookmarkReport.class, metadata, inits);
    }

    public QBookmarkReport(Class<? extends BookmarkReport> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmark = inits.isInitialized("bookmark") ? new com.ssafy.itclips.bookmark.entity.QBookmark(forProperty("bookmark"), inits.get("bookmark")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

