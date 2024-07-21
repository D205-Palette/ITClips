package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoadmap is a Querydsl query type for Roadmap
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoadmap extends EntityPathBase<Roadmap> {

    private static final long serialVersionUID = -1275885656L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoadmap roadmap = new QRoadmap("roadmap");

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final NumberPath<Byte> isPublic = createNumber("isPublic", Byte.class);

    public final StringPath title = createString("title");

    public final DateTimePath<java.time.Instant> updatedAt = createDateTime("updatedAt", java.time.Instant.class);

    public final com.ssafy.itclips.tmp.user.QUser user;

    public QRoadmap(String variable) {
        this(Roadmap.class, forVariable(variable), INITS);
    }

    public QRoadmap(Path<? extends Roadmap> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoadmap(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoadmap(PathMetadata metadata, PathInits inits) {
        this(Roadmap.class, metadata, inits);
    }

    public QRoadmap(Class<? extends Roadmap> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ssafy.itclips.tmp.user.QUser(forProperty("user")) : null;
    }

}

