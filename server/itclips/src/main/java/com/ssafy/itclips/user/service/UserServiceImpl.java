package com.ssafy.itclips.user.service;

import com.ssafy.itclips.global.jwt.JwtToken;
import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.user.entity.LoginForm;
import com.ssafy.itclips.user.entity.OauthSignupForm;
import com.ssafy.itclips.user.entity.SignupForm;
import com.ssafy.itclips.user.entity.User;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

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
    public JwtToken login(LoginForm loginForm) {
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

        return jwtToken;
    }

    @Transactional
    @Override
    public User oauthSignup(OauthSignupForm form, MultipartFile profileImage) throws IOException {
        User user = userRepository.findByEmail(form.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        user.setGender(form.getGender());
        user.setBirth(form.getBirth());

        setImageUrl(profileImage, user);

        userRepository.save(user);
        return user;
    }

    @Override
    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    @Override
    public void updateProfileImage(String email, MultipartFile profileImage) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        setImageUrl(profileImage, user);
        userRepository.save(user);
    }

    private void setImageUrl(MultipartFile profileImage, User user) throws IOException {
        String baseUrl = "http://localhost:80/images/profile/";

        if (profileImage != null && !profileImage.isEmpty()) {
            String filename = generateUniqueFilename(Objects.requireNonNull(profileImage.getOriginalFilename()));
            String filePath = Paths.get(uploadPath, filename).toString();
            Files.copy(profileImage.getInputStream(), Paths.get(filePath));
            user.setProfileImage(baseUrl + filename);
        } else {
            String defaultImageFilename = generateUniqueFilename("profile.png");
            String filePath = Paths.get(uploadPath, defaultImageFilename).toString();
            Files.copy(Paths.get(defaultProfileImage), Paths.get(filePath));
            user.setProfileImage(baseUrl + defaultImageFilename);
        }
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
    public boolean deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        userRepository.delete(user);
        return !userRepository.existsByEmail(email);
    }

    @Override
    public boolean nicknameCheck(String nickname) {
        return userRepository.existsByNickname(nickname);
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
