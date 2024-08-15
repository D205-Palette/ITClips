package com.ssafy.itclips.user.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OauthSignupForm {
    private String nickname;
    private LocalDate birth;
    private Boolean gender;
    private String job;

    public User toEntity() {
        User user = new User();
        user.setNickname(nickname);
        user.setBirth(this.birth);
        user.setGender(this.gender);
        user.setJob(this.job);
        return user;
    }
}