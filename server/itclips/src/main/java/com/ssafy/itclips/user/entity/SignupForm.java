package com.ssafy.itclips.user.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class SignupForm {
    private String email;
    private String password;
    private String nickname;
    private LocalDate birth;
    private String job;
    private Boolean gender;

    public User toEntity(String encodedPassword) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setNickname(nickname);
        user.setBirth(birth);
        user.setJob(job);
        user.setGender(gender);
        user.setRole(Role.USER); // default
        user.setDarkMode(true); // default
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now); // default
        user.setUpdatedAt(now); // default
        return user;
    }
}