package com.ssafy.itclips.tmp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoadmapStep is a Querydsl query type for RoadmapStep
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoadmapStep extends EntityPathBase<RoadmapStep> {

    private static final long serialVersionUID = -96538988L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoadmapStep roadmapStep = new QRoadmapStep("roadmapStep");

    public final com.ssafy.itclips.bookmarklist.entity.QBookmarkList bookmarkList;

    public final NumberPath<Byte> check = createNumber("check", Byte.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> order = createNumber("order", Integer.class);

    public final QRoadmap roadmap;

    public QRoadmapStep(String variable) {
        this(RoadmapStep.class, forVariable(variable), INITS);
    }

    public QRoadmapStep(Path<? extends RoadmapStep> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoadmapStep(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoadmapStep(PathMetadata metadata, PathInits inits) {
        this(RoadmapStep.class, metadata, inits);
    }

    public QRoadmapStep(Class<? extends RoadmapStep> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmarkList = inits.isInitialized("bookmarkList") ? new com.ssafy.itclips.bookmarklist.entity.QBookmarkList(forProperty("bookmarkList"), inits.get("bookmarkList")) : null;
        this.roadmap = inits.isInitialized("roadmap") ? new QRoadmap(forProperty("roadmap"), inits.get("roadmap")) : null;
    }

}

