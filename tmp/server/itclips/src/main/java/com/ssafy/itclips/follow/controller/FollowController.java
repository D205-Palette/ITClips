package com.ssafy.itclips.follow.controller;

import com.ssafy.itclips.follow.dto.FollowDetailDTO;
import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.follow.service.FollowService;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
@CrossOrigin("*")
@Tag(name = "Follow Controller", description = "팔로우 관련 API")
public class FollowController {

    private final FollowService followService;
    private final UserService userService;

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
        Follow follow = followService.followUser(fromUserId, toUserId);
        return ResponseEntity.ok("팔로우 성공: " + follow.getId());
    }

    @GetMapping("/following")
    @Operation(summary = "팔로잉 목록 조회", description = "특정 사용자가 팔로우하는 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팔로잉 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    public ResponseEntity<List<FollowDetailDTO>> getFollowing(@RequestParam @Parameter(description = "팔로잉 목록을 조회할 사용자 ID") Long userId) {
        List<FollowDetailDTO> followDTOs = followService.getFollowing(userId);
        return ResponseEntity.ok(followDTOs);
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
        followService.unfollowUser(fromUserId, toUserId);
        return ResponseEntity.ok("팔로우가 취소되었습니다.");
    }

    @GetMapping("/followers")
    @Operation(summary = "팔로워 목록 조회", description = "특정 사용자의 팔로워 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팔로워 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    public ResponseEntity<List<FollowDetailDTO>> getFollowers(@RequestParam @Parameter(description = "팔로워 목록을 조회할 사용자 ID") Long userId) {
        List<FollowDetailDTO> followDTOs = followService.getFollowers(userId);
        return ResponseEntity.ok(followDTOs);
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
        followService.deleteFollower(fromUserId, toUserId);
        return ResponseEntity.ok("팔로워가 삭제되었습니다.");
    }

    @GetMapping("/count")
    @Operation(summary = "Follower 및 Following 수 조회", description = "사용자의 팔로워 수와 팔로잉 수를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팔로워 및 팔로잉 수 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    public ResponseEntity<?> getFollowCounts(
            @RequestParam(required = false) @Parameter(description = "사용자 ID") Long userId,
            @RequestParam(required = false) @Parameter(description = "사용자 이메일") String email,
            @RequestParam(required = false) @Parameter(description = "사용자 닉네임") String nickname) {
        User user;

        if (userId != null) {   // ID로 찾기
            user = userService.getUserById(userId);
        } else if (email != null) {     // Email로 찾기
            user = userService.getUserByEmail(email);
        } else if (nickname != null) {      // Nickname으로 찾기
            user = userService.getUserByNickname(nickname);
        } else {
            return ResponseEntity.badRequest().body("사용자 ID, 이메일, 또는 닉네임이 필요합니다.");
        }

        long followerCount = followService.getFollowerCount(user);
        long followingCount = followService.getFollowingCount(user);

        return ResponseEntity.ok(new UserFollowCounts(followerCount, followingCount));
    }

    @Data
    @AllArgsConstructor
    public static class UserFollowCounts {
        private long followerCount;
        private long followingCount;
    }
}
