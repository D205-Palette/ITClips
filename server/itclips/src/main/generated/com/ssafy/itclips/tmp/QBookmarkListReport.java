package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkListReport is a Querydsl query type for BookmarkListReport
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookmarkListReport extends EntityPathBase<BookmarkListReport> {

    private static final long serialVersionUID = 2010572892L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookmarkListReport bookmarkListReport = new QBookmarkListReport("bookmarkListReport");

    public final com.ssafy.itclips.bookmarklist.entity.QBookmarkList bookmarkList;

    public final StringPath category = createString("category");

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath reason = createString("reason");

    public final EnumPath<ReportStatus> status = createEnum("status", ReportStatus.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QBookmarkListReport(String variable) {
        this(BookmarkListReport.class, forVariable(variable), INITS);
    }

    public QBookmarkListReport(Path<? extends BookmarkListReport> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookmarkListReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookmarkListReport(PathMetadata metadata, PathInits inits) {
        this(BookmarkListReport.class, metadata, inits);
    }

    public QBookmarkListReport(Class<? extends BookmarkListReport> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmarkList = inits.isInitialized("bookmarkList") ? new com.ssafy.itclips.bookmarklist.entity.QBookmarkList(forProperty("bookmarkList"), inits.get("bookmarkList")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

