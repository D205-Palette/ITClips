package com.ssafy.itclips.roadmap.service;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.repository.RoadmapRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoadmapServiceImpl implements RoadmapService {

    private final RoadmapRepository roadmapRepository;
    //전체 로드맵 조회
    @Override
    public List<Roadmap> findAllRoadmapList() {
        return roadmapRepository.findAll();
    }

    // userid 기준 조회


    // 로드맵 생성


    // 로드맵수정


    // 로드맵 삭제


    // 로드맵 좋아요


    // 로드맵 스크랩


    // 로드맵 댓글 보기


    // 댓글달기



    //댓글 삭제


}
