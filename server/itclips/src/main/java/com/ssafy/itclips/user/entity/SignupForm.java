package com.ssafy.itclips.user.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SignupForm {
    private String nickname;
    private String email;
    private String password;
    private Boolean gender;
    private LocalDate birth;
    private String profileImage;

    public User toEntity(String encodedPassword) {
        User user = new User();
        user.setNickname(this.nickname);
        user.setEmail(this.email);
        user.setPassword(encodedPassword);
        user.setGender(this.gender);
        user.setBirth(this.birth);
        user.setProfileImage(this.profileImage);
        return user;
    }
}