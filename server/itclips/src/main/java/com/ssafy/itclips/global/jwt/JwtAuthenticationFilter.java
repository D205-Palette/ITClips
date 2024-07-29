package com.ssafy.itclips.global.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

/**
 * Spring security의 GenericFilterBean 상속받아 구현한 JWT 인증 필터 !!!
 * Client로부터 HTTP 요청이 올 때마다 실행되며, 요청 header에서 JWT 추출하여 검증한 후,
 * 유효한 토큰인 경우 해당 토큰의 인증 정보(Authentication)를 SecurityContext에 저장하여
 * 인증된 요청을 처리할 수 있도록 함
 */

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        // 1. resolveToken() 메서드로 요청 헤더에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) req);

        // 2. JwtTokenProvider의 validateToken() 메서드로 JWT 토큰 유효성 검증
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 3. 유효한 토큰인 경우 JwtTokenProvider의 getAuthentication() 메서드로
            //      인증 객체 가져와서 SecurityContext에 저장 => 요청 처리 동안 인증 정보 유지
            Authentication auth = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // 4. chain.doFilter() 호출하여 다음 필터로 요청 전달
        chain.doFilter(req, res);
    }

    // Request Header에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
