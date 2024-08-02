package com.ssafy.itclips.feed.controller;

import com.ssafy.itclips.feed.service.FeedService;
import com.ssafy.itclips.roadmap.dto.RoadmapInfoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
@CrossOrigin("*")
@RequiredArgsConstructor
@Tag(name = "feed Controller", description = "피드 관련 API")
public class FeedController {

    private final FeedService feedService;

    @GetMapping("/roadmap/{userId}")
    @Operation(summary = "로드맵 피드", description = "로드맵 피드입니다. ")
    public ResponseEntity<?> roadmapFeed(@PathVariable("userId") Long userId){
        List<RoadmapInfoDTO> roadmapList =  feedService.getRoadmapFeed(userId);

        return new ResponseEntity<>(roadmapList, HttpStatus.OK);
    }
}
