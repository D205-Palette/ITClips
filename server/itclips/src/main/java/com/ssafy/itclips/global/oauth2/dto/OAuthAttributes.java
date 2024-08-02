package com.ssafy.itclips.global.oauth2.dto;

import com.ssafy.itclips.global.oauth2.userinfo.*;
import com.ssafy.itclips.user.entity.Role;
import com.ssafy.itclips.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private final String nameAttributeKey;
    private OAuth2UserInfo oauth2UserInfo;
    private String provider;

    @Builder
    public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo, String provider) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
        this.provider = provider;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if ("google".equals(registrationId)) {
            System.out.println("Google Login !!");
            return ofGoogle(userNameAttributeName, attributes);
        } else if ("naver".equals(registrationId)) {
            System.out.println("Naver Login !!");
            return ofNaver(userNameAttributeName, attributes);
        } else if ("kakao".equals(registrationId)) {
            System.out.println("Kakao Login !!");
            return ofKakao(userNameAttributeName, attributes);
        } else if ("github".equals(registrationId)) {
            System.out.println("Github Login !!");
            return ofGithub(userNameAttributeName, attributes);
        }
        // other providers
        System.out.println("Null... ㅠㅠ");
        return null;
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        System.out.println(attributes.toString());
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .provider("Google")
                .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        System.out.println(attributes.toString());
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new NaverOAuth2UserInfo(attributes))
                .provider("Naver")
                .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        System.out.println(attributes.toString());
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .provider("Kakao")
                .build();
    }

    private static OAuthAttributes ofGithub(String userNameAttributeName, Map<String, Object> attributes) {
        System.out.println(attributes.toString());
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new GithubOAuth2UserInfo(attributes))
                .provider("Github")
                .build();
    }

    public User toEntity(OAuth2UserInfo oauth2UserInfo) {
        return User.builder()
                .provider(provider)
                .email(oauth2UserInfo.getEmail())
//                .nickname(oauth2UserInfo.getNickname())
                .profileImage(oauth2UserInfo.getImageUrl())
                .password(oauth2UserInfo.getPassword())
                .role(Role.USER)
                .build();
    }
}
