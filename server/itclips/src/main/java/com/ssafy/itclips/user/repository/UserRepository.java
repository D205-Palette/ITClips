package com.ssafy.itclips.user.repository;

import com.ssafy.itclips.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    Optional<User> findByRefreshToken(String refreshToken);

    Optional<User> findByNicknameAndEmail(String nickname, String email);

}
