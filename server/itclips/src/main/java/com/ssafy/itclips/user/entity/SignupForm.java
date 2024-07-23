package com.ssafy.itclips.user.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SignupForm {
    private String name;
    private String email;
    private String password;
    private String gender;
    private LocalDate birth;
    private String info;
    private String profileUrl;
}