package com.ssafy.itclips.tmp.user.repository;

import com.ssafy.itclips.tmp.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {


}
