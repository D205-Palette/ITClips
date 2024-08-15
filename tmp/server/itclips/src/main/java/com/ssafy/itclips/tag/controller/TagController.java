package com.ssafy.itclips.tag.controller;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.dto.UserTagDTO;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@CrossOrigin("*")
@RequiredArgsConstructor
@Slf4j
@io.swagger.v3.oas.annotations.tags.Tag(name = "Tag Controller", description = "태그 관련 API") // 표시명 및 설명 설정
public class TagController {

    private final TagService tagService;

    @PostMapping("/add")
    @Operation(summary = "태그 추가", description = "태그 목록을 데이터베이스에 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "태그가 성공적으로 추가되었습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<String> addTags(
            @RequestBody @Parameter(description = "추가할 태그 목록", required = true) List<TagDTO> tags) {
        HttpStatus httpStatus = HttpStatus.CREATED;
        if (tagService.saveTags(tags) != null) {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(httpStatus.getReasonPhrase(), httpStatus);
    }

    @GetMapping("/origin")
    @Operation(summary = "원본 태그 조회", description = "데이터베이스에서 원본 태그 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "태그를 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getOriginTags() {
        List<UserTagDTO> tags = tagService.getOriginTags();
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/all")
    @Operation(summary = "모든 태그 조회", description = "데이터베이스에서 모든 태그 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "태그를 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> getAllTags() {
        List<UserTagDTO> tags = tagService.getAllTags();
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }


}
