package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoadmapComment is a Querydsl query type for RoadmapComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoadmapComment extends EntityPathBase<RoadmapComment> {

    private static final long serialVersionUID = 184193431L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoadmapComment roadmapComment = new QRoadmapComment("roadmapComment");

    public final StringPath contents = createString("contents");

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QRoadmap roadmap;

    public final DateTimePath<java.time.Instant> updatedAt = createDateTime("updatedAt", java.time.Instant.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QRoadmapComment(String variable) {
        this(RoadmapComment.class, forVariable(variable), INITS);
    }

    public QRoadmapComment(Path<? extends RoadmapComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoadmapComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoadmapComment(PathMetadata metadata, PathInits inits) {
        this(RoadmapComment.class, metadata, inits);
    }

    public QRoadmapComment(Class<? extends RoadmapComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.roadmap = inits.isInitialized("roadmap") ? new QRoadmap(forProperty("roadmap"), inits.get("roadmap")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

