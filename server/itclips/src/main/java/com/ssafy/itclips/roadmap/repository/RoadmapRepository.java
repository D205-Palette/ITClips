package com.ssafy.itclips.roadmap.repository;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap,Long> {

}
