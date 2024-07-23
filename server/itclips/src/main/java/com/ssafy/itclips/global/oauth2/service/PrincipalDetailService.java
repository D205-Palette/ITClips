package com.ssafy.itclips.global.oauth2.service;

import com.ssafy.itclips.global.oauth2.dto.SessionUser;
import com.ssafy.itclips.user.entity.User;
import com.ssafy.itclips.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 시큐리티에 UserDetailsService을 구현 한 것으로
 * 사용자의 상세정보를 로드하는 것이며, 사용자의 이메일을 기반으로 사용자 정보를 dB에서 조회하여
 * UserDetails 객체로 반환, 사요자 인증 시 필요한 사용자 정보 제공
 */
@Service
public class PrincipalDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public PrincipalDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User principal = userRepository.findByEmail(username)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다");
                });
        return new SessionUser(principal);
    }
}
