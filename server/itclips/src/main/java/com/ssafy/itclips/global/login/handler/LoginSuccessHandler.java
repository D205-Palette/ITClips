package com.ssafy.itclips.global.login.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        try {
            String email = extractUsername(authentication);
            String token = String.valueOf(jwtTokenProvider.generateToken(authentication));
            User user = userRepository.findByEmail(email).get();

            Map<String, Object> tokenMap = new HashMap<>();
            tokenMap.put("accessToken", token);
            tokenMap.put("email", email);
            tokenMap.put("user", user);

            log.info(token);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(objectMapper.writeValueAsString(tokenMap));

            log.info("로그인에 성공하였습니다. 이메일 : {}", email);
            log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);

        } catch (IOException e) {
            log.error("응답 쓰기 실패", e);
        }
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}