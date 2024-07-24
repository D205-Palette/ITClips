package com.ssafy.itclips.roadmap.repository;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.entity.RoadmapLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoadmapLikeRepository extends JpaRepository<RoadmapLike, Long> {
    // 로드맵 좋아요 수
    Long countByRoadmapId(Long roadmapId);
}
