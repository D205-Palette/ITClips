package com.ssafy.itclips.global.oauth2.service;

import com.ssafy.itclips.global.oauth2.dto.OAuthAttributes;
import com.ssafy.itclips.global.oauth2.userinfo.OAuth2UserInfo;
import com.ssafy.itclips.user.entity.Role;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuthAttributes oAuthAttributes = OAuthAttributes.of(registrationId, userNameAttributeName, attributes);

        if (oAuthAttributes == null) {
            throw new OAuth2AuthenticationException("Unsupported provider");
        }

        OAuth2UserInfo oAuth2UserInfo = oAuthAttributes.getOauth2UserInfo();
        User user = saveOrUpdate(oAuth2UserInfo, oAuthAttributes.getProvider());

        return new DefaultOAuth2User(
                Collections.singleton(new OAuth2UserAuthority(attributes)),
                attributes,
                oAuthAttributes.getNameAttributeKey());
    }

        private User saveOrUpdate(OAuth2UserInfo oAuth2UserInfo, String provider) {
            Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
            User user = userOptional
//                    .map(entity -> entity.update(oAuth2UserInfo.getNickname(), oAuth2UserInfo.getImageUrl()))
//                    .map(entity -> entity.update(oAuth2UserInfo.getImageUrl()))
                    .orElseGet(() -> createUser(oAuth2UserInfo, provider));

            return userRepository.save(user);
        }

    private User createUser(OAuth2UserInfo oAuth2UserInfo, String provider) {
        return User.builder()
                .email(oAuth2UserInfo.getEmail())
                .password(oAuth2UserInfo.getPassword())
//                .nickname(oAuth2UserInfo.getNickname())
//                .profileImage(oAuth2UserInfo.getImageUrl())
                .provider(provider)
                .role(Role.USER)
                .darkMode(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
}
