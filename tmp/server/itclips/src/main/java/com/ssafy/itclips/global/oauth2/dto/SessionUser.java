package com.ssafy.itclips.global.oauth2.dto;

import com.ssafy.itclips.user.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

/** USerDetails의 구현체로, 시큐리티에서 사용자 세부 정보를 제공하는 표준 방법
 *  시큐리티가 인증 과정에서 사용자의 세부 정보를 처리할 수 있다.
 *  여기서는 SessionUser는 실제 User 객체를 포장하여 시큐리티에 필요한 추가 정보와 기능 제공
 */
@Getter
public class SessionUser implements UserDetails {

    private User user;

    public SessionUser(User user) {
        this.user = user;
    }

    /**
     * 사용자 권한을 반환,
     * GrantedAuthority 객체의 컬렉션 생성하여 사용자의 역할을 이용하여 권한 부여
     * 권한이 여러개 일 수 있기에 컬렉션 사용
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collections = new ArrayList<>();

        collections.add(() -> "ROLE_" + user.getRole());

        return collections;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getNickname();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
