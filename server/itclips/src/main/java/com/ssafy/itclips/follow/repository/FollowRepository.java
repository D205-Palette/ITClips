package com.ssafy.itclips.follow.repository;

import com.ssafy.itclips.follow.entity.Follow;
import com.ssafy.itclips.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    // 특정 사용자가 팔로우한 모든 Follow 객체를 조회
    @Query("SELECT f FROM Follow f WHERE f.from = :fromUser")
    List<Follow> findByFrom(@Param("fromUser") User fromUser);

    // 특정 사용자를 팔로우한 모든 Follow 객체를 조회
    @Query("SELECT f FROM Follow f WHERE f.to = :toUser")
    List<Follow> findByTo(@Param("toUser") User toUser);

    // 특정 사용자가 특정 사용자를 팔로우하는 Follow 객체 조회
    @Query("SELECT f FROM Follow f WHERE f.from = :fromUser AND f.to = :toUser")
    Optional<Follow> findByFromAndTo(@Param("fromUser") User fromUser, @Param("toUser") User toUser);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.to = :user")
    long countByTo(@Param("user") User user);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.from = :user")
    long countByFrom(@Param("user") User user);
}
