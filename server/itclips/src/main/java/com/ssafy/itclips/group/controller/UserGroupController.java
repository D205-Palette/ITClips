package com.ssafy.itclips.group.controller;

import com.ssafy.itclips.group.dto.UserGroupDTO;
import com.ssafy.itclips.group.service.UserGroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
@Tag(name = "UserGroup Controller", description = "유저 그룹 관련 API") // 표시명 및 설명 설정
public class UserGroupController {

    private final UserGroupService userGroupService;


    @GetMapping("/{listId}")
    @Operation(summary = "그룹 유저 정보 받기", description = "그룹 유저 정보를 찾습니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유저를 찾았습니다."),
            @ApiResponse(responseCode = "404", description = "리스트를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    public ResponseEntity<?> findUsersInBookmarkList(
            @PathVariable @Parameter(description = "리스트 ID", required = true) Long listId
    ) {
        List<UserGroupDTO> users = userGroupService.getUserGroups(listId);

        return new ResponseEntity<List<UserGroupDTO>>(users, HttpStatus.OK);
    }

}
