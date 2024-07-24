package com.ssafy.itclips.roadmap.repository;

import com.ssafy.itclips.roadmap.entity.RoadmapLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadmapLikeRepository extends JpaRepository<RoadmapLike, Long> {
    // 로드맵 좋아요 수
    Long countByRoadmapId(Long roadmapId);
    RoadmapLike findByRoadmapIdAndUserId(Long roadmapId, Long userId);
    void deleteByRoadmapIdAndUserId(Long roadmapId, Long userId);
}
