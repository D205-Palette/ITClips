package com.ssafy.itclips.roadmap.service;

import com.ssafy.itclips.roadmap.dto.RoadmapCommentRequestDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapRequestDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.user.dto.UserListDTO;

import java.util.List;

public interface RoadmapService {

    // 모든 로드맵 찾기
    List<RoadmapInfoDTO> findAllRoadmapList() throws RuntimeException;
    // 특정 유저 로드맵 찾기
    List<RoadmapInfoDTO> findUserRoadmapList(Long userId) throws RuntimeException;


    // 로드맵 생성
    void createRoadmap(Long userId, RoadmapRequestDTO roadmapRequestDTO) throws RuntimeException;
    // 로드맵 삭제하기
    void deleteRoadmap(Long roadmapId,Long userId) throws RuntimeException;
    // 로드맵 상세보기
    RoadmapDTO roadmapDetail(Long roadmapId) throws RuntimeException;
    // 로드맵 수정
    void updateRoadmap(Long roadmapId,Long userId,  RoadmapRequestDTO roadmapRequestDTO) throws RuntimeException;


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
}
