package com.ssafy.itclips.roadmap.repository;

import com.ssafy.itclips.global.rank.RankDTO;

import java.util.List;

public interface RoadmapRepositoryCustom {
    List<RankDTO> findListRankingByLike();
    List<RankDTO> findListRankingByScrap();
}
