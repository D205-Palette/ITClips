package com.ssafy.itclips.follow.controller;

import com.ssafy.itclips.follow.dto.FollowDTO;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
@CrossOrigin("*")
@Tag(name = "Follow Controller", description = "팔로우 관련 API")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/follow")
    @Operation(summary = "팔로우 하기", description = "특정 사용자를 팔로우합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팔로우 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<String> followUser(
            @RequestParam @Parameter(description = "팔로우를 하는 사용자 ID") Long fromUserId,
            @RequestParam @Parameter(description = "팔로우를 당하는 사용자 ID") Long toUserId) {
        try {
            Follow follow = followService.followUser(fromUserId, toUserId);
            return ResponseEntity.ok("팔로우 성공: " + follow.getId());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("잘못된 요청: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    @GetMapping("/following")
    @Operation(summary = "팔로잉 목록 조회", description = "특정 사용자가 팔로우하는 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팔로잉 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    public ResponseEntity<List<FollowDTO>> getFollowing(@RequestParam @Parameter(description = "팔로잉 목록을 조회할 사용자 ID") Long userId) {
        try {
            List<Follow> followingList = followService.getFollowing(userId);
            List<FollowDTO> followDTOs = followingList.stream()
                    .map(follow -> new FollowDTO(follow.getId(), follow.getFrom().getId(), follow.getTo().getId()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(followDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/unfollow")
    @Operation(summary = "팔로잉 취소", description = "특정 사용자의 팔로우를 취소합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팔로우 취소 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<String> unfollowUser(
            @RequestParam @Parameter(description = "팔로우를 취소하는 사용자 ID") Long fromUserId,
            @RequestParam @Parameter(description = "팔로우를 취소당하는 사용자 ID") Long toUserId) {
        try {
            followService.unfollowUser(fromUserId, toUserId);
            return ResponseEntity.ok("팔로우가 취소되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("잘못된 요청: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    @GetMapping("/followers")
    @Operation(summary = "팔로워 목록 조회", description = "특정 사용자의 팔로워 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팔로워 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    public ResponseEntity<List<FollowDTO>> getFollowers(@RequestParam @Parameter(description = "팔로워 목록을 조회할 사용자 ID") Long userId) {
        try {
            List<Follow> followersList = followService.getFollowers(userId);
            List<FollowDTO> followDTOs = followersList.stream()
                    .map(follow -> new FollowDTO(follow.getId(), follow.getFrom().getId(), follow.getTo().getId()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(followDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/follower")
    @Operation(summary = "팔로워 삭제", description = "특정 사용자의 팔로워를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팔로워 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<String> deleteFollower(
            @RequestParam @Parameter(description = "팔로워를 삭제하는 사용자 ID") Long fromUserId,
            @RequestParam @Parameter(description = "삭제당할 팔로워의 사용자 ID") Long toUserId) {
        try {
            followService.deleteFollower(fromUserId, toUserId);
            return ResponseEntity.ok("팔로워가 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("잘못된 요청: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }
}
