package com.ssafy.itclips.global.oauth2.handler;

import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.global.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ssafy.itclips.global.oauth2.util.CookieUtils;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Base64;
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

    /**
     *  인증이 성공적으로 완료된다면, determineTargetUrl 메서드을 통해 인증 후 사용자를 리다이렉션할 URL 설정
     *  clearAuthenticationAttributes를 통해 관련 인증 속성 정리
     *  리다이렉트
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // Token 생성
        String targetUrl = determineTargetUrl(request, response, authentication);

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
        String token = generateToken(authentication);

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();
        String provider = oauthToken.getAuthorizedClientRegistrationId();

        String email = null;
        String name = null;

        switch (provider) {
            case "github":
                email = oAuth2User.getAttribute("email");
                name = oAuth2User.getAttribute("name");
                break;
            case "kakao":
                Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
                email = (String) kakaoAccount.get("email");
                Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttribute("properties");
                name = (String) properties.get("nickname");
                break;
            case "google":
                email = oAuth2User.getAttribute("email");
                name = oAuth2User.getAttribute("name");
                break;
            default:
                throw new IllegalArgumentException("Unknown provider: " + provider);
        }

        if (email == null) {
            throw new IllegalArgumentException("No user found with email: null");
        }

        String finalEmail = email;
        User findUser = userRepository.findByEmail(email)
                .orElseThrow(() -> createException("No user found with email: " + finalEmail));

        String gender = String.valueOf(findUser.getGender());
        String profileImage = findUser.getProfileImage();

        String encodedName = null;
        try {
            encodedName = URLEncoder.encode(name, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            log.error("Unsupported Encoding Exception: ", e);
            encodedName = "unknown";
        }

        log.info("Token : " + token);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("accessToken", token)
                .queryParam("provider", provider)
                .queryParam("name", encodedName)
                .queryParam("email", email)
                .queryParam("gender", gender)
                .queryParam("profileImage", profileImage)
                .build().toUriString();
    }

    private IllegalArgumentException createException(String message) {
        return new IllegalArgumentException(message);
    }

    private String generateToken(Authentication authentication) {
        return String.valueOf(tokenProvider.generateToken(authentication));
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

    public String encodeToBase64(String data) {
        return Base64.getEncoder().encodeToString(data.getBytes(StandardCharsets.UTF_8));
    }

    public String decodeFromBase64(String base64Data) {
        byte[] decodedBytes = Base64.getDecoder().decode(base64Data);
        return new String(decodedBytes, StandardCharsets.UTF_8);
    }
}

