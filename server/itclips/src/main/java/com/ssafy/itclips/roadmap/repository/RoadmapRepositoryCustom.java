package com.ssafy.itclips.roadmap.repository;

import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;

import java.util.List;

public interface RoadmapRepositoryCustom {
    List<RankDTO> findListRankingByLike();
    List<RankDTO> findListRankingByScrap();
    List<Roadmap> findRoadMapByTitleAndHit(String title, Integer pageNo);
    List<Roadmap> findRoadMapListByTitleAndScrap(String title, Integer pageNo);
    List<Roadmap> findRoadMapListByTitleAndLike(String title, Integer pageNo);
}
