package com.ssafy.itclips.roadmap.service;

import com.ssafy.itclips.bookmark.repository.BookmarkRepository;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListResponseDTO;
import com.ssafy.itclips.bookmarklist.dto.BookmarkListRoadmapDTO;
import com.ssafy.itclips.bookmarklist.entity.BookmarkList;
import com.ssafy.itclips.bookmarklist.repository.BookmarkListRepository;
import com.ssafy.itclips.bookmarklist.service.BookmarkListService;
import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.roadmap.dto.*;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.entity.RoadmapComment;
import com.ssafy.itclips.roadmap.entity.RoadmapLike;
import com.ssafy.itclips.roadmap.entity.RoadmapStep;
import com.ssafy.itclips.roadmap.repository.RoadmapCommentRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapLikeRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapRepository;
import com.ssafy.itclips.roadmap.repository.RoadmapStepRepository;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.repository.TagRepository;
import com.ssafy.itclips.tag.repository.UserTagRepository;
import com.ssafy.itclips.user.dto.UserListDTO;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.entity.UserTag;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
    private final BookmarkListRepository bookmarkListRepository;
    private final TagRepository tagRepository;
    private final UserTagRepository userTagRepository;

    //전체 로드맵 조회
    @Override
    @Transactional
    public List<RoadmapInfoDTO> findAllRoadmapList() throws RuntimeException{
        // roadmap 가져오기
        List<Roadmap> roadmapList = roadmapRepository.findAll();
        if(roadmapList.isEmpty()){
            throw new CustomException(ErrorCode.ROADMAP_NOT_FOUND);
        }

        List<RoadmapInfoDTO> roadmapInfoDTOList = new ArrayList<>();

        for (Roadmap roadmap : roadmapList) {
            RoadmapInfoDTO roadmapInfoDTO = RoadmapInfoDTO.toDto(roadmap);
            roadmapInfoDTOList.add(roadmapInfoDTO);
        }

        return roadmapInfoDTOList;
    }

    // userid 기준 로드맵 조회
    @Override
    public List<RoadmapInfoDTO> findUserRoadmapList(Long userId) throws RuntimeException {
        // 유저 아이디로 로드맵 찾기
        List<Roadmap> roadmapList = roadmapRepository.findByUserId(userId)
                        .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

        // 로드맵출력 리스트
        List<RoadmapInfoDTO> roadmapInfoDTOList = new ArrayList<>();

        // 로드맵 -> 로드맵 출력용으로 바꿈
        for (Roadmap roadmap : roadmapList) {
            RoadmapInfoDTO roadmapInfoDTO = RoadmapInfoDTO.toDto(roadmap);
            roadmapInfoDTOList.add(roadmapInfoDTO);
        }

        return roadmapInfoDTOList;
    }

    // 로드맵 생성
    @Override
    @Transactional
    public void createRoadmap(Long userId, RoadmapRequestDTO roadmapRequestDTO) throws RuntimeException {
        // 생성자
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // step에 넣을 bookmark list
        List<Long> listIds = roadmapRequestDTO.getStepList();
        if(listIds.isEmpty()){
            throw new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND);
        }

        // roadmap entity 생성
        Roadmap saveRoadmap =roadmapRequestDTO.toEntity(user);

        //roadmap 저장
        Roadmap roadmap = roadmapRepository.save(saveRoadmap);

        // 스탭 생성
        createStep(listIds, roadmap);
    }


    // 로드맵수정
    @Override
    @Transactional
    public void updateRoadmap(Long roadmapId,Long userId,  RoadmapRequestDTO roadmapRequestDTO) throws RuntimeException {
        // 수정할 로드맵 가져오기
        Roadmap roadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

        checkUser(roadmap, userId);

        // step에 넣을 bookmark list
        List<Long> listIds = roadmapRequestDTO.getStepList();
        if(listIds.isEmpty()){
            throw new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND);
        }

        // 로드맵 업데이트
        roadmap.updateRoadmap(roadmapRequestDTO);

        // 스탭 삭제
        roadmapStepRepository.deleteByRoadmapId(roadmapId);

        // 삭제가 완료되었는지 확인
        if (roadmapStepRepository.existsByRoadmapId(roadmapId)) {
            throw new RuntimeException("Failed to delete existing steps");
        }

        // 스탭 생성
        createStep(listIds, roadmap);
    }


    // 로드맵 스크랩
    @Transactional
    @Override
    public void scrap(Long roadmapId, Long userId) throws RuntimeException {
        // 생성자
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //스크랩할 로드맵
        Roadmap roadmap= roadmapRepository.findById(roadmapId)
                        .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

        // 북마크 리스트 아이디
        List<Long> listIds= new ArrayList<>();
        List<RoadmapStep> steps = roadmapStepRepository.findByRoadmapId(roadmapId);
        for (RoadmapStep step : steps) {
            listIds.add(step.getBookmarkList().getId());
        }

        // 저장되는 로드맵
        RoadmapRequestDTO roadmapRequestDTO = RoadmapRequestDTO.toDTO(roadmap);
        roadmapRequestDTO.setOrigin(roadmapId);
        roadmapRequestDTO.setStepList(listIds);
        Roadmap saveRoadmap = roadmapRequestDTO.toEntity(user);
        roadmapRepository.save(saveRoadmap);

        createStep(roadmapRequestDTO.getStepList(), saveRoadmap);
    }

    // 로드맵 스크랩한 유저 리스트
    @Override
    public List<UserListDTO> scrapUserList(Long roadmapId) throws RuntimeException {
        List<UserListDTO> scrapUserListDTOList = new ArrayList<>();

        List<Roadmap> scrapRoadmapList = roadmapRepository.findByOrigin(roadmapId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

        for (Roadmap roadmap : scrapRoadmapList) {

            // 사용자 태그
            List<TagDTO> tags = getUserTags(roadmap.getUser().getId());
            scrapUserListDTOList.add(UserListDTO.toDTO(roadmap.getUser(),tags));
        }
        return scrapUserListDTOList;
    }

    // 단계 생성
    @Transactional
    public void createStep(List<Long> listId,Roadmap roadmap){
        // order 값
        int idx =0;
        for(Long id : listId){
            // 북마크 리스트 생성
            BookmarkList bookmarkList = bookmarkListRepository.findById(id)
                    .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_LIST_NOT_FOUND));

            // 북마크 리스트로 step 생성
            RoadmapStep roadmapStep = RoadmapStep.builder()
                    .roadmap(roadmap)
                    .bookmarkList(bookmarkList)
                    .check(false)
                    .order(idx++)
                    .build();

            roadmapStepRepository.save(roadmapStep);
        }
    }

    // 로드맵 삭제
    @Override
    public void deleteRoadmap(Long roadmapId , Long userId) throws RuntimeException {
        // 작성자 확인
        Roadmap roadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

        checkUser(roadmap, userId);

        roadmapRepository.deleteById(roadmapId);
    }

    private void checkUser(Roadmap roadmap, Long userId) {
        // 권한 확인
        if(!roadmap.getUser().getId().equals(userId)){
            throw new CustomException(ErrorCode.UNAUTHORIZED_USER);
        }
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
    @Transactional
    @Override
    public void likeRoadmap(Long roadmapId, Long userId) throws RuntimeException {
        RoadmapLike like = new RoadmapLike();
        Roadmap roadmap = roadmapRepository.findById(roadmapId).orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 이미 좋아요한 경우 예외처리
        RoadmapLike existLike = roadmapLikeRepository.findByRoadmapIdAndUserId(roadmapId, userId);
        if(existLike != null){
            throw new CustomException(ErrorCode.ROADMAP_LIKE_EXIST);
        }

        like.addRoadmapAndUser(roadmap,user);
        roadmapLikeRepository.save(like);
    }

    // 좋아요 취소
    @Transactional
    @Override
    public void unlikeRoadmap(Long roadmapId, Long userId) throws RuntimeException {
        RoadmapLike existLike = roadmapLikeRepository.findByRoadmapIdAndUserId(roadmapId, userId);
        if(existLike != null){
            roadmapLikeRepository.deleteByRoadmapIdAndUserId(roadmapId, userId);
        }
        else{
            throw new CustomException(ErrorCode.ROADMAP_LIKE_NOT_FOUND);
        }

    }


    // 좋아요한 사람 리스트
    @Override
    public List<UserListDTO> likeUserList(Long roadmapId) throws RuntimeException {
        // 사용자 리스트 DTO
        List<UserListDTO> userListDTOList = new ArrayList<>();

        // 로드맵 좋아요 리스트에서 해당 로드맵 좋아요만 뽑음
        List<RoadmapLike> userList = roadmapLikeRepository.findByRoadmapId(roadmapId)
                .orElseThrow(() -> new CustomException(ErrorCode.LIKE_USER_NOT_FOUND));

        for(RoadmapLike likeUser : userList){
            // 좋아요한 사용자
            User user = userRepository.findById(likeUser.getId())
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            // 사용자 태그
            List<TagDTO> tags = getUserTags(user.getId());
            userListDTOList.add(UserListDTO.toDTO(user,tags));
        }
        return userListDTOList;
    }

    // 로드맵 단계 진행 체크
    @Transactional
    @Override
    public void checkStep(Long stepId, Long userId) throws RuntimeException {

        // 스탭 가져오기
        RoadmapStep step = roadmapStepRepository.findById(stepId)
                .orElseThrow(()->new CustomException(ErrorCode.STEP_NOT_FOUND));

        // 권한 확인
        Roadmap roadmap = step.getRoadmap();
        checkUser(roadmap, userId);

        // 0 -> 1 1->0
        step.setCheck(!step.getCheck());

        //저장
        roadmapStepRepository.save(step);

    }

    //단계 삭제
    @Override
    public void deleteStep(Long stepId, Long userId) throws RuntimeException {
        // 스탭
        RoadmapStep step = roadmapStepRepository.findById(stepId)
                .orElseThrow(()->new CustomException(ErrorCode.STEP_NOT_FOUND));

        // 권한 확인
        Roadmap roadmap = step.getRoadmap();
        checkUser(roadmap, userId);

        // 삭제
        roadmapStepRepository.deleteById(stepId);
    }



    // 댓글달기
    @Transactional
    @Override
    public void comment(Long roadmapId, Long userId, RoadmapCommentRequestDTO roadmapCommentRequestDTO) throws RuntimeException {
        Roadmap roadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROADMAP_NOT_FOUND));

        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        RoadmapComment roadmapComment = RoadmapCommentRequestDTO.toEntity(roadmap, user, roadmapCommentRequestDTO);

        roadmapCommentRepository.save(roadmapComment);
    }



    //댓글 삭제
    @Override
    public void deleteComment(Long commentId, Long userId) throws RuntimeException {
        RoadmapComment comment = roadmapCommentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));

        roadmapCommentRepository.delete(comment);
    }



    ////////////////// get dto /////////////////////

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
            BookmarkListRoadmapDTO bookmarkListResponseDTO = bookmarkListService.getBookmarkListResponseDTO(roadmapStep.getBookmarkList().getId());
            RoadmapStepResponseDto stepDto = makeRoadmapStepDTO(roadmapId, roadmapStep, bookmarkListResponseDTO);

            stepResponseDtoList.add(stepDto);
        }

        return stepResponseDtoList;
    }


    // 유저 태그
    private List<TagDTO> getUserTags(Long userId) {
        List<UserTag> userTags = userTagRepository.findByUserId(userId);
        List<TagDTO> tagDTOs = new ArrayList<>();

        for (UserTag userTag : userTags) {
            tagDTOs.add(TagDTO.toDTO(userTag.getTag()));
        }

        return tagDTOs;
    }

    //////////////////////// meke dto ///////////////////////////////////


    // 로드맵 단계 DTO
    private static RoadmapStepResponseDto makeRoadmapStepDTO(Long roadmapId, RoadmapStep roadmapStep, BookmarkListRoadmapDTO bookmarkListResponseDTO) {
        return RoadmapStepResponseDto.builder()
                .id(roadmapStep.getId())
                .roadmapId(roadmapId)
                .bookmarkListRoadmapDTO(bookmarkListResponseDTO)
                .check(roadmapStep.getCheck())
                .order(roadmapStep.getOrder())
                .build();
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
