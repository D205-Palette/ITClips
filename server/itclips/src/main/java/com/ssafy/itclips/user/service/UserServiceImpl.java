package com.ssafy.itclips.user.service;

import com.ssafy.itclips.user.entity.OauthSignupForm;
import com.ssafy.itclips.user.entity.SignupForm;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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

    @Transactional
    @Override
    public User signup(SignupForm signupForm) throws IOException {
        if (checkEmailExists(signupForm.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 유저입니다.");
        }

        String encPwd = bCryptPasswordEncoder.encode(signupForm.getPassword());
        User user = signupForm.toEntity(encPwd);

        userRepository.save(user);
        return userRepository.findByEmail(signupForm.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
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
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));
    }

    private String generateUniqueFilename(String originalFilename) {
        String ext = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex >= 0) {
            ext = originalFilename.substring(dotIndex);
        }
        return UUID.randomUUID().toString() + ext;
    }
}
