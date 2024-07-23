package com.ssafy.itclips.global.oauth2.service;

import com.ssafy.itclips.global.oauth2.dto.OAuthAttributes;
import com.ssafy.itclips.global.oauth2.exception.CustomOAuth2AuthenticationException;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

/**
 * 사용자 정보를 로드하고, 시스템 내부의 사용자 정보를 갱신하거나 등록하는 서비스로,
 * OAuth2 로그인을 통해 제공받은 사용자 정보를 애플리케이션의 사용자 데이터와 연동하여 관리하는 중요한 역할.
 * 이클래스를 통해 OAuth2 로그인 프로세스가 원활하게 수행될 수 있도록 지원하며, 사용자 정보가 최신 상태로 유지
 * 사용자 인증 후 사용자의 권한과 관련된 정보를 시큐리티에 제공하여 접근 제어
 */
@Service
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     *  사용자 정보를 로드하는 메서드, 사용자 인증 요청을 담고 있는 OAuth2UserRequest를 매개변수로 함
     *  DefaultOAuth2UserService 객체를 생성하여 실제 OAuth2 프로바이더로부터 사용자 정보 가져온다.
     *  saveOrUpdate를 통해 사용자 정보를 조회하여, 존재하면 정보를 업데이트, 존재하지 않으면 새로 저장
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        User user = saveOrUpdate(attributes);

        if (attributes.getEmail() == null) {
            throw new CustomOAuth2AuthenticationException("당신의 깃허브 이메일을 확인할 수 없습니다. 깃 허브 이메일을 공개하도록 설정해주시고 다시 로그인하여 주세요.");
        }

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(user.getRoleKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey()
        );
    }
    private User saveOrUpdate(OAuthAttributes attributes) {
        Optional<User> optionalUser = userRepository.findByEmail(attributes.getEmail());
        return optionalUser.map(m -> {
            m.update(attributes.getNickname(), attributes.getProvider());
            return userRepository.save(m);
        }).orElseGet(() -> {
            User newUser = attributes.toEntity();
            return userRepository.save(newUser);
        });
    }
}
