package com.ssafy.itclips.roadmap.repository;

import com.ssafy.itclips.roadmap.entity.RoadmapStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface RoadmapStepRepository extends JpaRepository<RoadmapStep,Long> {
    // 로드맵 아이디로 단계 찾기
    List<RoadmapStep> findByRoadmapId(Long roadmapId);
    void deleteByRoadmapId(Long roadmapId);
    Boolean existsByRoadmapId(Long roadmapId);
    Long countByRoadmapId(Long roadmapId);
    Long countByRoadmapIdAndCheck(Long roadmapId, Boolean check);
}
