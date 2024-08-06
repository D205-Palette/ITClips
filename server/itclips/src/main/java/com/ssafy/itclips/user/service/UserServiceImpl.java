package com.ssafy.itclips.user.service;

import com.ssafy.itclips.error.CustomException;
import com.ssafy.itclips.error.ErrorCode;
import com.ssafy.itclips.follow.repository.FollowRepository;
import com.ssafy.itclips.global.file.DataResponseDto;
import com.ssafy.itclips.global.file.FileService;
import com.ssafy.itclips.global.jwt.JwtToken;
import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.user.dto.UserInfoDTO;
import com.ssafy.itclips.user.dto.UserInfoDetailDTO;
import com.ssafy.itclips.user.entity.*;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    @Value("${project.profileUploadPath}")
    private String uploadPath;

    @Value("${project.defaultProfileImage}")
    private String defaultProfileImage;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final FollowRepository followRepository;
    private final FileService fileService;

    @Transactional
    @Override
    public User signup(SignupForm signupForm) throws RuntimeException {
        if (checkEmailExists(signupForm.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 유저입니다.");
        }

        String encPwd = bCryptPasswordEncoder.encode(signupForm.getPassword());
        User user = signupForm.toEntity(encPwd);

        // JWT 토큰 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(signupForm.getEmail(), signupForm.getPassword());
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        // 리프레시 토큰 저장
        user.setRefreshToken(jwtToken.getRefreshToken());

        userRepository.save(user);
        return userRepository.findByEmail(signupForm.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
    }

    @Override
    public LoginResponse login(LoginForm loginForm) {
        // 인증 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginForm.getEmail(), loginForm.getPassword());

        // 요청된 User에 대한 실제 검증
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 인증된 정보를 기반으로 JWT 토큰 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        // 리프레시 토큰 저장
        User user = userRepository.findByEmail(loginForm.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
        user.setRefreshToken(jwtToken.getRefreshToken());
        userRepository.save(user);

        // JWT 토큰과 userId를 포함한 응답 객체 생성
        return new LoginResponse(jwtToken.getAccessToken(), jwtToken.getRefreshToken(), user.getId());
    }

//    @Transactional
//    @Override
//    public User oauthSignup(OauthSignupForm form) throws IOException {
//        User user = userRepository.findByEmail(form.getEmail())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));
//
//        user.setGender(form.getGender());
//        user.setBirth(form.getBirth());
//
//        setImageUrl(profileImage, user);
//
//        userRepository.save(user);
//        return user;
//    }

    @Transactional
    @Override
    public User oauthSignup(Long userId, OauthSignupForm form) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        user.setNickname(form.getNickname());
        user.setBirth(form.getBirth());
        user.setGender(form.getGender());
        user.setJob(form.getJob());

        userRepository.save(user);
        return user;
    }

    @Override
    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    @Override
    public DataResponseDto updateProfileImage(String email, String profileImage) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));
        // 이미지 S3 경로로 저장
        boolean isDefaultImage = "default".equals(profileImage);

        DataResponseDto imageInfo = isDefaultImage ?
                DataResponseDto.builder()
                        .image(profileImage)
                        .url(profileImage)
                        .build() :
                DataResponseDto.of(fileService.getPresignedUrl("images", profileImage, true));
        user.setImageToS3FileName(imageInfo.getImage());
        userRepository.save(user);
        return imageInfo;
    }


    @Override
    public Long findIDByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User getUserByNickname(String nickname) {
        return userRepository.findByNickname(nickname)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Long getUserIdByNickname(String nickname) {
        User user = getUserByNickname(nickname);
        return user != null ? user.getId() : null;
    }


    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));
    }

    @Transactional
    @Override
    public User updateUserByEmail(String email, User updatedUser) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        user.setNickname(updatedUser.getNickname());
        user.setBirth(updatedUser.getBirth());
        user.setJob(updatedUser.getJob());
        user.setGender(updatedUser.getGender());
        user.setRole(updatedUser.getRole());
        user.setDarkMode(updatedUser.getDarkMode());
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public UserInfoDTO updateUserById(Long userId, UserInfoDTO updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        user.setNickname(updatedUser.getNickname());
        user.setBirth(updatedUser.getBirth());
        user.setJob(updatedUser.getJob());
        user.setGender(updatedUser.getGender());
        user.setDarkMode(updatedUser.getDarkMode());
        user.setBio(updatedUser.getBio());

        User savedUser = userRepository.save(user);

        return UserInfoDTO.builder()
                .nickname(savedUser.getNickname())
                .birth(savedUser.getBirth())
                .job(savedUser.getJob())
                .gender(savedUser.getGender())
                .bio(savedUser.getBio())
                .build();
    }

    @Transactional
    @Override
    public boolean deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        userRepository.delete(user);
        return !userRepository.existsByEmail(email);
    }

    @Transactional
    @Override
    public boolean deleteUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        userRepository.delete(user);
        return !userRepository.existsById(userId);
    }

    @Override
    public boolean nicknameCheck(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    public List<UserInfoDetailDTO> searchUsers(Integer page, String title, Long userId) throws RuntimeException {
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        List<User> users = userRepository.findUserWithNickName(title, page);
        if (users.isEmpty()) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        return users.stream()
                .filter(targetUser -> !targetUser.equals(currentUser))
                .map(targetUser -> convertToUserInfoDetailDTO(targetUser, currentUser))
                .collect(Collectors.toList());
    }

    private UserInfoDetailDTO convertToUserInfoDetailDTO(User targetUser, User currentUser) {
        Long followerCount = followRepository.countByTo(targetUser);
        Long followingCount = followRepository.countByFrom(targetUser);
        String imageUrl = getImageUrl(targetUser);
        UserInfoDetailDTO userInfo = targetUser.convertToUserInfoDetailDTO(followingCount, followerCount,imageUrl);
        boolean isFollowing = followRepository.existsByFromUserAndToUser(currentUser, targetUser);
        boolean isFollowers = followRepository.existsByFromUserAndToUser(targetUser, currentUser);
        userInfo.setFollowStatus(isFollowing, isFollowers);
        return userInfo;
    }

    private String getImageUrl(User targetUser) {
        String imageUrl = targetUser.getProfileImage();
        if(imageUrl != null && !"default".equals(imageUrl) ) {
            imageUrl = fileService.getPresignedUrl("images", targetUser.getProfileImage(), false).get("url");
        }
        return imageUrl;
    }

    // 파일 이름이 중복되지 않도록 고유한 파일 이름 생성
    private String generateUniqueFilename(String originalFilename) {
        String ext = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex >= 0) {
            ext = originalFilename.substring(dotIndex);
        }
        return UUID.randomUUID().toString() + ext;
    }

    public void updatePassword(User user, String newPassword) {
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
