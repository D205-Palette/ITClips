package com.ssafy.itclips.user.service;

import com.ssafy.itclips.global.jwt.JwtToken;
import com.ssafy.itclips.user.entity.LoginForm;
import com.ssafy.itclips.user.entity.OauthSignupForm;
import com.ssafy.itclips.user.entity.SignupForm;
import com.ssafy.itclips.user.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User signup(SignupForm signupForm) throws IOException;

    JwtToken login(LoginForm loginForm) throws IOException;

    User oauthSignup(OauthSignupForm form, MultipartFile profileImage) throws IOException;

    boolean checkEmailExists(String email);

    void updateProfileImage(String email, MultipartFile profileImage) throws IOException;

    Long findIDByEmail(String email);

    User getUserById(Long id);

    User findUserByEmail(String email);

    User updateUserByEmail(String email, User user);

    boolean deleteUserByEmail(String email);

    boolean nicknameCheck(String nickname);

    void updatePassword(User user, String newPassword);
}
