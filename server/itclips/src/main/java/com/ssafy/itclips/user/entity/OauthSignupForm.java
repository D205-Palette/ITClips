package com.ssafy.itclips.user.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OauthSignupForm {
    private String email;
    private Boolean gender;
    private LocalDate birth;
    private String profileImage;

    public User toEntity() {
        User user = new User();
        user.setEmail(this.email);
        user.setGender(this.gender);
        user.setBirth(this.birth);
        user.setProfileImage(this.profileImage);
        return user;
    }
}