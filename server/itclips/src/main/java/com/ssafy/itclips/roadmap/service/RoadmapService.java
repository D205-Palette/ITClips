package com.ssafy.itclips.roadmap.service;

import com.ssafy.itclips.roadmap.dto.RoadmapDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;

import java.util.List;

public interface RoadmapService {

    // 모든 로드맵 찾기
    List<RoadmapInfoDTO> findAllRoadmapList() throws RuntimeException;
    // 특정 유저 로드맵 찾기
    List<RoadmapInfoDTO> findUserRoadmapList(Long userId) throws RuntimeException;
    // 로드맵 삭제하기
    void deleteRoadmap(Long roadmapId) throws RuntimeException;
    // 로드맵 상세보기
    RoadmapDTO roadmapDetail(Long roadmapId) throws RuntimeException;

    // 로드맵 좋아요
    void likeRoadmap(Long roadmapId, Long userId) throws RuntimeException;
}
