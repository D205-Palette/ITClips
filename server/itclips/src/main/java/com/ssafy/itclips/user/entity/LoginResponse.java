package com.ssafy.itclips.user.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String accesstoken;
    private String refreshToken;
    private Long userId;

    public LoginResponse(String accesstoken, String refreshToken, Long userId) {
        this.accesstoken = accesstoken;
        this.refreshToken = refreshToken;
        this.userId = userId;
    }

}
