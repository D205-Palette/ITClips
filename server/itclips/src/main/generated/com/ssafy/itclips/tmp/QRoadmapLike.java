package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoadmapLike is a Querydsl query type for RoadmapLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoadmapLike extends EntityPathBase<RoadmapLike> {

    private static final long serialVersionUID = -96757921L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoadmapLike roadmapLike = new QRoadmapLike("roadmapLike");

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QRoadmap roadmap;

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QRoadmapLike(String variable) {
        this(RoadmapLike.class, forVariable(variable), INITS);
    }

    public QRoadmapLike(Path<? extends RoadmapLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoadmapLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoadmapLike(PathMetadata metadata, PathInits inits) {
        this(RoadmapLike.class, metadata, inits);
    }

    public QRoadmapLike(Class<? extends RoadmapLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.roadmap = inits.isInitialized("roadmap") ? new QRoadmap(forProperty("roadmap"), inits.get("roadmap")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

