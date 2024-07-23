package com.ssafy.itclips.user.controller;

import com.ssafy.itclips.user.entity.OauthSignupForm;
import com.ssafy.itclips.user.entity.SignupForm;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.service.UserService;
import com.ssafy.itclips.user.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin("*")
@Tag(name = "User Controller", description = "유저 관련 API")
public class UserController {

    private final UserService userService;

    private static final String UNAUTHORIZED_MESSAGE = "Unauthorized";
    private static final String PROFILE_IMAGE_UPDATE_SUCCESS = "프로필 이미지가 성공적으로 업데이트 되었습니다.";
    private static final String USER_NOT_FOUND_MESSAGE = "회원 정보를 찾을 수 없습니다.";

    @PostMapping("/signup")
    @Operation(summary = "회원 가입", description = "새로운 회원을 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 가입 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "파일 업로드 중 오류 발생", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> signUp(@RequestPart("user") SignupForm signupForm,
                                    @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {
        try {
            User joinUser = userService.signup(signupForm, profileImage);
            return ResponseEntity.ok(joinUser);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/oauthSignup")
    @Operation(summary = "OAuth 회원 가입", description = "OAuth를 통해 가입한 회원을 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 가입 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "파일 업로드 중 오류 발생", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> oauthSignUp(@RequestPart("user") OauthSignupForm oauthSignupForm,
                                         @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {
        try {
            User user = userService.oauthSignup(oauthSignupForm, profileImage);
            return ResponseEntity.ok(user);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/updateProfileImage")
    @Operation(summary = "프로필 이미지 업데이트", description = "사용자의 프로필 이미지를 업데이트합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "프로필 이미지 업데이트 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "파일 업로드 중 오류 발생", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> updateProfileImage(@RequestParam("email") String email,
                                                @RequestPart("profileImage") MultipartFile profileImage) throws IOException {
        if (!isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHORIZED_MESSAGE);
        }

        try {
            userService.updateProfileImage(email, profileImage);
            return ResponseEntity.ok().body(PROFILE_IMAGE_UPDATE_SUCCESS);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/profile")
    @Operation(summary = "회원 프로필 조회", description = "사용자의 프로필 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "프로필 정보 조회 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "회원 정보 없음", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> getProfile(@RequestParam("email") String email) {
        if (!isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHORIZED_MESSAGE);
        }

        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(USER_NOT_FOUND_MESSAGE);
        }
        return ResponseEntity.ok(user);
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated();
    }
}
