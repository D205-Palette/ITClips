package com.ssafy.itclips.roadmap.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkList;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkListLike;
import com.ssafy.itclips.bookmarklist.entity.QBookmarkListScrap;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.roadmap.entity.QRoadmap;
import com.ssafy.itclips.roadmap.entity.QRoadmapLike;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoadmapRepositoryImpl implements RoadmapRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private static final Integer PAGE_SIZE = 8;

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
                .where(qRoadmap.isPublic.eq((byte) 1))
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
                .where(qRoadmap1.origin.isNotNull()
                        .and(qRoadmap1.isPublic.eq((byte) 1)))
                .groupBy(qRoadmap1.origin, qRoadmap2.title)
                .orderBy(qRoadmap1.count().desc())
                .limit(10)
                .fetch();
    }

    @Override
    public List<Roadmap> findRoadMapByTitleAndHit(String title, Integer pageNo) {
        QRoadmap qRoadmap = QRoadmap.roadmap;

        int offset = (pageNo - 1) * PAGE_SIZE;

        return queryFactory.selectFrom(qRoadmap)
                .where(qRoadmap.title.contains(title)
                        .and(qRoadmap.isPublic.eq((byte) 1)))
                .orderBy(qRoadmap.hit.desc(), qRoadmap.createdAt.desc())
                .offset(offset)
                .limit(PAGE_SIZE)
                .fetch();
    }

    @Override
    public List<Roadmap> findRoadMapListByTitleAndScrap(String title, Integer pageNo) {
        QRoadmap qRoadmapA = QRoadmap.roadmap;
        QRoadmap qRoadmapB = new QRoadmap("roadmapB");

        int offset = (pageNo - 1) * PAGE_SIZE;

        return queryFactory
                .selectFrom(qRoadmapA)
                .leftJoin(qRoadmapB).on(qRoadmapA.id.eq(qRoadmapB.origin))
                .where(qRoadmapB.origin.isNotNull()
                        .and(qRoadmapA.isPublic.eq((byte) 1)))
                .groupBy(qRoadmapA.id)
                .orderBy(
                        qRoadmapB.count().desc(),
                        qRoadmapA.createdAt.desc()
                )
                .offset(offset)
                .limit(PAGE_SIZE)
                .fetch();
    }


    @Override
    public List<Roadmap> findRoadMapListByTitleAndLike(String title, Integer pageNo) {
        QRoadmap qRoadmap = QRoadmap.roadmap;
        QRoadmapLike qRoadmapLike = QRoadmapLike.roadmapLike;

        int offset = (pageNo - 1) * PAGE_SIZE;

        return queryFactory.select(qRoadmap)
                .from(qRoadmap)
                .join(qRoadmapLike).on(qRoadmap.id.eq(qRoadmapLike.roadmap.id))
                .where(qRoadmap.title.contains(title)
                        .and(qRoadmap.isPublic.eq((byte)1)))
                .groupBy(qRoadmap.id)
                .orderBy(qRoadmapLike.id.count().desc(), qRoadmap.createdAt.desc())
                .offset(offset)
                .limit(PAGE_SIZE)
                .fetch();
    }


}
