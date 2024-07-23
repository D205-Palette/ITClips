package com.ssafy.itclips.global.oauth2.exception;

import org.springframework.security.core.AuthenticationException;

public class CustomOAuth2AuthenticationException extends AuthenticationException {

    public CustomOAuth2AuthenticationException(String msg) {
        super(msg);
    }
}
