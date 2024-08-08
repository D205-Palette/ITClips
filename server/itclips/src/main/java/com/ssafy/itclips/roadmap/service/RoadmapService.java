package com.ssafy.itclips.roadmap.service;

import com.ssafy.itclips.global.file.DataResponseDto;
import com.ssafy.itclips.global.gpt.GPTResponseDTO;
import com.ssafy.itclips.global.rank.RankDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapCommentRequestDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapRequestDTO;
import com.ssafy.itclips.user.dto.UserListDTO;

import java.util.List;

public interface RoadmapService {

    // 모든 로드맵 찾기
    List<RoadmapInfoDTO> findAllRoadmapList(Long viewId) throws RuntimeException;
    // 특정 유저 로드맵 찾기
    List<RoadmapInfoDTO> findUserRoadmapList(Long userId,Long viewId) throws RuntimeException;


    // 로드맵 생성
    DataResponseDto createRoadmap(Long userId, RoadmapRequestDTO roadmapRequestDTO) throws RuntimeException;
    // 로드맵 삭제하기
    void deleteRoadmap(Long roadmapId,Long userId) throws RuntimeException;
    // 로드맵 상세보기
    RoadmapDTO roadmapDetail(Long roadmapId,Long viewId) throws RuntimeException;
    // 로드맵 수정
    DataResponseDto updateRoadmap(Long roadmapId, Long userId, RoadmapRequestDTO roadmapRequestDTO) throws RuntimeException;


    // 로드맵 좋아요
    void likeRoadmap(Long roadmapId, Long userId) throws RuntimeException;
    // 좋아요 취소
    void unlikeRoadmap(Long roadmapId, Long userId) throws RuntimeException;
    // 좋아요한 유저 리스트
    List<UserListDTO>likeUserList(Long roadmapId) throws RuntimeException;


    // 단계 진행
    void checkStep(Long stepId, Long userId) throws RuntimeException;
    void deleteStep(Long stepId, Long userId) throws RuntimeException;


    //스크랩
    void scrap(Long roadmapId, Long userId) throws RuntimeException;
    //스크랩한 유저 리스트
    List<UserListDTO> scrapUserList(Long roadmapId) throws RuntimeException;


    // 로드맵 댓글 달기
    void comment(Long roadmapId, Long userId, RoadmapCommentRequestDTO roadmapCommentRequestDTO) throws RuntimeException;
    // 로드맵 댓글 삭제
    void deleteComment(Long commentId, Long userId) throws RuntimeException;

    //로드맵 좋아요 인기순위
    List<RankDTO> getListsRankingByLikes();
    //조회수 인기순위
    List<RankDTO> getListsRankingByHit();
    // 스크랩 인기순위
    List<RankDTO> getListsRankingByScrap();

    List<RoadmapInfoDTO> searchRoadMaps(Integer page, String searchType, Long userId, String title) throws RuntimeException;

    Integer getCommentCount(Long roadmapId) throws RuntimeException;

    GPTResponseDTO getRecommendRoadmapSteps(Long userId, String keyWord) throws RuntimeException;
}
