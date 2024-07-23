package com.ssafy.itclips.roadmap.service;

import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.repository.RoadmapRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoadmapServiceImpl implements RoadmapService {

    private final RoadmapRepository roadmapRepository;
    //전체 로드맵 조회
    @Override
    @Transactional
    public List<RoadmapInfoDTO> findAllRoadmapList() throws RuntimeException{
        List<Roadmap> roadmapList = roadmapRepository.findAll();
        if(roadmapList.isEmpty()){
            throw new CustomException(ErrorCode.ROADMAP_NOT_FOUND);
        }
        List<RoadmapInfoDTO> roadmapInfoDTOList = new ArrayList<>();

        for (Roadmap roadmap : roadmapList) {
            RoadmapInfoDTO roadmapInfoDTO = makeRoadmapDTO(roadmap);
            roadmapInfoDTOList.add(roadmapInfoDTO);
        }

        return roadmapInfoDTOList;
    }

    // userid 기준 조회
    @Override
    public List<RoadmapInfoDTO> findUserRoadmapList(Long userId) throws RuntimeException {
        List<Roadmap> roadmapList = roadmapRepository.findByUserId(userId)
                        .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));
        List<RoadmapInfoDTO> roadmapInfoDTOList = new ArrayList<>();

        for (Roadmap roadmap : roadmapList) {
            RoadmapInfoDTO roadmapInfoDTO = makeRoadmapDTO(roadmap);
            roadmapInfoDTOList.add(roadmapInfoDTO);
        }

        return roadmapInfoDTOList;
    }


    // 로드맵 삭제


    // 로드맵 생성


    // 로드맵수정




    // 로드맵 좋아요


    // 로드맵 스크랩


    // 로드맵 댓글 보기


    // 댓글달기



    //댓글 삭제


    private static RoadmapInfoDTO makeRoadmapDTO(Roadmap roadmap) {

        return RoadmapInfoDTO.builder()
                .id(roadmap.getId())
                .userName(roadmap.getUser().getNickname())
                .title(roadmap.getTitle())
                .description(roadmap.getDescription())
                .image(roadmap.getImage())
                .isPublic(roadmap.getIsPublic())
                .createdAt(roadmap.getCreatedAt())
                .build();
    }
}
