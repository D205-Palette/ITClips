package com.ssafy.itclips.tag.controller;

import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.entity.Tag;
import com.ssafy.itclips.tag.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @PostMapping("/add")
    @Operation(summary = "태그 추가", description = "태그 목록을 데이터베이스에 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "태그가 성공적으로 추가되었습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<String> addTags(
            @RequestBody @Parameter(description = "추가할 태그 목록", required = true) List<TagDTO> tagDTOs) {
        List<Tag> tags = tagDTOs.stream()
                .map(dto -> new Tag(dto.getTitle(), dto.getIsOrigin()))
                .collect(Collectors.toList());

        HttpStatus httpStatus = HttpStatus.CREATED;
        if (!tagService.saveTags(tags)) {
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
    public ResponseEntity<List<Tag>> getOriginTags() {
        List<Tag> tags = null;
        try {
            tags = tagService.getOriginTags();
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/all")
    @Operation(summary = "모든 태그 조회", description = "데이터베이스에서 모든 태그 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "태그를 성공적으로 조회했습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = null;
        try {
            tags = tagService.getAllTags();
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }
}
