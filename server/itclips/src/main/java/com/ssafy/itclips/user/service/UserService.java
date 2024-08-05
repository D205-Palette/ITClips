package com.ssafy.itclips.user.service;

import com.ssafy.itclips.global.jwt.JwtToken;
import com.ssafy.itclips.user.dto.UserInfoDTO;
import com.ssafy.itclips.user.entity.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User signup(SignupForm signupForm) throws IOException;

    LoginResponse login(LoginForm loginForm) throws IOException;

//    User oauthSignup(OauthSignupForm form, MultipartFile profileImage) throws IOException;

    User oauthSignup(Long userId, OauthSignupForm form) throws IOException;

    boolean checkEmailExists(String email);

    void updateProfileImage(String email, MultipartFile profileImage) throws IOException;

    Long findIDByEmail(String email);

    User getUserById(Long userId);

    User getUserByEmail(String email);

    User getUserByNickname(String nickname);

    Long getUserIdByNickname(String nickname);

    User findUserByEmail(String email);

    User updateUserByEmail(String email, User user);

    UserInfoDTO updateUserById(Long userId, UserInfoDTO user);

    boolean deleteUserByEmail(String email);

    boolean deleteUserById(Long userId);

    boolean nicknameCheck(String nickname);

    void updatePassword(User user, String newPassword);
}
