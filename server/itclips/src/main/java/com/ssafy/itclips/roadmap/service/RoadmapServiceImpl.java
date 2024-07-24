package com.ssafy.itclips.roadmap.service;

import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.service.BookmarkListService;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.roadmap.dto.RoadmapCommentDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapStepResponseDto;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.entity.RoadmapComment;
import com.ssafy.itclips.roadmap.entity.RoadmapLike;
import com.ssafy.itclips.roadmap.entity.RoadmapStep;
import com.ssafy.itclips.roadmap.repository.RoadmapCommentRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapLikeRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapStepRepository;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
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
    private final RoadmapCommentRepository roadmapCommentRepository;
    private final RoadmapStepRepository roadmapStepRepository;
    private final BookmarkListService bookmarkListService;
    private final RoadmapLikeRepository roadmapLikeRepository;
    private final UserRepository userRepository;

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
        // 유저 아이디로 로드맵 찾기
        List<Roadmap> roadmapList = roadmapRepository.findByUserId(userId)
                        .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

        // 로드맵출력 리스트
        List<RoadmapInfoDTO> roadmapInfoDTOList = new ArrayList<>();

        // 로드맵 -> 로드맵 출력용으로 바꿈
        for (Roadmap roadmap : roadmapList) {
            RoadmapInfoDTO roadmapInfoDTO = makeRoadmapDTO(roadmap);
            roadmapInfoDTOList.add(roadmapInfoDTO);
        }

        return roadmapInfoDTOList;
    }

    // 로드맵 삭제
    @Override
    public void deleteRoadmap(Long roadmapId) throws RuntimeException {
        roadmapRepository.deleteById(roadmapId);
    }

    //로드맵 상세보기
    @Override
    public RoadmapDTO roadmapDetail(Long roadmapId) throws RuntimeException {
        // 로드맵 가져오기
        Roadmap roadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

        // 로드맵 댓글 가져오기
        List<RoadmapCommentDTO> roadmapCommentDTOList = getRoadmapCommentDTOList(roadmapId);

        // 로드맵 단계 가져오기
        List<RoadmapStepResponseDto> stepResponseDtoList = getRoadmapStepDTOList(roadmapId);

        // 좋아요 수
        Long likeCnt = roadmapLikeRepository.countByRoadmapId(roadmap.getId());

        // dto에 넣기
        RoadmapDTO roadmapDTO = makeRoadmapDTO(roadmap, stepResponseDtoList, roadmapCommentDTOList, likeCnt);


        return roadmapDTO;
    }



    // 로드맵 좋아요
    @Override
    public void likeRoadmap(Long roadmapId, Long userId) throws RuntimeException {
        RoadmapLike like = new RoadmapLike();
        Roadmap roadmap = roadmapRepository.findById(roadmapId).orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 이미 좋아요한 경우 예외처리
        RoadmapLike existLike = roadmapLikeRepository.findByRoadmapIdAndUserId(roadmapId, userId);
        if(existLike == null){
            throw new CustomException(ErrorCode.ROADMAP_LIKE_EXIST);
        }

        like.addRoadmapAndUser(roadmap,user);
        roadmapLikeRepository.save(like);
    }

    // 좋아요 취소


    // 좋아요한 사람 리스트



    // 로드맵 생성


    // 로드맵수정


    // 로드맵 스크랩


    // 로드맵 댓글 보기


    // 댓글달기


    //댓글 삭제


    // 로드맵 댓글 가져오기
    private List<RoadmapCommentDTO> getRoadmapCommentDTOList(Long roadmapId) {
        List<RoadmapCommentDTO> roadmapCommentDTOList = new ArrayList<>();
        List<RoadmapComment> roadmapCommentlist = roadmapCommentRepository.findByRoadmapId(roadmapId);

        for (RoadmapComment roadmapComment : roadmapCommentlist) {
            RoadmapCommentDTO roadmapCommentDTO = makeRoadmapCommentDTO(roadmapId, roadmapComment);
            roadmapCommentDTOList.add(roadmapCommentDTO);
        }
        return roadmapCommentDTOList;
    }

    // 로드맵 단계 가져오기
    private List<RoadmapStepResponseDto> getRoadmapStepDTOList(Long roadmapId) {
        List<RoadmapStepResponseDto> stepResponseDtoList = new ArrayList<>();

        List<RoadmapStep> steps = roadmapStepRepository.findByRoadmapId(roadmapId);

        for (RoadmapStep roadmapStep : steps) {
            // 북마크 리스트 1개 가져오기
            BookmarkListResponseDTO bookmarkListResponseDTO = bookmarkListService.getBookmarkListResponseDTO(roadmapStep.getBookmarkList().getId());
            RoadmapStepResponseDto stepDto = makeRoadmapStepDTO(roadmapId, roadmapStep, bookmarkListResponseDTO);

            stepResponseDtoList.add(stepDto);
        }

        return stepResponseDtoList;
    }


    //////////////////////// meke dto ///////////////////////////////////


    // 로드맵 단계 DTO
    private static RoadmapStepResponseDto makeRoadmapStepDTO(Long roadmapId, RoadmapStep roadmapStep, BookmarkListResponseDTO bookmarkListResponseDTO) {
        RoadmapStepResponseDto stepDto = new RoadmapStepResponseDto().builder()
                .id(roadmapStep.getId())
                .roadmapId(roadmapId)
                .bookmarkListResponseDTO(bookmarkListResponseDTO)
                .check(roadmapStep.getCheck())
                .order(roadmapStep.getOrder())
                .build();
        return stepDto;
    }

    // 로드맵 댓글 DTO
    private static RoadmapCommentDTO makeRoadmapCommentDTO(Long roadmapId, RoadmapComment roadmapComment) {
        return new RoadmapCommentDTO().builder()
                .id(roadmapComment.getId())
                .comment(roadmapComment.getContents())
                .userId(roadmapComment.getUser().getId())
                .userName(roadmapComment.getUser().getNickname())
                .RoadmapId(roadmapId)
                .createdAt(roadmapComment.getCreatedAt())
                .build();
    }

    // 로드맵 정보 DTO
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

    // 로드맵 dto
    private static RoadmapDTO makeRoadmapDTO(Roadmap roadmap, List<RoadmapStepResponseDto> stepResponseDtoList, List<RoadmapCommentDTO> roadmapCommentDTOList, Long likeCnt) {
        RoadmapDTO roadmapDTO = new RoadmapDTO().builder()
                .id(roadmap.getId())
                .userId(roadmap.getUser().getId())
                .userName(roadmap.getUser().getNickname())
                .title(roadmap.getTitle())
                .description(roadmap.getDescription())
                .createdAt(roadmap.getCreatedAt())
                .image(roadmap.getImage())
                .isPublic(roadmap.getIsPublic())
                .stepList(stepResponseDtoList)
                .commentList(roadmapCommentDTOList)
                .likeCnt(likeCnt)
                .build();
        return roadmapDTO;
    }
}
