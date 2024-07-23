package com.ssafy.itclips.user.service;

import com.ssafy.itclips.user.entity.OauthSignupForm;
import com.ssafy.itclips.user.entity.SignupForm;
import com.ssafy.itclips.user.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User signup(SignupForm signupForm, MultipartFile profileImage) throws IOException;

    User oauthSignup(OauthSignupForm form, MultipartFile profileImage) throws IOException;

    boolean checkEmailExists(String email);

    void updateProfileImage(String email, MultipartFile profileImage) throws IOException;

    Long findIDByEmail(String email);

    User findUserByEmail(String email);
}
