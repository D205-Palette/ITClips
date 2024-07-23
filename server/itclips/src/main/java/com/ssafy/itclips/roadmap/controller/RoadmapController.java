package com.ssafy.itclips.roadmap.controller;

import com.ssafy.itclips.roadmap.entity.Roadmap;
import com.ssafy.itclips.roadmap.service.RoadmapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        List<Roadmap> roadmapList =  roadmapService.findAllRoadmapList();

        log.info("roadmapList: {}", roadmapList);
        return new ResponseEntity<>(roadmapList, HttpStatus.OK);
    }

}
