package com.ssafy.itclips.global.oauth2.dto;

import com.ssafy.itclips.user.entity.Role;
import com.ssafy.itclips.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

/**
 * 소셜 로그인 제공자(네이버 구글)로부터 전달받은 사용자 데이터를 표현하기 위한 DTO로,
 * 사용자 정보를 객체로 관리하고, User로 변환
 * attributes: OAuth 공급자로부터 받은 사용자의 정보를 포함하는 맵
 * nameAttributeKey: 사용자의 고유 식별자 키 이름을 저장
 * name: 사용자의 이름
 * email: 사용자의 이메일 주소
 * provider: OAuth 공급자의 이름을 저장
 */
@Getter
@Builder
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String nickname;
    private String email;
    private String provider;

    /**
     *  OAuth 공급자에 따라 적절한 메서드를 호출하여 OAuthAttributes 객체를 생성
     */
    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if("naver".equals(registrationId)) {
            return ofNaver("id", attributes);
        } else if ("kakao".equals(registrationId)) {
            return ofKakao("id", attributes);
        } else if("github".equals(registrationId)){
            return ofGitHub("id", attributes);
        }

        return ofGoogle(userNameAttributeName, attributes);
    }

    /**
     *  밑에는 공급자별 데이터 처리 메서드이다.
     *  각 메서드는 OAuth 공급자의 데이터 구조에 맞춰 사용자 정보를 추출하고 OAuthAttributes 객체를 생성
     */

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nickname((String) attributes.get("nickname"))
                .email((String) attributes.get("email"))
                .provider("Google")
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .nickname((String) response.get("nickname"))
                .email((String) response.get("email"))
                .provider("Naver")
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> account = (Map<String, Object>) response.get("profile");

        return OAuthAttributes.builder()
                .nickname((String) account.get("nickname"))
                .email((String) response.get("email"))
                .provider("Kakao")
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofGitHub(String userNameAttributeName, Map<String, Object> attributes) {
        String login = (String) attributes.get("login");
        String email = (String) attributes.get("email");
        System.out.println(login);
        System.out.println(email);
        return OAuthAttributes.builder()
                .nickname(login)
                .email(email)
                .provider("GitHub")
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .nickname(nickname)
                .email(email)
                .provider(provider)
                .role(Role.USER)
                .build();
    }
}
