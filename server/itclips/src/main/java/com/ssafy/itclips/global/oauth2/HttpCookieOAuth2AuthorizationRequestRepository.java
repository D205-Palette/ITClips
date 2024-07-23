package com.ssafy.itclips.global.oauth2;

import com.ssafy.itclips.global.oauth2.util.CookieUtils;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;

/**
 * OAUTH2 인증 요청을 관리하는 컴포넌트로, 인증 절차 중 인증 요청 데이x터를 HTTP 쿠키에 저장하고 관리
 * AuthorizationRequestRepository를 구현한 것으로 OAUth2 인증 요청을 쿠키에 저장하고, 필요시 이를 로드하거나 삭제하는 기능 제공
 * OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME: OAuth2 인증 요청 정보를 저장하는 쿠키의 이름
     * REDIRECT_URI_PARAM_COOKIE_NAME: 로그인 후 리디렉션될 URI를 저장하는 쿠키의 이름
     * cookieExpireSeconds: 쿠키의 유효 시간을 초 단위로 설정 (여기서는 180초).
     * 이 클래스를 통해 클라이어트 측에서 인증 요청을 관리할 필요가 있을 때 매우 유용
     * 인증 요청 정보를 서버 대신 클라이언트 측의 쿠키에 저장함으로써 서버의 부하를 줄이고, 사용자 경험을 개선
     */
@Component
@Slf4j
public class HttpCookieOAuth2AuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
    private static final int cookieExpireSeconds = 1800;

    /**
     * 인증 요청 쿠키를 로드, 쿠키는 getCookie 메소드를 사용하여 찾고,
     * 찾은 쿠키는 CookieUtils.deserialize를 통해 OAuth2AuthorizationRequest 객체로 역직렬화.
     */
    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        return CookieUtils.getCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME)
                .map(cookie -> CookieUtils.deserialize(cookie, OAuth2AuthorizationRequest.class))
                .orElse(null);
    }

    /**
     *  인증 요청 객체를 쿠키에 저장,
     *  객체가 유효할 경우 직렬화 하여 쿠키에 저장
     *  로그인 후, 리다이렉션 URI도 쿠키에 저장
     */
    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {
        if (authorizationRequest == null) {
            CookieUtils.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
            CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);
            return;
        }
        CookieUtils.addCookie(response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, CookieUtils.serialize(authorizationRequest), cookieExpireSeconds);
        String redirectUriAfterLogin = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
        if (StringUtils.isNotBlank(redirectUriAfterLogin)) {
            CookieUtils.addCookie(response, REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin, cookieExpireSeconds);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {
        return this.loadAuthorizationRequest(request);

    }

    public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
        CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);
    }
}

