package com.ssafy.itclips.roadmap.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkList;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkListLike;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.roadmap.entity.QRoadmap;
import com.ssafy.itclips.roadmap.entity.QRoadmapLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoadmapRepositoryImpl implements RoadmapRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<RankDTO> findListRankingByLike() {
        QRoadmap qRoadmap = QRoadmap.roadmap;
        QRoadmapLike qRoadmapLike = QRoadmapLike.roadmapLike;

        return queryFactory.select(Projections.constructor(RankDTO.class,
                        qRoadmap.id,
                        qRoadmap.title,
                        qRoadmapLike.count().as("count")))
                .from(qRoadmap)
                .innerJoin(qRoadmapLike)
                .on(qRoadmap.id.eq(qRoadmapLike.roadmap.id))
                .groupBy(qRoadmap.id)
                .orderBy(qRoadmapLike.count().desc())
                .limit(10)
                .fetch();
    }

    @Override
    public List<RankDTO> findListRankingByScrap() {
        QRoadmap qRoadmap1 = new QRoadmap("roadmap");
        QRoadmap qRoadmap2 = new QRoadmap("roadmap2");

        return queryFactory.select(Projections.constructor(RankDTO.class,
                        qRoadmap1.origin,
                        qRoadmap2.title,
                        qRoadmap1.count().as("count")))
                .from(qRoadmap1)
                .join(qRoadmap2).on(qRoadmap2.id.eq(qRoadmap1.origin))
                .where(qRoadmap1.origin.isNotNull())
                .groupBy(qRoadmap1.origin, qRoadmap2.title)
                .orderBy(qRoadmap1.count().desc())
                .limit(10)
                .fetch();
    }
}
