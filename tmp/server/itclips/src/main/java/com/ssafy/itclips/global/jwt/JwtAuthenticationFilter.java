package com.ssafy.itclips.global.jwt;

import com.ssafy.itclips.error.CustomException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (shouldSkipFilter(request)) {
            chain.doFilter(request, response);
            return;
        }

        // 1. resolveToken() 메서드로 요청 헤더에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) req);

        // 2. JwtTokenProvider의 validateToken() 메서드로 JWT 토큰 유효성 검증
        try {
            if (token != null && jwtTokenProvider.validateToken(token)) {
                try {
                    // 3. 유효한 토큰인 경우 JwtTokenProvider의 getAuthentication() 메서드로
                    //      인증 객체 가져와서 SecurityContext에 저장 => 요청 처리 동안 인증 정보 유지
                    Authentication auth = jwtTokenProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } catch (AuthenticationException e) {
                    // 4. 인증 실패 시 401 응답 반환
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                    return;
                }
            } else {
                // 4. 토큰이 유효하지 않은 경우 401 응답 반환
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                return;
            }
        } catch (CustomException e) {
            handleException(response, e);
            return; // 예외 발생 시 필터 체인 중단
        }

        // 5. chain.doFilter() 호출하여 다음 필터로 요청 전달
        chain.doFilter(req, res);
    }

    private void handleException(HttpServletResponse response, CustomException e) throws IOException {
        response.setStatus(e.getErrorCode().getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write("토큰이 만료되었습니다");
        response.getWriter().flush();
        response.getWriter().close(); // 응답 후 스트림 닫기
    }

    // Request Header에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private boolean shouldSkipFilter(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return uri.equals("/") || uri.equals("/index.html") ||
                uri.startsWith("/css/") || uri.startsWith("/images/") ||
                uri.equals("/api/swagger-ui.html") || uri.startsWith("/api/v3/api-docs") ||
                uri.startsWith("/swagger-resources") || uri.startsWith("/api/swagger-ui") ||
                uri.equals("/api/user/signup") || uri.equals("/api/user/oauthSignup") ||
                uri.equals("/api/user/login") || uri.equals("/api/user/refresh") ||
                uri.startsWith("/api/user/nicknameCheck") || uri.startsWith("/api/user/emailCheck") ||
                uri.startsWith("/api/user/mail/sendVerification") || uri.startsWith("/api/user/mail/verifyCode") ||
                uri.startsWith("/api/user/pw/sendVerification") || uri.startsWith("/api/user/pw/verifyCode") ||
                uri.startsWith("/api/tags") || uri.startsWith("/api/ws");
    }

}
