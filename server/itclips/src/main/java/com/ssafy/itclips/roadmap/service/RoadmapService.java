package com.ssafy.itclips.roadmap.service;

import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;

import java.util.List;

public interface RoadmapService {

    List<RoadmapInfoDTO> findAllRoadmapList() throws RuntimeException;
    List<RoadmapInfoDTO> findUserRoadmapList(Long userId) throws RuntimeException;
    void deleteRoadmap(Long roadmapId) throws RuntimeException;
}
