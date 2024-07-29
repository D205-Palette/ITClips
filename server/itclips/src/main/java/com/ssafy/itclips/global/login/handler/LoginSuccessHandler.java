package com.ssafy.itclips.global.login.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.itclips.global.jwt.JwtToken;
import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // Token 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        String email = extractUsername(authentication);

        // User 정보 조회 및 업데이트
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No user found with email: " + email));

        // Initialize lazy collections
        user.getBookmarkLists().size();

        // 리프레시 토큰 저장
        user.setRefreshToken(jwtToken.getRefreshToken());

        userRepository.save(user);

        // HTTP response 헤더에 Token 설정
        response.setHeader("Authorization", jwtToken.getGrantType() + " " + jwtToken.getAccessToken());
        response.setHeader("Authorization-Refresh", jwtToken.getRefreshToken());

        Map<String, Object> tokenMap = new HashMap<>();
        tokenMap.put("accessToken", jwtToken.getAccessToken());
        tokenMap.put("refreshToken", jwtToken.getRefreshToken());
        tokenMap.put("email", email);
        tokenMap.put("user", user);

        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(tokenMap));

        log.info("로그인에 성공하였습니다. 이메일 : {}", email);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}