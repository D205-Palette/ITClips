package com.ssafy.itclips.roadmap.controller;

import com.ssafy.itclips.roadmap.dto.RoadmapCommentRequestDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.dto.RoadmapRequestDTO;
import com.ssafy.itclips.roadmap.service.RoadmapService;
import com.ssafy.itclips.user.dto.UserListDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roadmap")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "roadmap Controller", description = "로드맵 관련 API")
public class RoadmapController {

    private final RoadmapService roadmapService;

    // 모든 로드맵 보기
    @GetMapping("/list")
    @Operation(summary = "모든 로드맵 보기", description = "생성된 모든 로드맵을 볼 수 있습니다.")
    public ResponseEntity<?> roadmapList(){
        List<RoadmapInfoDTO> roadmapList =  roadmapService.findAllRoadmapList();

        return new ResponseEntity<>(roadmapList, HttpStatus.OK);
    }

    // 특정 유저가 생성한 로드맵 보기
    @GetMapping("/list/{userId}")
    @Operation(summary = "유저 로드맵 보기" , description = "특정 유저가 생성한 로드맵을 볼 수 있습니다. ")
    public ResponseEntity<?> findUserRoadmap(@PathVariable("userId") Long userId){
        List<RoadmapInfoDTO> roadmapList = roadmapService.findUserRoadmapList(userId);
        return new ResponseEntity<>(roadmapList, HttpStatus.OK);
    }

    //로드맵 생성
    @PostMapping("/{userId}")
    @Operation(summary = "로드맵 생성 " , description = "로드맵을 생성합니다.")
    public ResponseEntity<?> createRoadmap(@PathVariable("userId") Long userId, @RequestBody RoadmapRequestDTO roadmapRequestDTO){
        roadmapService.createRoadmap(userId,roadmapRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로드맵 삭제
    @DeleteMapping("/{roadmapId}/{userId}")
    @Operation(summary = "로드맵 삭제", description = "로드맵을 삭제합니다.")
    public ResponseEntity<?> deleteRoadmap(@PathVariable("roadmapId") Long roadmapId, @PathVariable("userId")Long userId){
        roadmapService.deleteRoadmap(roadmapId,userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로드맵 수정
    @PutMapping("/{roadmapId}/{userId}")
    @Operation(summary = "로드맵 수정", description = "로드맵 수정 페이지입니다. ")
    public ResponseEntity<?> updateRoadmap(@PathVariable("roadmapId") Long roadmapId,@PathVariable("userId") Long userId, @RequestBody RoadmapRequestDTO roadmapRequestDTO){
        roadmapService.updateRoadmap(roadmapId,userId, roadmapRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로드맵 상세 보기
    @GetMapping("/{roadmapId}")
    @Operation(summary = "로드맵 상세보기", description = "로드맵 상세페이지입니다. ")
    public ResponseEntity<?> roadmapDetail(@PathVariable("roadmapId") Long roadmapId){
        RoadmapDTO roadmapDTO = roadmapService.roadmapDetail(roadmapId);
        return new ResponseEntity<>(roadmapDTO, HttpStatus.OK);
    }

    //로드맵 좋아요
    @GetMapping("/like/{roadmapId}/{userId}")
    @Operation(summary = "로드맵 좋아요" ,description = "누르면 좋아요")
    public ResponseEntity<?> likeRoadmap(@PathVariable("roadmapId") Long roadmapId,@PathVariable("userId") Long userId){
        roadmapService.likeRoadmap(roadmapId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로드맵 좋아요 취소
    @DeleteMapping("/like/{roadmapId}/{userId}")
    @Operation(summary = "로드맵 좋아요 취소 " ,description = "좋아요 취소 ")
    public ResponseEntity<?> unlikeRoadmap(@PathVariable("roadmapId") Long roadmapId,@PathVariable("userId") Long userId){
        roadmapService.unlikeRoadmap(roadmapId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로드맵 좋아요 유저 리스트
    @GetMapping("/like/{roadmapId}")
    @Operation(summary = "로드맵에 좋아요한 사람 리스트", description = "로드맵에 좋아요한 유저 리스트입니다.")
    public ResponseEntity<?> likeUserList(@PathVariable("roadmapId") Long roadmapId){
        List<UserListDTO> likeUser = roadmapService.likeUserList(roadmapId);
        return new ResponseEntity<>(likeUser, HttpStatus.OK);
    }


    // 단계 진행
    @PutMapping("/step/{stepId}/{userId}")
    @Operation(summary = "로드맵 단계진행 ", description = "체크된 상태라면 체크 해제, 안되어있으면 체크")
    public ResponseEntity<?> step(@PathVariable("stepId") Long stepId, @PathVariable("userId")Long userId){
        roadmapService.checkStep(stepId,userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 단계 삭제
    @DeleteMapping("/step/{stepId}/{userId}")
    @Operation(summary = "로드맵 단계 삭제 " , description = "로드맵 단계 삭제")
    public ResponseEntity<?> deleteStep(@PathVariable("stepId") Long stepId, @PathVariable("userId")Long userId){
        roadmapService.deleteStep(stepId,userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로드맵 스크랩
    @PostMapping("/scrap/{roadmapId}/{userId}")
    @Operation(summary = "로드맵 스크랩" , description = "로드맵 스크랩")
    public ResponseEntity<?> scrap(@PathVariable("roadmapId") Long roadmapId,@PathVariable("userId") Long userId){
        roadmapService.scrap(roadmapId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로드맵 스크랩한 유저 리스트
    @GetMapping("/scrap/{roadmapId}")
    @Operation(summary = "로드맵 스크랩한 유저 ", description = "해당 로드맵에 스크랩한 유저 리스트입니다. ")
    public ResponseEntity<?> scrapRoadmap(@PathVariable("roadmapId") Long roadmapId){
        List<UserListDTO> scrapUser =  roadmapService.scrapUserList(roadmapId);
        return new ResponseEntity<>(scrapUser, HttpStatus.OK);
    }


    //로드맵 댓글달기
    @PostMapping("/comment/{roadmapId}/{userId}")
    @Operation(summary = "로드맵 댓글 달기", description = "로드맵에 댓글 달기")
    public ResponseEntity<?> comment(@PathVariable("roadmapId") Long roadmapId,@PathVariable("userId") Long userId,
        @RequestBody RoadmapCommentRequestDTO roadmapCommentRequestDTO){
        roadmapService.comment(roadmapId,userId, roadmapCommentRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //로드맵 댓글 삭제
    @DeleteMapping("/comment/{commentId}/{userId}")
    @Operation(summary = "로드맵 댓글 삭제", description = "로드맵 댓글 삭제")
    public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId, @PathVariable("userId") Long userId){
            roadmapService.deleteComment(commentId, userId);
            return new ResponseEntity<>(HttpStatus.OK);
    }
}
