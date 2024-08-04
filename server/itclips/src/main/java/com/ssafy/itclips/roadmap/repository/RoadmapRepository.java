package com.ssafy.itclips.roadmap.repository;

import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepositoryCustom;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap,Long>, RoadmapRepositoryCustom {
    // 유저 아이디로 로드맵 찾기
    Optional<List<Roadmap>> findByUserId(Long id);
    Optional<List<Roadmap>> findByOrigin(Long id);
    Long countByOrigin(Long roadmapId);
    List<Roadmap> findTop10ByOrderByHitDesc();
}
