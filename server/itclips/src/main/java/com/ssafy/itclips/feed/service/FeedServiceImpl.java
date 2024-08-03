package com.ssafy.itclips.feed.service;

import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.feed.repository.FeedRepository;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.repository.FollowRepository;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.repository.RoadmapLikeRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapStepRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class FeedServiceImpl implements FeedService{

    private final FeedRepository feedRepository;
    private final RoadmapRepository roadmapRepository;
    private final RoadmapStepRepository roadmapStepRepository;
    private final RoadmapLikeRepository roadmapLikeRepository;
    private final FollowRepository followRepository;

    // 로드맵 피드 출력
    @Override
    public List<RoadmapInfoDTO> getRoadmapFeed(Long userId) {
        List<Long> roadmapIds = feedRepository.getUserRoadmapFeed(userId);
        List<RoadmapInfoDTO> roadmapInfoDTOList = new ArrayList<>();

        if(roadmapIds != null) {
            for (Long roadmapId : roadmapIds) {
                Roadmap roadmap = roadmapRepository.findById(roadmapId)
                        .orElseThrow(()-> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

                // 로드맵 단계 수
                Long stepCnt = roadmapStepRepository.countByRoadmapId(roadmap.getId());
                // 체크한단계 수
                Long checkCnt = roadmapStepRepository.countByRoadmapIdAndCheck(roadmap.getId(), true);
                // 좋아요 수
                Long likeCnt = roadmapLikeRepository.countByRoadmapId(roadmap.getId());

                RoadmapInfoDTO roadmapInfoDTO = RoadmapInfoDTO.toDto(roadmap,stepCnt,checkCnt,likeCnt);
                roadmapInfoDTOList.add(roadmapInfoDTO);
            }

        }
        return roadmapInfoDTOList;
    }

    // 로드맵 피드 저장
    @Override
    public void saveRoadmapFeed(Long userId, Long roadmapId) {
        List<Follow> followersList = followRepository.findByToId(userId);

        for(Follow follow : followersList) {
            feedRepository.saveRoadmapFeed(follow.getFrom().getId(),roadmapId);
        }
    }
}
