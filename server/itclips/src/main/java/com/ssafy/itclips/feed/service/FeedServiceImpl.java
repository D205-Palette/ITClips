package com.ssafy.itclips.feed.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.bookmarklist.service.BookmarkListServiceImpl;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.feed.repository.FeedRepository;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.repository.FollowRepository;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.dto.StepInfoDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.entity.RoadmapStep;
import com.ssafy.itclips.roadmap.repository.RoadmapLikeRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapStepRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class FeedServiceImpl implements FeedService{

    private final FeedRepository feedRepository;
    private final RoadmapRepository roadmapRepository;
    private final RoadmapStepRepository roadmapStepRepository;
    private final RoadmapLikeRepository roadmapLikeRepository;
    private final FollowRepository followRepository;
    private final BookmarkListServiceImpl bookmarkListService;
    private final BookmarkListRepository bookmarkListRepository;

    // 로드맵 피드 출력
    @Transactional
    @Override
    public List<RoadmapInfoDTO> getRoadmapFeed(Long userId) {
        List<Long> roadmapIds = feedRepository.getUserFeed(userId, "roadmapFeed");
        List<RoadmapInfoDTO> roadmapInfoDTOList = new ArrayList<>();

        if(roadmapIds != null) {
            for (Long roadmapId : roadmapIds) {
                Optional<Roadmap> roadmap = roadmapRepository.findById(roadmapId);

                if(!roadmap.isPresent()) {
                    continue;
                }

                // 로드맵 단계
                List<RoadmapStep> roadmapStepList = roadmapStepRepository.findByRoadmapId(roadmap.get().getId());
                List<StepInfoDTO> steps = new ArrayList<>();

                for(RoadmapStep roadmapStep : roadmapStepList){
                    steps.add(StepInfoDTO.toDTO(roadmapStep));
                }

                // 체크한단계 수
                Long checkCnt = roadmapStepRepository.countByRoadmapIdAndCheck(roadmap.get().getId(), true);
                // 좋아요 수
                Long likeCnt = roadmapLikeRepository.countByRoadmapId(roadmap.get().getId());

                RoadmapInfoDTO roadmapInfoDTO = RoadmapInfoDTO.toDto(roadmap.get(),steps.size(),checkCnt,likeCnt,steps);
                roadmapInfoDTOList.add(roadmapInfoDTO);
            }

        }
        return roadmapInfoDTOList;
    }

    // 로드맵 피드 저장
    @Transactional
    @Override
    public void saveRoadmapFeed(Long userId, Long roadmapId) {
        List<Follow> followersList = followRepository.findByToId(userId);

        for(Follow follow : followersList) {
            feedRepository.saveFeed(follow.getFrom().getId(),roadmapId, "roadmapFeed");
        }
    }

    // 북마크 피드 출력
    @Transactional
    @Override
    public List<BookmarkListResponseDTO> getListFeed(Long userId) {
        List<Long> listIds = feedRepository.getUserFeed(userId, "listFeed");
        List<BookmarkListResponseDTO> bookmarkListResponseDTOList = new ArrayList<>();

        if(listIds != null) {
            for (Long listId : listIds) {
                Optional<BookmarkList> bookmarkList = bookmarkListRepository.findById(listId);
                //TODO: 삭제됐을 때 처리

                if(!bookmarkList.isPresent()) {
                    continue;
                }

                bookmarkListResponseDTOList.add(bookmarkListService.convertToBookmarkListResponseDTO(bookmarkList.get(),userId));
            }
        }
        return bookmarkListResponseDTOList;
    }

}
