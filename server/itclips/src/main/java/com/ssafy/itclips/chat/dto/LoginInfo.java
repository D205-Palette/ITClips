package com.ssafy.itclips.chat.dto;

import com.ssafy.itclips.global.jwt.JwtToken;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.Authentication;


@Getter
public class LoginInfo {
    private String name;
    private JwtToken token;

    @Builder
    public LoginInfo(String name, JwtToken token) {
        this.name = name;
        this.token = token;
    }
}