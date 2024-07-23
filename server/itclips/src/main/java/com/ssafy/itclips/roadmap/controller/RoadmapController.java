package com.ssafy.itclips.roadmap.controller;

import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.service.RoadmapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roadmap")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "roadmap Controller", description = "로드맵 관련 API")
public class RoadmapController {

    private final RoadmapService roadmapService;

    @GetMapping("/list")
    @Operation(summary = "모든 로드맵 보기", description = "생성된 모든 로드맵을 볼 수 있습니다.")
    public ResponseEntity<?> roadmapList(){
        List<RoadmapInfoDTO> roadmapList =  roadmapService.findAllRoadmapList();

        log.info("roadmapList: {}", roadmapList);
        return new ResponseEntity<>(roadmapList, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    @Operation(summary = "유저 로드맵 보기" , description = "특정 유저가 생성한 로드맵을 볼 수 있습니다. ")
    public ResponseEntity<?> findRoadmap(@PathVariable("userId") Long userId){
        List<RoadmapInfoDTO> roadmapList = roadmapService.findUserRoadmapList(userId);
        log.info("roadmapList: {}", roadmapList);
        return new ResponseEntity<>(roadmapList, HttpStatus.OK);
    }

}
