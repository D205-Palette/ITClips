package com.ssafy.itclips.roadmap.repository;

import com.ssafy.itclips.roadmap.entity.RoadmapComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface RoadmapCommentRepository extends JpaRepository<RoadmapComment, Long> {
    // 로드맵 댓글 찾기
    List<RoadmapComment> findByRoadmapId(Long roadmapId);
}
