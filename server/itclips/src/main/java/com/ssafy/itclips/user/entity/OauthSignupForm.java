package com.ssafy.itclips.user.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OauthSignupForm {
    private String email;
    private String gender;
    private LocalDate birth;
    private String info;
    private String profileUrl;
}