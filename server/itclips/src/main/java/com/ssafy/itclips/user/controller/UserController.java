package com.ssafy.itclips.user.controller;

import com.ssafy.itclips.global.jwt.JwtToken;
import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.tag.dto.TagDTO;
import com.ssafy.itclips.tag.repository.TagRepository;
import com.ssafy.itclips.tag.repository.UserTagRepository;
import com.ssafy.itclips.user.dto.UserInfoDTO;
import com.ssafy.itclips.user.entity.*;
import com.ssafy.itclips.user.repository.UserRepository;
import com.ssafy.itclips.user.service.MailService;
import com.ssafy.itclips.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@CrossOrigin("*")
@Tag(name = "User Controller", description = "유저 관련 API")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final UserTagRepository userTagRepository;
    private final JwtTokenProvider tokenProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final MailService mailService;
    private final ConcurrentHashMap<String, String> verificationCodes = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, String> passwordResetCodes = new ConcurrentHashMap<>();

    private static final String UNAUTHORIZED_MESSAGE = "Unauthorized";
    private static final String PROFILE_IMAGE_UPDATE_SUCCESS = "프로필 이미지가 성공적으로 업데이트 되었습니다.";
    private static final String USER_NOT_FOUND_MESSAGE = "회원 정보를 찾을 수 없습니다.";
    private static final String USER_UPDATE_SUCCESS = "회원 정보가 성공적으로 수정되었습니다.";
    private static final String USER_DELETE_SUCCESS = "회원이 성공적으로 탈퇴되었습니다.";
    private static final String USER_UPDATE_FAIL = "회원 정보 수정에 실패했습니다.";
    private static final String USER_DELETE_FAIL = "회원 탈퇴에 실패했습니다.";

    @PostMapping("/signup")
    @Operation(summary = "일반 회원 가입", description = "새로운 회원을 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 가입 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "파일 업로드 중 오류 발생", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> signUp(@RequestBody SignupForm signupForm) throws IOException {
        try {
            User joinUser = userService.signup(signupForm);
            return ResponseEntity.ok(joinUser);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 가입 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/login")
    @Operation(summary = "일반 로그인", description = "사용자 로그인을 처리하고 JWT 토큰을 반환합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm) {
        try {
            LoginResponse loginResponse = userService.login(loginForm);
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패! 이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    }

    @PostMapping("/oauthSignup")
    @Operation(summary = "OAuth 회원 가입", description = "OAuth를 통해 가입한 회원을 등록합니다.")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "회원 가입 성공"))
    public ResponseEntity<?> oauthSignUp(@RequestPart("user") OauthSignupForm oauthSignupForm,
                                         @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {
        try {
            User user = userService.oauthSignup(oauthSignupForm, profileImage);
            return ResponseEntity.ok(user);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "사용자 로그아웃을 처리합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자")
    })
    @PatchMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            // 블랙리스트에 추가하여 토큰 무효화
            tokenProvider.blacklistToken(token);
            return ResponseEntity.ok("로그아웃 성공");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증되지 않은 사용자");
    }


    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }

    @PostMapping(value = "/profile/img", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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

    @GetMapping("/{userId}/profile")
    @Operation(summary = "회원 정보 조회", description = "사용자의 프로필 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 정보 조회 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "회원 정보 없음", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> getProfile(@PathVariable("userId") Long userId) {
        if (!isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHORIZED_MESSAGE);
        }

        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(USER_NOT_FOUND_MESSAGE);
        }

        UserInfoDTO userInfoDTO = UserInfoDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .birth(user.getBirth())
                .job(user.getJob())
                .gender(user.getGender())
                .bio(user.getBio())
                .build();

        return ResponseEntity.ok(userInfoDTO);
    }

    @PutMapping("/{userId}/profile")
    @Operation(summary = "회원 정보 수정", description = "사용자의 프로필 정보를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 정보 수정 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "회원 정보 없음", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> updateProfile(@PathVariable("userId") Long userId, @RequestBody UserInfoDTO updatedUser) {
        if (!isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHORIZED_MESSAGE);
        }

        try {
            UserInfoDTO userInfo = userService.updateUserById(userId, updatedUser);
            return ResponseEntity.ok(USER_UPDATE_SUCCESS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(USER_UPDATE_FAIL);
        }
    }

    @DeleteMapping("/{userId}/profile")
    @Operation(summary = "회원 탈퇴", description = "사용자의 계정을 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 탈퇴 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "회원 정보 없음", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId) {
        if (!isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHORIZED_MESSAGE);
        }

        try {
            boolean isDeleted = userService.deleteUserById(userId);
            if (!isDeleted) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(USER_DELETE_FAIL);
            }
            return ResponseEntity.ok(USER_DELETE_SUCCESS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(USER_DELETE_FAIL);
        }
    }

    @GetMapping("/nicknameCheck")
    @Operation(summary = "닉네임 중복 체크", description = "요청한 닉네임이 중복되었는지 체크합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "닉네임 중복 체크 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "409", description = "닉네임 중복", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> nicknameCheck(@RequestParam("nickname") String nickname) {
        boolean isDuplicated = userService.nicknameCheck(nickname);
        if (isDuplicated) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("닉네임이 중복되었습니다.");
        }
        return ResponseEntity.ok("닉네임 사용 가능");
    }

    @GetMapping("/emailCheck")
    @Operation(summary = "이메일 중복 체크", description = "요청한 이메일이 중복되었는지 체크합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 중복 체크 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "409", description = "이메일 중복", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> emailCheck(@RequestParam("email") String email) {
        boolean isDuplicated = userService.checkEmailExists(email);
        if (isDuplicated) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이메일이 중복되었습니다.");
        }
        return ResponseEntity.ok("이메일 사용 가능");
    }

    @PostMapping("/refresh")
    @Operation(summary = "리프레시 토큰으로 새로운 액세스 토큰 발급", description = "리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "토큰 발급 성공", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 리프레시 토큰", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
    })
    public ResponseEntity<JwtToken> refreshToken(@RequestHeader("Authorization-Refresh") String refreshToken) {
        // 리프레시 토큰 유효성 검증
        if (!tokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.badRequest().build();
        }

        // 리프레시 토큰으로 유저 조회
        User user = userRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));

        // 새로운 액세스 토큰 생성
        Authentication authentication = tokenProvider.getAuthenticationFromRefreshToken(refreshToken);
        JwtToken newJwtToken = tokenProvider.generateToken(authentication);

        // 필요 시 새로운 리프레시 토큰 저장
        user.setRefreshToken(newJwtToken.getRefreshToken());
        userRepository.save(user);

        // 새로운 토큰 응답
        return ResponseEntity.ok(newJwtToken);
    }

    @PostMapping("/mail/sendVerification")
    @Operation(summary = "이메일 인증 요청", description = "이메일로 인증 코드를 보냅니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인증 이메일 발송 성공"),
            @ApiResponse(responseCode = "500", description = "이메일 발송 중 오류 발생")
    })
    public ResponseEntity<?> sendVerificationEmail(@RequestParam("email") String email) {
        try {
            String verificationCode = mailService.sendVerificationEmail(email);
            verificationCodes.put(email, verificationCode);
            return ResponseEntity.ok("인증 이메일이 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 발송 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/mail/verifyCode")
    @Operation(summary = "이메일 인증 확인", description = "이메일로 받은 인증 코드를 확인합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인증 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 인증 코드"),
            @ApiResponse(responseCode = "404", description = "이메일을 찾을 수 없음")
    })
    public ResponseEntity<?> verifyCode(@RequestParam("email") String email, @RequestParam("code") String code) {
        String storedCode = verificationCodes.get(email);
        if (storedCode == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이메일을 찾을 수 없습니다.");
        }
        if (storedCode.equals(code)) {
            verificationCodes.remove(email);
            return ResponseEntity.ok("인증 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 인증 코드입니다.");
        }
    }

    @PostMapping("/pw/sendVerification")
    @Operation(summary = "비밀번호 찾기 요청", description = "닉네임과 이메일을 통해 비밀번호 찾기 요청을 처리하고, 인증 코드를 이메일로 보냅니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인증 코드 발송 성공"),
            @ApiResponse(responseCode = "404", description = "사용자 정보를 찾을 수 없음")
    })
    public ResponseEntity<?> sendPasswordResetCode(@RequestParam("nickname") String nickname, @RequestParam("email") String email) {
        User user = userRepository.findByNicknameAndEmail(nickname, email).get();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보를 찾을 수 없습니다.");
        }
        try {
            String resetCode = mailService.sendVerificationEmail(email);
            passwordResetCodes.put(email, resetCode);
            return ResponseEntity.ok("인증 코드가 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("인증 코드 발송 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/pw/verifyCode")
    @Operation(summary = "비밀번호 찾기 인증 코드 확인", description = "이메일로 받은 인증 코드를 확인합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인증 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 인증 코드"),
            @ApiResponse(responseCode = "404", description = "이메일을 찾을 수 없음")
    })
    public ResponseEntity<?> verifyPasswordResetCode(@RequestParam("email") String email, @RequestParam("code") String code) {
        String storedCode = passwordResetCodes.get(email);
        if (storedCode == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이메일을 찾을 수 없습니다.");
        }
        if (storedCode.equals(code)) {
            passwordResetCodes.remove(email);
            return ResponseEntity.ok("인증 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 인증 코드입니다.");
        }
    }

    @PostMapping("/password/reset")
    @Operation(summary = "비밀번호 초기화", description = "인증 코드 확인 후 임시 비밀번호를 이메일로 발송합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "임시 비밀번호 발송 성공"),
            @ApiResponse(responseCode = "404", description = "사용자 정보를 찾을 수 없음"),
            @ApiResponse(responseCode = "500", description = "임시 비밀번호 발송 중 오류 발생")
    })
    public ResponseEntity<?> resetPassword(@RequestParam("email") String email) {
        User user = userRepository.findByEmail(email).get();
        try {
            String temporaryPassword = generateTemporaryPassword();
            userService.updatePassword(user, temporaryPassword);
            mailService.sendTemporaryPassword(email, temporaryPassword);
            return ResponseEntity.ok("임시 비밀번호가 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("임시 비밀번호 발송 중 오류가 발생했습니다.");
        }
    }

    @PutMapping("/pw/update")
    @Operation(summary = "비밀번호 변경", description = "본인 계정의 비밀번호를 변경합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "비밀번호 변경 성공"),
            @ApiResponse(responseCode = "400", description = "기존 비밀번호가 일치하지 않음"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    public ResponseEntity<?> changePassword(@RequestParam("email") String email,
                                            @RequestParam("oldPassword") String oldPw,
                                            @RequestParam("newPassword") String newPw) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }

        User user = optionalUser.get();
        if (bCryptPasswordEncoder.matches(oldPw, user.getPassword())) {
            userService.updatePassword(user, newPw);
            return ResponseEntity.ok("비밀번호가 변경되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("기존 비밀번호가 일치하지 않습니다.");
        }
    }

    @Operation(summary = "나의 관심사 태그 목록 보기", description = "사용자의 관심사 태그 목록을 확인합니다.")
    @GetMapping("/{userId}/tags")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "관심사 태그 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류로 인해 요청 실패")
    })
    public ResponseEntity<?> getUserTag(@PathVariable Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }

        User user = optionalUser.get();
        List<UserTag> userTags = userTagRepository.findByUser(user);
        if (userTags.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("관심사 태그가 존재하지 않습니다.");
        }

        List<TagDTO> tagDTOs = userTags.stream()
                .map(userTag -> new TagDTO(userTag.getTag().getId(), userTag.getTag().getTitle()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(tagDTOs);
    }

    @Operation(summary = "나의 관심사 태그 추가", description = "사용자의 관심사 태그를 추가합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "관심사 추가 성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 태그를 찾을 수 없음"),
            @ApiResponse(responseCode = "400", description = "이미 존재하는 관심사")
    })
    @PostMapping("/{userId}/tags")
    public ResponseEntity<?> addUserTag(@PathVariable Long userId, @RequestParam Long tagId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<com.ssafy.itclips.tag.entity.Tag> optionalTag = tagRepository.findById(tagId);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }

        if (optionalTag.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("태그를 찾을 수 없습니다.");
        }

        User user = optionalUser.get();
        com.ssafy.itclips.tag.entity.Tag tag = optionalTag.get();

        // 이미 사용자가 추가한 태그인지?
        Optional<UserTag> existingUserTag = userTagRepository.findByUserAndTag(user, tag);
        if (existingUserTag.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 존재하는 관심사입니다.");
        } else {
            UserTag userTag = new UserTag();
            userTag.setUser(user);
            userTag.setTag(tag);
            userTagRepository.save(userTag);

            return ResponseEntity.ok("관심사가 추가되었습니다.");
        }
    }

    @DeleteMapping("/{userId}/tags")
    @Operation(summary = "나의 관심사 태그 삭제", description = "사용자의 관심사 태그를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "관심사 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 태그를 찾을 수 없음"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 관심사"),
            @ApiResponse(responseCode = "500", description = "서버 오류로 인해 요청 실패")
    })
    public ResponseEntity<?> deleteUserTag(@PathVariable Long userId, @RequestParam Long tagId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<com.ssafy.itclips.tag.entity.Tag> optionalTag = tagRepository.findById(tagId);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
        if (optionalTag.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("태그를 찾을 수 없습니다.");
        }

        User user = optionalUser.get();
        com.ssafy.itclips.tag.entity.Tag tag = optionalTag.get();

        Optional<UserTag> existingUserTag = userTagRepository.findByUserAndTag(user, tag);
        if (existingUserTag.isPresent()) {
            userTagRepository.delete(existingUserTag.get());
            return ResponseEntity.ok("관심사가 삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 관심사가 존재하지 않습니다.");
        }
    }

    private String generateTemporaryPassword() {
        int length = 10;
        StringBuilder tempPassword = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            char randomChar = (char) ThreadLocalRandom.current().nextInt(33, 127);
            tempPassword.append(randomChar);
        }
        return tempPassword.toString();
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated();
    }
}
