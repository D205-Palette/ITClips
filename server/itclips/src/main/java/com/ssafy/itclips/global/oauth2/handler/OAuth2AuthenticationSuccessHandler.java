package com.ssafy.itclips.global.oauth2.handler;

import com.ssafy.itclips.global.jwt.JwtToken;
import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.global.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ssafy.itclips.global.oauth2.util.CookieUtils;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import static com.ssafy.itclips.global.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

/**
 * Oauth2 인증 후 사용자에게 적절한 JWT 토큰을 발행하고, 최종 목적지로 리다이렉션 하는 클래스
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final UserRepository userRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    /**
     *  인증이 성공적으로 완료된다면, determineTargetUrl 메서드을 통해 인증 후 사용자를 리다이렉션할 URL 설정
     *  clearAuthenticationAttributes를 통해 관련 인증 속성 정리
     *  리다이렉트
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        // Token 생성
        JwtToken jwtToken = tokenProvider.generateToken(authentication);

        // 추가 회원 정보
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();
        String provider = oauthToken.getAuthorizedClientRegistrationId();
        String email = extractEmail(oAuth2User, provider);

        // User 정보 조회 및 업데이트
        User findUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No user found with email: " + email));

        // 리프레시 토큰 저장
        findUser.setRefreshToken(jwtToken.getRefreshToken());

        userRepository.save(findUser);

        // HTTP response 헤더에 Token 설정
        response.setHeader("Authorization", jwtToken.getGrantType() + " " + jwtToken.getAccessToken());
        response.setHeader("Authorization-Refresh", jwtToken.getRefreshToken());
        response.sendRedirect("oauth/callback/kakao"); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트

        // target URl, redirect 설정
        clearAuthenticationAttributes(request, response);
        String targetUrl = determineTargetUrl(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);
        return redirectUri.orElse(getDefaultTargetUrl());
    }

    private String extractEmail(OAuth2User oAuth2User, String provider) {
        switch (provider) {
            case "github":
                return oAuth2User.getAttribute("email");
            case "kakao":
                Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
                return (String) kakaoAccount.get("email");
            case "google":
                return oAuth2User.getAttribute("email");
            case "naver":
                Map<String, Object> res = (Map<String, Object>) oAuth2User.getAttribute("response");
                return res.get("email").toString();
            default:
                throw new IllegalArgumentException("Unknown provider: " + provider);
        }
    }

    private String extractName(OAuth2User oAuth2User, String provider) {
        switch (provider) {
            case "github":
                return oAuth2User.getAttribute("name");
            case "kakao":
                Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttribute("properties");
                return (String) properties.get("nickname");
            case "google":
                return oAuth2User.getAttribute("name");
            case "naver":
                Map<String, Object> res = (Map<String, Object>) oAuth2User.getAttribute("response");
                return res.get("nickname").toString();
            default:
                throw new IllegalArgumentException("Unknown provider: " + provider);
        }
    }

    /**
     *  인증 과정에서 사용된 속성들 정리
     *  관련 쿠키도 제거
     *  깔끔하게 정리하는 것
     */
    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}

